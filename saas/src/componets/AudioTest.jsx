import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import './AudioRecordingComponent.css';
import { Notify, NotifyFalse } from './NotifyToast';

const Url = import.meta.env.VITE_API_URL

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
    const [showDropdowns, setShowDropdowns] = useState(false);
    const [blogType, setBlogType] = useState('');
    const [blogTone, setBlogTone] = useState('');

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
    }, [isRecording, userPlan,]);

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
            setShowDropdowns(true);
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

        if (!audioBlob || !blogType || !blogTone) {
            setErrorMessage('Please select a file, blog type, and blog tone for processing.');
            return;
        }

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
        formData.append('blogType', blogType);
        formData.append('blogTone', blogTone);



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
                NotifyFalse(data.message)

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
        setShowDropdowns(false)
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
        <div className="flex flex-col items-center p-6  rounded-lg shadow-lg max-w-md mx-auto bg-slate-900" >
            <div className="w-full  p-6 rounded-lg shadow-md flex flex-col items-center space-y-4"  >
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

                    {showDropdowns && (
                        <div className="mt-4 w-full">
                            <label className="block text-left text-white font-semibold mb-2">Select Blog Type (required):</label>
                            <select
                                value={blogType}
                                onChange={(e) => setBlogType(e.target.value)}
                                className="w-full p-2 border rounded-lg bg-gray-800 text-slate-200 focus:outline-none focus:ring focus:ring-teal-500"
                                required
                            >
                                <option value="">Select a type</option>
                                <option value="technical">Technical Tutorial/Guide</option>
                                <option value="personal">Personal Story/Experience</option>
                                <option value="industry">Industry Analysis/Trends</option>
                                <option value="how-to">How-To/Instructional</option>
                                <option value="opinion">Opinion/Editorial</option>
                                <option value="product">Product Review</option>
                                <option value="case-study">Case Study</option>
                                <option value="news">News Analysis</option>
                                <option value="research">Research Summary</option>
                                <option value="lifestyle">Lifestyle/Personal Development</option>
                            </select>
                        </div>
                    )}

                    {showDropdowns && (
                        <div className="mt-4 w-full">
                            <label className="block text-left text-white font-semibold mb-2">Select Blog Tone (required):</label>
                            <select
                                value={blogTone}
                                onChange={(e) => setBlogTone(e.target.value)}
                                className="w-full p-2 border rounded-lg bg-gray-800 text-slate-200 focus:outline-none focus:ring focus:ring-teal-500"
                                required
                            >
                                <option value="">Select a tone</option>
                                <option value="casual">Casual & Friendly</option>
                                <option value="professional">Professional but Warm</option>
                                <option value="expert">Expert & Engaging</option>
                                <option value="story-driven">Story-driven</option>
                                <option value="analytical">Analytical but Accessible</option>
                            </select>
                        </div>
                    )}
                    {showControls && (
                        <button
                            onClick={uploadAudio}
                            className={`mt-4 px-6 py-3 rounded-lg text-white transition-transform transform ${isRecording ? 'bg-gradient-to-r from-gray-400 to-gray-600' : (audioBlob ? (isUploading ? 'bg-gradient-to-r from-blue-300 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-600') : 'bg-gradient-to-r from-blue-200 to-blue-400')} shadow-lg hover:scale-105`}
                            disabled={isRecording || isUploading || !audioBlob}
                        >
                            {isUploading ? 'Uploading...' : 'Submit Audio for processing'}
                        </button>
                    )}


                </div>
            </div>
        </div>
    );
}