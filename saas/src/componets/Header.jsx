import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/userContext/AuthContext'

import profilepng from '../assets/profile.png'

import { Notify } from './NotifyToast.jsx'
import { useEffect } from 'react'
const url = "https://voiceblogify-backend.onrender.com"

const navigation = [
    { name: 'Features', href: '#features', current: false },
    { name: 'Pricing', href: '#pricing', current: false },
    { name: 'Blog', href: '#blog', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('login') === 'success') {
            Notify('Login successful with Google!');
            // Optionally use a more user-friendly notification library here
        }
    }, [location])

    const { handleLogout, isAuthenticated, isPaid, user } = useAuth();

    return (
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
                                <a href="/">VoiceBlogify</a>
                            </h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-white text-gray-800' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </a>
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
                                            <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                DashBoard
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </a>
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
                                            <a
                                                href="/main"
                                                className="bg-green-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-green-700 transition duration-150"
                                            >
                                                Start Free
                                            </a>
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
                                    <a
                                        href="/login"
                                        className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700 transition duration-150"
                                    >
                                        Login
                                    </a>
                                    {!isPaid && (
                                        <a
                                            href="/main"
                                            className="bg-green-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-green-700 transition duration-150"
                                        >
                                            Start Free
                                        </a>
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
                            as="a"
                            href={item.href}
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
                            <DisclosureButton as="a" href="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Dashboard
                            </DisclosureButton>
                            <DisclosureButton as="a" href="/setting" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
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
                            <DisclosureButton as="a" href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Login
                            </DisclosureButton>
                            {!isPaid && (
                                <DisclosureButton as="a" href="/main" className="block rounded-md px-3 py-2 text-base font-medium text-white bg-green-600 hover:bg-green-700">
                                    Start Free
                                </DisclosureButton>
                            )}
                        </>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
