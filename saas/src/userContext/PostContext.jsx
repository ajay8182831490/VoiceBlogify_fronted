import { useContext, createContext, useState, useEffect, useMemo } from "react";
import DOMPurify from 'dompurify';

const PostContext = createContext();

const url = "http://localhost:4000"

export const PostProvider = ({ children }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [tag, setTag] = useState([]);
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hasMediumAccess, setMediumAccess] = useState(false);
    const [hasLinkedinAccess, setLinkedinAccess] = useState(false)

    useEffect(() => {
        fetchPosts(currentPage, limit);
    }, [currentPage, limit]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const fetchPosts = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`${url}/user/postAll?page=${currentPage}&limit=${limit}`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setPosts(data.posts);


                setTotalPages(data.totalPages);
                setResponseMessage(data.message || "Posts fetched successfully");
            } else {
                setResponseMessage("Failed to fetch posts");
            }
        } catch (error) {
            setResponseMessage("Error occurred while fetching posts");

        } finally {
            setLoading(false);
        }
    };

    const postDelete = async (postId) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/user/postDelete/${postId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== postId));
                setResponseMessage("Post deleted successfully");
                // setSucess(true);
            } else {
                setResponseMessage("Failed to delete post");

            }
        } catch (error) {

            setResponseMessage("Error occurred while deleting the post");
            console.log("Error occurred while deleting the post:", error);
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async ({ postId, title, subtitle, tag, content }) => {
        setLoading(true);
        try {

            const sanitizedTitle = title ? DOMPurify.sanitize(title) : undefined;
            const sanitizedSubtitle = subtitle ? DOMPurify.sanitize(subtitle) : undefined;
            const sanitizedTag = tag && Array.isArray(tag) ? tag.map(t => DOMPurify.sanitize(t)) : undefined;
            const sanitizedContent = content ? DOMPurify.sanitize(content) : undefined;


            const requestBody = {};
            if (sanitizedTitle) requestBody.title = sanitizedTitle;
            if (sanitizedSubtitle) requestBody.subtitle = sanitizedSubtitle;
            if (sanitizedTag) requestBody.tag = sanitizedTag;
            if (sanitizedContent) requestBody.content = sanitizedContent;






            const response = await fetch(`${url}/user/postUpdate/${postId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                setResponseMessage(data.message || "Post updated successfully");
            } else {
                setResponseMessage("Failed to update post");
            }
        } catch (error) {
            setResponseMessage("Error occurred while updating the post");

        } finally {
            setLoading(false);
        }
    };

    const createPost = async ({ title, subtitle, tag, content }) => {
        setLoading(true);
        try {

            const sanitizedTitle = DOMPurify.sanitize(title);
            const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
            const sanitizedTag = tag.map(t => DOMPurify.sanitize(t));
            const sanitizedContent = DOMPurify.sanitize(content);



            const response = await fetch(`${url}/user/savePost`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: sanitizedTitle,
                    subtitle: sanitizedSubtitle,
                    tag: sanitizedTag,
                    content: sanitizedContent
                }),
            });
            const data = await response.json();
            if (response.ok) {

                setResponseMessage(data.message || "Post created successfully");
            } else {
                setResponseMessage("Failed to create post");
            }
        } catch (error) {
            setResponseMessage("Error occurred while creating the post");
            console.log("Error occurred while creating the post:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPostByID = async (postId) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/user/post/${postId}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setTitle(data.title);
                setSubTitle(data.subtitle);
                setTag(data.tag);
                setContent(data.content);
                setResponseMessage(data.message || "Post fetched successfully");
                //setSucess(true);
            } else {
                setResponseMessage("Failed to fetch post");
            }
        } catch (error) {
            setResponseMessage("Error occurred while fetching the post");
            console.log("Error occurred while fetching the post:", error);
        } finally {
            setLoading(false);
        }
    };
    const mediumUrl = async ({ integrationToken }) => {
        try {


            const response = await fetch(`${url}/medium/url`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ integrationToken })
            },
            );



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMediumAccess(true);



        } catch (error) {
            setResponseMessage('Error occurred during fetching user information');

        }
    }

    const LinkedinAccess = async () => {
        try {
            const response = await fetch(' ')
        } catch (error) {

        }
    }



    const postData = useMemo(() => ({
        posts,
        title,
        subtitle,
        tag,
        content,
        responseMessage,
        loading,
        fetchPosts,
        postDelete,
        updatePost,
        createPost,
        fetchPostByID,
        success,
        mediumUrl, hasMediumAccess, setMediumAccess, hasLinkedinAccess, setLinkedinAccess
    }), [updatePost, success, mediumUrl, hasMediumAccess, setMediumAccess, hasLinkedinAccess, setLinkedinAccess]);

    return (
        <PostContext.Provider value={postData}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    return useContext(PostContext);
};

export default PostContext;
