import React from 'react';

const LinkedInConnectButton = () => {
    const handleConnect = () => {

        window.location.href = 'https://voiceblogify-backend.onrender.com/linkedin/oauth';
    };

    return (
        <button onClick={handleConnect}>
            Connect to LinkedIn
        </button>
    );
};

export default LinkedInConnectButton;
