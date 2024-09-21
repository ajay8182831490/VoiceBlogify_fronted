import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import { FaEye, FaEdit, FaShareAlt, FaMedium } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ViewPostModal from './MediumPreviewStyle'; // Ensure this path is correct

export default function Medium() {
    const [posts] = useState([
        { id: 1, title: 'Post 1', content: 'Content of Post 1', tags: 'React, JavaScript' },
        { id: 2, title: 'Post 2', content: 'Content of Post 2', tags: 'Node.js, Express' },
        { id: 3, title: 'Post 3', content: 'Content of Post 3', tags: 'CSS, HTML' },
        { id: 4, title: 'Post 4', content: 'Content of Post 4', tags: 'React, CSS' },
        { id: 5, title: 'Post 5', content: 'Content of Post 5', tags: 'JavaScript, HTML' },
        { id: 6, title: 'Post 6', content: 'Content of Post 6', tags: 'Node.js, API' },
        { id: 7, title: 'Post 7', content: 'Content of Post 7', tags: 'React, Tailwind' },
        { id: 8, title: 'Post 8', content: 'Content of Post 8', tags: 'JavaScript, AI' },
        { id: 9, title: 'Post 9', content: 'Content of Post 9', tags: 'React, AI' },
        { id: 10, title: 'Post 10', content: 'Content of Post 10', tags: 'CSS, API' },
    ]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(''); // 'Edit', 'Share', 'Preview'
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    // Calculate paginated data
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleOpenModal = (post, action) => {
        setSelectedPost(post);
        setModalAction(action);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedPost); // Logic to handle saving the edited content
        setModalOpen(false);
    };

    const handleContentChange = (value) => {
        setSelectedPost(prev => ({ ...prev, content: value }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleShare = async (post) => {
        // Call your API for posting
        try {
            const response = await fetch('/api/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post), // Send the post data
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Post shared successfully:', data);
            alert('Post shared successfully!'); // Notify the user
        } catch (error) {
            console.error('Error sharing post:', error);
            alert('Error sharing post. Please try again.');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                Medium Posts
            </h1>

            {/* Post List */}
            <div className="space-y-4">
                {currentPosts.map(post => (
                    <div key={post.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleOpenModal(post, 'Preview')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <FaEye /> Preview
                            </button>
                            <button
                                onClick={() => handleOpenModal(post, 'Edit')}
                                className="text-yellow-600 hover:text-yellow-800"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleShare(post)} // Directly call handleShare
                                className="text-green-600 hover:text-green-800"
                            >
                                <FaShareAlt /> Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg text-white ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal Logic for Preview and Edit */}
            {modalOpen && modalAction === 'Preview' && selectedPost && (
                <ViewPostModal
                    post={selectedPost}
                    onClose={handleCloseModal}
                />
            )}

            {modalOpen && modalAction === 'Edit' && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={selectedPost.title}
                                    onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                    placeholder="Enter the title"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-2">Tags (Comma separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    value={selectedPost.tags}
                                    onChange={(e) => setSelectedPost({ ...selectedPost, tags: e.target.value })}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                    placeholder="Enter tags, e.g. technology, AI, blogging"
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
                                <ReactQuill
                                    value={selectedPost.content}
                                    onChange={handleContentChange}
                                    className="mt-2 h-72 bg-white border border-gray-300 rounded-md"
                                    theme="snow"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
