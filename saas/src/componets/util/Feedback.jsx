// FeedbackForm.jsx
import React, { useState } from 'react';

const FeedbackForm = () => {
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send the feedback to your backend)
        console.log({ message });

        // Simulating success and resetting state
        if (message.trim()) {
            setSuccessMessage('Thank you for your feedback!');
            setMessage('');
            setErrorMessage('');
        } else {
            setErrorMessage('Please provide some feedback.');
        }
    };

    return (
        <div className=" shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-2xl text-white font-bold mb-4 text-center">We Value Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">

                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What do you think about VoiceBlogify? Let us know!"
                        rows="6"
                        required
                    />
                </div>

                {successMessage && (
                    <div className="text-green-600 text-sm mb-2 text-center">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-600 text-sm mb-2 text-center">{errorMessage}</div>
                )}

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;
