import React from 'react';
import { Link as Link2 } from 'react-router-dom';
import {
    Briefcase,
    GraduationCap,
    Mic,
    Pencil,
    Clock,
    Brain,
    Globe,
    Youtube,
    BookOpen,
    MessagesSquare,
    Video,
    Mic2,
    Users,
    Link
} from 'lucide-react';
import { Button } from '@headlessui/react';

const PASSection = () => {
    const audienceCategories = [
        {
            title: "Content Creators",
            icon: Mic,
            problems: [
                "Hours wasted turning podcasts into blog posts",
                "Struggle to maintain presence across platforms",
                "Can't keep up with content demands"
            ]
        },
        {
            title: "Students",
            icon: GraduationCap,
            problems: [
                "Lecture recordings sitting unused",
                "Study group discussions lost forever",
                "Voice notes need organization"
            ]
        },
        {
            title: "Educators",
            icon: BookOpen,
            problems: [
                "Can't share lecture content effectively",
                "Limited reach of classroom discussions",
                "Teaching insights remain unwritten"
            ]
        },
        {
            title: "Professionals",
            icon: Briefcase,
            problems: [
                "Meeting insights never documented",
                "Ideas lost in voice memos",
                "No time to write reports"
            ]
        },
        {
            title: "YouTubers",
            icon: Youtube,
            problems: [
                "Videos not reaching reading audience",
                "Missing out on SEO benefits",
                "Can't repurpose video content"
            ]
        },
        {
            title: "Personal Users",
            icon: Brain,
            problems: [
                "Journal thoughts remain unwritten",
                "Personal stories untold",
                "Ideas never make it to paper"
            ]
        }
    ];

    const commonPains = [
        {
            icon: Clock,
            title: "Time is Precious",
            description: "Whether you're a busy student, creator, or professional - writing takes too much time."
        },
        {
            icon: Globe,
            title: "Language Barriers",
            description: "Express yourself freely in your native language, let AI perfect the written form."
        },
        {
            icon: Video,
            title: "Lost Content",
            description: "Valuable recordings from classes, meetings, or personal thoughts vanish unused."
        },
        {
            icon: Mic2,
            title: "Speaking vs Writing",
            description: "You can express ideas perfectly while speaking, but writing feels like a chore."
        }
    ];

    return (
        <div className="w-full bg-[#020012] py-16 px-6 md:px-10 lg:px-16 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                        Your Voice Has Power. Let It Be Heard.
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-400 mb-12">
                        Everyone has something valuable to share. Don't let the writing process hold you back.
                    </p>
                </div>

                {/* Common Pain Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {commonPains.map((pain, index) => (
                        <div key={index} className="bg-slate-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <pain.icon className="w-12 h-12 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-slate-200">{pain.title}</h3>
                            <p className="text-slate-300">{pain.description}</p>
                        </div>
                    ))}
                </div>

                {/* Audience Specific Problems */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {audienceCategories.map((category, index) => (
                        <div key={index} className="bg-slate-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <category.icon className="w-12 h-12 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-slate-200">{category.title}</h3>
                            <ul className="space-y-3">
                                {category.problems.map((problem, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span className="text-slate-300">{problem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Agitation Section */}
                <div className="my-16 bg-indigo-900 p-8 rounded-xl shadow-lg text-center">
                    <h3 className="text-3xl font-bold mb-6 text-yellow-400">
                        What Are You Missing Out On?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-4">
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">Students:</span> Your lecture notes could help thousands of other learners.
                            </p>
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">Creators:</span> Your voice content is missing its reading audience.
                            </p>
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">Educators:</span> Your knowledge is limited to those who can attend.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">Professionals:</span> Your expertise stays trapped in meetings.
                            </p>
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">YouTubers:</span> Your videos could be powerful articles.
                            </p>
                            <p className="text-xl text-slate-200">
                                <span className="text-yellow-400">Personal Users:</span> Your stories deserve to be shared.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Solution Section */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-indigo-300 mb-8">
                        Your Voice, Your Story, Your Way
                    </h2>
                    <div className="max-w-4xl mx-auto mb-10">
                        <p className="text-xl md:text-2xl text-slate-400 mb-6">
                            Voiceblogify transforms any voice or video content into beautifully written posts - perfect for your needs.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                                <p className="text-indigo-800 text-lg">Record or Upload</p>
                            </div>
                            <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                                <p className="text-indigo-800 text-lg">AI Transforms</p>
                            </div>
                            <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                                <p className="text-indigo-800 text-lg">Share Everywhere</p>
                            </div>
                        </div>
                    </div>

                    <Link2
                        to="/main"
                        className="bg-indigo-600 hover:bg-indigo-700 transition-all px-10 py-4 rounded-full text-white text-lg font-semibold inline-flex items-center gap-2"
                    >
                        Start Turning Your Voice Into Content
                        <MessagesSquare className="w-5 h-5" />
                    </Link2>
                    <p className="text-slate-500 mt-6">
                        Join students, creators, educators, and professionals who've found their voice
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PASSection;
