import { Trophy } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/userContext/AuthContext';


export default function SignUpForm() {
    return (
        <div className="flex w-full flex-col md:w-1/2">
            <div className="flex justify-center pt-12 md:justify-start md:pl-12">
                <a href="/" className="text-2xl font-bold text-blue-600">
                    BlogRecorder
                </a>
            </div>
            <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your  account</p>
                <p className="mt-6 text-center font-medium md:text-left">
                    Already using BlogRecorder?{' '}
                    <a href="/login" className="whitespace-nowrap font-semibold text-blue-700">
                        Login here
                    </a>
                </p>
                <GoogleButton />
                <Divider />
                <LoginForm1 />
            </div>
        </div>
    );
}

export function GoogleButton() {
    return (
        <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2" onClick={() => window.location.href = 'http://localhost:4000/auth/google'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 512 512">
                <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                <path
                    d="M10 10 H 90 V 90 H 10 L 10 10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="black"
                />
            </svg>
            Get started with Google
        </button>
    );
}

export function Divider() {
    return (
        <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
                Or use email instead
            </div>
        </div>
    );
}

function LoginForm1() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setIsAuthenticated, setUser } = useAuth();

    const handleSubmitForm = async (e) => {
        e.preventDefault();



        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
                credentials: 'include',
            });
            const contentType = response.headers.get('content-type');

            let data;
            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it as JSON
                data = await response.json();
            } else {
                // Otherwise, treat it as plain text
                data = await response.text();
            }

            console.log("login", data);
            if (data.authenticated) {
                alert('account created succesfully');
                setIsAuthenticated(true);
                setUser({
                    name: data.user.name,
                    userId: data.user.id,

                });
                navigate('/');
            }
            else {
                alert("user already exist")
                navigate('/login')
            }
        } catch (error) {
            console.log('Error occurred during registration', error);
        }
    };

    return (
        <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmitForm}>
            <InputField
                type="email"
                id="signup-email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type="text"
                id="signup-name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputField
                type="password"
                id="signup-password"
                placeholder="Password (minimum 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton name="Sign In" />
        </form>
    );
}

export function InputField({ type, id, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col pt-4">
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                    type={type}
                    id={id}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder={placeholder}
                    value={value} // Ensure value is passed
                    onChange={onChange} // Ensure onChange is passed
                />
            </div>
        </div>
    );
}

export function SubmitButton({ name }) {
    return (
        <button
            type="submit"
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
        >
            {name}
        </button>
    );
}
