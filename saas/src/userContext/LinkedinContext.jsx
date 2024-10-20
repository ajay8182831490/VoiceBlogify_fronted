import { Notify, NotifyFalse } from "@/componets/NotifyToast";
import { useContext, createContext, useEffect, useMemo, useState } from "react";

const LinkedinContext = createContext();
const url = import.meta.env.VITE_API_URL


export const LinkedinContextProvider = ({ children }) => {
    const [content, setContent] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);





    const uploadLinkedinPOST = async (content, file) => {
        try {
            setLoading(true);




            const formData = new FormData();
            formData.append("description", content);
            for (let [key, value] of file.entries()) {
                formData.append(key, value);
            }






            const response = await fetch(`${url}/linkedin/post`, {
                method: "POST",
                credentials: "include",

                body: formData,
            });

            const responseData = await response.json();

            if (response.status === 422) {
                NotifyFalse("Duplicate post found");
            }
            else if (response.status === 400) {
                NotifyFalse(responseData.message)
            }



            else if (response.ok) {
                Notify('Post successfully shared on LinkedIn!')
                setResponseMessage("Post successfully shared on LinkedIn!");
            } else {
                NotifyFalse("Failed to share post")
                setResponseMessage(`Failed to share post: ${responseData.message || "Unknown error"}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinkedinContext.Provider value={{ content, setContent, uploadLinkedinPOST, responseMessage, loading }}>
            {children}
        </LinkedinContext.Provider>
    );
};


export const useLinkedin = () => {
    return useContext(LinkedinContext);
};

export default LinkedinContext;
