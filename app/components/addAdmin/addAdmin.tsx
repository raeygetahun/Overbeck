import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import signup from '../../utils/api/Admin/newAdmin';
// import Loader from '../loader/loader';

const AddAdmin: React.FC = () => {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [signupMessage, setSignupMessage] = useState<string>('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signup(email, password, firstName, lastName);
            if (response.success) {
                setSignupMessage("Admin added successfully!");
            } else {
                const errorData = JSON.parse(response.error ?? "{}");
                setSignupMessage(errorData.error
                    || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setSignupMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className='bg-gray-900'>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 bg-gray-900">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://overbeck-museum.de/wp-content/uploads/2019/09/cropped-Overbeck-Museum-favicon-192x192.png"
                            alt="Overbeck"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Add New Admin
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password Again
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="passwordAgain"
                                        name="passwordAgain"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPasswordAgain(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                                        First Name
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                                        Last Name
                                    </label>
                                </div>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>
                                <button
                                    disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    ADD
                                </button>
                            </div>
                            <p className={`text-center font-bold text-xl ${signupMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{signupMessage}</p>

                            {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Sign Up
                            </button> */}
                        </div>
                    </div>
                </div>
            </form>
            {/* <Loader /> */}
        </div>
    );
};

export default AddAdmin;
