import React from 'react';
import HowVoiceBlogifyHelps from './HowVoiceBlogifyHelpU';
import VisualPath from './HowItWork';
import { motion } from 'framer-motion';
import { FaMicrophone, FaYoutube, FaVideo, FaFileAudio, FaMedium, FaBlogger, FaLinkedin, FaEdit, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainComponent = () => {
    return (
        <>
            <HowVoiceBlogifyHelps />
            <motion.section
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
                        style={{ backgroundColor: "#293338" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaMicrophone className="text-5xl text-red-500 mb-4 mx-auto" />

                        <h4 className="text-xl font-semibold text-white mb-2">Live Recording</h4>
                        <p className="text-gray-300">
                            Capture your thoughts effortlessly! Just speak, and transcribe your voice into a text  instantly.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                        style={{ backgroundColor: "#293338" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaFileAudio className="text-5xl text-blue-500 mb-4 mx-auto" />

                        <h4 className="text-xl font-semibold text-white mb-2">Upload Pre-recorded Audio file</h4>
                        <p className="text-gray-300">
                            Easily upload pre-recorded audio files to create blog posts. Perfect for batch processing or turning your existing content into written form.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                        style={{ backgroundColor: "#293338" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaVideo className="text-5xl text-red-500 mb-4 mx-auto" />

                        <h4 className="text-xl font-semibold text-white mb-2">Upload Pre-recorded Video File</h4>
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
            </motion.section>
            <VisualPath />
        </>

    );
};

export default React.memo(MainComponent);
