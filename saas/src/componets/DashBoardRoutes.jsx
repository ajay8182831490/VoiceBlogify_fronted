import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import UserPostProvider from './dashBoard/UserPostProvider';

const UserPost = lazy(() => import('./dashBoard/UserPost').then(module => ({ default: module.UserPosts })));
const LinkedinPostProvider = lazy(() => import('./LinkedinRichEditorText'));

// const UserProfile = lazy(() => import('./dashBoard/UserProfile'));
const UserProfile = lazy(() => import('./dashBoard/UserProfile'));


const MediumPostProvider = lazy(() => import('./dashBoard/Medium'));
const BloggerPostProvider = lazy(() => import('./dashBoard/Blogger'));
import { UserContextProvider } from '@/userContext/UserContext';

const DashboardRoutes = () => {
    return (
        <UserPostProvider>
            <UserContextProvider>
                <div className="flex-grow p-4 " style={{ backgroundColor: "#020012" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                path="user-posts"
                                element={<UserPost />}
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
                    </Suspense>
                </div>
            </UserContextProvider>
        </UserPostProvider>
    );
};

export default DashboardRoutes;
