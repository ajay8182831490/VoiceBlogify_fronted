import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturePanel() {
    return (
        <motion.div
            className="relative hidden h-screen select-none flex-col justify-center bg-blue-600 text-center md:flex md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
        >
            <motion.div
                className="mx-auto py-16 px-8 text-white xl:w-[40rem]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <motion.span
                    className="rounded-full bg-white px-3 py-1 font-medium text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Exciting New Feature
                </motion.span>
                <motion.p
                    className="my-6 text-3xl font-semibold leading-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Convert Audio into Blogs with{' '}
                    <motion.span
                        className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-500 py-3 px-6 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Drag & Drop
                    </motion.span>
                </motion.p>
                <motion.p
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    With our AI-powered tool, you can record audio, and our system will automatically convert it into professional blog posts. Tailored for platforms like LinkedIn, Medium, and Reddit, you can share your content seamlessly.
                </motion.p>
                <motion.a
                    href="#"
                    className="font-semibold tracking-wide text-white underline underline-offset-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Learn More
                </motion.a>
            </motion.div>

            {/* Optionally, add a related image */}
            {/* <motion.img
                className="mx-auto w-11/12 max-w-lg rounded-lg object-cover"
                src="/images/SoOmmtD2P6rjV76JvJTc6.png"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            /> */}
        </motion.div>
    );
}
