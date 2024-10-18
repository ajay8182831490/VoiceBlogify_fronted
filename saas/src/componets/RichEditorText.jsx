import React, { useState, useEffect, useRef } from 'react';
import { FaMarkdown, FaSave, FaFileExport } from 'react-icons/fa';
import TurndownService from 'turndown';
import RTE from './util/Rte';
import { usePost } from '@/userContext/PostContext';
import { useNavigate } from 'react-router-dom';

const RichEditorText = ({ initialData, handleCloseModal }) => {
    const { updatePost, responseMessage, success, createPost } = usePost();

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();



    useEffect(() => {
        if (success) {
            handleCloseModal();
            navigate('/dashboard/user-profile');
        }
    }, [success, navigate, handleCloseModal]);


    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setTags(initialData.tags ? initialData.tags.join(', ') : ''); // Join array into a string
            setSubtitle(initialData.subtitle || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        try {
            const newContent = editorRef.current.getContent();


            const tagArray = tags.split(',').map(tag => tag.trim());




            await updatePost({ postId: initialData.id, title: title, subtitle: subtitle, tag: tagArray, content: newContent });
            //await createPost({ title: title, subtitle: subtitle, tag: tagArray, content: newContent });







        } catch (error) {
            console.error('Error saving post:', error);
            alert(responseMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyAsMarkdown = () => {
        try {
            const markdownContent = new TurndownService().turndown(editorRef.current.getContent());
            navigator.clipboard.writeText(markdownContent)
                .then(() => alert('Markdown content copied to clipboard!'))
                .catch((err) => console.error('Failed to copy:', err));
        } catch (error) {
            console.error('Failed to convert content:', error);
        }
    };

    const exportHTML = () => {
        const blob = new Blob([editorRef.current.getContent()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blog-post.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black pt-16 md:pt-24 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-5xl h-auto max-h-[80vh] overflow-y-auto">
                <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✖</button>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Edit Post</h1>

                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                    <div className="relative">
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            placeholder="Enter the title"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-1">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            placeholder="Enter tags, e.g. technology, AI, blogging"
                        />
                    </div>

                    <div className="flex-grow relative mb-4 overflow-auto">
                        <RTE
                            ref={editorRef}
                            placeholder="Write your content here..."
                            initialContent={initialData.content || '<p>Type here</p>'}
                        />
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-center mb-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center justify-center w-12 h-12 ${isSubmitting ? 'bg-gray-300' : 'bg-gradient-to-r from-green-400 to-blue-500'} text-white font-semibold rounded-lg shadow-md transition-colors duration-300`}
                        >
                            <FaSave className="text-2xl" />
                        </button>

                        <button
                            type="button"
                            onClick={copyAsMarkdown}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                        >
                            <FaMarkdown className="text-2xl" />
                        </button>

                        <button
                            type="button"
                            onClick={exportHTML}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                        >
                            <FaFileExport className="text-2xl" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );




};

export default RichEditorText;
