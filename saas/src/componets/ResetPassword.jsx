import { useState } from "react";

export default function ResetPassword() {
    const [email, setEmail] = useState(""); // Default value to avoid uncontrolled input warning
    const [message, setMessage] = useState(""); // State to handle success or error messages

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch('http://localhost:4000/otpGenrator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json(); // Parse the response JSON

            console.log(data)

            if (response.ok) {
                setMessage("Password reset link sent! Please check your email.");
            } else {
                setMessage(data.message || "Something went wrong, please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <p className="text-slate-500">Fill up the form to reset your password</p>

            {message && <p className="text-center text-red-500">{message}</p>} {/* Display message */}

            <form onSubmit={handleSubmit} className="my-10">
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                        <span>Reset password</span>
                    </button>

                    <p className="text-center">Not registered yet? <a href="/signup" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                        <span>Register now</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                    </a></p>
                </div>
            </form>
        </div>
    );
}