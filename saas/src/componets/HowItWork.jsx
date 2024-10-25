import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaCode } from 'react-icons/fa';

const VisualPath = () => {
    const steps = [
        {
            title: "Record",
            description: "Directly record your voice for seamless content creation.",
            color: "#4A90E2",
            side: "left"
        },
        {
            title: "Upload",
            description: "Upload audio or video files effortlessly.",
            color: "#2ECC71",
            side: "right"
        },
        {
            title: "Transform",
            description: "Enhance your recordings with AI-powered tools.",
            color: "#F1C40F",
            side: "left"
        },
        {
            title: "Edit",
            description: "Refine your content with user-friendly editing features.",
            color: "#9B59B6",
            side: "right"
        },
        {
            title: "Share",
            description: "Easily share on LinkedIn, Medium, and Blogger.",
            color: "#E74C3C",
            side: "left"
        }
    ];


    return (
        <>
            <div className="w-full  p-4 md:p-8 lg:p-12" style={{ backgroundColor: "#020012" }}>
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        How it works
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Transform your ideas into engaging content
                    </p>
                </div>

                {/* Desktop Version */}
                <div className="hidden lg:block relative max-w-5xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 transform -translate-x-1/2" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative mb-24">
                            {/* Connecting dot on the line */}
                            <div
                                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                style={{ top: '50%' }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full border-4 border-slate-900"
                                    style={{ backgroundColor: step.color }}
                                />
                            </div>

                            <div
                                className={`flex items-center ${step.side === 'left' ? 'justify-end' : 'justify-start'} gap-8`}
                            >
                                {/* Content box */}
                                <div
                                    className={`w-[calc(50%-3rem)] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 cursor-pointer
                  ${step.side === 'left' ? 'text-right mr-8' : 'text-left ml-8'}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                                        borderLeft: step.side === 'right' ? `4px solid ${step.color}` : 'none',
                                        borderRight: step.side === 'left' ? `4px solid ${step.color}` : 'none'
                                    }}
                                >
                                    {/* Number badge */}
                                    <div
                                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold mb-4
                    ${step.side === 'left' ? 'float-right ml-4' : 'float-left mr-4'}`}
                                        style={{ backgroundColor: `${step.color}30`, color: step.color }}
                                    >
                                        {index + 1}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-slate-400">{step.description}</p>
                                    </div>

                                    {/* Connector line */}
                                    <div
                                        className={`absolute top-1/2 ${step.side === 'left' ? 'right-0 left-auto' : 'left-0 right-auto'} w-8 h-0.5`}
                                        style={{ backgroundColor: step.color }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative p-6 rounded-xl transform transition-all duration-300 hover:scale-102"
                            style={{
                                background: `linear-gradient(135deg, ${step.color}15, transparent)`,
                                borderLeft: `4px solid ${step.color}`
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                                    style={{ backgroundColor: `${step.color}30`, color: step.color }}
                                >
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-slate-400 text-sm">{step.description}</p>
                                </div>
                            </div>

                            {/* Vertical connector for all but last item */}
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute left-8 h-6 w-0.5 bg-slate-700"
                                    style={{ top: '100%' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <motion.section
                className="container mx-auto px-6 py-16"


                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-white mb-4">Edit and Export with Ease</h3>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Enhance your articles with our rich text editor, available even on your phone. Customize and refine your content to perfection before publishing.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div
                        className="p-8  rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center bg-slate-900"

                        whileHover={{ scale: 1.05 }}
                    >
                        <FaEdit className="text-5xl text-blue-600 mb-4 mx-auto" />
                        <h4 className="text-xl font-semibold text-white mb-2">Edit with Ease</h4>
                        <p className="text-gray-300">
                            Our rich text editor allows you to make modifications to your articles seamlessly. Whether on desktop or mobile, adjust your content as needed.
                        </p>
                    </motion.div>
                    <motion.div
                        className="p-8 bg-slate-900 rounded-lg shadow-lg hover:shadow-2xl transition relative overflow-hidden text-center"
                        whileHover={{ scale: 1.05 }}

                    >
                        <FaCode className="text-5xl text-blue-600 mb-4 mx-auto" />
                        <h4 className="text-xl font-semibold text-white mb-2">Export Anywhere</h4>
                        <p className="text-gray-300">
                            Export your articles in Rich Text, plain HTML, or Markdown format. Perfect for publishing directly on any platform or website.
                        </p>
                    </motion.div>
                </div>
            </motion.section>
        </>

    );
};



export default React.memo(VisualPath);
