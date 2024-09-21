import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ViewPostModal = ({ post, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
                {/* Close button */}
                <button
                    onClick={onClose} // Call the close function passed as prop
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                    <FaTimes size={24} />
                </button>

                {/* Post Content */}
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                <h3 className="text-gray-500 italic mb-2">{post.tags}</h3>
                <div className="content text-lg leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
    );
};

export default ViewPostModal;
