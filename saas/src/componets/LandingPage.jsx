import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col justify-center items-center">
            {/* Hero Section */}
            <motion.section
                className="text-center px-6"
                style={{ paddingBottom: '2rem', paddingTop: '2rem' }}  // Custom padding
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h2
                    className="text-5xl font-bold text-gray-800 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Welcome to VoiceBlogify
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Transform your audio recordings into engaging blog posts effortlessly. Whether it's personal, tech, or product-related, create professional content anytime, anywhere.
                </motion.p>
                {/* Centered Get Started Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Link to="/main" className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-medium py-3 px-10 rounded-full shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-transform transform hover:scale-105">
                        Get Started
                    </Link>
                </motion.div>
            </motion.section>


            {/* Features Section */}
            <motion.section
                className="container mx-auto px-6 py-16"
                style={{ paddingBottom: '2rem', paddingTop: '2rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">Why Choose VoiceBlogify?</h3>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                        VoiceBlogify allows you to record your voice from anywhere and convert it into professional content. It can be your personal diary, tech blog, or even marketing content for your product – all within minutes.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    <motion.div
                        className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.h3
                            className="text-xl font-semibold text-purple-600 mb-4"
                            whileHover={{ color: '#5B21B6', rotate: -2, scale: 1.1, transition: { duration: 0.3 } }}
                        >
                            Generate HTML & Markdown
                        </motion.h3>
                        <motion.p
                            className="text-gray-600"
                            whileHover={{ color: '#4F46E5', rotate: 1, scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            With a single click, generate HTML and Markdown code from your blog. Copy it with the "Copy" button and paste anywhere you like.
                        </motion.p>
                    </motion.div>
                    <motion.div
                        className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.h3
                            className="text-xl font-semibold text-purple-600 mb-4"
                            whileHover={{ color: '#5B21B6', rotate: -2, scale: 1.1, transition: { duration: 0.3 } }}
                        >
                            Share Across Platforms
                        </motion.h3>
                        <motion.p
                            className="text-gray-600"
                            whileHover={{ color: '#4F46E5', rotate: 1, scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            Seamlessly share your content on platforms like LinkedIn and Reddit directly from VoiceBlogify. Expand your reach with a few clicks.
                        </motion.p>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-20 transform scale-110"
                            whileHover={{ opacity: 0.5, scale: 1.2 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>
                    {/* New Section: Organize Your Thoughts */}
                    <motion.div
                        className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.h3
                            className="text-xl font-semibold text-purple-600 mb-4"
                            whileHover={{ color: '#5B21B6', rotate: -2, scale: 1.1, transition: { duration: 0.3 } }}
                        >
                            Organize Your Thoughts
                        </motion.h3>
                        <motion.p
                            className="text-gray-600"
                            whileHover={{ color: '#4F46E5', rotate: 1, scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            Convert scattered ideas into structured blog posts. Record your thoughts and let VoiceBlogify help you organize them into polished content.
                        </motion.p>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 opacity-20 transform scale-110"
                            whileHover={{ opacity: 0.5, scale: 1.2 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Record Anytime, Anywhere Section */}
            <motion.section
                className="bg-blue-50 py-16 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Anytime, Anywhere</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                        With VoiceBlogify, you can create your content whenever inspiration strikes. Whether it's from your smartphone on the go, or in front of your desktop at home, we've got you covered. Start recording your voice, and we'll handle the rest.
                    </p>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                        It's perfect for personal blogs, tech updates, or marketing content – tailor your message and let us transform it into a captivating blog post with ease.
                    </p>
                    <Link to="/main" className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105">
                        Start Recording Now
                    </Link>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="bg-indigo-600 text-white py-16 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to turn your voice into content?</h2>
                    <p className="text-lg mb-10 max-w-2xl mx-auto">
                        With VoiceBlogify, content creation has never been easier. Start for free and see how your audio can transform into captivating blog posts.
                    </p>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link to="/main" className="bg-white text-indigo-600 font-medium py-3 px-8 rounded-full shadow-lg hover:bg-indigo-100 transition-transform transform hover:scale-105">
                            Start Free Trial
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
