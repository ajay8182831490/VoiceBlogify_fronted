import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const AudioDropzone = ({ onFileUploaded }) => {
    const [audioUrl, setAudioUrl] = useState('');  // Define audioUrl and setter
    const [duration, setDuration] = useState(null);  // Define duration and setter
    const [selectedFile, setSelectedFile] = useState(null);  // Define selectedFile to store the uploaded file
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        setAudioUrl('');
        setDuration(null);
        setSelectedFile(null);

        const file = acceptedFiles[0];

        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            setSelectedFile(file);  // Set the file for processing

            // Notify parent component about the uploaded file
            if (onFileUploaded) {
                onFileUploaded(file);
            }

            // Get audio duration
            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };

        } else {
            setErrorMessage('Please upload a valid audio file (e.g., .mp3, .wav).');
        }
    }, [onFileUploaded]);

    const handleSubmit = () => {
        if (!selectedFile) {
            setErrorMessage('No file selected for processing.');
            return;
        }

        // Process the audio file (e.g., upload to a server)
        console.log('Processing audio file:', selectedFile);

        // Add your logic for processing the audio file here.
        // Example: API call to process the audio
    };
    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
            className="w-full max-w-lg mx-auto p-6 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center cursor-pointer transition-colors bg-gray-400 "
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                {...getRootProps()}
                className={`w-full p-6 ${isDragActive ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-300'}`}
            >
                <input {...getInputProps()} />
                <p className="text-blue-600">
                    {isDragActive
                        ? 'Drop your audio file here...'
                        : 'Drag & drop your audio files here, or click to select files'}
                </p>
            </div>

            {errorMessage && (
                <motion.div
                    className="text-red-500 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {errorMessage}
                </motion.div>
            )}

            {audioUrl && (
                <div className="mt-4">
                    <audio controls src={audioUrl} />
                    {duration && <p>Duration: {formatDuration(duration)}</p>}
                </div>
            )}
            {audioUrl && (
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                    Submit Audio for Processing
                </button>
            )}


        </motion.div>
    );
};

export default AudioDropzone;