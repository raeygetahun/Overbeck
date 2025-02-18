import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import signup from '../../utils/api/volunteerSignup';
import Image from 'next/image';

const Signup: React.FC = () => {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [signupError, setSignupError] = useState<string>('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signup(email, password, firstName, lastName);
            if (response.success) {
                alert("User signed up successfully!");
                router.push('/signin');
            } else {
                const errorData = JSON.parse(response.error ?? "{}");
                setSignupError(errorData.error || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setSignupError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto h-12 w-auto"
                    src="https://overbeck-museum.de/wp-content/uploads/2019/09/cropped-Overbeck-Museum-favicon-192x192.png"
                    alt="Overbeck"
                />
                <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
                    Create a new account
                </h2>
                <p className="mt-1 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button
                        onClick={() => router.push('/signin')}
                        className="font-medium text-indigo-400 hover:text-indigo-300"
                        aria-label="Sign in"
                    >
                        Sign In
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                                First Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                                Last Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passwordAgain" className="block text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="passwordAgain"
                                    name="passwordAgain"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!email || !password || !passwordAgain || password !== passwordAgain}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                aria-label="Sign up"
                            >
                                Sign Up
                            </button>
                        </div>

                        {signupError && (
                            <div className="mt-4 p-2 bg-red-500 text-white text-sm text-center rounded-md">
                                {signupError}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;