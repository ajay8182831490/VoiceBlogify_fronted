import React from 'react';

const AudioPlayer = ({ file }) => {
    if (!file) {
        return <p className="text-gray-600">No media file uploaded.</p>;
    }

    const mediaUrl = URL.createObjectURL(file);

    return (
        <div className="mt-4 w-full text-left bg-gray-50 p-4 rounded-lg shadow-lg">

            {file.type.startsWith('audio/') ? (
                <audio controls className="w-full mt-2">
                    <source src={mediaUrl} type={file.type} />
                    Your browser does not support the audio element.
                </audio>
            ) : file.type.startsWith('video/') ? (
                <video controls className="w-full mt-2">
                    <source src={mediaUrl} type={file.type} />
                    Your browser does not support the video element.
                </video>
            ) : null}
        </div>
    );
};

export default AudioPlayer;
