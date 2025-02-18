import React, { useState, useEffect } from 'react';
import { fetchPendingTimeslots } from '../../utils/api/calander/appointments';
import updateTimeSlot from "../../utils/api/Admin/updateTimeSlotStatus";
import { useSession } from 'next-auth/react';


interface Application {
    applicationId: string;
    date: string;
    startTime: string;
    endTime: string;
    volunteerId: string;
    status: string;
    note: string;
    volunteerName: string;
}

const AppliedTimeSlots = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [error, setError] = useState<string | null>(null);

    const session = useSession()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = session?.data?.user?.email
                const PendingApplications = await fetchPendingTimeslots(email as string); // Assuming 'Pending' is the status for Pending applications
                setApplications(PendingApplications.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };



    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4">Pending Applications</h1>
            <ul>
                {applications.map((application, index) => (
                    <li key={application.applicationId} className="border-b py-4">
                        <p><span className="font-semibold">Number:</span> {index + 1}</p>
                        <p><span className="font-semibold">Date:</span> {formatDate(application.date)}</p>
                        <p><span className="font-semibold">Start Time:</span> {formatDate(application.startTime)}</p>
                        <p><span className="font-semibold">End Time:</span> {formatDate(application.endTime)}</p>
                        <p><span className="font-semibold">Volunteer ID:</span> {application.volunteerId}</p>
                        <p><span className="font-semibold">Status:</span> {application.status}</p>
                        <p><span className="font-semibold">Note:</span> {application.note}</p>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppliedTimeSlots;
