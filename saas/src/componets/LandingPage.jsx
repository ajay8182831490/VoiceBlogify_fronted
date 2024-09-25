import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaYoutube, FaFileAudio, FaMedium, FaBlogger, FaLinkedin, FaEdit, FaCode } from 'react-icons/fa';
//const url = "https://voiceblogify-backend.onrender.com"
import MainComponent from './mainComponetsWork';

export default function LandingPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col items-center">

                <motion.section
                    className="relative w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-24 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <motion.h2
                            className="text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Welcome to <span className="text-yellow-300">VoiceBlogify</span>
                        </motion.h2>
                        <motion.p
                            className="text-lg mb-8 max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            VoiceBlogify transforms your audio recordings into captivating blog posts effortlessly. Whether you want to share personal insights, tech tutorials, or professional updates, our platform makes content creation simple and efficient.
                        </motion.p>
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <Link to="/main" className="bg-gradient-to-r from-yellow-400 to-red-500 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-red-400 hover:to-yellow-500 transition-transform transform hover:scale-105">
                                Get Started
                            </Link>
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-full h-full absolute bottom-0 left-0" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                            <path fill-opacity="0.3" d="M0,256L1440,320L1440,0L0,0Z"></path>
                        </svg>
                    </div>
                </motion.section>


                <motion.section
                    className="container mx-auto px-6 py-16"
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
                            <FaMicrophone className="text-5xl text-purple-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Record</h4>
                            <p className="text-gray-600">
                                Capture your thoughts instantly with our recording feature. Speak and let VoiceBlogify transcribe it into a draft.
                            </p>
                        </motion.div>
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaYoutube className="text-5xl text-purple-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Paste YouTube URL</h4>
                            <p className="text-gray-600">
                                Convert YouTube videos into written content by pasting their URLs. Extract and transcribe audio directly.
                            </p>
                        </motion.div>
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaFileAudio className="text-5xl text-purple-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Upload Audio File</h4>
                            <p className="text-gray-600">
                                Upload pre-recorded audio files to generate blog posts. Ideal for batch processing or importing existing content.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                <motion.section
                    className="bg-gradient-to-r from-green-50 to-teal-50 py-16 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">Why Choose VoiceBlogify?</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            At VoiceBlogify, we transform your unorganized thoughts into professional, polished posts. Our AI-driven platform ensures that the content generated is indistinguishable from human-written posts, preserving the natural flow and authenticity of your voice.
                        </p>
                        <ul className="text-left mx-auto max-w-xl">
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-600">Convert your audio into polished, professional blog posts effortlessly.</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-600">Achieve a human-like quality in content, maintaining natural flow and coherence.</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-600">Streamline your content creation process with multiple input options.</span>
                            </li>
                        </ul>
                    </div>
                </motion.section>


                <motion.section
                    className="container mx-auto px-6 py-16"
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
                            <FaEdit className="text-5xl text-blue-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Edit with Ease</h4>
                            <p className="text-gray-600">
                                Our rich text editor allows you to make modifications to your articles seamlessly. Whether on desktop or mobile, adjust your content as needed.
                            </p>
                        </motion.div>
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaCode className="text-5xl text-blue-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Export Anywhere</h4>
                            <p className="text-gray-600">
                                Export your articles in Rich Text, plain HTML, or Markdown format. Perfect for publishing directly on any platform or website.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                <motion.section
                    className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">Seamless Integrations</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Connect with your favorite platforms to share your content effortlessly. Whether it's Medium, LinkedIn, or Blogger, our integrations ensure you reach your audience effectively.
                        </p>
                        <div className="grid md:grid-cols-3 gap-10">
                            <motion.div
                                className="p-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaMedium className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Medium</h4>
                                <p className="text-white">
                                    Publish your posts directly to Medium and reach a broader audience interested in high-quality content.
                                </p>
                            </motion.div>
                            <motion.div
                                className="p-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaLinkedin className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">LinkedIn</h4>
                                <p className="text-white">
                                    Share professional updates and articles with your LinkedIn network to enhance your professional presence.
                                </p>
                            </motion.div>
                            <motion.div
                                className="p-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaBlogger className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Blogger</h4>
                                <p className="text-white">
                                    Integrate with Blogger to post your content directly on your blog and reach your audience effectively.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>


                <motion.section
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.5 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Content?</h3>
                        <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                            Don’t miss out on the opportunity to streamline your content creation process and achieve professional-quality results with VoiceBlogify.
                        </p>
                        <Link to="/main" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:from-yellow-500 hover:to-pink-500 transition-transform transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </motion.section>
            </div>

            <div className="" id="howitworks">
                <MainComponent />
            </div>




        </>
    );
}
