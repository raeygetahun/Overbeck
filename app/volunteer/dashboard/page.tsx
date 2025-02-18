'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ApprovedAppointmentsCalendar from '../../components/calendar/calander'
import TimeslotApp from '@/app/components/timeslotApplication/timeslot';
import { useState } from 'react';
import { fetchApprovedAppointments } from '../../utils/api/calander/appointments';
import AppliedTimeSlots from "../../components/myApplications/mypendingApplications"
import Navbar from '@/app/components/navbar/navbar';


export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  
  const [activeSection1, setActiveSection1] = useState('all');
  const [activeSection2, setActiveSection2] = useState('apply');
  const switchSection = (section: string, option: number) => {
    option ? setActiveSection1(section) : setActiveSection2(section);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <div className='border-b-4 border-solid py-0'>
          <button
            className={`focus:outline-none font-bold ${activeSection1 === 'all' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
            onClick={() => switchSection('all', 1)}
          >
            All Schedule
          </button>
          <button
            className={`focus:outline-none font-bold ${activeSection1 === 'my' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
            onClick={() => switchSection('my', 1)}
          >
            My Schedule
          </button>
        </div>
        {activeSection1 === 'all' && <ApprovedAppointmentsCalendar fetchAppointments={fetchApprovedAppointments} passedData='all' />}
        {activeSection1 === 'my' && <ApprovedAppointmentsCalendar fetchAppointments={fetchApprovedAppointments} passedData={session.data?.user?.email} />}
        <div className='border-b-4 border-solid py-0'>
          <button
            className={`focus:outline-none font-bold ${activeSection2 === 'applied' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
            onClick={() => switchSection('applied', 0)}
          >
            Pending Applications
          </button>
          <button
            className={`focus:outline-none font-bold ${activeSection2 === 'apply' ? 'text-white bg-black rounded-t-lg border-b-2 border-gray-900 py-3 px-6 h-12' : 'text-black py-3 px-6 h-12'}`}
            onClick={() => switchSection('apply', 0)}
          >
            New Application
          </button>
        </div>
        {activeSection2 === 'applied' && <AppliedTimeSlots />}
        {activeSection2 === 'apply' && <TimeslotApp />}
      </div>
    </>
  )
}

Home.requireAuth = true