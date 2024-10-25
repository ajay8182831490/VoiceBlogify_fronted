import React from 'react';
import { FaClock, FaCommentDots, FaClipboardCheck, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';


const HowVoiceBlogifyHelps = () => {
    const benefits = [
        {
            title: "Save Time",
            description: "Quickly convert your voice ideas into organized text. Focus on your message, not typing.",
            icon: <FaClock className="text-4xl text-blue-500" />,
        },
        {
            title: "Create Anywhere",
            description: "Capture inspiration on the go! Whether commuting or traveling, your ideas flow effortlessly.",
            icon: <FaCommentDots className="text-4xl text-green-500" />,
        },
        {
            title: "Instant Publishing",
            description: "Share posts directly to LinkedIn, Medium, and Blogger with one click. Reach your audience instantly!",
            icon: <FaClipboardCheck className="text-4xl text-yellow-500" />,
        },
        {
            title: "Personalized AI Drafts",
            description: "Our AI captures your unique voice, ensuring your personality shines in every article.",
            icon: <FaRegHandshake className="text-4xl text-purple-500" />,
        },
    ];


    return (
        <div className="py-10" >
            <div className="max-w-4xl mx-auto px-4"> {/* Centering with margins */}
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-100">Why Use VoiceBlogify?</h2>
                <p className="text-md text-center text-slate-300 mb-8">
                    VoiceBlogify revolutionizes content creation. Our voice-to-text technology transforms your ideas into blog posts effortlessly, helping busy professionals and passionate bloggers overcome writer's block and enhance productivity.
                </p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-center ">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center w-full max-w-xs p-6 m-4 border border-gray-600 rounded-lg transition-transform duration-300 hover:scale-105 text-gray-100 bg-slate-900"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="mb-3">{benefit.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-300 text-center">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* <div className="text-center mt-8">
                <Link
                    to="/main"
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Start Blogging for Free!
                </Link>
            </div> */}
        </div>
    );
};

export default React.memo(HowVoiceBlogifyHelps);
