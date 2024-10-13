import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import './AudioRecordingComponent.css';
import { Notify, NotifyFalse } from './NotifyToast';

const Url = "https://voiceblogify-backend.onrender.com";

const recordingLimits = {
    free: 10 * 60,
    basic: 20 * 60,
    premium: 60 * 60,
    business: 90 * 60,
};

export default function MyAudioRecordingComponent({ userPlan }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [timer, setTimer] = useState(recordingLimits[userPlan] || recordingLimits.basic);
    const [showTimer, setShowTimer] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setTimer(recordingLimits[userPlan] || recordingLimits.free);
    }, [userPlan]);

    useEffect(() => {
        if (isRecording) {
            startRecording();
            startTimer();
            setShowTimer(true);
        } else {
            stopRecording();
            if (!isPaused) {
                stopTimer();
                setShowTimer(false);
            }
        }

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            }
            stopTimer();
        };
    }, [isRecording, userPlan]);

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
                setShowControls(true);
            };

            mediaRecorderRef.current.start(1000);
            setShowTimer(true);
        } catch (error) {

            alert('Could not start recording. Please ensure microphone access is allowed.');
            setShowTimer(false);
            handleReset();
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
        let mimeType = 'audio/wav'; // Default

        // Check for supported formats
        const audioElement = document.createElement('audio');
        if (audioElement.canPlayType('audio/webm')) {
            mimeType = 'video/webm';
        } else if (audioElement.canPlayType('audio/mp3')) {
            mimeType = 'audio/mp3';
        } else if (audioElement.canPlayType('audio/ogg')) {
            mimeType = 'audio/ogg';
        }

        const blob = new Blob(audioChunks.current, { type: mimeType });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        audioChunks.current = [];
    };


    const uploadAudio = async (e) => {

        e.preventDefault();
        if (!audioBlob) return;
        setIsUploading(true);

        const formData = new FormData();

        // Determine file extension based on MIME type
        let fileName = 'recording.wav'; // Default file name
        const mimeType = audioBlob.type;

        if (mimeType === 'video/webm') {
            fileName = 'recording.webm';
        } else if (mimeType === 'audio/mp3') {
            fileName = 'recording.mp3';
        } else if (mimeType === 'audio/ogg') {
            fileName = 'recording.ogg';
        }

        formData.append('audio', audioBlob, fileName);

        try {
            const response = await fetch(`${Url}/transcription/audioRecord`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                handleReset();
                Notify(data.message);
                navigate('/')
            } else {
                NotifyFalse('Failed to upload audio')

            }
        } catch (error) {

            NotifyFalse("Error occured during uploading audio")
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = () => {
        if (!audioBlob) return;

        // Determine file extension based on MIME type
        let fileName = 'recording.wav'; // Default file name
        const mimeType = audioBlob.type;

        if (mimeType === 'video/webm') {
            fileName = 'recording.webm';
        } else if (mimeType === 'audio/mp3') {
            fileName = 'recording.mp3';
        } else if (mimeType === 'audio/ogg') {
            fileName = 'recording.ogg';
        }

        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName; // Use the dynamic file name
        document.body.appendChild(link); // Append to the body for Firefox compatibility
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up after the download
    };


    const handleRecord = () => {
        if (isPaused) {
            resumeRecording();
        } else {
            setIsRecording((prev) => !prev);
            if (!isRecording) {
                setTimer(recordingLimits[userPlan] || recordingLimits.free);
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
        setTimer(recordingLimits[userPlan] || recordingLimits.basic);
        setShowTimer(false);
        setShowControls(false);
        stopTimer();
    };



    const startTimer = () => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    stopRecording();
                    setTimer(0);
                    return 0;
                }
                return prev - 1;
            });
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
        <div className="flex flex-col items-center p-6  rounded-lg shadow-lg max-w-md mx-auto" style={{ backgroundColor: "black" }}>
            <div className="w-full  p-6 rounded-lg shadow-md flex flex-col items-center space-y-4" style={{ backgroundColor: "#1E1E1E" }} >
                {/* Audio playback controls */}
                {audioURL && !isRecording && !isUploading && (
                    <div className="w-full mb-4 flex justify-center">
                        <audio controls src={audioURL} className="w-full max-w-md" />
                    </div>
                )}


                {showTimer && (
                    <div className="text-3xl font-semibold mb-4 text-blue-600">
                        {formatTime(timer)}
                    </div>
                )}

                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleRecord}
                        className={`flex items-center justify-center w-20 h-20 rounded-full text-white transition-transform transform ${isRecording ? (isPaused ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse' : 'bg-gradient-to-r from-red-400 to-red-600 animate-pulse') : 'bg-gradient-to-r from-green-400 to-green-600'} shadow-xl hover:scale-105`}
                        title={isRecording ? (isPaused ? 'Resume Recording' : 'Stop Recording') : 'Start Recording'}
                    >
                        {isRecording ? (isPaused ? <PlayIcon className="h-10 w-10" /> : <StopIcon className="h-10 w-10" />) : <MicrophoneIcon className="h-10 w-10" />}
                    </button>

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
                            {/* Show download icon only when audio is available */}
                            {audioBlob && !isUploading && (
                                <button
                                    onClick={handleSave}
                                    className="flex items-center p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full transition-transform transform hover:bg-green-500 shadow-lg hover:scale-105"
                                    title="Download Recording"
                                >
                                    <ArrowDownTrayIcon className="h-6 w-6" />
                                </button>
                            )}

                            <button
                                onClick={handleReset}
                                className="flex items-center p-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full transition-transform transform hover:bg-red-500 shadow-lg hover:scale-105"
                                title="Reset Recording"
                            >
                                <ArrowPathIcon className="h-6 w-6" />
                            </button>
                        </div>
                    )}
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
