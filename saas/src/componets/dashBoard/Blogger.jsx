import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoClose, IoSearch } from 'react-icons/io5';

import { BloggerContextProvider } from '@/userContext/BloggerContext';
import { usePost } from '@/userContext/PostContext';
import { useblogger } from '@/userContext/BloggerContext';
import RTE from '../util/Rte';

export function Blogger() {
    const { posts, updatePost } = usePost();
    const { blogUserId, uploadPost } = useblogger().bloggerPost;


    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const editorRef = useRef(null);

    const filteredPosts = searchTerm
        ? posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : currentPosts;

    const handleOpenModal = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
        setSelectedOption('');
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
        setSelectedOption('');
    };

    const handleContentChange = (content) => {
        if (selectedPost) {
            setSelectedPost((prev) => ({ ...prev, content }));
        }
    };

    const handleShareSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOption) {
            alert('Please select a blog to share.');
            return;
        }
        const content = editorRef.current.getContent();


        await uploadPost({ title: selectedPost.title, content: content, blogId: selectedOption });
        handleCloseModal();
    };

    const handleSavePost = async (e) => {
        e.preventDefault();

        const content = editorRef.current.getContent();

        if (selectedPost) {
            await updatePost({ postId: selectedPost.id, title: selectedPost.title, content: content });
            handleCloseModal();
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto min-h-60vh" style={{ backgroundColor: "black" }}>
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
                Launch Post on Blogger
            </h1>

            <div className="flex mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full p-4 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
                <button className="p-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300">
                    <IoSearch size={20} />
                </button>
            </div>

            <div className="space-y-4">
                {filteredPosts.length ? filteredPosts.map(post => (
                    <div key={post.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <button
                            onClick={() => handleOpenModal(post)}
                            className="text-yellow-600 hover:text-yellow-800 flex items-center transition duration-300"
                        >
                            <FaEdit size={18} className="mr-1" /> Edit & Share
                        </button>
                    </div>
                )) : (
                    <p className="text-gray-500">No posts found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded-lg text-white ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'} transition duration-300`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal Logic for Share */}
            {modalOpen && selectedPost && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-50"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative transform transition-all duration-300 mt-10">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-300"
                        >
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit and Share Post</h2>

                        <label className="block text-lg font-semibold text-gray-700 mb-2">Post Title</label>
                        <input
                            type="text"
                            value={selectedPost.title}
                            onChange={(e) => setSelectedPost((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4 transition duration-300"
                            placeholder="Enter Post Title"
                        />

                        <label className="block text-lg font-semibold text-gray-700 mb-2 text-center">Post Content</label>

                        <RTE ref={editorRef} initialContent={selectedPost.content} onChange={handleContentChange} />

                        <form onSubmit={handleShareSubmit} className="space-y-4 mt-1">
                            <label
                                htmlFor="share-options"
                                className="block text-lg font-semibold text-gray-700 mb-1 text-center"
                            >
                                Select Blog for Sharing
                            </label>
                            <select
                                id="share-options"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)} // Store selected blog ID directly
                                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            >
                                <option value="" disabled>
                                    Select a Blog to Share or Create a New Blog on Blogger
                                </option>
                                {Array.isArray(blogUserId) &&
                                    blogUserId.map((blog) => (
                                        <option key={blog.blogId} value={blog.blogId}>
                                            {blog.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleSavePost}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                                >
                                    Save
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Publish On Blogger
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
}

const BloggerPostProvider = () => {
    return (
        <BloggerContextProvider>
            <Blogger />
        </BloggerContextProvider>
    );
}

export default BloggerPostProvider;
