import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, Link } from 'react-router-dom'

import { useAuth } from '@/userContext/AuthContext'

import profilepng from '../assets/profile.png'

import { Notify } from './NotifyToast.jsx'
import { memo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link2 } from 'lucide-react'


const url = "http://localhost:4000"

const navigation = [
    { name: 'How Its work', href: '#howitworks', current: false },
    { name: 'Pricing', href: '/pricing', current: false },
    { name: 'Blog', href: '#blog', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = memo(() => {

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('login') === 'success') {
            Notify('Login successful with Google!');
        }
    }, [location]);

    const { handleLogout, isAuthenticated, isPaid, user } = useAuth();

    return (



        <>
            <Helmet>
                <title>VoiceBlogify - Transform Your Audio into Blog Posts</title>
                <meta name="description" content="Quickly convert your voice recordings into polished blog posts effortlessly." />
                <meta name="keywords" content="voice blog, audio to text, blog writing, content creation, voice recording, AI blog generator, VoiceBlogify, convert audio to blog, audio blogging platform, audio transcription, voice to blog" />
                <meta property="og:title" content="VoiceBlogify - Transform Your Audio into Blog Posts" />
                <meta property="og:description" content="Quickly convert your voice recordings into polished blog posts effortlessly." />
                <meta property="og:image" content="https://voiceblogify.in/landingpage.webp" />
                <meta property="og:url" content="https://voiceblogify.in" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="VoiceBlogify - Transform Your Audio into Blog Posts" />
                <meta name="twitter:description" content="Quickly convert your voice recordings into polished blog posts effortlessly." />
                <meta name="twitter:image" content="https://voiceblogify.in/landingpage.webp" />
            </Helmet>
            <Disclosure as="nav" className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 sticky top-0 z-50 shadow-lg">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <h1 className="text-white text-2xl font-bold ml-2">
                                    <Link to="/">VoiceBlogify</Link>
                                </h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-white text-gray-800' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {isAuthenticated ? (
                                <>
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    alt="User"
                                                    src={user?.profilepicurl || profilepng}
                                                    className="w-full h-full object-cover rounded-full"
                                                    onError={() => {
                                                        const parent = document.querySelector('.parent-element');
                                                        if (parent) {
                                                            parent.style.backgroundColor = '#3B82F6';
                                                        }
                                                    }}
                                                />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                <Link to="/dashboard/user-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    DashBoard
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link to="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Settings
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        await handleLogout();
                                                        Notify("You have logged out successfully")
                                                    }}
                                                >
                                                    Log Out
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {!isPaid && (
                                                <Link
                                                    to="/main"
                                                    className="bg-green-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-green-700 transition duration-150"
                                                >
                                                    Start Free
                                                </Link>
                                            )}
                                            <a
                                                href="#"
                                                className="bg-red-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-red-700 transition duration-150"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await handleLogout();
                                                    Notify("You have logged out successfully")
                                                }}
                                            >
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link
                                            to="/login"
                                            className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700 transition duration-150"
                                        >
                                            Login
                                        </Link>
                                        {!isPaid && (
                                            <Link
                                                to="/main"
                                                className="bg-green-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-green-700 transition duration-150"
                                            >
                                                Start Free
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="Link"
                                to={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-white text-gray-800' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <DisclosureButton as="Link" to="/dashboard/user-profile" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Dashboard
                                </DisclosureButton>
                                <DisclosureButton as="Link" to="/setting" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Settings
                                </DisclosureButton>
                                <DisclosureButton as="a" href="/#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={async (e) => {
                                    e.preventDefault();
                                    await handleLogout();
                                    Notify("You have logged out successfully")
                                }}>
                                    Log Out
                                </DisclosureButton>
                            </>
                        ) : (
                            <>
                                <DisclosureButton as="Link" to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                    Login
                                </DisclosureButton>
                                {!isPaid && (
                                    <DisclosureButton as="Link" to="/main" className="block rounded-md px-3 py-2 text-base font-medium text-white bg-green-600 hover:bg-green-700">
                                        Start Free
                                    </DisclosureButton>
                                )}
                            </>
                        )}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    )
})
export default Header