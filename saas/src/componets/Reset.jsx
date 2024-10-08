import { useState } from "react";
import { SubmitButton } from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { Notify, NotifyFalse } from './NotifyToast.jsx'
const url = "https://voiceblogify-backend.onrender.com"
export default function ResetPassword1() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [sendOtp, setSendOtp] = useState(false);
    const navigate = useNavigate(); // Adding navigate

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/otpGenrator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("OTP has been sent to your email.");
                setStep(2);
                setSendOtp(true);
                Notify("OTP has been sent to your email")

            } else {
                setMessage(data.message || "Something went wrong, please try again.");
                NotifyFalse("Something went wrong, please try again")
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            NotifyFalse("Something went wrong, please try again")
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await fetch(`${url}/otpGenrator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("OTP has been resent to your email.");
                setSendOtp(true);
                NotifyFalse("OTP has been resent to your email.")
            } else {
                setMessage(data.message || "Failed to resend OTP. Please try again.");
                NotifyFalse("Failed to resend OTP. Please try again.")
            }
        } catch (error) {
            setMessage("An error occurred while resending the OTP. Please try again.");
            NotifyFalse("Failed to resend OTP. Please try again.")
        }
    };

    const handleOtpAndPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/resetPassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password has been reset successfully!");
                Notify("Password has been reset successfully!")
                navigate('/login');
            } else {
                setMessage(data.message || "Invalid OTP or something went wrong.");
                NotifyFalse("Invalid OTP or something went wrong.")
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#020012" }}>
            <div className="w-full max-w-lg p-8 rounded-xl shadow shadow-slate-300 flex flex-col justify-center" style={{ backgroundColor: "#020012" }}>
                <h1 className="text-4xl font-medium text-white text-center mb-4">Reset Password</h1>
                <p className="text-slate-400 text-center mb-6">Fill up the form to reset your password</p>

                {/* Display error message */}
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                {/* Step 1: Email Submission */}
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="space-y-5">
                            <label htmlFor="email" className="block">
                                <span className="font-medium text-slate-400">Email Address</span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-1 py-3 px-4 bg-transparent border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800"
                                    placeholder="Enter email address"
                                    required
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full py-3 mt-4 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg hover:shadow-md transition duration-300"
                            >
                                Send OTP
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2: OTP and Password Submission */}
                {step === 2 && (
                    <form onSubmit={handleOtpAndPasswordSubmit}>
                        <div className="space-y-5">
                            <label htmlFor="otp" className="block">
                                <span className="font-medium text-slate-400">Enter OTP</span>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full mt-1 py-3 px-4 bg-transparent border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800"
                                    placeholder="Enter the OTP sent to your email"
                                    required
                                />
                            </label>

                            <label htmlFor="password" className="block">
                                <span className="font-medium text-slate-400">New Password</span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-1 py-3 px-4 bg-transparent border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800"
                                    placeholder="Enter new password"
                                    required
                                />
                            </label>

                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 space-y-4 md:space-y-0">
                                <SubmitButton name="Submit" />

                                {/* Resend OTP Button */}
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={!sendOtp}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>



    );
}
