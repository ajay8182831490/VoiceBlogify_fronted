import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
    return (
        <motion.div
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-sm hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
        >
            <img
                src={testimonial.profilePic}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
            <p className="text-sm text-gray-600 italic mb-2">"{testimonial.message}"</p>
            <p className="text-xs text-gray-500">{testimonial.designation}</p>
        </motion.div>
    );
};

const Testimonials = ({ testimonials }) => {
    return (
        <div className="py-10 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Users Say</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-center md:flex-wrap">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Testimonials);
