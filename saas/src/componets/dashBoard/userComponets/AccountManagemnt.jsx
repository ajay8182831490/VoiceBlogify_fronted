import { motion } from 'framer-motion';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';

const AccountManagement = ({ onChangePassword, onLogout }) => {
    return (
        <motion.div
            className="p-6 bg-white shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Management</h3>
            <div className="space-y-4">
                <button
                    onClick={onChangePassword}
                    className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 ease-in-out shadow-md"
                >
                    <FaLock />
                    <span>Change Password</span>
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out shadow-md"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default AccountManagement;
