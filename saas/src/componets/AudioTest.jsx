import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import './AudioRecordingComponent.css';

const Url = "https://voiceblogify-backend.onrender.com"

export default function MyAudioRecordingComponent() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [timer, setTimer] = useState(0);
    const [showTimer, setShowTimer] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isRecording) {
            startRecording();
            startTimer();
            setShowTimer(true);
        } else {
            stopRecording();
            stopTimer();
            if (!isPaused) {
                setShowTimer(false);
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
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);


            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                createAudioBlob();
                setShowTimer(false);
            };

            mediaRecorderRef.current.start(1000);

            startTimer();

            setShowTimer(true); // Show timer UI here
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Could not start recording. Please ensure microphone access is allowed.');
            setShowTimer(false)
            handleReset()
        }
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
            startTimer();
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
            const response = await fetch(`${Url}/transcription/audioRecord`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                handleReset();
                navigate('/loading');
            } else {
                console.error('Failed to upload audio');
            }
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
                setTimer(0);
                setAudioURL(null);
                setShowControls(true);
            }
        }
    };

    const handleReset = () => {
        audioChunks.current = [];
        setAudioBlob(null);
        setAudioURL(null);
        setIsRecording(false);
        setIsPaused(false);
        setTimer(0);
        setShowTimer(false);
        setShowControls(false);
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
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="w-full bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
                {/* Audio playback controls */}
                {audioURL && !isRecording && !isUploading && !isPaused && (
                    <div className="w-full mb-4 flex justify-center">
                        <audio controls src={audioURL} className="w-full max-w-md" />
                    </div>
                )}

                {/* Timer Display */}
                {showTimer && (
                    <div className="text-3xl font-semibold mb-4 text-blue-600">
                        {formatTime(timer)}
                    </div>
                )}

                {/* Unified Recording Button */}
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleRecord}
                        className={`flex items-center justify-center w-20 h-20 rounded-full text-white transition-transform transform ${isRecording ? (isPaused ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse' : 'bg-gradient-to-r from-red-400 to-red-600 animate-pulse') : 'bg-gradient-to-r from-green-400 to-green-600'} shadow-xl hover:scale-105`}
                        title={isRecording ? (isPaused ? 'Resume Recording' : 'Stop Recording') : 'Start Recording'}
                    >
                        {isRecording ? (isPaused ? <PlayIcon className="h-10 w-10" /> : <StopIcon className="h-10 w-10" />) : <MicrophoneIcon className="h-10 w-10" />}
                    </button>

                    {/* Conditional rendering of additional buttons */}
                    {showControls && (
                        <div className="flex flex-wrap justify-center space-x-4">
                            {isRecording && !isPaused && (
                                <button
                                    onClick={pauseRecording}
                                    className="flex items-center p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full transition-transform transform hover:bg-yellow-500 shadow-lg hover:scale-105"
                                    title="Pause"
                                >
                                    <PauseIcon className="h-6 w-6" />
                                </button>
                            )}
                            {isPaused && (
                                <button
                                    onClick={resumeRecording}
                                    className="flex items-center p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full transition-transform transform hover:bg-blue-500 shadow-lg hover:scale-105"
                                    title="Resume"
                                >
                                    <PlayIcon className="h-6 w-6" />
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                className="flex items-center p-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full transition-transform transform hover:bg-gray-500 shadow-lg hover:scale-105"
                                title="Reset"
                            >
                                <ArrowPathIcon className="h-6 w-6" />
                            </button>

                            <button
                                onClick={handleSave}
                                className="flex items-center p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full transition-transform transform hover:bg-green-500 shadow-lg hover:scale-105"
                                disabled={!audioBlob || isUploading || isRecording}
                                title="Save"
                            >
                                <ArrowDownTrayIcon className="h-6 w-6" />
                            </button>
                        </div>
                    )}

                    {/* Submit Audio for Processing Button */}
                    {showControls && (
                        <button
                            onClick={uploadAudio}
                            className={`mt-4 px-6 py-3 rounded-lg text-white transition-transform transform ${isRecording ? 'bg-gradient-to-r from-gray-400 to-gray-600' : (audioBlob ? (isUploading ? 'bg-gradient-to-r from-blue-300 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-600') : 'bg-gradient-to-r from-blue-200 to-blue-400')} shadow-lg hover:scale-105`}
                            disabled={isRecording || isUploading || !audioBlob}
                        >
                            {isUploading ? 'Uploading...' : 'Submit Audio'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}