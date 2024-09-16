import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, ArrowUpOnSquareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'; // Adjust imports

export default function MyAudioRecordingComponent() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [isRecording]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            createAudioBlob();
        };

        mediaRecorderRef.current.start(1000); // Record in 1-second chunks
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
        }
    };

    const createAudioBlob = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        audioChunks.current = [];
    };

    const uploadAudio = async () => {
        if (!audioBlob) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');

        try {
            await fetch('/api/upload-audio', {
                method: 'POST',
                body: formData,
            });
            setAudioBlob(null);
            setAudioURL(null);
        } catch (error) {
            console.error('Error uploading audio:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRecord = () => {
        if (isPaused) {
            resumeRecording();
        } else {
            setIsRecording((prev) => !prev);
        }
    };

    const handleReset = () => {
        audioChunks.current = [];
        setAudioBlob(null);
        setAudioURL(null);
        setIsRecording(false);
        setIsPaused(false);
    };

    const handleSave = () => {
        if (!audioBlob) return;
        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recording.wav';
        link.click();
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
            {/* Entire div with gray background */}
            <div className="w-full bg-gray-300 p-6 rounded-lg shadow-md">
                {/* Audio playback controls */}
                {audioURL && (
                    <div className="w-full mb-4 flex justify-center">
                        <audio controls src={audioURL} className="w-full max-w-md" />
                    </div>
                )}

                {/* Unified Recording Button */}
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleRecord}
                        className={`flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform transform ${isRecording ? (isPaused ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600') : 'bg-green-500 hover:bg-green-600'} shadow-md hover:scale-105`}
                        title={isRecording ? (isPaused ? 'Resume Recording' : 'Stop Recording') : 'Start Recording'}
                    >
                        {isRecording ? (isPaused ? <PlayIcon className="h-8 w-8" /> : <StopIcon className="h-8 w-8" />) : <MicrophoneIcon className="h-8 w-8" />}
                    </button>

                    {/* Additional Actions */}
                    <div className="flex space-x-4">
                        {isRecording && !isPaused && (
                            <button
                                onClick={pauseRecording}
                                className="flex items-center p-3 bg-yellow-500 text-white rounded-full transition-transform transform hover:bg-yellow-600 shadow-md hover:scale-105"
                                title="Pause"
                            >
                                <PauseIcon className="h-5 w-5" />
                            </button>
                        )}
                        {isPaused && (
                            <button
                                onClick={resumeRecording}
                                className="flex items-center p-3 bg-blue-500 text-white rounded-full transition-transform transform hover:bg-blue-600 shadow-md hover:scale-105"
                                title="Resume"
                            >
                                <PlayIcon className="h-5 w-5" />
                            </button>
                        )}
                        <button
                            onClick={handleReset}
                            className="flex items-center p-3 bg-gray-500 text-white rounded-full transition-transform transform hover:bg-gray-600 shadow-md hover:scale-105"
                            title="Reset"
                        >
                            <ArrowPathIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={uploadAudio}
                            className={`flex items-center p-3 transition-transform transform ${isUploading ? 'bg-blue-400' : 'bg-blue-500'} text-white rounded-full shadow-md hover:scale-105`}
                            disabled={isUploading}
                            title={isUploading ? 'Uploading...' : 'Upload'}
                        >
                            <ArrowUpOnSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center p-3 bg-green-500 text-white rounded-full transition-transform transform hover:bg-green-600 shadow-md hover:scale-105"
                            disabled={!audioBlob}
                            title="Save"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
