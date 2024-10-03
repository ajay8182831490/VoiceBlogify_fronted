import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import UserPostProvider from './dashBoard/UserPostProvider';

import { UserPosts } from './dashBoard/UserPost';
import LinkedinPostProvider from './LinkedinRichEditorText';

const UserProfile = lazy(() => import('./dashBoard/UserProfile'));

import MediumPostProvider from './dashBoard/Medium';
import BloggerPostProvider from './dashBoard/Blogger';
import { UserContextProvider } from '@/userContext/UserContext';

const DashboardRoutes = () => {
    return (
        <UserPostProvider>
            <UserContextProvider>
                <div className="flex-grow p-4 bg-gradient-to-b from-purple-200 to-purple-600">
                    <Routes>
                        <Route
                            path="user-posts"
                            element={<UserPosts />}
                        />
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
                                    <LinkedinPostProvider />
                                </Suspense>
                            }
                        />
                        <Route
                            path="medium"
                            element={
                                <Suspense fallback={<div>Loading Medium...</div>}>
                                    <MediumPostProvider />
                                </Suspense>
                            }
                        />
                        <Route
                            path="blogger"
                            element={
                                <Suspense fallback={<div>Loading Blogger...</div>}>
                                    <BloggerPostProvider />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<UserProfile />} />
                    </Routes>
                </div>
            </UserContextProvider>
        </UserPostProvider>
    );
};

export default DashboardRoutes;
