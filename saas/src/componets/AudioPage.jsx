import React, { useState } from 'react';
import { Mic, Upload, LayoutDashboard, Menu } from 'lucide-react';
import MyAudioRecordingComponent from './AudioTest';
import ParentComponent from './ParentsFileUpload';
import { Link } from 'react-router-dom';

// Inline Button Component
const Button = ({
    children,
    variant = "default",
    className = "",
    size = "default",
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        ghost: "bg-gray-700 text-white hover:bg-blue-400",
        outline: "border border-gray-300 hover:bg-gray-700 text-white"
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Inline Card Components
const Card = ({ className = "", ...props }) => (
    <div className={`rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm ${className}`} {...props} />
);

const CardHeader = ({ className = "", ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

const CardTitle = ({ className = "", ...props }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

const CardContent = ({ className = "", ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props} />
);

// Inline Sheet Components
const Sheet = ({ children }) => {
    const [open, setOpen] = useState(false);
    return React.Children.map(children, child =>
        React.cloneElement(child, { open, setOpen })
    );
};

const SheetTrigger = ({ children, setOpen }) => {
    return React.cloneElement(children, {
        onClick: () => setOpen(true)
    });
};

const SheetContent = ({ children, open, setOpen, side = "right" }) => {
    if (!open) return null;

    const sideStyles = {
        left: "left-0",
        right: "right-0"
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-50"
                onClick={() => setOpen(false)}
            />
            <div className={`fixed ${sideStyles[side]} top-0 h-full w-80 bg-gray-800 p-6 shadow-lg z-50 animate-in slide-in-from-${side}`}>
                {children}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                >
                    ✕
                </button>
            </div>
        </>
    );
};

export default function AudioPage() {
    const [selectedOption, setSelectedOption] = useState('record');

    const NavButton = ({ option, icon: Icon, label }) => {
        // If it's the dashboard button, use an anchor tag
        if (option === 'dashboard') {
            return (
                <Link
                    to="/dashboard"
                    className={`flex items-center justify-center gap-2 w-full rounded-md p-2 font-medium transition-colors ${selectedOption === option
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-700 text-white hover:bg-blue-400"
                        }`}
                >
                    <Icon className="h-5 w-5" />
                    {label}
                </Link>
            );
        }

        // For other options, use the Button component
        return (
            <Button
                variant={selectedOption === option ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setSelectedOption(option)}
            >
                <Icon className="h-5 w-5" />
                {label}
            </Button>
        );
    };

    const NavigationContent = () => (
        <div className="space-y-2">
            <NavButton option="record" icon={Mic} label="Record" />
            <NavButton option="upload" icon={Upload} label="Upload" />
            <NavButton option="dashboard" icon={LayoutDashboard} label="Dashboard" />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white pt-16">
            {/* Mobile Menu Button Only */}
            <div className="md:hidden fixed top-16 right-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-center py-4">Speak Up</h2>
                            <NavigationContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 p-4">
                <div className="flex flex-col w-full">
                    <NavigationContent />
                </div>
            </div>

            {/* Main Content */}
            <main className="md:ml-64 p-6">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            {selectedOption === 'record' ? "Audio Recording" : "File Upload"}
                        </CardTitle>
                    </CardHeader>
                    <div className="p-4 bg-gray-800">
                        {selectedOption === 'record' && <MyAudioRecordingComponent />}
                        {selectedOption === 'upload' && <ParentComponent />}
                    </div>
                </Card>
            </main>
        </div>
    );
}









// export default function AudioPage1() {
//     const [selectedOption, setSelectedOption] = useState('record'); // Default to 'record'
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const navigate = useNavigate();

//     const handleOptionChange = (option) => {
//         setSelectedOption(option);
//         setIsMenuOpen(false); // Close menu on mobile when an option is selected
//     };

//     const handleNavigation = (path) => {
//         navigate(path);
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-900 text-white">

//             {/* Mobile Menu */}
//             <div className="md:hidden w-full bg-gray-800 p-4 flex justify-between items-center">
//                 <h1 className="text-2xl font-semibold">Speak Up</h1>
//                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
//                     <FaBars className="text-2xl" />
//                 </button>
//             </div>

//             {/* Mobile Sidebar */}
//             <div className={`md:hidden bg-gray-800 p-4 z-50 transition-transform transform ${isMenuOpen ? 'block' : 'hidden'}`}>
//                 <div className="flex flex-col">
//                     <button
//                         onClick={() => handleOptionChange('record')}
//                         className={`flex items-center justify-center w-full p-3 rounded-lg mb-2 ${selectedOption === 'record' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                         <FaMicrophone className="mr-2" /> Record
//                     </button>
//                     <button
//                         onClick={() => handleOptionChange('upload')}
//                         className={`flex items-center justify-center w-full p-3 rounded-lg mb-2 ${selectedOption === 'upload' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                         <FaUpload className="mr-2" /> Upload
//                     </button>
//                     <button
//                         onClick={() => handleNavigation('/dashboard')}
//                         className={`flex items-center justify-center w-full p-3 rounded-lg ${selectedOption === 'dashboard' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                         <FaTachometerAlt className="mr-2" /> Dashboard
//                     </button>
//                 </div>
//             </div>

//             {/* Sidebar for Desktop */}
//             <div className="hidden md:flex flex-col w-64 fixed top-0 left-0 h-full bg-gray-800 p-4">
//                 <h1 className="text-center text-2xl font-bold mb-8 text-gray-200">Speak Up</h1> {/* Changed text color to blue-400 */}
//                 <button
//                     onClick={() => handleOptionChange('record')}
//                     className={`flex items-center p-3 rounded-lg mb-4 ${selectedOption === 'record' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                     <FaMicrophone className="mr-2" /> Record
//                 </button>
//                 <button
//                     onClick={() => handleOptionChange('upload')}
//                     className={`flex items-center p-3 rounded-lg mb-4 ${selectedOption === 'upload' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                     <FaUpload className="mr-2" /> Upload
//                 </button>
//                 <button
//                     onClick={() => handleNavigation('/dashboard')}
//                     className={`flex items-center p-3 rounded-lg ${selectedOption === 'dashboard' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 transition-colors`}>
//                     <FaTachometerAlt className="mr-2" /> Dashboard
//                 </button>
//             </div>

//             {/* Right Content Area */}
//             <div className="flex-1 p-6 md:ml-64 text-center">
//                 <h1 className="text-3xl font-semibold mb-6">
//                     {selectedOption === 'record' ? "Audio Recording" : selectedOption === 'upload' ? "File Upload" : "Dashboard"}
//                 </h1>

//                 {/* Render the content based on the selected option */}
//                 {selectedOption === 'record' && <MyAudioRecordingComponent />}
//                 {selectedOption === 'upload' && <ParentComponent />}
//             </div>
//         </div>
//     );
// }
