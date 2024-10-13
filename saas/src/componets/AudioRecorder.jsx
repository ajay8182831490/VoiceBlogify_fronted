import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Notify, NotifyFalse } from './NotifyToast';

const Url = "https://voiceblogify-backend.onrender.com";

const AudioDropzone = ({ onFileUploaded }) => {
    const [audioUrl, setAudioUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [duration, setDuration] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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
                setDuration(audio.duration);
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
            };
        } else {
            setErrorMessage('Please upload a valid audio or video file.');
        }


    }, [onFileUploaded]);

    const handleSubmit = async () => {
        if (!selectedFile) {
            setErrorMessage('No file selected for processing.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
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
            } else if (response.status == 403) {

                NotifyFalse(data.message);
                navigate('/pricing');
                const errorMessage = await response.text();
                throw new Error(`Failed to upload the file: ${errorMessage}`);
            }
            else {
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
        setIsSubmitted(false);
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
            className="w-full max-w-lg mx-auto p-8 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                {...getRootProps()}
                className={`w-full p-6 rounded-lg ${isDragActive ? 'bg-teal-200 border-teal-500' : 'bg-gray-100 border-gray-300'} border-2 transition-colors duration-300`}
            >
                <input {...getInputProps()} />
                <p className="text-teal-800 text-lg font-semibold">
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
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500 transition-colors duration-300"
                >
                    Submit File for Processing
                </button>
            )}

            {(audioUrl || videoUrl) && (
                <button
                    onClick={handleDelete}
                    className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition-colors duration-300"
                >
                    Delete File
                </button>
            )}
        </motion.div>
    );
};

export default AudioDropzone;
