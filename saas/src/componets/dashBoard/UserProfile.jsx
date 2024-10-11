import React from 'react';
import ProfileHeader from "./userComponets/ProfileHeader";
import BillingInfo from "./userComponets/BillingInfo";
import AccountManagement from './userComponets/AccountManagemnt';
import SubscriptionInfo from "./userComponets/SubscriptionInfo";
import { useAuth } from "@/userContext/AuthContext";
import { useProfile, UserContextProvider } from '@/userContext/UserContext';

const UserProfile = () => {
    const { handleLogout, handleChangePassword, isGoogle, onDisconnectLinkedIn,
        onDisconnectMedium } = useAuth();
    const { userInfo } = useProfile();


    const handleDownloadBill = () => {
        console.log("Downloading bill...");
    };




    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <ProfileHeader name={userInfo.name} email={userInfo.email} ProfilePicUrl={userInfo.profilePicUrl} />

            <SubscriptionInfo
                planName={userInfo.planPurchased}
                totalPosts={userInfo.totalBlogsCreated}
                remainingPosts={userInfo.totalRemainingPosts}
                nextDueDate={userInfo.nextDueDate}
            />


            {/* {userInfo && userInfo.planPurchased !== 'FREE' && (
                <BillingInfo onDownloadBill={handleDownloadBill} />
            )} */}

            <AccountManagement isGoogle={isGoogle}
                onChangePassword={handleChangePassword}
                onLogout={handleLogout}
                onDisconnectLinkedIn={onDisconnectLinkedIn}
                onDisconnectMedium={onDisconnectMedium}
            />
        </div>
    );

};


const UserProfileWithProvider = () => {
    return (
        <UserContextProvider>
            <UserProfile />
        </UserContextProvider>
    )
};

export default UserProfileWithProvider;
