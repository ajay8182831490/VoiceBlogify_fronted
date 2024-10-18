import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
const url = import.meta.env.VITE_API_URL

const BillingInfo = ({ onDownloadBill }) => {
    return (
        <motion.div
            className="p-6 bg-white shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Billing Information</h3>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">Your current billing plan and history.</p>
                <span className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
            <button
                onClick={onDownloadBill}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out shadow-md"
            >
                <FaDownload />
                <span>Download Latest Bill</span>
            </button>
        </motion.div>
    );
};

export default BillingInfo;
