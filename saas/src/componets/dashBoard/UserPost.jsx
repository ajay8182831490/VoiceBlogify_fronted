import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaShare } from 'react-icons/fa';

const UserPosts = ({ onEdit, onDelete, onView, onShare }) => {
    // Dummy data
    const posts = [
        { id: 1, title: "First Post", createdAt: "2024-09-01T10:00:00Z" },
        { id: 2, title: "Second Post", createdAt: "2024-09-05T12:00:00Z" },
        { id: 3, title: "Third Post", createdAt: "2024-09-10T14:00:00Z" },
        { id: 4, title: "Fourth Post", createdAt: "2024-09-15T16:00:00Z" },
        { id: 5, title: "Fifth Post", createdAt: "2024-09-20T18:00:00Z" },
    ];

    return (
        <motion.div
            className="p-6 bg-gradient-to-r from-purple-200 to-blue-400 shadow-lg rounded-lg mb-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Your Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-700">{post.title}</h3>
                            <p className="text-sm text-gray-500">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onView(post.id)}
                                className="text-green-500 hover:text-green-600 transition"
                                title="View Post"
                            >
                                <FaEye />
                            </button>
                            <button
                                onClick={() => onShare(post.id)}
                                className="text-blue-500 hover:text-blue-600 transition"
                                title="Share Post"
                            >
                                <FaShare />
                            </button>
                            <button
                                onClick={() => onEdit(post.id)}
                                className="text-yellow-500 hover:text-yellow-600 transition"
                                title="Edit Post"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDelete(post.id)}
                                className="text-red-500 hover:text-red-600 transition"
                                title="Delete Post"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200">
                    Previous
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200">
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default UserPosts;
