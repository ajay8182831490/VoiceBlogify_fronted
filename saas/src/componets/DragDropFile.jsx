import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const url = "http://localhost:4000"

const AudioDropzone = ({ onFileUploaded }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [duration, setDuration] = useState(null);

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav', '.ogg', '.aac', '.m4a', '.flac'],
        },
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
                className={`w-full p-6 ${isDragActive ? 'bg-black border-blue-400' : 'bg-black border-gray-300'}`}
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
