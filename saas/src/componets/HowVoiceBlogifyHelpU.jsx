import React from 'react';
import { FaClock, FaCommentDots, FaClipboardCheck, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HowVoiceBlogifyHelps = () => {
    const benefits = [
        {
            title: "Save Time",
            description: "Quickly turn your voice ideas into organized text, allowing you to focus on content rather than typing.",
            icon: <FaClock className="text-4xl text-white" />,
            color: "bg-yellow-400",
        },
        {
            title: "Create Anywhere",
            description: "Capture thoughts on-the-go. Whether you’re commuting or traveling, your creativity can flow anytime.",
            icon: <FaCommentDots className="text-4xl text-white" />,
            color: "bg-teal-400",
        },
        {
            title: "One-Click Publishing",
            description: "Share your posts instantly to major platforms like LinkedIn, Medium, and Blogger with just one click.",
            icon: <FaClipboardCheck className="text-4xl text-white" />,
            color: "bg-green-400",
        },
        {
            title: "Human Touch",
            description: "AI-generated drafts maintain your unique voice, ensuring your personality shines through in every article.",
            icon: <FaRegHandshake className="text-4xl text-white" />,
            color: "bg-blue-400",
        },
    ];

    return (
        <div className="py-10 bg-gradient-to-r from-gray-200 to-gray-400">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How VoiceBlogify Can Help You</h2>
            <p className="text-lg text-center text-gray-700 mb-6">
                Whether you're a blogger, professional, or business owner, VoiceBlogify empowers you to create compelling content with ease.
                Say goodbye to writer's block and hello to efficient content creation.
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center w-full max-w-xs p-6 m-4 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 ${benefit.color} text-white`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="mb-3">{benefit.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-white text-center">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HowVoiceBlogifyHelps;
