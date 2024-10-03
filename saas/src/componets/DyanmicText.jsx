import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaMicrophone,
    FaYoutube,
    FaFileAudio,
    FaMedium,
    FaBlogger,
    FaLinkedin,
    FaEdit,
    FaCode
} from 'react-icons/fa';
import DynamicTitleText from './DyanmicText';
import MainComponent from './mainComponetsWork';

export default function LandingPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col items-center">

                <motion.section
                    className="relative w-full bg-gradient-to-r from-[#34A85A] to-[#8B0BF1] text-white py-24 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <motion.h2
                            className="text-5xl font-bold mb-6 text-transparent bg-clip-text"
                            style={{
                                backgroundImage: "linear-gradient(to right, #34A85A, #F7DC6F)",
                            }}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Turn Your Voice <span className="text-[#F7DC6F]"> into Engaging Blogs in Minutes</span>
                        </motion.h2>
                        <motion.p
                            className="text-lg mb-8 max-w-4xl mx-auto text-gray-200"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            Transform your audio recordings into captivating blog posts with VoiceBlogify in just a few clicks! Whether you’re sharing personal stories, tech tutorials, or professional updates, our intuitive platform simplifies content creation, allowing you to focus on what truly matters—your voice.
                        </motion.p>
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <Link
                                to="/main"
                                className="bg-gradient-to-r from-[#F7DC6F] to-[#34A85A] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-[#34A85A] hover:to-[#F7DC6F] transition-transform transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-full h-full absolute bottom-0 left-0"
                            viewBox="0 0 1440 320"
                            xmlns="(link unavailable)"
                            fill="#ffffff"
                        >
                            <path fillOpacity="0.3" d="M0,256L1440,320L1440,0L0,0Z"></path>
                        </svg>
                    </div>
                </motion.section>

                <motion.section
                    className="container mx-auto px-6 py-16 bg-[#F7F7F7]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore the powerful features that make VoiceBlogify a versatile tool for all your content creation needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaMicrophone className="text-5xl text-[#34A85A] mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Record</h4>
                            <p className="text-gray-600">Capture your thoughts instantly with our recording feature. Speak and let VoiceBlogify transcribe it into a draft.</p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaYoutube className="text-5xl text-[#34A85A] mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Paste YouTube URL</h4>
                            <p className="text-gray-600">Convert YouTube videos into written content by pasting their URLs. Extract and transcribe audio directly.</p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaFileAudio className="text-5xl text-[#34A85A] mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Upload Audio File</h4>
                            <p className="text-gray-600">Upload pre-recorded audio files to generate blog posts. Ideal for batch processing or importing existing content.</p>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    className="bg-gradient-to-r from-[#8B0BF1] to-[#34A85A] py-16 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-white mb-6">Why Choose VoiceBlogify?</h3>
                        <p className="text-lg text-white max-w-2xl mx-auto mb-8">At VoiceBlogify, we transform your unorganized thoughts into professional, polished posts. Our AI-driven platform ensures that the content generated is indistinguishable from human-written posts, preserving the natural flow and authenticity of your voice.</p>
                        <ul className="text-left mx-auto max-w-xl">
                            <li className="mb-4 flex items-start">
                                <svg
                                    className="w-6 h-6 text-[#34A85A] mr-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="(link unavailable)"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Convert your audio into polished, professional blog posts effortlessly.</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg
                                    className="w-6 h-6 text-[#34A85A] mr-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="(link unavailable)"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Achieve a human-like quality in content, maintaining natural flow and coherence.</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg
                                    className="w-6 h-6 text-[#34A85A] mr-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="(link unavailable)"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Streamline your content creation process with multiple input options.</span>
                            </li>
                        </ul>
                    </div>
                </motion.section>
                <motion.section
                    className="container mx-auto px-6 py-16 bg-[#F7F7F7]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Edit and Export with Ease</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Enhance your articles with our rich text editor, available even on your phone. Customize and refine your content to perfection before publishing.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaEdit className="text-5xl text-[#34A85A] mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Edit with Ease</h4>
                            <p className="text-gray-600">
                                Our rich text editor allows you to make modifications to your articles seamlessly. Whether on desktop or mobile, adjust your content as needed.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaCode className="text-5xl text-[#34A85A] mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Export Anywhere</h4>
                            <p className="text-gray-600">
                                Export your articles in Rich Text, plain HTML, or Markdown format. Perfect for publishing directly on any platform or website.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    className="bg-gradient-to-r from-[#8B0BF1] to-[#34A85A] py-16 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-white mb-6">Seamless Integrations</h3>
                        <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                            Connect with your favorite platforms to share your content effortlessly. Whether it's Medium, LinkedIn, or Blogger, our integrations ensure you reach your audience effectively.
                        </p>
                        <div className="grid md:grid-cols-3 gap-10">
                            <motion.div
                                className="p-8 bg-gradient-to-r from-[#F7DC6F] to-[#34A85A] rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaMedium className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Medium</h4>
                                <p className="text-white">
                                    Publish your posts directly to Medium and reach a broader audience interested in high-quality content.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-8 bg-gradient-to-r from-[#34A85A] to-[#8B0BF1] rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaLinkedin className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">LinkedIn</h4>
                                <p className="text-white">
                                    Share professional updates and articles with your LinkedIn network to enhance your professional presence.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-8 bg-gradient-to-r from-[#8B0BF1] to-[#F7DC6F] rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaBlogger className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Blogger</h4>
                                <p className="text-white">
                                    Seamlessly publish your articles on Blogger, expanding your online presence and reaching a wider audience.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className="container mx-auto px-6 py-16 bg-[#F7F7F7]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.5 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Choose a plan that fits your content creation needs. Enjoy flexibility and affordability with VoiceBlogify.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Basic</h4>
                            <p className="text-gray-600 text-5xl mb-4">$9.99/month</p>
                            <ul className="text-left">
                                <li className="mb-2">1 User</li>
                                <li className="mb-2">100 Transcriptions</li>
                                <li className="mb-2">Basic Editing Tools</li>
                            </ul>
                            <button
                                className="bg-gradient-to-r from-[#F7DC6F] to-[#34A85A] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-[#34A85A] hover:to-[#F7DC6F] transition-transform transform hover:scale-105"
                            >
                                Get Started
                            </button>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Pro</h4>
                            <p className="text-gray-600 text-5xl mb-4">$29.99/month</p>
                            <ul className="text-left">
                                <li className="mb-2">5 Users</li>
                                <li className="mb-2">Unlimited Transcriptions</li>
                                <li className="mb-2">Advanced Editing Tools</li>
                            </ul>
                            <button
                                className="bg-gradient-to-r from-[#F7DC6F] to-[#34A85A] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-[#34A85A] hover:to-[#F7DC6F] transition-transform transform hover:scale-105"
                            >
                                Get Started
                            </button>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Enterprise</h4>
                            <p className="text-gray-600 text-5xl mb-4">Custom Pricing</p>
                            <ul className="text-left">
                                <li className="mb-2">Unlimited Users</li>
                                <li className="mb-2">Unlimited Transcriptions</li>
                                <li className="mb-2">Advanced Editing Tools</li>
                            </ul>
                            <button
                                className="bg-gradient-to-r from-[#F7DC6F] to-[#34A85A] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-[#34A85A] hover:to-[#F7DC6F] transition-transform transform hover:scale-105"
                            >
                                Contact Us
                            </button>
                        </motion.div>
                    </div>
                </motion.section>

            </div>
        </>
    );
}




