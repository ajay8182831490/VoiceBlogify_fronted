import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const FAQs = [
    {
        question: "What is VoiceBlogify?",
        answer: "VoiceBlogify is an AI tool that converts your voice recordings or audio/video files into blog articles, supporting 120+ languages for easy content creation."
    },
    {
        question: "What audio and video formats are supported?",
        answer: "We support various formats: Audio: .mp3, .wav, .ogg, .m4a, .aiff; Video: .mp4, .avi, .m4v, .ogv, .webm."
    },
    {
        question: "Can I customize content for different platforms?",
        answer: "Yes! Users can modify the generated blog content for each platform, ensuring tailored posts for Medium, LinkedIn, Blogger, and more."
    },
    {
        question: "How many times can I share the generated blog?",
        answer: "You can share the generated blog multiple times and make edits whenever you like—there are no limits!"
    },
    {
        question: "What’s the recording limit?",
        answer: "Recording limits depend on your plan. Check the Plans & Pricing section for details, with some plans allowing up to 20 minutes."
    },
    {
        question: "How many languages does VoiceBlogify support for transcription ?",
        answer: "VoiceBlogify supports transcription in more than 120 languages, making it accessible for users worldwide."
    },
    {
        question: "In what formats can users export their blogs?",
        answer: "Users can export their generated blogs in plain HTML and Markdown formats, making it easy to integrate into various platforms"
    },
    {
        question: "How does VoiceBlogify work?",
        answer: `1. Record or upload your audio/video.
         2. Our AI transcribes it into a blog. 
         3. Edit and publish directly to your preferred platform.`
    },
    {
        question: "Is it user-friendly?",
        answer: "Absolutely! VoiceBlogify is designed for everyone, making content creation effortless, even for beginners."
    },
];

const FAQComponent = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 py-10" style={{ backgroundColor: "#020012" }}>
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {FAQs.map((faq, index) => (
                        <div key={index} className=" rounded-lg shadow-md" style={{ backgroundColor: "#121020" }}>
                            <button
                                className="flex justify-between w-full p-4 text-left text-lg font-semibold text-white"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="p-4 text-white">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQComponent;
