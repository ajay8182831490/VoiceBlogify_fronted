import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import ImageUploader from 'quill-image-uploader';
import { motion } from 'framer-motion';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

// Register image uploader module with Quill
Quill.register('modules/imageUploader', ImageUploader);

export default function RichEditorText() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { title, subtitle, content, tags };
        console.log(blogData);
        // Add logic to send blogData to your backend or API
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            ['link', 'image', 'code-block'],
            ['clean'], // remove formatting button
        ],
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('image', file);

                    fetch('https://api.imgur.com/3/image', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Client-ID your-client-id',
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            resolve(result.data.link); // Return the image link
                        })
                        .catch((error) => {
                            reject('Upload failed');
                            console.error('Error uploading image:', error);
                        });
                });
            },
        },
    };

    const formats = [
        'header',
        'font',
        'list',
        'bullet',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'link',
        'image',
        'align',
    ];

    return (
        <div className="p-4 md:p-8 max-w-screen-lg mx-auto bg-gray-50 shadow-md rounded-lg">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">Create a Blog Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter the title"
                        required
                    />
                </div>

                {/* Subtitle */}
                <div>
                    <label htmlFor="subtitle" className="block text-lg font-medium text-gray-700">Subtitle (Optional)</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter a subtitle (optional)"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags (Comma separated)</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter tags, e.g. technology, AI, blogging"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
                    <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                        className="mt-2 h-64 bg-white"
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog content here..."
                    />
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full p-3 mt-6 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Publish Post
                </motion.button>
            </form>
        </div>
    );
}
