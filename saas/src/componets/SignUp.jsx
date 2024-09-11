import React from 'react';
import FeaturePanel from './FeaturePanel';
import SignUpForm from './SignUpForm';

export default function SignUp() {
    return (
        <div className="flex w-screen flex-wrap text-slate-800">
            <FeaturePanel />
            <SignUpForm />
        </div>
    );
}
