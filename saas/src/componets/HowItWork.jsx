import React from 'react';
import { FaMicrophone, FaUpload, FaClipboardList, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VisualPath = () => {
    const steps = [
        {
            title: "Capture Your Ideas",
            description: "Effortlessly record your voice or upload videos to transform spontaneous thoughts into structured blog posts. Perfect for creators on-the-go, whether you’re walking, driving, or brainstorming.",
            icon: <FaMicrophone className="text-4xl text-white" />,
        },
        {
            title: "Effortless File Upload",
            description: "Easily upload audio files or videos in various formats. VoiceBlogify ensures a smooth transition from raw ideas to polished content.",
            icon: <FaUpload className="text-4xl text-white" />,
        },
        {
            title: "Smart AI Transcription",
            description: "Let our advanced AI convert your audio and video into engaging text, creating captivating titles, relevant tags, and concise summaries. Focus on your ideas while we handle the details.",
            icon: <FaClipboardList className="text-4xl text-white" />,
        },
        {
            title: "Personalize Your Content",
            description: "Edit and refine the generated text to reflect your unique voice and style. Ensure your personality shines through every post, enhancing your connection with your audience.",
            icon: <FaEdit className="text-4xl text-white" />,
        },
        {
            title: "Instant Publishing & Sharing",
            description: "Export your articles in rich text, plain HTML, or Markdown. Share directly to LinkedIn, Medium, or Blogger with one click to amplify your reach effortlessly.",
            icon: <FaShareAlt className="text-4xl text-white" />,
        },
    ];
    return (
        <div className="py-10 w-full" style={{ backgroundColor: "#020012" }}>
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Transform Your Voice into Engaging Content</h2>
            <p className="text-lg text-center text-white mb-4">
                VoiceBlogify empowers creators by simplifying the content creation process. Record your ideas anytime and transform them into polished blog posts that captivate your audience.
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center w-full">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center w-full max-w-xs h-72 m-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl text-black p-6"
                        style={{ backgroundColor: "#4F656F" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center justify-center h-24 mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-center text-white text-sm">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
};

export default React.memo(VisualPath);

