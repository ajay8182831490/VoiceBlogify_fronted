import { useState, createContext, useEffect } from "react";



const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null);

    useEffect((effect) => {

        try {
            async function checkAuth() {
                try {
                    const response = await fetch('http://localhost:4000/status');
                    const data = await response.json();
                    if (data.isAuthenticated) {
                        setIsAuthenticated(true);
                        setUser(data.user);
                    }
                } catch (error) {
                    console.error('Error checking auth:', error);
                }
            }
            checkAuth();
        } catch (error) {
            console.error('Error checking auth:', error);
        }
    }, [])
}


return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
        {children}
    </AuthContext.Provider>
);