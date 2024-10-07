import { useContext, createContext, useMemo, useState } from "react";
import DOMPurify from 'dompurify';

const MediumContext = createContext();

const url = "http://localhost:4000"

export const MediumContextProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState([]);
    const [content, setContent] = useState('');
    const [message, setResponseMessage] = useState('');
    const [Url, setUrl] = useState('');



    const DeleteMediumPost = async (postId) => {
        try {
            const response = await fetch(`${url}/medium/post/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message || 'Error occurred during deleting post');
            }
        } catch (error) {
            setResponseMessage('Error occurred during deleting post');
        }
    };

    const uploadPost = async ({ title, tag, content }) => {
        try {
            const sanitizedTitle = DOMPurify.sanitize(title);
            const sanitizedTag = tag.map(t => DOMPurify.sanitize(t));
            const sanitizedContent = DOMPurify.sanitize(content);




            const response = await fetch(`${url}/medium/post`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: sanitizedTitle, tag: sanitizedTag, content: sanitizedContent }),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message || 'Error occurred during uploading post');
            }
        } catch (error) {
            setResponseMessage('Error occurred during uploading post');
        }
    };

    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(`${url}/medium/upload/image`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage('Image uploaded successfully');
                setUrl(data.imageUrl);

            } else {
                setResponseMessage(data.message || 'Error occurred during uploading image');
            }
        } catch (error) {
            setResponseMessage('Error occurred during uploading image');
        }
    };

    const getPostById = async (postId) => {
        try {
            const response = await fetch(`${url}/medium/getPost/${postId}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setTitle(data.title);
                setTag(data.tag);
                setContent(data.content);
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message || 'Error occurred during fetching the post');
            }
        } catch (error) {
            setResponseMessage('Error occurred during fetching the post');
        }
    };


    const mediumPost = useMemo(() => ({
        title, tag, content, message,
        DeleteMediumPost, uploadPost, uploadImage, getPostById,
    }), [message, uploadPost]);

    return (
        <MediumContext.Provider value={{ mediumPost }}>
            {children}
        </MediumContext.Provider>
    );
};

export const useMedium = () => {
    return useContext(MediumContext);
};

export default MediumContext;
