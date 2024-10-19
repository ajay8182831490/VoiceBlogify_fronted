import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Notify, NotifyFalse } from './NotifyToast';

import { useAuth } from '@/userContext/AuthContext';

const Url = import.meta.env.VITE_API_URL
const getPlanMaxDuration = (plan) => {
    switch (plan) {
        case 'FREE':
            return 10 * 60; // 10 minutes
        case 'BASIC':
            return 20 * 60; // 20 minutes
        case 'PREMIUM':
            return 60 * 60; // 60 minutes
        case 'BUSINESS':
            return 90 * 60; // 90 minutes
        default:
            return 0; // Default if plan is not recognized
    }
};

const AudioDropzone = ({ onFileUploaded }) => {
    const [audioUrl, setAudioUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [duration, setDuration] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [blogType, setBlogType] = useState('');
    const [blogTone, setBlogTone] = useState('');


    const { user } = useAuth();
    const plan = user?.plan;

    const MAX_DURATION = getPlanMaxDuration(plan);








    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        setAudioUrl('');
        setVideoUrl('');
        setDuration(null);
        setSelectedFile(null);

        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);


        if (file && file.type.startsWith('audio/')) {
            setAudioUrl(url);
            setSelectedFile(file);
            setIsSubmitDisabled(false);

            if (onFileUploaded) {
                onFileUploaded(file);
            }

            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
                const audioDuration = audio.duration;
                setDuration(audioDuration);

                // Check duration
                if (audioDuration > MAX_DURATION) {
                    setErrorMessage(`Audio duration exceeds the maximum limit of ${MAX_DURATION / 60} minutes.`);
                    setIsSubmitDisabled(true);
                }
            };
        } else if (file.type.startsWith('video/')) {
            setVideoUrl(url);
            setSelectedFile(file);
            setIsSubmitDisabled(false);

            if (onFileUploaded) {
                onFileUploaded(file);
            }

            const video = document.createElement('video');
            video.src = url;
            video.onloadedmetadata = () => {
                const videoDuration = video.duration;


                setDuration(videoDuration);

                // Check duration
                if (videoDuration > MAX_DURATION) {
                    setErrorMessage(`Video duration exceeds the maximum limit of ${MAX_DURATION / 60} minutes.`);
                    setIsSubmitDisabled(true);
                }
            };
        } else {
            setErrorMessage('Please upload a valid audio or video file.');
        }
    }, [onFileUploaded]);

    const handleSubmit = async () => {
        if (!selectedFile || !blogType || !blogTone) {
            setErrorMessage('Please select a file, blog type, and blog tone for processing.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('blogType', blogType); // Attach selected blog type
        formData.append('blogTone', blogTone); // Attach selected blog tone
        setIsSubmitDisabled(true);

        try {
            const response = await fetch(`${Url}/transcription/audiofile`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                Notify(data.message);
                navigate('/');
            } else if (response.status === 403) {
                NotifyFalse(data.message);
                navigate('/pricing');
                const errorMessage = await response.text();
                throw new Error(`Failed to upload the file: ${errorMessage}`);
            } else {
                NotifyFalse(data.message);
                navigate('/main');
            }
        } catch (error) {
            setErrorMessage('There was an issue uploading the file.');
        }
    };

    const handleDelete = () => {
        setAudioUrl('');
        setVideoUrl('');
        setSelectedFile(null);
        setDuration(null);
        setIsSubmitDisabled(true); // Reset submit button state
        setErrorMessage('')
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mpeg': ['.mp3'],
            'audio/wav': ['.wav'],
            'audio/ogg': ['.ogg'],
            'audio/mp4': ['.m4a'],
            'audio/x-aiff': ['.aiff', '.aif'],
            'video/mp4': ['.mp4'],
            'video/x-msvideo': ['.avi'],
            'video/x-m4v': ['.m4v'],
            'video/ogg': ['.ogv'],
            'video/webm': ['.webm'],
        },
        multiple: false,
    });

    return (
        <motion.div
            className="w-full max-w-lg mx-auto p-8 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center cursor-pointer bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                {...getRootProps()}
                className={`w-full p-6 rounded-lg ${isDragActive ? 'bg-teal-500 border-teal-400' : 'bg-gray-800 border-gray-600'} border-2 transition-colors duration-300 shadow-md`}
            >
                <input {...getInputProps()} />
                <p className="text-white text-lg font-semibold">
                    {isDragActive
                        ? 'Drop your audio or video file here...'
                        : 'Drag & drop your audio or video files here, or click to select files'}
                </p>
            </div>

            {errorMessage && (
                <motion.div
                    className="text-red-600 mt-4 px-4 py-2 bg-red-100 rounded-md shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {errorMessage}
                </motion.div>
            )}

            {audioUrl && (
                <div className="mt-4">
                    <audio controls src={audioUrl} className="rounded-lg shadow-md" />
                </div>
            )}

            {videoUrl && (
                <div className="mt-4">
                    <video controls width="500" src={videoUrl}>
                        Your browser does not support the video element.
                    </video>
                </div>
            )}

            {(audioUrl || videoUrl) && (
                <div className="mt-4 w-full">
                    <label className="block text-left text-white font-semibold mb-2">Select Blog Type (required):</label>
                    <select
                        value={blogType}
                        onChange={(e) => setBlogType(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-gray-800 text-slate-200 focus:outline-none focus:ring focus:ring-teal-500"
                        required
                    >
                        <option value="">Select a type</option>
                        <option value="technical">Technical Tutorial/Guide</option>
                        <option value="personal">Personal Story/Experience</option>
                        <option value="industry">Industry Analysis/Trends</option>
                        <option value="how-to">How-To/Instructional</option>
                        <option value="opinion">Opinion/Editorial</option>
                        <option value="product">Product Review</option>
                        <option value="case-study">Case Study</option>
                        <option value="news">News Analysis</option>
                        <option value="research">Research Summary</option>
                        <option value="lifestyle">Lifestyle/Personal Development</option>
                    </select>
                </div>
            )}

            {(audioUrl || videoUrl) && (
                <div className="mt-4 w-full">
                    <label className="block text-left text-white font-semibold mb-2">Select Blog Tone (required):</label>
                    <select
                        value={blogTone}
                        onChange={(e) => setBlogTone(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-gray-800 text-slate-200 focus:outline-none focus:ring focus:ring-teal-500"
                        required
                    >
                        <option value="">Select a tone</option>
                        <option value="casual">Casual & Friendly</option>
                        <option value="professional">Professional but Warm</option>
                        <option value="expert">Expert & Engaging</option>
                        <option value="story-driven">Story-driven</option>
                        <option value="analytical">Analytical but Accessible</option>
                    </select>
                </div>
            )}

            {(audioUrl || videoUrl) && (
                <div className="mt-4 flex flex-col space-y-2 w-full">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                        className={`px-6 py-3 text-white rounded-lg shadow-lg transition-colors duration-300 ${isSubmitDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500'}`}
                    >
                        Submit File for Processing
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition-colors duration-300"
                    >
                        Delete File
                    </button>
                </div>
            )}
        </motion.div>
    );
};



export default AudioDropzone;
