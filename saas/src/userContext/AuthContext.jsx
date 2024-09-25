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
                const response = await fetch('https://voiceblogify-backend.onrender.com/status', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();

                console.log(data)


                if (data.authenticated) {
                    setIsAuthenticated(true);
                    setUser({
                        name: data.name,
                        profilepicurl: data.profilepic,
                        userId: data.id
                    });
                    setPaidMember(false);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
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


export const useAuth = () => useContext(AuthContext);

export default AuthContext;
