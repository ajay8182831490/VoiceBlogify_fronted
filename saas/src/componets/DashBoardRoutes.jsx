import { Routes, Route } from 'react-router-dom';

import UserPostProvider from './dashBoard/UserPostProvider';


import { UserPosts } from './dashBoard/UserPost';
import LinkedinPostProvider from './LinkedinRichEditorText';


import UserProfileWithProvider from './dashBoard/UserProfile';



import MediumPostProvider from './dashBoard/Medium';


import BloggerPostProvider from './dashBoard/Blogger';
import { UserContextProvider } from '@/userContext/UserContext';

const DashboardRoutes = () => {
    return (
        <UserPostProvider>
            <UserContextProvider>
                <div className="flex-grow p-4 " style={{ backgroundColor: "#020012" }}>

                    <Routes>
                        <Route
                            path="user-posts"
                            element={<UserPosts />}
                        />

                        <Route
                            path="user-profile"
                            element={


                                <UserProfileWithProvider />


                            }
                        />
                        <Route
                            path="linkedin"
                            element={

                                <LinkedinPostProvider />

                            }
                        />
                        <Route
                            path="medium"
                            element={

                                <MediumPostProvider />

                            }
                        />
                        <Route
                            path="blogger"
                            element={

                                <BloggerPostProvider />

                            }
                        />
                        <Route path="*" element={<UserPosts />} />
                    </Routes>

                </div>
            </UserContextProvider>
        </UserPostProvider>
    );
};

export default DashboardRoutes;
