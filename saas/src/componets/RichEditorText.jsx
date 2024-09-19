import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import { motion } from 'framer-motion';
import { FaHtml5, FaMarkdown, FaCopy, FaSave } from 'react-icons/fa'; // Import icons from react-icons
import TurndownService from 'turndown'; // Markdown conversion library

export default function RichEditorText() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [activeButton, setActiveButton] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { title, subtitle, content, tags };
        console.log(blogData);
        // Add logic to send blogData to your backend or API
    };

    const convertToMarkdown = (html) => {
        const turndownService = new TurndownService();
        return turndownService.turndown(html);
    };

    const copyToClipboard = (content, type) => {
        navigator.clipboard.writeText(content)
            .then(() => {
                alert(`${type} content copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const copyAsHTML = () => {
        setActiveButton('html');
        const htmlContent = `
            <div>
                <h1>${title}</h1>
                ${subtitle ? `<h2>${subtitle}</h2>` : ''}
                <div>${content}</div>
                ${tags ? `<p><strong>Tags:</strong> ${tags}</p>` : ''}
            </div>
        `;
        copyToClipboard(htmlContent, 'HTML');
    };

    const copyAsMarkdown = () => {
        setActiveButton('markdown');
        const markdownContent = convertToMarkdown(`
            <div>
                <h1>${title}</h1>
                ${subtitle ? `<h2>${subtitle}</h2>` : ''}
                <div>${content}</div>
                ${tags ? `<p><strong>Tags:</strong> ${tags}</p>` : ''}
            </div>
        `);
        copyToClipboard(markdownContent, 'Markdown');
    };

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                Your Blog Content is Ready! <br />
                Edit and Save Your Post
            </h1>

            <p className="text-lg text-gray-700 mb-6 text-center">
                This page allows you to edit and save the content generated from your audio upload. Customize your blog, add tags, and get ready to share it anywhere you like.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                {/* Title */}
                <div className="relative">
                    <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
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

                {/* Subtitle */}
                <div className="relative">
                    <label htmlFor="subtitle" className="block text-lg font-semibold text-gray-700 mb-2">Subtitle (Optional)</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Enter a subtitle (optional)"
                    />
                </div>

                {/* Tags */}
                <div className="relative">
                    <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-2">Tags (Comma separated)</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Enter tags, e.g. technology, AI, blogging"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
                    <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                        className="mt-2 h-72 bg-white border border-gray-300 rounded-md"
                        theme="snow"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                [{ font: ['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'] }],
                                [{ size: ['small', 'medium', 'large', 'huge'] }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ color: [] }, { background: [] }],
                                [{ script: 'sub' }, { script: 'super' }],
                                [{ align: [] }],
                                ['link', 'image'],
                                ['clean'] // remove formatting button
                            ],
                        }}
                        formats={[
                            'header',
                            'font',
                            'size',
                            'list',
                            'bullet',
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'color',
                            'background',
                            'script',
                            'align',
                            'link',
                            'image'
                        ]}
                        placeholder="Write your blog content here..."
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 items-center justify-center mt-6">
                    <motion.button
                        type="submit"
                        className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaSave className={`text-2xl ${activeButton === 'save' ? 'text-yellow-400' : 'text-white'}`} />
                        <span className="ml-2 hidden md:inline">Save</span>
                    </motion.button>
                    <button
                        type="button"
                        onClick={copyAsHTML}
                        className={`p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-orange-600 transition-colors duration-300 flex items-center justify-center ${activeButton === 'html' ? 'bg-gradient-to-r from-red-500 to-orange-600' : ''}`}
                    >
                        <FaHtml5 className={`text-2xl ${activeButton === 'html' ? 'text-yellow-300' : 'text-white'}`} />
                        <span className="ml-2 hidden md:inline">Copy as HTML</span>
                    </button>
                    <button
                        type="button"
                        onClick={copyAsMarkdown}
                        className={`p-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-600 transition-colors duration-300 flex items-center justify-center ${activeButton === 'markdown' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''}`}
                    >
                        <FaMarkdown className={`text-2xl ${activeButton === 'markdown' ? 'text-yellow-300' : 'text-white'}`} />
                        <span className="ml-2 hidden md:inline">Copy as Markdown</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
