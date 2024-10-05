import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext();
const url = "https://voiceblogify-backend.onrender.com";

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isPaid, setPaidMember] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${url}/status`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();


                setIsAuthenticated(data.authenticated);

                if (data.authenticated) {
                    setUser({
                        name: data.name,
                        profilepicurl: data.profilepic,
                        userId: data.id,
                    });
                    setPaidMember(data.isPaid);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
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
                credentials: 'include'
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
                body: JSON.stringify({ oldPassword, newPassword })
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


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            handleLogout,
            setIsAuthenticated,
            setUser,
            isPaid,
            passwordUpdate,
            loading,
            error,
            message
        }}>
            {loading ? '' : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
