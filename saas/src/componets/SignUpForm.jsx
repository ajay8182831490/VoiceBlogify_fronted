import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/userContext/AuthContext';
import { Notify, NotifyFalse } from './NotifyToast.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const url = import.meta.env.VITE_API_URL

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    name: z.string().min(1, 'Name is required.'),
});

export default function SignUpForm() {
    return (
        <div className="flex w-full flex-col md:w-1/2 pb-6 bg-slate-900">

            <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-6 md:justify-start lg:w-[28rem]">
                <p className="text-center text-3xl font-bold md:text-left md:leading-tight text-white">
                    Create your account
                </p>
                <p className="mt-4 text-center font-medium md:text-left text-slate-400">
                    Already using VoiceBlogify?{' '}
                    <Link to="/login" className="whitespace-nowrap font-semibold text-blue-500">
                        Login here
                    </Link>
                </p>
                <GoogleButton />
                <Divider />
                <LoginForm1 />
            </div>
        </div>
    );
}

export function GoogleButton() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const handleGoogleLogin = () => {
        if (isAuthLoading) return;
        setIsAuthLoading(true);

        const backendUrl = `${url}/auth/google`;
        window.location.href = backendUrl;
    };

    return (
        <button
            className="-2 mt-6 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2"
            onClick={handleGoogleLogin}
            disabled={isAuthLoading} // Disable button if loading
        >
            {isAuthLoading ? (
                <span>Loading...</span> // Optional: Show loading text or spinner
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 512 512">
                        <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                        <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                        <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                        <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                        <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                        <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                    </svg>
                    <span className="ml-2 text-white">Get started with Google</span> {/* Add margin-left for spacing */}
                </>
            )}
        </button>
    );
}


export function Divider() {
    return (
        <div className="relative mt-8 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <div className="flex-shrink mx-4 text-slate-400 text-sm">Or use email instead</div>
            <div className="flex-grow h-px bg-gray-300" />
        </div>
    );
}


function LoginForm1() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            const contentType = response.headers.get('content-type');
            let responseData;
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }


            if (response.status === 429) {
                NotifyFalse("You have already created an account. Please log in with your credentials.");
                navigate('/login');
            } else if (response.status >= 400 && response.status < 500) {
                NotifyFalse("Client error occurred. Please check your input and try again.");
            } else if (response.status >= 500) {
                NotifyFalse("Server error occurred. Please try again later.");
            } else if (responseData.authenticated) {
                Notify('Account created successfully');
                setIsAuthenticated(true);
                setUser({
                    name: responseData.name,
                });
                navigate('/');
            } else {
                NotifyFalse('User already exists!');
                navigate('/login');
            }

        } catch (error) {
            NotifyFalse('Error occurred during registration');
        }
    };

    return (
        <form className="flex flex-col items-stretch pt-2 md:pt-8" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                type="email"
                id="signup-email"
                placeholder="Email"
                {...register('email')}

                error={errors.email?.message}
            />
            <InputField
                type="text"
                id="signup-name"
                placeholder="Name"
                {...register('name')}

                error={errors.name?.message}
            />
            <InputField
                type="password"
                id="signup-password"
                placeholder="Password (minimum 6 characters)"
                {...register('password')}

                error={errors.password?.message}
            />
            <SubmitButton name="Sign Up" />
        </form>
    );
}
export const InputField = React.forwardRef(({ type, id, placeholder, error, ...rest }, ref) => {
    return (
        <div className="flex flex-col pt-4">
            <div className="relative flex overflow-hidden rounded-md  transition focus-within:border-blue-600">
                <input
                    type={type}
                    id={id}
                    className={`w-full mt-1 py-3 px-4 bg-transparent border  rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-slate-800 focus:outline-none ${error ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                />
            </div>
            {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
        </div>
    );
});

export function SubmitButton({ name }) {
    return (
        <button
            type="submit"
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
        >
            {name}
        </button>
    );
}