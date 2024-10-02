import { useState } from "react";
import { SubmitButton } from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { Notify, NotifyFalse } from './NotifyToast.jsx'
const url = "http://localhost:4000"
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
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <p className="text-slate-500">Fill up the form to reset your password</p>

            {message && <p className="text-center text-red-500">{message}</p>}

            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="email">
                            <p className="font-medium text-slate-700 pb-2">Email address</p>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Enter email address"
                                required
                            />
                        </label>

                        <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <span>Send OTP</span>
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleOtpAndPasswordSubmit} className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="otp">
                            <p className="font-medium text-slate-700 pb-2">Enter OTP</p>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Enter the OTP sent to your email"
                                required
                            />
                        </label>

                        <label htmlFor="password">
                            <p className="font-medium text-slate-700 pb-2">New Password</p>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Enter new password"
                                required
                            />
                        </label>

                        <div className="flex justify-between items-center my-6">
                            <SubmitButton name="Submit" />

                            {/* Resend OTP Button */}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={!sendOtp}
                                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                            >
                                Resend OTP
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
