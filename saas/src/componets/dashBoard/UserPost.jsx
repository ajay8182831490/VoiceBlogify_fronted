import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaShare } from 'react-icons/fa';
import RichEditorText from '../RichEditorText'; // Import your RichEditorText component
const url = "https://voiceblogify-backend.onrender.com"

const UserPosts = ({ onDelete, onView, onShare }) => {
    // Dummy data
    const posts = [
        { id: 1, title: "First Post", createdAt: "2024-09-01T10:00:00Z", content: "<p>This is the first post content.</p>" },
        { id: 2, title: "Second Post", createdAt: "2024-09-05T12:00:00Z", content: "<p>This is the second post content.</p>" },
        { id: 3, title: "Third Post", createdAt: "2024-09-10T14:00:00Z", content: "<p>This is the third post content.</p>" },
        { id: 4, title: "Fourth Post", createdAt: "2024-09-15T16:00:00Z", content: "<p>This is the fourth post content.</p>" },
        { id: 5, title: "Fifth Post", createdAt: "2024-09-20T18:00:00Z", content: "<p>This is the fifth post content.</p>" },
    ];

    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (post) => {
        setSelectedPost(post);
        setIsEditing(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setSelectedPost(null);
    };

    return (
        <motion.div
            className="p-6 bg-gradient-to-r from-purple-200 to-blue-400 shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Your Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-700">{post.title}</h3>
                            <p className="text-sm text-gray-500">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onView(post.id)}
                                className="text-green-500 hover:text-green-600 transition"
                                title="View Post"
                            >
                                <FaEye />
                            </button>
                            <button
                                onClick={() => onShare(post.id)}
                                className="text-blue-500 hover:text-blue-600 transition"
                                title="Share Post"
                            >
                                <FaShare />
                            </button>
                            <button
                                onClick={() => handleEdit(post)}
                                className="text-yellow-500 hover:text-yellow-600 transition"
                                title="Edit Post"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDelete(post.id)}
                                className="text-red-500 hover:text-red-600 transition"
                                title="Delete Post"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditing && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl relative overflow-hidden">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
                        <div className="max-h-80 overflow-y-auto">
                            <RichEditorText initialData={selectedPost} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default UserPosts;
