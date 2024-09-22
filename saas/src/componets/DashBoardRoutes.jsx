import { Routes, Route } from 'react-router-dom';

import { lazy, Suspense } from 'react';

const UserProfile = lazy(() => import('./dashBoard/UserProfile'));
const LinkedIn = lazy(() => import('./dashBoard/Linkedin'));
const Medium = lazy(() => import('./dashBoard/Medium'));
const Blogger = lazy(() => import('./dashBoard/Blogger'));

import UserPost from './dashBoard/UserPost';
const url = "https://voiceblogify-backend.onrender.com"

const DashboardRoutes = () => {
    return (
        <div className="flex-grow p-4 bg-gradient-to-b from-purple-200 to-purple-600 ">
            <Routes>
                {/* UserPosts loaded normally */}
                <Route path="user-posts" element={<UserPost />} />

                {/* Lazy load other routes */}
                <Route
                    path="user-profile"
                    element={
                        <Suspense fallback={<div>Loading User Profile...</div>}>
                            <UserProfile />
                        </Suspense>
                    }
                />
                <Route
                    path="linkedin"
                    element={
                        <Suspense fallback={<div>Loading LinkedIn...</div>}>
                            <LinkedIn />
                        </Suspense>
                    }
                />
                <Route
                    path="medium"
                    element={
                        <Suspense fallback={<div>Loading Medium...</div>}>
                            <Medium />
                        </Suspense>
                    }
                />
                <Route
                    path="blogger"
                    element={
                        <Suspense fallback={<div>Loading Blogger...</div>}>
                            <Blogger />
                        </Suspense>
                    }
                />


                {/* Default route */}
                <Route path="*" element={<UserPost />} />
            </Routes>
        </div>
    );
};

export default DashboardRoutes;
