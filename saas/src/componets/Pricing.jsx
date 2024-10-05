import { motion } from 'framer-motion';
import { useState } from 'react';
import PricingFAQ from './PricingFaq';
import React from 'react';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '@/userContext/AuthContext';
import { useNavigate } from 'react-router-dom';
const url = "https://voiceblogify-backend.onrender.com"

import { Notify, NotifyFalse } from './NotifyToast';

const PricingCard = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPayPal, setShowPayPal] = useState(false);
    const [message, setMessage] = useState('');
    const [isDebitSelected, setIsDebitSelected] = useState(false);

    const { isAuthenticated } = useAuth();


    const navigate = useNavigate();
    const initialOptions = {
        "client-id": "AXDSMtGR3wtcpAC22RkkpDnkrNDVJ_9bM1zZbFSbN-slKgXukgqEFa-O1GWrSW1fBYt4fCDdLhLXfGgP",
        "enable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const monthlyPrices = {
        BASIC: '$9.99',
        PREMIUM: '$29.99',
        BUISNESS: '$99.99',
    };
    const yearlyPrices = {
        BASIC: '$89.88',
        PREMIUM: '$239.88',
        BUISNESS: '$959.88',
    };

    const [plans, setPlans] = useState([
        {
            id: 1,
            name: 'BASIC',
            price: monthlyPrices.BASIC,
            features: [
                { label: '10 recordings per month' },
                { label: '20 minute long recordings' },
                { label: 'Unlimited edits' },
                { label: 'Export articles as Rich Text, HTML, or Markdown' },
                { label: '100MB audio/video file uploads' },
                { label: 'YouTube link uploading' },
                { label: 'Social media share: Blogger, Medium, LinkedIn' },
            ],
            default: true,
        },
        {
            id: 2,
            name: 'PREMIUM',
            price: monthlyPrices.PREMIUM,
            features: [
                { label: '20 recordings per month' },
                { label: '60 minute long recordings' },
                { label: 'Unlimited edits' },
                { label: 'Export articles as Rich Text, HTML, or Markdown' },
                { label: '300MB audio/video file uploads' },
                { label: 'YouTube link uploading' },
                { label: 'Social media share: Blogger, Medium, LinkedIn' },
            ],
        },
        {
            id: 3,
            name: 'BUISNESS',
            price: monthlyPrices.BUISNESS,
            features: [
                { label: '50 recordings per month' },
                { label: '90 minute long recordings' },
                { label: 'Unlimited edits' },
                { label: 'Export articles as Rich Text, HTML, or Markdown' },
                { label: '500MB audio/video file uploads' },
                { label: 'YouTube link uploading' },
                { label: 'Social media share: Blogger, Medium, LinkedIn' },
            ],
        },
    ]);

    const togglePaymentPlan = () => {
        setIsYearly(prev => !prev);
        const updatedPlans = plans.map(plan => {
            return {
                ...plan,
                price: !isYearly ? yearlyPrices[plan.name] : monthlyPrices[plan.name],
            };
        });
        setPlans(updatedPlans);
    };

    const handlePayment = (plan) => {

        if (!isAuthenticated) {
            navigate('/login')
        }
        else {
            setSelectedPlan(plan);
            setShowPayPal(true);

        }



    };


    const handleSuccess = (details) => {

        setShowPayPal(false);
        Notify("Thank you! Your payment was successful.")
        navigate('/dashboard/user-profile')
    };

    const handleError = (error) => {
        setShowPayPal(false);


    };

    return (
        <div id="pricing" className="pricing-section flex flex-col items-center pt-10 pb-10">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
            <div className="container mx-auto p-8">
                <div className="flex justify-center items-center mb-8">
                    <span className="mr-2 text-black">{isYearly ? 'Yearly' : 'Monthly'}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only" onChange={togglePaymentPlan} />
                        <div className="w-14 h-8 bg-gray-300 rounded-full toggle-track">
                            <div className={`absolute left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${isYearly ? 'transform translate-x-full bg-blue-1000' : ''}`}></div>
                        </div>
                    </label>
                    <span className="ml-2 text-green">{isYearly ? 'Monthly' : 'Yearly'}</span>
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
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                onClick={() => handlePayment(plan)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-3 px-6 text-lg rounded-lg font-semibold text-white transition-colors duration-300 ${plan.default ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isYearly ? `Subscribe for ${yearlyPrices[plan.name]}` : `Subscribe for ${monthlyPrices[plan.name]}`}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {message && <p className="text-red-500">{message}</p>}
            </div>

            <PricingFAQ />

            {/* PayPal modal */}


            {isAuthenticated && showPayPal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowPayPal(false)}></div>
                    <div className="bg-white rounded-lg p-6 z-10 max-w-3xl mx-auto shadow-lg" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <button onClick={() => setShowPayPal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
                        <p className="text-gray-600 mb-4">You're about to subscribe to the {selectedPlan?.name} plan. Please review your details below.</p>
                        <div className="flex justify-between mb-6">
                            <span className="text-lg font-semibold">Plan:</span>
                            <span className="text-lg">{selectedPlan?.name} - {isYearly ? yearlyPrices[selectedPlan.name] : monthlyPrices[selectedPlan.name]}</span>
                        </div>


                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{
                                    shape: "rect",
                                    layout: "vertical",
                                }}
                                createOrder={async () => {
                                    try {
                                        const response = await fetch(`${url}/paypal/orders`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            credentials: 'include',
                                            body: JSON.stringify({
                                                cart: [
                                                    {
                                                        id: selectedPlan?.id,
                                                        name: selectedPlan?.name,
                                                        billingCycle: isYearly ? 'YEARLY' : 'MONTHLY',

                                                        unit_amount: {
                                                            currency_code: "USD",
                                                            value: isYearly ? yearlyPrices[selectedPlan.name].slice(1) : monthlyPrices[selectedPlan.name].slice(1),
                                                        },
                                                    },
                                                ],
                                            }),

                                        });
                                        const data = await response.json()
                                        if (response.status === 400) {

                                            setShowPayPal(false);
                                            NotifyFalse(data.message);
                                            navigate('/dashboard/user-profile');
                                            return null;
                                        }




                                        if (!data.id) {
                                            throw new Error("Order ID not returned from PayPal API");
                                        }

                                        return data.id;
                                    } catch (error) {
                                        setShowPayPal(false)
                                        NotifyFalse("Error creating the order. Please try again later.");

                                        throw error;
                                    }
                                }}
                                onApprove={async (data) => {

                                    try {
                                        const response = await fetch(`${url}/paypal/orders/${data.orderID}/capture`, {
                                            method: "POST",
                                            credentials: 'include',
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                cart: [
                                                    {
                                                        id: selectedPlan?.id,
                                                        name: selectedPlan?.name,
                                                        billingCycle: isYearly ? 'YEARLY' : 'MONTHLY',

                                                        unit_amount: {
                                                            currency_code: "USD",
                                                            value: isYearly ? yearlyPrices[selectedPlan.name].slice(1) : monthlyPrices[selectedPlan.name].slice(1),
                                                        },
                                                    },
                                                ],
                                            }),
                                        });
                                        const details = await response.json();


                                        if (details.status === "COMPLETED") {
                                            handleSuccess(details);
                                        } else {
                                            NotifyFalse("Payment capture failed! try again later")
                                            throw new Error("Payment capture failed");
                                        }
                                    } catch (error) {
                                        handleError(error);
                                    }
                                }}
                                onError={handleError}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PricingCard;
