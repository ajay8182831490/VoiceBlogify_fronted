import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaLinkedin, FaMedium, FaBlog } from 'react-icons/fa';

const ProfileHeader = ({ name, email, ProfilePicUrl }) => {
    return (
        <motion.div
            className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.01 }}
        >
            <div className="flex items-center space-x-4">
                {ProfilePicUrl ? (
                    <img
                        src={ProfilePicUrl}
                        alt={name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "defaultProfilePicUrl";
                        }}
                    />
                ) : (
                    <FaUserCircle className="text-5xl text-white" />
                )}
                <div>
                    <h2 className="text-2xl font-semibold text-white">{name}</h2>
                    <p className="text-sm text-gray-200 flex items-center">
                        <FaEnvelope className="mr-2" />
                        {email}
                    </p>
                </div>
            </div>
            {/* <div className="mt-4 flex space-x-4">
                {platforms.includes('linkedin') && <FaLinkedin className="text-white text-2xl" />}
                {platforms.includes('medium') && <FaMedium className="text-white text-2xl" />}
                {platforms.includes('blog') && <FaBlog className="text-white text-2xl" />}
            </div> */}
        </motion.div>
    );
};

export default ProfileHeader;
