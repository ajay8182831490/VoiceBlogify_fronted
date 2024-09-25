import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                    <div className="flex flex-col items-center md:flex-row md:space-x-6">
                        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                        <a href="/terms-and-conditions" className="hover:underline">Terms and Conditions</a>
                        <a href="mailto:support@voiceblogify.com" className="hover:underline">Support</a>
                        <a href="https://x.com/abhi_g003" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Twitter
                        </a>
                    </div>
                    <p className="mt-4 md:mt-0 text-center">
                        &copy; {new Date().getFullYear()} VoiceBlogify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer)
