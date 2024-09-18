import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
const Url = "http://localhost:4000";
export default function MyAudioRecordingComponent() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [timer, setTimer] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [showControls, setShowControls] = useState(false); // New state variable
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isRecording) {
            startRecording();
            startTimer();
            setShowTimer(true);
        } else {
            stopRecording();
            stopTimer();
            if (!isPaused) {
                setShowTimer(false); // Hide timer when recording stops
            }
        }

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            }
            stopTimer();
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
            setShowTimer(false); // Hide timer when recording stops
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
            stopTimer();
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            startTimer(); // Resume timer when recording resumes
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

        alert("audio file upload")

        try {
            const response = await fetch(`${Url}/transcription/audioRecord`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            console.log(response)
            handleReset();
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
            if (!isRecording) {
                // Reset timer and audio URL when starting a new recording
                setTimer(0);
                setAudioURL(null); // Hide audio player
                setShowControls(true); // Show all buttons when recording starts
            }
        }
    };

    const handleReset = () => {
        audioChunks.current = [];
        setAudioBlob(null);
        setAudioURL(null); // Ensure audio player is not rendered
        setIsRecording(false);
        setIsPaused(false);
        setTimer(0);
        setShowTimer(false);
        setShowControls(false); // Hide all buttons when reset is clicked
        stopTimer();
    };

    const handleSave = () => {
        if (!audioBlob) return;
        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recording.wav';
        link.click();
    };

    const startTimer = () => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="w-full bg-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
                {/* Audio playback controls */}
                {audioURL && !isRecording && !isUploading && !isPaused && (
                    <div className="w-full mb-4 flex justify-center">
                        <audio controls src={audioURL} className="w-full max-w-md" />
                    </div>
                )}

                {/* Timer Display */}
                {showTimer && (
                    <div className="text-2xl font-semibold mb-4 text-center">
                        {formatTime(timer)}
                    </div>
                )}

                {/* Unified Recording Button */}
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleRecord}
                        className={`flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform transform ${isRecording ? (isPaused ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-red-500 to-red-700') : 'bg-gradient-to-r from-green-500 to-green-700'} shadow-lg hover:scale-105`}
                        title={isRecording ? (isPaused ? 'Resume Recording' : 'Stop Recording') : 'Start Recording'}
                    >
                        {isRecording ? (isPaused ? <PlayIcon className="h-8 w-8" /> : <StopIcon className="h-8 w-8" />) : <MicrophoneIcon className="h-8 w-8" />}
                    </button>

                    {/* Conditional rendering of additional buttons */}
                    {showControls && (
                        <div className="flex flex-wrap justify-center space-x-4">
                            {isRecording && !isPaused && (
                                <button
                                    onClick={pauseRecording}
                                    className="flex items-center p-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-full transition-transform transform hover:bg-yellow-600 shadow-lg hover:scale-105"
                                    title="Pause"
                                >
                                    <PauseIcon className="h-5 w-5" />
                                </button>
                            )}
                            {isPaused && (
                                <button
                                    onClick={resumeRecording}
                                    className="flex items-center p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full transition-transform transform hover:bg-blue-600 shadow-lg hover:scale-105"
                                    title="Resume"
                                >
                                    <PlayIcon className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                className="flex items-center p-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full transition-transform transform hover:bg-gray-600 shadow-lg hover:scale-105"
                                title="Reset"
                            >
                                <ArrowPathIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full transition-transform transform hover:bg-green-600 shadow-lg hover:scale-105"
                                disabled={!audioBlob}
                                title="Save"
                            >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                            </button>
                        </div>
                    )}

                    {/* Submit Audio for Processing Button */}
                    {showControls && (
                        <button
                            onClick={uploadAudio}
                            className={`mt-4 px-6 py-2 rounded-lg text-white transition-transform transform ${isRecording ? 'bg-gradient-to-r from-gray-500 to-gray-700' : (audioBlob ? (isUploading ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-blue-700') : 'bg-gradient-to-r from-gray-300 to-gray-400')} shadow-lg hover:scale-105`}
                            disabled={isRecording || !audioBlob || isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Submit'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 
