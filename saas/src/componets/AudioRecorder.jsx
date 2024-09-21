import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
const Url = "https://voiceblogify-backend.onrender.com"

const AudioDropzone = ({ onFileUploaded }) => {
    const [audioUrl, setAudioUrl] = useState('');
    const [duration, setDuration] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        setAudioUrl('');
        setDuration(null);
        setSelectedFile(null);

        const file = acceptedFiles[0];

        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            setSelectedFile(file);

            if (onFileUploaded) {
                onFileUploaded(file);
            }

            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };

        } else {
            setErrorMessage('Please upload a valid audio file (e.g., .mp3, .wav).');
        }
    }, [onFileUploaded]);

    const handleSubmit = async () => {
        if (!selectedFile) {
            setErrorMessage('No file selected for processing.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            const response = await fetch(`${Url}/transcription/audioRecord`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/loading');
            } else {
                const errorMessage = await response.text();
                throw new Error(`Failed to upload the audio file: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('There was an issue uploading the audio file.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mpeg': ['.mp3'],
            'audio/wav': ['.wav'],
            'audio/ogg': ['.ogg'],
            'audio/mp4': ['.m4a'],
            'audio/x-aiff': ['.aiff', '.aif'],
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
                        ? 'Drop your audio file here...'
                        : 'Drag & drop your audio files here, or click to select files'}
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

            {audioUrl && (
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500 transition-colors duration-300"
                >
                    Submit Audio for Processing
                </button>
            )}
        </motion.div>
    );
};

export default AudioDropzone;
