import { useState } from 'react';
import ParentComponent from './ParentsFileUpload';
import PasteUrlComponent from './PasteUrl';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // for navigation
import MyAudioRecordingComponent from './AudioTest';

const Url = "http://localhost:4000"

export default function AudioPage() {
    const [selectedOption, setSelectedOption] = useState('record');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [audioData, setAudioData] = useState(null);
    const navigate = useNavigate();

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleDataSubmission = async () => {
        navigate('/loading');

        let response;
        if (selectedOption === 'upload' && file) {
            response = await handleFileUpload(file);
        } else if (selectedOption === 'url' && url) {
            response = await handleUrlSubmit(url);
        } else if (selectedOption === 'record' && audioData) {
            response = await handleAudioSubmit(audioData);
        }

        if (response) {
            navigate('/result');
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-audio', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    };

    const handleUrlSubmit = async (url) => {

        console.log(url)
        const response = await fetch(`${Url}/transcription/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
        console.log(response)
        return await response.json();
    };

    const handleAudioSubmit = async (audioData) => {
        const formData = new FormData();
        formData.append('audio', audioData);

        const response = await fetch(`${Url}/transcription/url`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            {/* Option Selection */}
            <div className="w-full max-w-md my-6">
                <div className="flex justify-around">
                    {['record', 'upload', 'url'].map(option => (
                        <motion.button
                            key={option}
                            onClick={() => handleOptionChange(option)}
                            className={`px-6 py-2 rounded-lg text-white transition-transform transform shadow-md ${selectedOption === option
                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 scale-105'
                                : 'bg-gradient-to-r from-gray-300 to-gray-500 border border-gray-400'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Conditional Rendering Based on Selected Option */}
            <motion.div
                className="mt-8 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {selectedOption === 'upload' && <ParentComponent onFileSelect={setFile} />}
                {selectedOption === 'url' && <PasteUrlComponent onUrlChange={setUrl} />}
                {selectedOption === 'record' && <MyAudioRecordingComponent setAudioData={setAudioData} />}
            </motion.div>

            {/* Animated Confirmation */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: file || url || audioData ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {(file || url || audioData) && (
                    <motion.button
                        onClick={handleDataSubmission}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-green-600 transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
}
