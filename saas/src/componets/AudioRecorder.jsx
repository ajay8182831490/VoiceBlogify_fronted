import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import WaveSurfer from 'wavesurfer.js';

const AudioDropzone = ({ onFileUploaded }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [duration, setDuration] = useState(null);
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        setAudioUrl('');
        setDuration(null);

        const file = acceptedFiles[0];

        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);

            // Notify parent component about the uploaded file
            if (onFileUploaded) {
                onFileUploaded(file);
            }

            // Get audio duration
            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };

            // Initialize WaveSurfer.js
            if (wavesurfer.current) {
                wavesurfer.current.load(url);
            } else {
                wavesurfer.current = WaveSurfer.create({
                    container: waveformRef.current,
                    waveColor: '#ddd',
                    progressColor: '#4A90E2',
                    height: 100,
                    barWidth: 2,
                    barRadius: 3,
                });
                wavesurfer.current.load(url);
            }
        } else {
            setErrorMessage('Please upload a valid audio file (e.g., .mp3, .wav).');
        }
    }, [onFileUploaded]);

    useEffect(() => {
        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'audio/*',
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


        </motion.div>
    );
};

export default AudioDropzone;
