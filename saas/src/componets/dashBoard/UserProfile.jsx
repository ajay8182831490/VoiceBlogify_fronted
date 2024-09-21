import ProfileHeader from "./userComponets/ProfileHeader";
import BillingInfo from "./userComponets/BillingInfo";
import AccountManagement from "./userComponets/AccountManagemnt";
import SubscriptionInfo from "./userComponets/SubscriptionInfo";

const UserProfile = () => {
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        platforms: ["linkedin", "medium", "blog"],
        planName: "Premium",
        totalPosts: 10,
        remainingPosts: 90,
        nextDueDate: "Sep 30, 2024",
    };

    const handleDownloadBill = () => {
        console.log("Downloading bill...");
    };

    const handleChangePassword = () => {
        console.log("Changing password...");
    };

    const handleLogout = () => {
        console.log("Logging out...");
    };

    return (
        <div className="container mx-auto p-6">
            <ProfileHeader name={userData.name} email={userData.email} platforms={userData.platforms} />
            <SubscriptionInfo
                planName={userData.planName}
                totalPosts={userData.totalPosts}
                remainingPosts={userData.remainingPosts}
                nextDueDate={userData.nextDueDate}
            />
            <BillingInfo onDownloadBill={handleDownloadBill} />
            <AccountManagement
                onChangePassword={handleChangePassword}
                onLogout={handleLogout}
            />
        </div>
    );
};

export default UserProfile;
