import React from 'react';
import { FaMicrophone, FaUpload, FaClipboardList, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VisualPath = () => {
    const steps = [
        {
            title: "Capture Your Ideas",
            description: "Record your voice. Upload videos. Turn thoughts into blog posts. Perfect for creators on-the-go, whether you’re walking, driving, or brainstorming.",
            icon: <FaMicrophone className="text-4xl text-blue-500" />,
        },
        {
            title: "Easily File Upload",
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
            description: "Export your articles in rich text, plain HTML, or Markdown. Share directly to LinkedIn, Medium, or Blogger with one click to amplify your reach easily.",
            icon: <FaShareAlt className="text-4xl text-red-500" />,
        },
    ];

    return (
        <div className="py-10 w-full" >
            {/* Adjust the container for heading and paragraph */}
            <div className="max-w-3xl mx-auto text-center px-6 md:px-10 lg:px-16">
                <h2 className="text-3xl font-bold mb-4 text-gray-100">
                    How It Works
                </h2>
                <h4 className="text-2xl font-bold mb-4 text-gray-100">
                    Choose between live recording or upload your audio/video
                </h4>


            </div>

            {/* Outer padding for the entire component */}
            <div className="px-4 md:px-10 lg:px-20">
                <div className="flex flex-wrap justify-center">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-between w-full sm:w-[45%] md:w-[30%] h-80 m-2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl text-white p-6 bg-slate-900"

                            whileHover={{ scale: 1.08 }}
                        >
                            <div className="flex items-center justify-center h-24 mb-4 ">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-center">{step.title}</h3>
                            <p className="text-center text-slate-300 text-md">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(VisualPath);
