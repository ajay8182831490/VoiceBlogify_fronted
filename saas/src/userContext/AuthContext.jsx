import { useState, createContext, useEffect, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isPaid, setPaidMember] = useState(false); // Use this if you manage paid status

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('https://voiceblogify-backend.onrender.com/status', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                console.log(data);


                if (data.authenticated !== isAuthenticated) {
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
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            }
        };

        checkAuth();
    }, [isAuthenticated]); // Run this effect when isAuthenticated changes

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

        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, handleLogout, setIsAuthenticated, setUser, isPaid }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
