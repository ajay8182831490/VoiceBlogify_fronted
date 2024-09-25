import React from 'react';
import { FaMicrophone, FaUpload, FaClipboardList, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VisualPath = () => {
    const steps = [
        {
            title: "Record Your Audio",
            description: "Capture your ideas on-the-go, anytime and anywhere. Whether you're in your car or on a walk, simply click to record your voice and let VoiceBlogify transform your spoken thoughts into written content.",
            icon: <FaMicrophone className="text-4xl text-white" />,
            color: "bg-orange-500", // Warm color
        },
        {
            title: "Upload Your Files",
            description: "Easily upload audio files or paste a YouTube link. VoiceBlogify supports various formats, making the process seamless for you, regardless of where you are.",
            icon: <FaUpload className="text-4xl text-white" />,
            color: "bg-yellow-500", // Warm color
        },
        {
            title: "AI Transcription",
            description: "Our AI transcribes your audio into text while generating titles, subtitles, tags, and a structured summary. Enjoy a human-like touch to your content that turns your organized thoughts into coherent posts.",
            icon: <FaClipboardList className="text-4xl text-white" />,
            color: "bg-red-500", // Warm color
        },
        {
            title: "Edit Your Content",
            description: "Refine the generated content according to your needs. You can easily modify the text to align with your voice and style, ensuring your personality shines through.",
            icon: <FaEdit className="text-4xl text-white" />,
            color: "bg-teal-500", // Warm color
        },
        {
            title: "Publish & Share",
            description: "Export your articles as rich text, plain HTML, or Markdown format. Post directly to platforms like LinkedIn, Medium, and Blogger with a single click, sharing your thoughts with the world effortlessly.",
            icon: <FaShareAlt className="text-4xl text-white" />,
            color: "bg-pink-500", // Warm color
        },
    ];

    return (
        <div className="py-10 bg-gradient-to-r from-indigo-50 to-blue-50">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How VoiceBlogify Works</h2>
            <p className="text-lg text-center text-gray-700 mb-4">
                VoiceBlogify simplifies your content creation process by turning your voice into organized, polished blog posts. Record your ideas anytime, anywhere, and transform unorganized thoughts into coherent articles with ease.
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center w-72 h-72 m-4 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${step.color} text-white p-4`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center justify-center h-24">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-center text-sm">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VisualPath;
