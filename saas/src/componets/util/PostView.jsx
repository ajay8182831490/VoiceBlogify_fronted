import React from 'react';
import { usePost } from '@/userContext/PostContext';
import { motion } from 'framer-motion';

const PostView = ({ onClose }) => {
    const { title, subtitle, tag, content } = usePost();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    ✖
                </button>
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <h3 className="text-xl font-medium text-gray-600 mb-2">{subtitle}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tag.map((tagItem, index) => (
                        <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                            #{tagItem}
                        </span>
                    ))}
                </div>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </motion.div>
        </div>
    );
};

export default PostView;
