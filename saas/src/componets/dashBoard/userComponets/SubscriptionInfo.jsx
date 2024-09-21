import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
const url = "https://voiceblogify-backend.onrender.com"

const SubscriptionInfo = ({ planName, totalPosts, remainingPosts, nextDueDate }) => {
    return (
        <motion.div
            className="p-6 bg-white shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Subscription Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Plan:</p>
                    <p className="text-lg font-semibold text-gray-700">{planName}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Total Posts Created:</p>
                    <p className="text-lg font-semibold text-gray-700">{totalPosts}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Remaining Posts:</p>
                    <p className="text-lg font-semibold text-gray-700">{remainingPosts}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <div>
                        <p className="text-sm text-gray-500">Next Due Date:</p>
                        <p className="text-lg font-semibold text-gray-700">{nextDueDate}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Prop Types for validation
SubscriptionInfo.propTypes = {
    planName: PropTypes.string.isRequired,
    totalPosts: PropTypes.number.isRequired,
    remainingPosts: PropTypes.number.isRequired,
    nextDueDate: PropTypes.string.isRequired,
};

export default SubscriptionInfo;
