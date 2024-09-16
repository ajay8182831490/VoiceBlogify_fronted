import { motion } from 'framer-motion';

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <motion.div
                className="text-xl font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            >
                Processing your request...
            </motion.div>
        </div>
    );
}
