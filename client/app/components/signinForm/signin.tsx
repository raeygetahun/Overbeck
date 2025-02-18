import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'
import { getAdminMemberByEmail } from "../../../app/utils/Firebase/config";




const Signin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinError, setsigninError] = useState<string>('');
    const router = useRouter();
    const { data: session } = useSession();


    useEffect(() => {
        const checkAdminAndRedirect = async () => {
            if (session?.user?.email) {
                try {
                    // const isAdmin = await getAdminMemberByEmail(session.user.email);
                    if (session?.user?.image) {
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
            // Attempt to sign in
            const result = await signIn('credentials', { email, password, redirect: false })

            if (!result?.error) {
                setsigninError("");
                // const { data: session, status } = useSession()
                // const isadmin = await getAdminMemberByEmail(result?.user?.email as string);
                // setsigninError(isadmin);
                // isadmin ? router.push('/admin/admin') : router.push('/volunteer/dashboard');
            } else {
                // If sign-in fails, set error message
                setsigninError('Incorrect email or password');
            }
        } catch (error) {
            setsigninError('Incorrect email or password');
            console.error('Sign in failed:', error);
            // Handle other errors if necessary
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://overbeck-museum.de/wp-content/uploads/2019/09/cropped-Overbeck-Museum-favicon-192x192.png"
                            alt="Overbeck"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
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
                                    <div className="text-sm">
                                        <div onClick={() => router.push('/forgot-password')} className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
                                            Forgot password?
                                        </div>
                                    </div>
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
                                <button
                                    disabled={!email || !password}
                                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                            {signinError && <p className="text-red-500 text-center font-bold text-xl">{signinError}</p>}
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-400">
                            Not a member?{' '}
                            <button onClick={() => router.push('/volunteer/signup')} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </form>
            {/* <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Log In
                </button>
            </form> */}
        </div >
    );
};

export default Signin;
