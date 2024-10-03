import React from 'react';
import { PostProvider } from '@/userContext/PostContext';
import { UserPosts } from './UserPost';


const UserPostProvider = ({ children }) => {
    return (
        <PostProvider value={<UserPosts />}>

            {children}
        </PostProvider>
    );
};


export default UserPostProvider;
