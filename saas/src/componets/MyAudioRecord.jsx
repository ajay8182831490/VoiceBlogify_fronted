import React, { useState, useEffect } from 'react';
import { useAudioRecorder, AudioRecorder } from 'react-audio-voice-recorder';

const MyAudioRecordingComponent = () => {
    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
        mediaRecorder, showVisualizer
    } = useAudioRecorder();

    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // Function to format the time duration
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Effect to handle when recordingBlob is available
    useEffect(() => {
        if (!recordingBlob) return;
        // Handle the recorded audio blob here if needed
    }, [recordingBlob]);

    const handleSaveAudio = () => {
        if (recordingBlob) {
            const url = URL.createObjectURL(recordingBlob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'recording.webm'; // Change to your preferred file type
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
        setIsSaveModalOpen(false);
    };

    const handleDiscard = () => {
        setIsDiscardModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Audio Recorder</h2>

                <AudioRecorder
                    recorderControls={{

                        isRecording,
                        isPaused,
                        recordingBlob
                    }}

                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                    showVisualizer={true}
                    classes={{
                        container: "border border-gray-300 rounded-md p-4 mb-4 bg-gray-50",
                        button: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all mt-2",
                    }}
                />

                <div className="text-center mt-4">
                    <p className="text-lg font-medium text-gray-700">
                        Recording Time: {formatTime(recordingTime)}
                    </p>
                </div>

                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={startRecording}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                    >
                        Record
                    </button>
                    <button
                        onClick={stopRecording}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all"
                    >
                        Stop
                    </button>
                    <button
                        onClick={() => setIsSaveModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Save
                    </button>
                    {recordingBlob && (
                        <button
                            onClick={handleDiscard}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
                        >
                            Discard
                        </button>
                    )}
                </div>

                {isDiscardModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                            <h3 className="text-lg font-semibold mb-4">Are you sure you want to discard this recording?</h3>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsDiscardModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDiscardModalOpen(false);
                                        setRecordingBlob(null);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isSaveModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                            <h3 className="text-lg font-semibold mb-4">Do you want to save the recording before discarding it?</h3>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => {
                                        setIsSaveModalOpen(false);
                                        setRecordingBlob(null);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    No, Discard
                                </button>
                                <button
                                    onClick={handleSaveAudio}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Save & Discard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAudioRecordingComponent;