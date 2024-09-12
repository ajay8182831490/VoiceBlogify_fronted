import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('http://localhost:4000/status', {
                    credentials: 'include'
                });
                const data = await response.json();
                console.log(data)

                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser({ name: data.name, profilepicurl: data.profilepic, UserId: data.id })

                }
            } catch (error) {
                console.error('Error checking auth:', error);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
