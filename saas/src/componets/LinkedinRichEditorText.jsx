import React, { useState, useRef } from 'react';
import RTE from './util/Rte';
import { FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { IoClose } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import { usePost } from '@/userContext/PostContext';
import { useLinkedin } from '@/userContext/LinkedinContext';
import { LinkedinContextProvider } from '@/userContext/LinkedinContext';

import { htmlToText } from 'html-to-text';

const options = {
    wordwrap: 130,
    format: {
        strong: {
            format: (text) => `**${text}**` // Markdown-style bold
        },

        ul: {
            format: (items) => items.map((item) => `- ${item}`).join('\n') // Markdown-style list
        },

        blockquote: {
            format: (text) => `> ${text}`
        },

        table: {
            format: (text) => {
                return text.split('\n')
                    .map((line) => `| ${line.replace(/<\/?[^>]+(>|$)/g, '')} |`)
                    .join('\n');
            }
        },

        code: {
            format: (text) => `\`${text}\``
        },

        pre: {
            format: (text) => {
                const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
                return formatText(cleanedText);
            }
        }
    }
};
const cleanHtmlContent = (html) => {

    let text = htmlToText(html, {
        wordwrap: 130,

        formatters: {

            p: (content) => content.replace(/\n{2,}/g, '\n').trim(),


            code: (content) => `\n\`${content}\`\n`,


            ul: (items) => items.map(item => `- ${item.trim()}`).join('\n'),
        },
    });

    text = text.replace(/[\n]{2,}/g, '\n');


    text = text.replace(/^\s*[\r\n]/gm, '');

    return text.trim();
};



export function LinkedinRET() {




    const { posts } = usePost();
    const { uploadLinkedinPOST } = useLinkedin();




    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const [files, setFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showMediaConflict, setShowMediaConflict] = useState(false);
    const [mediaToRemove, setMediaToRemove] = useState(null);
    const editorRef = useRef(null);

    const [images, setImages] = useState([]);





    const handleOpenModal = (post) => {
        const contentWithTitle = `${post.title}<br />${post.content}`;
        setSelectedPost({ ...post, content: contentWithTitle });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
        setFiles([]);
        setVideoFile(null);
    };




    const handleContentChange = (value) => {
        setSelectedPost((prev) => ({ ...prev, content: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contentToSubmit = editorRef.current.getContent();


        const plainContent = cleanHtmlContent(contentToSubmit)




        const formData = new FormData();



        if (files.length > 0) {
            files.forEach((file) => {
                formData.append('images', file);
            });

        } else if (videoFile) {
            formData.append('video', videoFile);
        }



        try {


            await uploadLinkedinPOST(plainContent, formData);


        } catch (error) {
            console.error("Error uploading post:", error);

        }

        handleCloseModal();
    };


    const handleDrop = (acceptedFiles) => {
        const images = acceptedFiles.filter((file) => file.type.startsWith('image/'));
        const video = acceptedFiles.find((file) => file.type.startsWith('video/'));

        if (video) {
            if (files.length > 0) {
                setShowMediaConflict(true);
                setMediaToRemove('image'); // Indicate that existing files are images
            } else {
                setFiles([]); // Clear any existing files
                setVideoFile(video); // Add the video
            }
        } else if (images.length > 0) {
            if (videoFile) {
                setShowMediaConflict(true);
                setMediaToRemove('video'); // Indicate that existing file is video
            } else {
                setFiles((prevFiles) => [...prevFiles, ...images]); // Add images
            }
        }
    };

    const confirmMediaConflict = () => {
        confirmRemoveMedia();
        setShowMediaConflict(false);
    };

    const confirmRemoveMedia = () => {
        if (mediaToRemove === 'video') {
            setVideoFile(null);
            setFiles((prevFiles) => [...prevFiles, ...images]);
        } else if (mediaToRemove === 'image') {
            setFiles([]);
            setVideoFile(videoFile);
        }
        setMediaToRemove(null);
    };

    const cancelRemoveMedia = () => {
        setShowMediaConflict(false);
        setMediaToRemove(null);
    };


    const confirmRemoveVideo = () => {
        setShowConfirmation(false);
        setVideoFile(null);
    };

    const cancelRemoveVideo = () => {
        setShowConfirmation(false);
    };



    const handleDeleteImage = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleDeleteVideo = () => {
        setVideoFile(null);
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
            <h2 className="text-2xl font-bold text-gray-800 text-center">Launch Post on LinkedIn</h2>

            <div className="space-y-4">
                {displayedPosts.map((post) => (
                    <div key={post.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <div className="flex space-x-4">

                            <button
                                onClick={() => handleOpenModal(post)}
                                className="text-blue-500 hover:text-blue-600 transition"
                                title="Edit & Share Post"
                            >
                                <FaEdit /> Edit & Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    className={`flex items-center ${currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                    disabled={currentPage === 0}
                >
                    <FaChevronLeft /> Previous
                </button>
                <span className="text-gray-600">Page {currentPage + 1} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    className={`flex items-center ${currentPage === totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                    disabled={currentPage === totalPages - 1}
                >
                    Next <FaChevronRight />
                </button>
            </div>


            {modalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl text-center font-semibold mb-4">Edit & Share Post</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                                <input {...getInputProps()} />
                                <p className="text-gray-500">Drag & drop images or video here, or click to select files</p>
                            </div>
                            {files.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">Images:</h3>
                                    <ul>
                                        {files.map((file, index) => (
                                            <li key={index} className="flex justify-between items-center text-gray-600">
                                                {file.name}
                                                <button
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="text-red-500 hover:text-red-600"
                                                    title="Remove Image"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {videoFile && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">Video:</h3>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <p>{videoFile.name}</p>
                                        <button
                                            onClick={handleDeleteVideo}
                                            className="text-red-500 hover:text-red-600"
                                            title="Remove Video"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
                                <RTE ref={editorRef} initialContent={selectedPost.content} onChange={handleContentChange} />
                            </div>


                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                    Share on Linkedin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}





            {showMediaConflict && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold">
                            You can only upload one video and multiple images. Please remove the video to upload images.
                        </h3>
                        <div className="flex justify-end mt-4">
                            <button onClick={confirmMediaConflict} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                Remove Media
                            </button>
                            <button onClick={cancelRemoveMedia} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


const LinkedinPostProvider = () => {
    return (
        <LinkedinContextProvider>
            <LinkedinRET />
        </LinkedinContextProvider>)
}
export default LinkedinPostProvider;