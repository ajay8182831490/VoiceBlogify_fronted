import { useState } from 'react';
import ParentComponent from './ParentsFileUpload';
import PasteUrlComponent from './PasteUrl';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MyAudioRecordingComponent from './AudioTest';
import { FaMicrophone, FaUpload, FaLink } from 'react-icons/fa';

const url = "https://voiceblogify-backend.onrender.com"

export default function AudioPage() {
    const [selectedOption, setSelectedOption] = useState('record');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [audioData, setAudioData] = useState(null);
    const navigate = useNavigate();

    const handleOptionChange = (option) => {
        setSelectedOption(option);
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
        const response = await fetch(`${url}/transcription/url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        return await response.json();
    };

    const handleAudioSubmit = async (audioData) => {
        const formData = new FormData();
        formData.append('audio', audioData);

        const response = await fetch(`${url}/transcription/url`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    };

    return (
        <div className="flex flex-col items-center p-6  min-h-screen" style={{ backgroundColor: "#020012" }}>

            <div className="w-full max-w-lg mb-8">
                <div className="w-full mx-auto mb-8 pb-6 shadow-lg rounded-lg text-center">
                    <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-white ">
                        Speak Up: Your Voice is Being Captured!
                    </h1>

                </div>
                <div className="flex justify-around flex-wrap">
                    {['record', 'upload', /*'url'*/].map(option => (
                        <motion.div
                            key={option}
                            onClick={() => handleOptionChange(option)}
                            className={`group relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-transform transform shadow-lg ${selectedOption === option
                                ? 'bg-gradient-to-r from-teal-500 to-blue-500 scale-105'
                                : 'bg-gradient-to-r from-gray-300 to-gray-500 border border-gray-400'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-black rounded-full shadow-md">
                                {option === 'record' && <FaMicrophone className="text-teal-500 text-xl md:text-3xl" />}
                                {option === 'upload' && <FaUpload className="text-blue-500 text-xl md:text-3xl" />}
                                {/* //{option === 'url' && <FaLink className="text-green-500 text-xl md:text-3xl" />} */}
                            </div>

                            {/* Tooltip on Hover */}
                            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 p-2 bg-black text-white text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </div>
                        </motion.div>

                    ))}
                </div>
            </div>

            <motion.div
                className="w-full max-w-lg "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {selectedOption === 'upload' && <ParentComponent onFileSelect={setFile} />}
                {/* {selectedOption === 'url' && <PasteUrlComponent onUrlChange={setUrl} />} */}
                {selectedOption === 'record' && <MyAudioRecordingComponent setAudioData={setAudioData} />}
            </motion.div>

        </div>
    );
}
