import { useContext, createContext, useMemo, useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { Notify, NotifyFalse } from "@/componets/NotifyToast";

const BloggerContext = createContext();
const url = import.meta.env.VITE_API_URL

export const BloggerContextProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setResponseMessage] = useState('');
    const [blogUserId, setUserBlogID] = useState([]);

    useEffect(() => {
        getBlogId();
    }, []);

    const DeletebloggerPost = async (blogId, postId) => {
        try {
            const response = await fetch(`${url}/blogger/posts/${blogId}/${postId}`, {
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

    const uploadPost = async ({ title, content, blogId }) => {
        try {
            const sanitizedTitle = DOMPurify.sanitize(title);
            const sanitizedContent = DOMPurify.sanitize(content);


            const response = await fetch(`${url}/blogger/createPost`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId, postContent: sanitizedContent, title: sanitizedTitle }),
            });

            const data = await response.json();

            if (response.ok) {
                Notify('Post shared successfully on blogger')
                setResponseMessage(data.message);
            } else {
                NotifyFalse("Error occurred during uploading post")
                setResponseMessage(data.message || 'Error occurred during uploading post');
            }
        } catch (error) {
            setResponseMessage('Error occurred during uploading post');
        }
    };

    const getPostById = async (blogId) => {
        try {
            const response = await fetch(`${url}/blogger/posts/${blogId}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setTitle(data.title);
                setContent(data.content);
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message || 'Error occurred during fetching the post');
            }
        } catch (error) {
            setResponseMessage('Error occurred during fetching the post');
        }
    };

    const getBlogId = async () => {
        try {
            const response = await fetch(`${url}/blogger/getBlogId`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                setUserBlogID(data);

            } else if (response.status == 403) {
                NotifyFalse(data.message);
                setResponseMessage(data.message || 'Error occurred during fetching the user blog ID');
            }
            else {
                NotifyFalse('Error occurred during fetching the user blog ID');
            }
        } catch (error) {
            setResponseMessage('Error occurred during fetching the user blog ID');
        }
    };

    const bloggerPost = useMemo(() => ({
        title,
        content,
        message,
        blogUserId,
        DeletebloggerPost,
        uploadPost,
        getPostById,
        getBlogId
    }), [title, content, message, blogUserId, DeletebloggerPost, uploadPost, getPostById, getBlogId]);


    return (
        <BloggerContext.Provider value={{ bloggerPost }}>
            {children}
        </BloggerContext.Provider>
    );
};

export const useblogger = () => {
    return useContext(BloggerContext);
};

export default BloggerContext;
