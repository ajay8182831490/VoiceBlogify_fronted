import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import { SiMedium } from 'react-icons/si';
import { usePost } from '@/userContext/PostContext';
import { useAuth } from '@/userContext/AuthContext';

const AccountManagement = ({ onLogout, isGoogle, onDisconnectLinkedIn, onDisconnectMedium }) => {
    const { hasLinkedinAccess, hasMediumAccess } = usePost()
    const { isVerified } = useAuth()
    return (
        <motion.div
            className="p-6 bg-white shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Management</h3>

            <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
                {!isGoogle && (
                    <Link
                        to="/user/password"
                        className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 ease-in-out shadow-md"
                        style={{ width: "fit-content" }}
                    >
                        <FaLock />
                        <span>Change Password</span>
                    </Link>
                )}

                <button
                    onClick={onLogout}
                    className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out shadow-md"
                    style={{ width: "fit-content" }}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

                {!isVerified && (
                    <Link
                        to="/verify"
                        className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 ease-in-out shadow-md"
                        style={{ width: "fit-content" }}
                    >
                        <FaLock />
                        <span>Verify Account</span>
                    </Link>
                )}


                {hasLinkedinAccess && (<button
                    onClick={onDisconnectLinkedIn}
                    className="inline-flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200 ease-in-out shadow-md"
                    style={{ width: "fit-content" }}
                >
                    <AiFillLinkedin />
                    <span>Disconnect LinkedIn</span>
                </button>)
                }

                {hasMediumAccess && (
                    <button
                        onClick={onDisconnectMedium}
                        className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out shadow-md"
                        style={{ width: "fit-content" }}
                    >
                        <SiMedium />
                        <span>Disconnect Medium</span>
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default AccountManagement;
