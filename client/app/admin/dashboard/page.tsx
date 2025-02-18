'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ApprovedAppointmentsCalendar from '../../components/calendar/calander'
import PendingApplicationsList from '@/app/components/newApplication/newapplication'
import { useState } from 'react';
import PendingVolunteersList from '@/app/components/newVolunteer/newVolunteer';
import { fetchApprovedAppointments } from '../../utils/api/calander/appointments';
import Navbar from '@/app/components/navbar/navbar';
import AdminAppointment from "@/app/components/adminAppointment/adminAppointment"
import AddAdmin from "@/app/components/addAdmin/addAdmin"
import { useRouter } from 'next/navigation';




export default function Home() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            // redirect('/signin');
        },
    });
    const { data: sessionInfo } = useSession();
    const router = useRouter();

    if (session.status==="authenticated" && !sessionInfo?.user?.image) {
        router.push('/volunteer/dashboard');
    }
    const [activeSection, setActiveSection] = useState('applications');

    // Function to handle switching active section
    const switchSection = (section: string) => {
        setActiveSection(section);
    };
    return (
        <>
            <Navbar />
            <div className="p-8">
                <ApprovedAppointmentsCalendar fetchAppointments={fetchApprovedAppointments} passedData='all' />
                <div className='border-b-4 border-solid py-0'>
                    <button
                        className={`focus:outline-none font-bold ${activeSection === 'applications' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
                        onClick={() => switchSection('applications')}
                    >
                        New Applications
                    </button>
                    <button
                        className={`focus:outline-none font-bold ${activeSection === 'volunteers' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
                        onClick={() => switchSection('volunteers')}
                    >
                        New Volunteers
                    </button>
                    <button
                        className={`focus:outline-none font-bold ${activeSection === 'newAppointment' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
                        onClick={() => switchSection('newAppointment')}
                    >
                        New Appointment
                    </button>
                    <button
                        className={`focus:outline-none font-bold ${activeSection === 'newAdmin' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
                        onClick={() => switchSection('newAdmin')}
                    >
                        Add New Admin
                    </button>
                </div>


                {/* Render section based on activeSection state */}
                {activeSection === 'applications' && <PendingApplicationsList />}
                {activeSection === 'volunteers' && <PendingVolunteersList />}
                {activeSection === 'newAppointment' && <AdminAppointment />}
                {activeSection === 'newAdmin' && <AddAdmin />}
            </div>
        </>
    )
}

Home.requireAuth = true