import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMedium, AiOutlineBulb, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { FaBlogger } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';
import { MdPostAdd } from 'react-icons/md';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useAuth } from '@/userContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardRoutes from './DashBoardRoutes';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    const { isAuthenticated, handleLogout } = useAuth();



    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {!isMobile && (
                <button
                    className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ? <HiOutlineChevronLeft size={24} /> : <HiOutlineChevronRight size={24} />}
                </button>
            )}


            {isSidebarVisible && !isMobile && (
                <div className=" w-1/4 p-4 shadow-lg sticky top-0 h-screen" style={{ backgroundColor: "#020012" }}>
                    <h2 className="text-2xl font-bold text-center mb-4 text-white">Dashboard</h2>
                    <div className="flex flex-col space-y-4">
                        <SidebarItem to="/dashboard/user-profile" icon={<AiOutlineUser />} label="User Profile" />
                        <SidebarItem to="/dashboard/user-posts" icon={<MdPostAdd />} label="Your Posts" />
                        <SidebarItem to="/dashboard/linkedin" icon={<SiLinkedin />} label="LinkedIn" />
                        <SidebarItem to="/dashboard/medium" icon={<AiOutlineMedium />} label="Medium" />
                        <SidebarItem to="/dashboard/blogger" icon={<FaBlogger />} label="Blogger" />
                        <SidebarItem to="/dashboard/analytics" icon={<AiOutlineBulb />} label="Analytics" />
                    </div>
                    <button className="flex items-center p-2 mt-4 text-red-600 hover:bg-red-100 rounded transition" onClick={handleLogout}>
                        <AiOutlineLogout className="mr-2" /> Logout
                    </button>
                </div>
            )}


            {isMobile && (
                <>
                    <motion.div
                        className={`fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-40 ${isModalOpen ? 'block' : 'hidden'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className=" p-5 w-3/4 md:w-1/3 relative mt-16" style={{ backgroundColor: "#020012" }}>
                            <button onClick={toggleModal} className="absolute top-4 right-4 text-white hover:text-gray-100">
                                <AiOutlineClose size={24} />
                            </button>
                            <h3 className="text-lg font-bold mb-4 text-white">Dashboard</h3>
                            <div className="flex flex-col space-y-2">
                                <SidebarItem to="/dashboard/user-profile" icon={<AiOutlineUser />} label="User Profile" />
                                <SidebarItem to="/dashboard/user-posts" icon={<MdPostAdd />} label="Your Posts" />
                                <SidebarItem to="/dashboard/linkedin" icon={<SiLinkedin />} label="LinkedIn" />
                                <SidebarItem to="/dashboard/medium" icon={<AiOutlineMedium />} label="Medium" />
                                <SidebarItem to="/dashboard/blogger" icon={<FaBlogger />} label="Blogger" />
                                <SidebarItem to="/dashboard/analytics" icon={<AiOutlineBulb />} label="Analytics" />
                            </div>
                        </div>
                    </motion.div>

                    {!isModalOpen && (
                        <button
                            className="fixed top-20 right-5 z-50 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition"
                            onClick={toggleModal}
                        >
                            <MdPostAdd />
                        </button>
                    )}
                </>
            )}

            <DashboardRoutes />
        </div>
    );
};

const SidebarItem = ({ to, icon, label }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Link to={isAuthenticated ? to : '/login'}>
            <div className="flex items-center p-4 mb-2 bg-white bg-opacity-20 rounded-none shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-opacity-30">
                <span className='text-white'> {icon}</span>
                <span className="ml-2 text-white font-semibold">{label}</span>
            </div>
        </Link>
    );
};

export default Dashboard;
