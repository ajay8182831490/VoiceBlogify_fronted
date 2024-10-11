import { useState, createContext, useEffect, useContext, useMemo } from "react";

const AuthContext = createContext();
const url = "https://voiceblogify-backend.onrender.com";

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAvialbleCreatePost, setAvilableCreatePost] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGoogle, setIsGoogle] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${url}/status`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();


                setIsAuthenticated(data.authenticated);
                setIsGoogle(data.googleId)

                setAvilableCreatePost(data.remainingPosts)

                if (data.authenticated) {
                    setUser({
                        name: data.name,
                        profilepicurl: data.profilepic,
                        userId: data.id,
                        email: data.email
                    });

                } else {
                    setUser(null);
                }
            } catch (error) {

                setError("Failed to check authentication status.");
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${url}/logout`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUser(null);
                setPaidMember(false);
            } else {
                console.error('Logout failed');
                setError("Logout failed. Please try again.");
            }
        } catch (error) {
            setError("Error occurred during logout.");
        }
    };

    const passwordUpdate = async ({ oldPassword, newPassword }) => {
        try {
            const response = await fetch(`${url}/passwordChange`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (response.ok) {
                setMessage("Password updated successfully");
            } else {
                setMessage("Error updating password");
            }
        } catch (error) {
            setMessage("Error occurred");
        }
    };


    const onDisconnectLinkedIn = async () => {
        try {
            const response = await fetch(`${url}/user/disconnect/linkedin`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (response.ok) {
                setMessage("Successfully disconnected")
            }
        } catch (error) {
            setError("Error occurred during disconnect.");
        }
    }

    const onDisconnectMedium = async () => {
        try {
            const response = await fetch(`${url}/user/disconnect/medium`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (response.ok) {
                setMessage("Successfully disconnect")
            } else {

                setError("failed to disconnect. Please try again.");
            }
        } catch (error) {
            setError("Error occurred during disconnect.");
        }
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    const memoizedValue = useMemo(
        () => ({
            isAuthenticated,
            user,
            handleLogout,
            setIsAuthenticated,
            setUser,
            isAvialbleCreatePost,
            passwordUpdate,
            loading,
            error,
            message,
            isGoogle,
            onDisconnectLinkedIn,
            onDisconnectMedium
        }),
        [isAuthenticated, user, loading, error, message, onDisconnectMedium, onDisconnectMedium]
    );

    return (
        <AuthContext.Provider value={memoizedValue}>
            {loading ? '' : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
