import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="max-w-3xl mx-auto p-4" >
            <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
            <p className="mb-4">
                These Terms and Conditions govern your use of VoiceBlogify. By accessing or using our service, you agree to be bound by these terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Definitions</h2>
            <p className="mb-4">
                In these Terms and Conditions, "Service" refers to the VoiceBlogify platform, "User" refers to individuals using the service, and "Content" refers to audio files, blogs, and other material created using the service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Acceptance of Terms</h2>
            <p className="mb-4">
                By using the Service, you confirm that you accept these Terms and Conditions and that you agree to comply with them.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Services Provided</h2>
            <p className="mb-4">
                VoiceBlogify allows users to create blogs from audio recordings through a transcription process using Google Gemini.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. User Responsibilities</h2>
            <p className="mb-4">
                Users are responsible for the content they create and must ensure it does not violate any laws or third-party rights.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Audio Data Management</h2>
            <p className="mb-4">
                Once a blog is generated, we do not store the audio files. All audio files will be deleted after the blog creation, and third-party credentials will be removed from our database after the last active 7 days.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Integrations</h2>
            <p className="mb-4">
                Users have the right to choose which platforms to integrate (Medium, LinkedIn, Blogger) and can unsubscribe from the website at any time.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Transcription Services</h2>
            <p className="mb-4">
                We utilize Google Gemini for transcription services. By using our service, you acknowledge this integration.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Subscription Plans</h2>
            <p className="mb-4">
                VoiceBlogify offers subscription plans, including a free plan and a paid plan. The free plan allows users to create up to 2 blogs with all features available, while the paid plan offers full access without restrictions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">9. Billing and Payments</h2>
            <p className="mb-4">
                Users of the paid plan agree to pay the applicable fees for their chosen subscription plan. Payment will be billed at the beginning of each subscription period, and the fees are non-refundable.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">10. Cancellation Policy</h2>
            <p className="mb-4">
                Users may cancel their subscription at any time. Upon cancellation, users will retain access to the service until the end of the current billing cycle. No refunds will be issued for partial months or unused service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">11. Intellectual Property</h2>
            <p className="mb-4">
                All intellectual property rights in the Service and its content are owned by VoiceBlogify or its licensors. Users do not gain ownership of any intellectual property through their use of the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">12. Termination of Service</h2>
            <p className="mb-4">
                We reserve the right to terminate your access to the Service for violations of these Terms and Conditions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">13. User-Generated Content</h2>
            <p className="mb-4">
                Users retain ownership of their content but grant VoiceBlogify a non-exclusive license to use, display, and distribute the content for the purpose of providing the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">14. Disclaimer of Warranties</h2>
            <p className="mb-4">
                The Service is provided "as is" without any warranties of any kind. VoiceBlogify disclaims all warranties, whether express or implied, regarding the service's accuracy, reliability, or availability.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">15. Force Majeure</h2>
            <p className="mb-4">
                VoiceBlogify shall not be liable for any failure to perform its obligations under these Terms and Conditions due to circumstances beyond its reasonable control.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">16. Privacy Policy Reference</h2>
            <p className="mb-4">
                Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and disclose your personal information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">17. Changes to Terms</h2>
            <p className="mb-4">
                We may update these Terms and Conditions from time to time. Your continued use of the Service after any changes indicates your acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">18. Limitation of Liability</h2>
            <p className="mb-4">
                To the fullest extent permitted by law, VoiceBlogify shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">19. Governing Law</h2>
            <p className="mb-4">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">20. Contact Information</h2>
            <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:voiceblogify@gmail.com" className="hover:underline">voiceblogify@gmail.com</a>
            </p>
        </div>
    );
};

export default TermsAndConditions;
