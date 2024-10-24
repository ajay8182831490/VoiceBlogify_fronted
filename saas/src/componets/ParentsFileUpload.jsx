import React, { useState } from 'react';


import AudioDropzone from './AudioRecorder';



const ParentComponent = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUploaded = (file) => {
        setUploadedFile(file);
    };

    return (
        <div className="p-6 bg-gray-800  ">

            <AudioDropzone onFileUploaded={handleFileUploaded} />

        </div>
    );
};

export default ParentComponent;