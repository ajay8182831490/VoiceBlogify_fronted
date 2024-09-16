import { useState } from 'react';
import { z } from 'zod';


const urlSchema = z.string().url({ message: "Invalid URL" });

export default function PasteUrlComponent() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            urlSchema.parse(url); // Validate URL using Zod
            setError(''); // Clear error if validation is successful
            console.log('Valid URL:', url);
            // Handle the valid URL submission here
        } catch (err) {
            setError(err.errors[0].message); // Set the error message if validation fails
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-4">
            <h2 className="text-lg font-semibold mb-4">Paste Audio/Video URL</h2>

            {/* Input Field with Button Inside */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-md shadow-md relative"
            >
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20" // Extra padding-right for button
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out h-full"
                    >
                        Submit
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-2 sm:mt-0 sm:ml-4">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
