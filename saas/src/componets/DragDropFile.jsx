import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import WaveSurfer from 'wavesurfer.js';

const AudioDropzone = ({ onFileUploaded }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [duration, setDuration] = useState(null);
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        setUploadedFile(null);
        setAudioUrl('');
        setDuration(null);

        const file = acceptedFiles[0];

        if (file && file.type.startsWith('audio/')) {
            setUploadedFile(file);

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
        // Cleanup WaveSurfer instance on component unmount
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
            className="w-full max-w-lg mx-auto p-6 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center cursor-pointer transition-colors"
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

            {uploadedFile && (
                <div className="mt-4 w-full text-left">
                    {audioUrl && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold">Playback:</h4>
                            <audio controls className="w-full mt-2">
                                <source src={audioUrl} type={uploadedFile.type} />
                                Your browser does not support the audio element.
                            </audio>
                            <div ref={waveformRef} className="mt-4"></div>
                            {duration && (
                                <div className="mt-2 text-gray-700">
                                    <strong>Duration:</strong> {Math.round(duration)} seconds
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default AudioDropzone;
