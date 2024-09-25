import { useState } from 'react';

const PricingFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Is there a trial period for the different plans?",
            answer: "You can try Blog Recorder for free to create 1 article. If you're satisfied with the platform, you can choose a plan that best suits your needs."
        },
        {
            question: "Can I switch between plans?",
            answer: "You can easily upgrade your plan at any time."
        },
        {
            question: "Are there any hidden fees beyond the displayed cost?",
            answer: "No, the subscription cost covers all the features and templates listed under each plan. There are no hidden fees or extra charges."
        },
        {
            question: "Is there a refund policy for cancellations?",
            answer: "There are no refunds for canceled subscriptions. If you cancel, you can continue to use the service until the end of your current billing period."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-section bg-gray-100 p-8 rounded-lg mt-10 w-full max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">Pricing FAQs</h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-2 transition-all duration-300">
                        <h4
                            onClick={() => toggleFAQ(index)}
                            className={`cursor-pointer text-lg font-semibold text-blue-600 hover:underline ${openIndex === index ? 'text-blue-800' : 'text-blue-600'}`}
                        >
                            {faq.question}
                        </h4>
                        {openIndex === index && (
                            <p className="text-sm text-gray-700 mt-2 transition-all duration-300 transform w-full max-w-xl">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingFAQ;
