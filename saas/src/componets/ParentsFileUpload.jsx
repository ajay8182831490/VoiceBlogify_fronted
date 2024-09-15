import React, { useState } from 'react';
import AudioDropzone from './AudioRecorder';
import AudioPlayer from './AudioPlayer';

const ParentComponent = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUploaded = (file) => {
        setUploadedFile(file);
    };

    return (
        <div className="p-6 bg-gray-200 ">

            <AudioDropzone onFileUploaded={handleFileUploaded} />
            {uploadedFile && <AudioPlayer file={uploadedFile} />}
        </div>
    );
};

export default ParentComponent;