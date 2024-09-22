import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isPaid, setPaidMember] = useState(false)



    useEffect(() => {

        async function checkAuth() {
            try {
                const apiUrl = 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/status`, {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response:', response);

                // Check if the response is OK
                if (!response.ok) {
                    const errorText = await response.text();
                    if (response.status === 401) {
                        console.warn('User is not authenticated. Please log in.');
                        // Optionally redirect to login
                        // window.location.href = '/login';
                    } else {
                        console.error('Error fetching auth status:', response.status, errorText);
                    }
                    return;
                }

                // Parse JSON data from response
                const data = await response.json();
                console.log('Auth data:', data);

                // Check authentication status
                if (data.authenticated) {
                    setIsAuthenticated(true);
                    setUser({
                        name: data.name,
                        profilepicurl: data.profilepic,
                        userId: data.id,
                    });
                    setPaidMember(data.paidMember || false);
                } else {
                    console.warn('User is not authenticated:', data);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                alert('An error occurred while checking authentication. Please try again.');
            }
        }



        checkAuth();
    }, []);


    const handleLogout = async () => {
        try {
            const response = await fetch('https://voiceblogify-backend.onrender.com/logout', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {

                setIsAuthenticated(false);
                setUser(null);

            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, handleLogout, isPaid }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use AuthContext easily in any component
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
