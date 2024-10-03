import React from 'react';

const LinkedInConnectButton = () => {
    const handleConnect = () => {

        window.location.href = 'http://localhost:4000/linkedin/oauth';
    };

    return (
        <button onClick={handleConnect}>
            Connect to LinkedIn
        </button>
    );
};

export default LinkedInConnectButton;
