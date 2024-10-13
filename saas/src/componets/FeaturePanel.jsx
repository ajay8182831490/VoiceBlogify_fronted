import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturePanel() {
    return (
        <motion.div
            className="relative hidden h-screen select-none flex-col justify-center  text-center md:flex md:w-1/2"
            style={{ backgroundColor: "#020012" }}

            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
        >
            <motion.div
                className="mx-auto py-8 px-8 text-purple-800 xl:w-[40rem]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >


                <motion.p
                    className="my-6 text-4xl font-semibold leading-10 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Convert Audio/Video into Blogs with{' '}
                    <motion.span
                        className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-500 py-3 px-6 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Drag & Drop
                    </motion.span>
                </motion.p>

                <motion.p
                    className="mb-4 text-2xl text-white" // Reduced text content and increased font size
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Easily transform audio and video recordings into professional blog posts—perfect for podcasters and content creators!
                    <br />
                    Join the future of content creation with VoiceBlogify, where your voice can transform ideas into impactful stories!
                </motion.p>

            </motion.div>
        </motion.div>
    );
}
