import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';




const Signin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinError, setSigninError] = useState<string>('');
    const router = useRouter();
    const { data: session } = useSession();


    useEffect(() => {
        const checkAdminAndRedirect = async () => {
            if (session?.user?.email) {
                try {
                    if (session.user.email === "demo@volunteer.com") {
                        router.push('/volunteer/dashboard');
                    } else if (session.user.email === "demo@admin.com") {
                        router.push('/admin/dashboard');
                    } else if (session.user.image) {
                        router.push('/admin/dashboard');
                    } else {
                        router.push('/volunteer/dashboard');
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    // Handle error accordingly, perhaps show an error message to the user
                }
            }
        };

        checkAdminAndRedirect();
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', { email, password, redirect: false });
            if (!result?.error) {
                setSigninError("");
            } else {
                setSigninError('Incorrect email or password');
            }
        } catch (error) {
            setSigninError('Incorrect email or password');
            console.error('Sign in failed:', error);
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
                    Sign in to your account
                </h2>
                <p className="mt-1 text-center text-sm text-gray-400">
                    Don&apos;t have an account?
                    {' '}
                    <button
                        onClick={() => router.push('/volunteer/signup')}
                        className="font-medium text-indigo-400 hover:text-indigo-300"
                        aria-label="Create a new account"
                    >
                        Sign Up
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <button
                                    onClick={() => router.push('/forgot-password')}
                                    className="font-medium text-indigo-400 hover:text-indigo-300"
                                    aria-label="Forgot your password?"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!email || !password}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                aria-label="Sign in"
                            >
                                Sign in
                            </button>
                        </div>

                        {signinError && (
                            <div className="mt-4 p-2 bg-red-500 text-white text-sm text-center rounded-md">
                                {signinError}
                            </div>
                        )}
                    </form>

                    <div className="mt-6 p-4 border border-gray-700 rounded-md text-center text-sm text-gray-400">
                        <p className="font-medium">For Demo Login:</p>
                        <div className="mt-2 space-y-1">
                            <p>Volunteer: <strong>volunteer@demo.com</strong> | Password: <strong>demo</strong></p>
                            <p>Admin: <strong>admin@demo.com</strong> | Password: <strong>demo</strong></p>
                        </div>
                        <p className="mt-4">Use these demo accounts to explore the platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;