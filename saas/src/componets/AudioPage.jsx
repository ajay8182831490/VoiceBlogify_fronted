import { useState } from 'react';
import ParentComponent from './ParentsFileUpload';

import PasteUrlComponent from './PasteUrl';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // for navigation
import MyAudioRecordingComponent from './AudioTest';

export default function AudioPage() {
    const [selectedOption, setSelectedOption] = useState('upload');
    const [file, setFile] = useState(null); // Store file for upload
    const [url, setUrl] = useState(''); // Store URL input
    const [audioData, setAudioData] = useState(null); // Store recorded audio
    const [isReady, setIsReady] = useState(false); // To show start button
    const navigate = useNavigate();

    // Handle start button click
    const handleStart = async () => {
        navigate('/loading'); // Redirect to a loading page

        let response;
        if (selectedOption === 'upload' && file) {
            response = await handleFileUpload(file); // Upload file fetch call
        } else if (selectedOption === 'url' && url) {
            response = await handleUrlSubmit(url); // URL fetch call
        } else if (selectedOption === 'record' && audioData) {
            response = await handleAudioSubmit(audioData); // Audio fetch call
        }

        if (response) {
            // After fetching the response, redirect to another page
            navigate('/result'); // Adjust as needed
        }
    };

    // Example fetch call for file upload
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-audio', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    };

    // Example fetch call for URL submission
    const handleUrlSubmit = async (url) => {
        const response = await fetch('/api/submit-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        return await response.json();
    };

    // Example fetch call for recorded audio
    const handleAudioSubmit = async (audioData) => {
        const formData = new FormData();
        formData.append('audio', audioData);

        const response = await fetch('/api/upload-recording', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100">
            {/* Buttons with Framer Motion animation */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-6 w-full max-w-md">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedOption('upload')}
                    className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Upload File
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedOption('url')}
                    className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                    Paste URL
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedOption('record')}
                    className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                    Record Audio
                </motion.button>
            </div>

            {/* Conditional Rendering Based on Selected Option */}
            <motion.div
                className="mt-8 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {selectedOption === 'upload' && <ParentComponent onFileSelect={setFile} />}
                {selectedOption === 'url' && <PasteUrlComponent onUrlChange={setUrl} />}
                {selectedOption === 'record' && <MyAudioRecordingComponent />}
            </motion.div>

            {/* Show Start button when file, url, or audio is ready */}
            {((selectedOption === 'upload' && file) || (selectedOption === 'url' && url) || (selectedOption === 'record' && audioData)) && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
                    onClick={handleStart}
                >
                    Start Processing
                </motion.button>
            )}
        </div>
    );
}
