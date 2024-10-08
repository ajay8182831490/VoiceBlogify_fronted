import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin } from 'react-icons/fa'; // Import the Twitter and LinkedIn icons

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                    <div className="flex flex-col items-center md:flex-row md:space-x-6">
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link to="/terms-condition" className="hover:underline">Terms and Conditions</Link>
                        <a href="mailto:voiceblogify@gmail.com" className="hover:underline">Support</a>
                        <a
                            href="https://x.com/abhi_g003"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:underline"
                        >
                            <FaTwitter className="mr-1" /> Twitter
                        </a>
                        <a
                            href="https://www.linkedin.com/in/abhiajay-gupta/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:underline"
                        >
                            <FaLinkedin className="mr-1" /> LinkedIn
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

export default React.memo(Footer);
