import React from 'react';
import FeaturePanel from './FeaturePanel';
import LoginForm from './LoginForm';

export default function Login() {
    return (
        <div className="flex w-screen flex-wrap text-slate-800">
            <FeaturePanel />
            <LoginForm />
        </div>
    );
}
