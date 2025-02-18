'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'
import timeSlotApplication from '../../utils/api/Volunteer/timeslotApplication';

const TimeslotApp: React.FC = () => {
    const [signupInfo, setSignupInfo] = useState<string>('');
    const { data: session } = useSession();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    const [slotMappings] = useState<{ [key: string]: { startTime: string; endTime: string } }>({
        1: { startTime: '11:00', endTime: '14:00' }, // Slot 1: 11am - 2pm
        2: { startTime: '14:00', endTime: '17:00' }, // Slot 2: 2pm - 5pm
    });

    const today = new Date();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (session?.user?.email) {

                const { startTime, endTime } = slotMappings[selectedSlot];
                const selectedStartDateTime = new Date(selectedDate + 'T' + startTime); // Combine selected date and start time
                const selectedEndDateTime = new Date(selectedDate + 'T' + endTime); 

                const Convtoday = new Date(today);
                const response = await timeSlotApplication(session?.user?.email, Convtoday, selectedStartDateTime, selectedEndDateTime);
                if (response.success) {
                    setSignupInfo("Your timeslot application has been submitted successfully! You'll receive an email once it's approved.");
                } else {
                    const errorData = JSON.parse(response.error ?? "{}");
                    setSignupInfo(errorData.error
                        || 'Timeslot application failed. Please try again.');
                }
            }
        } catch (error) {
            setSignupInfo('An unexpected error occurred. Please try again later.');
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
                            Apply for Timeslot
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-white">
                                    Select Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        min={today.toISOString().slice(0, 10)}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="slot" className="block text-sm font-medium leading-6 text-white">
                                    Select Slot
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="slot"
                                        name="slot"
                                        onChange={(e) => setSelectedSlot(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-grey shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Slots</option>
                                        <option value="1">11am - 2pm</option>
                                        <option value="2">2pm - 5pm</option>
                                    </select>
                                </div>
                            </div>

                            {/* <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Start Time
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="start-time"
                                        name="start-time"
                                        type="datetime-local"
                                        min={today.toISOString().slice(0, 16)} // Set minimum value to current time
                                        onChange={(e) => setstartTime(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        End Time
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="end-time"
                                        name="end-time"
                                        type="datetime-local"
                                        min={startTime}
                                        onChange={(e) => setendTime(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div> */}
                            <div>
                                <button
                                    disabled={(!selectedDate || !selectedSlot)}
                                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Apply
                                </button>
                            </div>
                            <p className={`text-center font-bold text-xl ${signupInfo.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                {signupInfo}
                            </p>
                            {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Sign Up
                            </button> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TimeslotApp;
