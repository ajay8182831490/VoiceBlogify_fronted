import React from 'react';
import FeaturePanel from './FeaturePanel';
import LoginForm from './LoginForm';
import ResetPassword from './ResetPassword';
import OtpPage from './OtpPage';

export default function Login() {
    return (
        <div className="flex w-screen flex-wrap text-slate-800">
            <FeaturePanel />
            <LoginForm />
            {/* <ResetPassword />
            <OtpPage /> */}
        </div>
    );
}
