import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePost } from "./PostContext";

const url = "http://localhost:4000";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [message, setResponseMessage] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { hasMediumAccess, setMediumAccess } = usePost();

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${url}/user/profile`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUser(data);
            setMediumAccess(!!data.MediumUrl);
        } catch (error) {
            setResponseMessage('Error occurred during fetching user information');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const userInfo = useMemo(() => user, [user, hasMediumAccess]);

    return (
        <UserContext.Provider value={{ userInfo, message, hasMediumAccess, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useProfile = () => useContext(UserContext);

export default UserContext;
