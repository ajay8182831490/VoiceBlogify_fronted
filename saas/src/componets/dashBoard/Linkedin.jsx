import React from 'react';
import LinkedinRET from '../LinkedinRichEditorText';
import { useUserContext } from '../UserContext';

const Linkedin = () => {
    // Get the login status and login function from the UserContext
    //const { isLinkedInLoggedIn, loginToLinkedIn } = useUserContext();
    const isLinkedInLoggedIn = false

    return (
        <div className="flex justify-center items-center h-screen">

            {isLinkedInLoggedIn ? (
                <LinkedinRET />
            ) : (
                <button
                    onClick={loginToLinkedIn}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Connect to LinkedIn
                </button>
            )}
        </div>
    );
};

export default Linkedin;
