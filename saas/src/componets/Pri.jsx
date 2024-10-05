import React from 'react';

const Pri = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy for VoiceBlogify</h1>
            <p className="mb-4">
                Last updated: 5 Oct 2024
            </p>
            <p className="mb-4">
                This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use VoiceBlogify and informs you about your privacy rights.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Personal Information: We collect personal data when you register, such as your name and email address.</li>
                <li>Audio Data: We collect audio files that you upload for transcription.</li>
                <li>Third-Party Credentials: If you choose to integrate with third-party platforms, we may collect authentication credentials.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Information</h2>
            <p className="mb-4">
                Your information is used to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our services.</li>
                <li>Improve and personalize your experience.</li>
                <li>Communicate with you regarding updates and promotional offers.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Retention and Deletion</h2>
            <p className="mb-4">
                We do not store audio files after blog generation. Third-party credentials will be deleted from our database 7 days after your last activity.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
                We use cookies for authentication and to enhance user experience. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
            <p className="mb-4">
                VoiceBlogify integrates with Medium, LinkedIn, and Blogger. Users have the choice to integrate these platforms. We also utilize Google Gemini for voice transcription. Please review their privacy policies for information on how they handle your data.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. User Rights</h2>
            <p className="mb-4">
                You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information.</li>
                <li>Request deletion of your account and data.</li>
                <li>Unsubscribe from our services at any time.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Data Security</h2>
            <p className="mb-4">
                We take reasonable security measures to protect your data, including using hashing for credentials.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:voiceblogify@gmail.com" className="hover:underline">voiceblogify@gmail.com</a>
            </p>
        </div>
    );


};



export default Pri;
