import React from 'react';
import { FaMicrophone, FaUpload, FaClipboardList, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VisualPath = () => {
    const steps = [
        {
            title: "Capture Your Ideas",
            description: "Seamlessly record your voice with just a click, turning spontaneous thoughts into actionable blog posts. Perfect for creators on-the-go, whether you’re walking, driving, or brainstorming.",
            icon: <FaMicrophone className="text-4xl text-gray-700" />,
            bgColor: "bg-gray-200", // Light gray for the card background
        },
        {
            title: "Effortless File Upload",
            description: "Easily upload audio files or paste YouTube links in various formats. VoiceBlogify ensures a smooth transition from raw ideas to structured content without any hassle.",
            icon: <FaUpload className="text-4xl text-gray-700" />,
            bgColor: "bg-gray-300", // Slightly darker gray for contrast
        },
        {
            title: "Smart AI Transcription",
            description: "Let our AI convert your audio into text, generating engaging titles, relevant tags, and structured summaries. Focus on your ideas while we handle the organization.",
            icon: <FaClipboardList className="text-4xl text-gray-700" />,
            bgColor: "bg-gray-200", // Light gray for the card background
        },
        {
            title: "Personalize Your Content",
            description: "Edit and refine the generated text to match your unique voice and style. Ensure your personality shines through every blog post, enhancing your connection with your audience.",
            icon: <FaEdit className="text-4xl text-gray-700" />,
            bgColor: "bg-gray-300", // Slightly darker gray for contrast
        },
        {
            title: "Instant Publishing & Sharing",
            description: "Export your articles in rich text, plain HTML, or Markdown. Share directly to LinkedIn, Medium, or Blogger with one click, amplifying your reach effortlessly.",
            icon: <FaShareAlt className="text-4xl text-gray-700" />,
            bgColor: "bg-gray-200", // Light gray for the card background
        },
    ];

    return (
        <div className="py-10 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Transform Your Voice into Engaging Content</h2>
            <p className="text-lg text-center text-gray-700 mb-4">
                VoiceBlogify empowers creators by simplifying the content creation process. Record your ideas anytime and transform them into polished blog posts that captivate your audience.
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col items-center w-72 h-72 m-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${step.bgColor} text-gray-800 p-6`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center justify-center h-24 mb-4">
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

export default React.memo(VisualPath);

