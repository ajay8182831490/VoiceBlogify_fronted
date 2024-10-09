import React from 'react';
import { FaClock, FaCommentDots, FaClipboardCheck, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowVoiceBlogifyHelps = () => {
    const benefits = [
        {
            title: "Save Time Effortlessly",
            description: "Transform your voice ideas into well-organized text quickly. Focus on your message without the hassle of typing.",
            icon: <FaClock className="text-4xl text-blue-500" />,
        },
        {
            title: "Create Anywhere, Anytime",
            description: "Capture inspiration on the go! Whether you’re commuting or traveling, your ideas can flow effortlessly.",
            icon: <FaCommentDots className="text-4xl text-green-500" />,
        },
        {
            title: "Instant Publishing",
            description: "Share your posts directly to major platforms like LinkedIn, Medium, and Blogger with a single click. Reach your audience instantly!",
            icon: <FaClipboardCheck className="text-4xl text-yellow-500" />,
        },
        {
            title: "Personalized AI Drafts",
            description: "Our AI captures your unique voice, making sure your personality shines in every article. Authenticity is key!",
            icon: <FaRegHandshake className="text-4xl text-purple-500" />,
        },
    ];

    return (
        <div className="py-10" style={{ backgroundColor: "#121212" }}>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">How VoiceBlogify Can Help You</h2>
            <p className="text-lg text-center text-gray-400 mb-6">
                VoiceBlogify empowers bloggers, professionals, and business owners to create compelling content with ease.
                Say goodbye to writer's block and hello to efficient content creation. Start transforming your voice today!
            </p>
            <div className="flex flex-col items-center md:flex-row md:justify-center">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center w-full max-w-xs p-6 m-4 border border-gray-600 rounded-lg transition-transform duration-300 hover:scale-105 text-gray-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="mb-3">{benefit.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-300 text-center">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link to="/main" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-yellow-500 hover:to-pink-500 transition-transform transform hover:scale-105">
                    Start Your Free Blog Now!!
                </Link>
            </div>
        </div>
    );
};

export default React.memo(HowVoiceBlogifyHelps);
