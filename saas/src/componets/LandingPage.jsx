import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaYoutube, FaVideo, FaFileAudio, FaMedium, FaBlogger, FaLinkedin, FaEdit, FaCode } from 'react-icons/fa';
import { MessageSquare } from 'lucide-react';


import MainComponent from './mainComponetsWork';
import FAQComponent from './util/Faq';
import FeedbackForm from './util/Feedback';
import PASSection from './util/PasSction';

export default function LandingPage() {
    return (
        <>
            <div className="min-h-screen  flex flex-col items-center" style={{ backgroundColor: "#020012" }}>


                <motion.section
                    className="relative w-full  text-white pt-18 pb-2 overflow-hidden"
                    style={{ backgroundColor: "#020012" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >

                    <div className="relative z-10 container mx-auto px-6 text-center py-10" style={{ backgroundColor: "#020012" }}>
                        <motion.h1
                            className="text-5xl font-extrabold mb-6 mx-auto max-w-3xl leading-tight"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <span className='text-white'>Speak it. Blog it. Share it.</span>

                        </motion.h1>
                        <motion.h3
                            className="text-3xl font-extrabold mb-6 mx-auto max-w-3xl leading-tight"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <span className='text-slate-300'>Turn Audio & Video into Engaging Blog Posts in Minutes</span>

                        </motion.h3>
                        <motion.div
                            className="flex justify-center pt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <Link
                                to="/main"
                                className="bg-indigo-600 hover:bg-indigo-700 transition-all px-10 py-4 rounded-full text-white text-lg font-semibold inline-flex items-center gap-2"
                            >
                                Try Voiceblogify Now
                                <MessageSquare className="w-5 h-5" />
                            </Link>
                        </motion.div>


                    </div>


                </motion.section>


                <PASSection />

                <MainComponent />



                {/* <motion.section
                    className="container mx-auto px-6 py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-white mb-4">Key Features</h3>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Explore the powerful features that make VoiceBlogify a versatile tool for all your content creation needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <motion.div
                            className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            style={{ backgroundColor: "#1E1E1E" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaMicrophone className="text-5xl text-red-500 mb-4 mx-auto" />

                            <h4 className="text-xl font-semibold text-white mb-2">Record</h4>
                            <p className="text-gray-300">
                                Capture your thoughts effortlessly! Just speak, and transcribe your voice into a text  instantly.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            style={{ backgroundColor: "#1E1E1E" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaFileAudio className="text-5xl text-blue-500 mb-4 mx-auto" />

                            <h4 className="text-xl font-semibold text-white mb-2">Upload Audio File</h4>
                            <p className="text-gray-300">
                                Easily upload pre-recorded audio files to create blog posts. Perfect for batch processing or turning your existing content into written form.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            style={{ backgroundColor: "#1E1E1E" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaVideo className="text-5xl text-red-500 mb-4 mx-auto" />

                            <h4 className="text-xl font-semibold text-white mb-2">Upload Video File</h4>
                            <p className="text-gray-300">
                                Upload any video—podcast, interview, or session. We extract the audio, transcribe it, and turn it into a structured blog post, saving you hours of effort.
                            </p>



                        </motion.div>


                    </div>
                    <motion.div
                        className="flex justify-center pt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <Link
                            to="/main"
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Start Blogging for Free!
                        </Link>

                    </motion.div>
                </motion.section> */}



                {/* <motion.section
                    className=" py-16 px-6"
                    style={{ backgroundColor: "#020012" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">Seamless Integrations</h3>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                            Connect with your favorite platforms to share your content effortlessly. Whether it's Medium, LinkedIn, or Blogger, our integrations ensure you reach your audience effectively.
                        </p>
                        <div className="grid md:grid-cols-3 gap-10">
                            <motion.div
                                className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                                style={{ backgroundColor: "#293338" }}
                            >
                                <FaMedium className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Medium</h4>
                                <p className="text-gray-300">
                                    Share your posts directly on Medium to connect with a wider audience eager for quality content.
                                </p>
                            </motion.div>
                            <motion.div
                                className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                                style={{ backgroundColor: "#293338" }}
                            >
                                <FaLinkedin className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">LinkedIn</h4>
                                <p className="text-gray-300">
                                    Share professional updates and articles with your LinkedIn network to enhance your professional presence.
                                </p>
                            </motion.div>
                            <motion.div
                                className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                                whileHover={{ scale: 1.05 }}
                                style={{ backgroundColor: "#293338" }}
                            >
                                <FaBlogger className="text-5xl text-white mb-4 mx-auto" />
                                <h4 className="text-xl font-semibold text-white mb-2">Blogger</h4>
                                <p className="text-gray-300">
                                    Easily connect with Blogger to publish your content directly on your blog and engage your audience effectively.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section> */}
                <motion.section
                    className="container mx-auto px-6 py-16"


                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Edit and Export with Ease</h3>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Enhance your articles with our rich text editor, available even on your phone. Customize and refine your content to perfection before publishing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div
                            className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center bg-slate-900"

                            whileHover={{ scale: 1.05 }}
                        >
                            <FaEdit className="text-5xl text-blue-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-white mb-2">Edit with Ease</h4>
                            <p className="text-gray-300">
                                Our rich text editor allows you to make modifications to your articles seamlessly. Whether on desktop or mobile, adjust your content as needed.
                            </p>
                        </motion.div>
                        <motion.div
                            className="p-8 bg-slate-900 rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                            whileHover={{ scale: 1.05 }}

                        >
                            <FaCode className="text-5xl text-blue-600 mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold text-white mb-2">Export Anywhere</h4>
                            <p className="text-gray-300">
                                Export your articles in Rich Text, plain HTML, or Markdown format. Perfect for publishing directly on any platform or website.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>



                <motion.section
                    className=" py-16 px-6"
                    style={{ backgroundColor: "#020012" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">Why Choose VoiceBlogify?</h3>
                        <p className="text-md text-gray-300 max-w-2xl mx-auto mb-8">
                            VoiceBlogify effortlessly transforms your recordings into polished blog posts that boost your online visibility. Our smart tools save you time while ensuring the content feels authentic and engaging, just like your own voice.
                        </p>
                        <ul className="text-left mx-auto max-w-xl">
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Effortlessly convert your audio into polished, professional blog posts that rank in search engines.</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Save hours using simple voice commands</span>
                            </li>
                            <li className="mb-4 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Achieve human-like quality in your content, ensuring natural flow and coherence.</span>
                            </li>
                            <li className="mb-8 flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-white">Streamline your content creation process with versatile input options tailored to your needs.</span>
                            </li>
                        </ul>

                    </div>




                </motion.section >



                <FAQComponent />
                <motion.section
                    className=" py-16 px-6 "
                    style={{ backgroundColor: "#020012" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.5 }}
                >
                    <div className="container mx-auto text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Content?</h3>
                        <p className="text-md text-gray-300 max-w-2xl mx-auto mb-8">
                            Don’t miss out on the opportunity to streamline your content creation process and achieve professional-quality results with VoiceBlogify.
                        </p>
                        <Link
                            to="/main"
                            className="bg-indigo-600 hover:bg-indigo-700 transition-all px-10 py-4 rounded-full text-white text-lg font-semibold inline-flex items-center gap-2"
                        >
                            Start Creating for free
                            <MessageSquare className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.section>

                <FeedbackForm />










            </div >






        </>
    );
}
