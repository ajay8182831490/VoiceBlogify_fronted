import React from 'react';
import { FaMicrophone, FaUpload, FaClipboardList, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VisualPath = () => {
    const steps = [
        {
            title: "Capture Your Ideas",
            description: "Effortlessly record your voice or upload videos to transform spontaneous thoughts into structured blog posts. Perfect for creators on-the-go, whether you’re walking, driving, or brainstorming.",
            icon: <FaMicrophone className="text-4xl text-blue-500" />,
        },
        {
            title: "Effortless File Upload",
            description: "Easily upload audio files or videos in various formats. VoiceBlogify ensures a smooth transition from raw ideas to polished content.",
            icon: <FaUpload className="text-4xl text-green-500" />,
        },
        {
            title: "Smart AI Transcription",
            description: "Our advanced AI transforms your audio and video into compelling text, crafting captivating titles, relevant tags, and concise summaries. Focus on your ideas while we take care of the details.",
            icon: <FaClipboardList className="text-4xl text-yellow-500" />,
        },
        {
            title: "Personalize Your Content",
            description: "Edit and refine the generated text to reflect your unique voice and style. Ensure your personality shines through every post, enhancing your connection with your audience.",
            icon: <FaEdit className="text-4xl text-purple-500" />,
        },
        {
            title: "Instant Publishing & Sharing",
            description: "Export your articles in rich text, plain HTML, or Markdown. Share directly to LinkedIn, Medium, or Blogger with one click to amplify your reach effortlessly.",
            icon: <FaShareAlt className="text-4xl text-red-500" />,
        },
    ];

    return (
        <div className="py-10 w-full" style={{ backgroundColor: "#121212" }}>
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-100">
                Transform Your Voice into Engaging Content
            </h2>
            <p className="text-xl text-center text-white mb-8">
                VoiceBlogify empowers creators by making content creation effortless. Record your ideas anytime and transform them into polished blog posts that engage and captivate your audience.
            </p>

            {/* Outer padding for the entire component */}
            <div className="px-4 md:px-10 lg:px-20">

                <div className="flex flex-wrap justify-between">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-between w-full sm:w-[45%] md:w-[30%] h-80 m-2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl text-white p-6"
                            style={{ backgroundColor: "#1E1E1E" }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <div className="flex items-center justify-center h-24 mb-4 bg-gray-800 rounded-full">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-center">{step.title}</h3>
                            <p className="text-center text-gray-200 text-md">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(VisualPath);
