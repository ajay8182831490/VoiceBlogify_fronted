import { motion } from 'framer-motion';
import { useState } from 'react';
import PricingFAQ from './PricingFaq';
import React from 'react';

const PricingCard = () => {
    const [isYearly, setIsYearly] = useState(false); // State to track toggle selection
    const [plans, setPlans] = useState([
        {
            name: 'Basic',
            price: isYearly ? '$89.88' : '$9.99', // Annual price
            features: [
                { label: '10 recordings per month', corrected: false },
                { label: '20 minute long recordings', corrected: false },
                { label: 'Unlimited edits', corrected: false },
                { label: 'Export articles as Rich Text, HTML, or Markdown', corrected: false },
                { label: '100MB audio/video file uploads', corrected: false },
                { label: 'YouTube link uploading', corrected: false },
                { label: 'Social media share: Blogger, Medium, LinkedIn', corrected: false },
            ],
            button: isYearly ? 'Subscribe for $89.88' : 'Subscribe for $9.99',
            default: true,
        },
        {
            name: 'Premium',
            price: isYearly ? '$239.88' : '$29.99', // Annual price
            features: [
                { label: '20 recordings per month', corrected: false },
                { label: '60 minute long recordings', corrected: false },
                { label: 'Unlimited edits', corrected: false },
                { label: 'Export articles as Rich Text, HTML, or Markdown', corrected: false },
                { label: '300MB audio/video file uploads', corrected: false },
                { label: 'YouTube link uploading', corrected: false },
                { label: 'Social media share: Blogger, Medium, LinkedIn', corrected: false },
            ],
            button: isYearly ? 'Subscribe for $239.88' : 'Subscribe for $29.99',
        },
        {
            name: 'Business',
            price: isYearly ? '$959.88' : '$99.99', // Annual price
            features: [
                { label: '50 recordings per month', corrected: false },
                { label: '90 minute long recordings', corrected: false },
                { label: 'Unlimited edits', corrected: false },
                { label: 'Export articles as Rich Text, HTML, or Markdown', corrected: false },
                { label: '500MB audio/video file uploads', corrected: false },
                { label: 'YouTube link uploading', corrected: false },
                { label: 'Social media share: Blogger, Medium, LinkedIn', corrected: false },
            ],
            button: isYearly ? 'Subscribe for $959.88' : 'Subscribe for $99.99',
        },
    ]);

    const handleCorrect = (planIdx, featureIdx) => {
        setPlans(prevPlans => {
            const updatedPlans = [...prevPlans];
            updatedPlans[planIdx].features[featureIdx].corrected = !updatedPlans[planIdx].features[featureIdx].corrected;
            return updatedPlans;
        });
    };

    const togglePaymentPlan = () => {
        setIsYearly(!isYearly);
        setPlans(prevPlans => prevPlans.map(plan => ({
            ...plan,
            price: isYearly ? (plan.price.replace('$89.88', '$9.99').replace('$239.88', '$29.99').replace('$959.88', '$99.99')) :
                (plan.price.replace('$9.99', '$89.88').replace('$29.99', '$239.88').replace('$99.99', '$959.88')),
            button: isYearly ? plan.button.replace(/\$\d+\.\d+/, (parseFloat(plan.button.match(/\d+\.\d+/)[0]) * 12).toFixed(2)) :
                plan.button.replace(/\$\d+\.\d+/, (parseFloat(plan.button.match(/\d+\.\d+/)[0]) / 12).toFixed(2)),
        })));
    };

    return (
        <>

            <div id="pricing" className="pricing-section flex flex-col items-center pt-10 pb-10">
                <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>

                <div className="container mx-auto p-8">


                    <div className="flex justify-center items-center mb-8">
                        <span className="mr-2 text-black">{isYearly ? 'Monthly' : 'Yearly'}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only" onChange={togglePaymentPlan} />
                            <div className="w-14 h-8 bg-gray-300 rounded-full toggle-track">
                                <div className={`absolute left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${isYearly ? 'transform translate-x-full bg-blue-500' : ''}`}></div>
                            </div>
                        </label>
                        <span className="ml-2 text-green">{isYearly ? 'Yearly' : 'Monthly'}</span>
                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan, planIdx) => (
                            <motion.div
                                key={planIdx}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: planIdx * 0.2 }}
                                className="relative border rounded-lg shadow-xl p-8 text-center bg-gradient-to-br from-purple-500 via-blue-500 to-blue-400 hover:shadow-2xl transition-all duration-500"
                            >
                                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                                <p className="text-4xl font-extrabold text-white mb-6">{plan.price}</p>
                                <p className="text-sm text-white mb-4">Pay Yearly, Get 2 Months Free</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIdx) => (
                                        <li key={featureIdx} className="flex justify-between items-center text-white text-sm opacity-90">
                                            <span>{feature.label}</span>
                                            <button
                                                onClick={() => handleCorrect(planIdx, featureIdx)}
                                                className={`ml-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${feature.corrected ? 'bg-green-600' : 'bg-blue-400'}`}
                                            >
                                                {feature.corrected ? (
                                                    <svg
                                                        className="w-5 h-5 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M7.629 12.25l-3.36-3.36a1 1 0 00-1.415 1.415l4.25 4.25a1 1 0 001.415 0l8-8a1 1 0 00-1.415-1.415l-7.293 7.293z" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-white">✓</span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full py-3 px-6 text-lg rounded-lg font-semibold text-white transition-colors duration-300 ${plan.default ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {plan.button}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <PricingFAQ />
            </div>
        </>

    );
};

export default React.memo(PricingCard);
