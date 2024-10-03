import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { usePost } from '@/userContext/PostContext';
import RichEditorText from '../RichEditorText';

export const UserPosts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const { postDelete, loading, posts } = usePost();




    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const handleEdit = (post) => {
        setSelectedPost(post);
        setIsEditing(true);
    };

    const handleView = (post) => {
        setSelectedPost(post);
        setIsViewing(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setIsViewing(false);
        setSelectedPost(null);
        setIsConfirming(false);
        setPostToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (postToDelete) {
            postDelete(postToDelete.id);
            setPostToDelete(null);
            setIsConfirming(false);
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Your Posts</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {loading ? (
                    <p className="text-center text-white">Loading...</p>
                ) : (
                    currentPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col p-6 bg-white shadow-lg rounded-xl border border-transparent hover:border-blue-300 transition duration-300 transform hover:scale-105"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title.substring(0, 50) + '...'}</h3>
                                <p className="text-sm text-gray-500 mb-4">Posted on: {new Date(post.dateOfCreation).toLocaleDateString()}</p>
                                <p
                                    className="text-gray-700 text-ellipsis overflow-hidden h-16"
                                    dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }}
                                ></p>
                            </div>

                            <div className="flex justify-center items-center mt-4 space-x-4">
                                <button
                                    onClick={() => handleView(post)}
                                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                                    title="View Post"
                                >
                                    <FaEye />
                                </button>
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                                    title="Edit Post"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => {
                                        setPostToDelete(post);
                                        setIsConfirming(true);
                                    }}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                    title="Delete Post"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                    className={`p-3 rounded-full shadow ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={currentPage === 1 || loading} // disable if loading
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    <FaArrowLeft />
                </button>
                <div className="hidden md:block px-4 py-2 bg-gray-100 rounded-md">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    className={`p-3 rounded-full shadow ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={currentPage === totalPages || loading} // disable if loading
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    <FaArrowRight />
                </button>
            </div>

            {/* Viewing Modal */}
            {isViewing && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✖</button>
                        <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} className="text-gray-700"></div>
                    </div>
                </div>
            )}

            {/* Editing Modal */}
            {isEditing && selectedPost && (
                <>

                    <RichEditorText initialData={selectedPost} handleCloseModal={handleCloseModal} />
                </>

            )}

            {/* Delete Confirmation Modal */}
            {isConfirming && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                onClick={() => setIsConfirming(false)}
                                className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
