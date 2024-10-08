import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { usePost } from '@/userContext/PostContext';
import { MediumContextProvider } from '@/userContext/MediumContext';
import { useMedium } from '@/userContext/MediumContext';
import RTE from '../util/Rte';
import { useProfile } from '@/userContext/UserContext';


export function Medium() {
    const { posts, mediumUrl, hasMediumAccess, updatePost } = usePost();
    const { uploadPost } = useMedium().mediumPost;
    const editorRef = useRef(null);







    const [integrationToken, setIntegrationToken] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;


    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleOpenModal = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    const handleContentChange = (value) => {
        setSelectedPost((prev) => ({ ...prev, content: value }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTokenSubmit = (e) => {
        e.preventDefault();


        if (integrationToken) {
            mediumUrl({ integrationToken });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editorRef.current.getContent();






        await updatePost({ postId: selectedPost.id, title: selectedPost.title, tag: selectedPost.tags, content: content });
        setModalOpen(false);
    };


    const handleShare = async (e) => {
        const content = editorRef.current.getContent();

        if (!content) {
            alert("Content cannot be empty.");

            return;
        }




        await uploadPost({ title: selectedPost.title, tag: selectedPost.tags, content: content })
    };

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto  min-h-60vh" style={{ backgroundColor: "black" }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center">
                Launch Post on Medium
            </h1>

            {hasMediumAccess ? (
                <div>

                    <div className="mb-6">
                        <label htmlFor="search" className="sr-only">
                            Search by Title
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                className="w-full p-4 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute top-4 right-4 text-gray-500" />
                        </div>
                    </div>


                    <div className="space-y-4">
                        {currentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">

                                    {post.title.length > 30
                                        ? `${post.title.substring(0, 60)}...`
                                        : post.title}
                                </h2>
                                <div className="flex space-x-4">

                                    <button
                                        onClick={() => handleOpenModal(post)}
                                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                                        title="Edit & Share"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg text-white ${currentPage === index + 1
                                    ? 'bg-blue-600'
                                    : 'bg-gray-400 hover:bg-gray-500'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>


                    {modalOpen && selectedPost && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative mt-10">
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                                >
                                    <IoClose size={24} />
                                </button>
                                <h2 className="text-2xl font-semibold mb-4 text-center">Edit & Share Post</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative">
                                        <label
                                            htmlFor="title"
                                            className="block text-lg font-semibold text-gray-700 mb-1"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={selectedPost.title}
                                            onChange={(e) =>
                                                setSelectedPost({ ...selectedPost, title: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                            placeholder="Enter the title"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <label
                                            htmlFor="title"
                                            className="block text-lg font-semibold text-gray-700 mb-1"
                                        >
                                            Tag
                                        </label>
                                        <input
                                            type="text"
                                            id="tag"
                                            value={selectedPost.tags}
                                            onChange={(e) =>
                                                setSelectedPost({ ...selectedPost, tags: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                            placeholder="Enter the tag with comma seprated"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="content"
                                            className="block text-lg font-semibold text-gray-700 mb-2"
                                        >
                                            Content
                                        </label>

                                        <RTE ref={editorRef} initialContent={selectedPost.content} handleCloseModal={handleCloseModal} onChange={handleContentChange} />

                                    </div>
                                    <div className="flex justify-end space-x-4">

                                        <button
                                            type="button"
                                            onClick={() => handleShare(selectedPost)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                        >
                                            Share Post
                                        </button>

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
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Integrate with Medium</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        To access Medium API and publish posts, please provide your Medium integration token key.
                        This allows us to authenticate your account and post on your behalf.
                    </p>
                    <form onSubmit={handleTokenSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="integrationToken" className="block text-lg font-semibold text-gray-700 mb-2">Integration Token</label>
                            <input
                                type="text"
                                id="integrationToken"
                                value={integrationToken}
                                onChange={(e) => setIntegrationToken(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                placeholder="Enter your Medium integration token"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>


    );
}


const MediumPostProvider = () => {

    return (

        <MediumContextProvider>
            <Medium />
        </MediumContextProvider>

    )

}



export default MediumPostProvider;
