import React from 'react';
const url = import.meta.env.VITE_API_URL
const LinkedInConnectButton = () => {
    const handleConnect = () => {

        window.location.href = `${url}/linkedin/oauth`;
    };

    return (
        <button onClick={handleConnect}>
            Connect to LinkedIn
        </button>
    );
};

export default LinkedInConnectButton;
