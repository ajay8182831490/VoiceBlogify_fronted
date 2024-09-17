import React, { useState } from 'react';
import AudioDropzone from './AudioRecorder';
import AudioPlayer from './AudioPlayer';

const ParentComponent = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUploaded = (file) => {
        setUploadedFile(file);
    };

    return (
        <div className="p-6 bg-gray-100  ">

            <AudioDropzone onFileUploaded={handleFileUploaded} />

        </div>
    );
};

export default ParentComponent;