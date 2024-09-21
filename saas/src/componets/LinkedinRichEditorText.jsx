import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload, FaShareAlt, FaEye, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';

const initialPosts = [
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
];

export default function LinkedinRET() {
    const [posts, setPosts] = useState(initialPosts);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust number of items per page
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const [files, setFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);

    const handleOpenModal = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
        setFiles([]); // Reset files on close
        setVideoFile(null); // Reset video file on close
    };

    const handleOpenPreview = (post) => {
        setSelectedPost(post);
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setSelectedPost(null);
    };

    const handleContentChange = (value) => {
        setSelectedPost((prev) => ({ ...prev, content: value }));
    };

    const handleShare = () => {
        console.log('Sharing:', selectedPost);
        handleCloseModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPosts = posts.map(post => post.id === selectedPost.id ? selectedPost : post);
        setPosts(updatedPosts);
        handleCloseModal();
    };

    const handleDrop = (acceptedFiles) => {
        const images = acceptedFiles.filter(file => file.type.startsWith('image/'));
        const video = acceptedFiles.find(file => file.type.startsWith('video/'));

        if (images.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...images]);
        }

        if (video) {
            if (videoFile) {
                alert("You can only upload one video at a time.");
            } else {
                setVideoFile(video);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedPosts = posts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto bg-gradient-to-r from-purple-300 to-blue-300 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Manage LinkedIn Posts</h2>

            {/* Post List */}
            <div className="space-y-4">
                {displayedPosts.map(post => (
                    <div key={post.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <div className="flex space-x-4">
                            <button onClick={() => handleOpenPreview(post)} className="text-blue-600 hover:text-blue-800">
                                <FaEye /> Preview
                            </button>
                            <button onClick={() => handleOpenModal(post)} className="text-yellow-600 hover:text-yellow-800">
                                <FaEdit /> Edit
                            </button>
                            <button onClick={handleShare} className="text-green-600 hover:text-green-800">
                                <FaShareAlt /> Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button onClick={handlePrevPage} className={`flex items-center ${currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`} disabled={currentPage === 0}>
                    <FaChevronLeft /> Previous
                </button>
                <span className="text-gray-600">Page {currentPage + 1} of {totalPages}</span>
                <button onClick={handleNextPage} className={`flex items-center ${currentPage === totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`} disabled={currentPage === totalPages - 1}>
                    Next <FaChevronRight />
                </button>
            </div>

            {/* Edit Modal */}
            {modalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
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
                            <div>
                                <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
                                <ReactQuill
                                    value={selectedPost.content}
                                    onChange={handleContentChange}
                                    className="mt-2 h-72 bg-white border border-gray-300 rounded-md"
                                    theme="snow"
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, 3, false] }],
                                            [{ font: ['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'] }],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            ['bold', 'italic', 'underline', 'strike'],
                                            ['clean'],
                                        ],
                                    }}
                                />
                            </div>

                            {/* Drag and Drop Upload */}
                            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                                <input {...getInputProps()} />
                                <p>Drag & drop images or video here, or click to select files</p>
                            </div>
                            {files.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">Images:</h3>
                                    <ul className="list-disc pl-5">
                                        {files.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {videoFile && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">Video:</h3>
                                    <p>{videoFile.name}</p>
                                </div>
                            )}
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {previewOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative">
                        <button onClick={handleClosePreview} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">Preview Post</h2>
                        <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
                        <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                        {/* Preview images and video if needed */}
                        {files.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Images:</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {files.map((file, index) => (
                                        <img key={index} src={URL.createObjectURL(file)} alt={file.name} className="w-full h-auto object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}
                        {videoFile && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Video:</h4>
                                <video controls className="w-full h-auto">
                                    <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
