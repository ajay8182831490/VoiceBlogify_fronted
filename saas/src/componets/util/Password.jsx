import { useState } from "react";
import { SubmitButton } from "../SignUpForm.jsx";
import { useNavigate } from "react-router-dom";

import { Notify, NotifyFalse } from "../NotifyToast.jsx";
const url = import.meta.env.VITE_API_URL

import { useAuth } from "@/userContext/AuthContext";
export default function Password() {

    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [message, setMessage] = useState("");

    const { passwordUpdate, user } = useAuth();
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await passwordUpdate({ oldPassword, newPassword });
            Notify("Password updated successfully.");
            navigate('/');
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            NotifyFalse("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#020012" }}>
            <div className="w-full max-w-lg p-8 rounded-xl shadow shadow-slate-300 flex flex-col justify-center" style={{ backgroundColor: "#020012" }}>
                <h1 className="text-4xl font-medium text-white text-center mb-4">Change Password</h1>
                <p className="text-slate-400 text-center mb-6">Fill up the form to change your password</p>

                {/* Display error or success message */}
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-5">
                        {/* New Password Input */}
                        <label htmlFor="newPassword" className="block">
                            <span className="font-medium text-slate-400">New Password</span>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-1 py-3 px-4 bg-transparent border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800"
                                placeholder="Enter new password"
                                required
                            />
                        </label>

                        {/* Old Password Input */}
                        <label htmlFor="oldPassword" className="block">
                            <span className="font-medium text-slate-400">Old Password</span>
                            <input
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full mt-1 py-3 px-4 bg-transparent border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800"
                                placeholder="Enter old password"
                                required
                            />
                        </label>

                        <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 space-y-4 md:space-y-0">
                            <SubmitButton name="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
