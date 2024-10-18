// FeedbackForm.jsx
import React, { useState } from 'react';
import { Notify, NotifyFalse } from '../NotifyToast';
const Url = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/userContext/AuthContext';

const FeedbackForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const { isAuthenticated } = useAuth();  // Accessing authentication status

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user is authenticated
        if (!isAuthenticated) {
            NotifyFalse("You need to be logged in to submit feedback."); // Notify user they must be logged in
            return; // Stop further execution
        }

        setLoading(true);

        try {
            const response = await fetch(`${Url}/user/feedback`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: message })
            });

            const data = await response.json();
            if (response.ok) {
                Notify(data.message);
                setMessage('');
                navigator('/');
            } else {
                NotifyFalse(data.message || "Please try again");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            NotifyFalse("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto mt-10" style={{ backgroundColor: "#020012" }}>
            <h2 className="text-3xl text-blue-600 font-bold mb-4 text-center">We Value Your Feedback</h2>
            <p className="text-gray-300 mb-6 text-center">
                Your thoughts are important to us! Please share your feedback below.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="What do you think about VoiceBlogify? Let us know!"
                        rows="6"
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}  // Only disable if loading
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;
