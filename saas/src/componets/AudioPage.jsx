import { useState } from 'react';
import ParentComponent from './ParentsFileUpload';
import PasteUrlComponent from './PasteUrl';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MyAudioRecordingComponent from './AudioTest';
import { FaMicrophone, FaUpload, FaLink } from 'react-icons/fa'; // For icons

const Url = "http://localhost:4000";

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
        const response = await fetch(`${Url}/transcription/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

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
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">

            <div className="w-full max-w-lg mb-8">
                <div className="flex justify-around flex-wrap">
                    {['record', 'upload', 'url'].map(option => (
                        <motion.div
                            key={option}
                            onClick={() => handleOptionChange(option)}
                            className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-transform transform shadow-lg ${selectedOption === option
                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 scale-105'
                                : 'bg-gradient-to-r from-gray-300 to-gray-500 border border-gray-400'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-md">
                                {option === 'record' && <FaMicrophone className="text-teal-500 text-xl md:text-3xl" />}
                                {option === 'upload' && <FaUpload className="text-blue-500 text-xl md:text-3xl" />}
                                {option === 'url' && <FaLink className="text-green-500 text-xl md:text-3xl" />}
                            </div>
                            <span className="mt-2 text-sm md:text-lg font-semibold text-white group-hover:text-gray-900">{option.charAt(0).toUpperCase() + option.slice(1)}</span>

                            {/* Tooltip on Hover */}
                            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 p-2 bg-gray-800 text-white text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            <motion.div
                className="w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {selectedOption === 'upload' && <ParentComponent onFileSelect={setFile} />}
                {selectedOption === 'url' && <PasteUrlComponent onUrlChange={setUrl} />}
                {selectedOption === 'record' && <MyAudioRecordingComponent setAudioData={setAudioData} />}
            </motion.div>


        </div>
    );
}
