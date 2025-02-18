import React, { useState, useEffect } from 'react';
import { PendingtimeSlotApp } from '../../utils/api/Admin/pendingTimeslotApps';
import updateTimeSlot from "../../utils/api/Admin/updateTimeSlotStatus";


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

const PendingApplicationsList = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [rejectNote, setRejectNote] = useState<string>('');
    const [NoteInput, setNoteInput] = useState<string>('');




    useEffect(() => {
        const fetchData = async () => {
            try {
                const PendingApplications = [
                    {
                        applicationId: '1',
                        date: '2025-02-20T10:00:00Z',
                        startTime: '2025-02-20T10:00:00Z',
                        endTime: '2025-02-20T12:00:00Z',
                        volunteerId: 'volunteer1',
                        status: 'Pending',
                        note: 'First application for this slot',
                        volunteerName: 'John Doe',
                    },
                    {
                        applicationId: '2',
                        date: '2025-02-21T14:00:00Z',
                        startTime: '2025-02-21T14:00:00Z',
                        endTime: '2025-02-21T16:00:00Z',
                        volunteerId: 'volunteer2',
                        status: 'Pending',
                        note: 'Second application for this slot',
                        volunteerName: 'Jane Smith',
                    },
                ];
                // const PendingApplications = await PendingtimeSlotApp(); // Assuming 'Pending' is the status for Pending applications
                setApplications(PendingApplications);
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



    const handleApprove = async (id: string) => {
        try {
            const data = await updateTimeSlot(id, "Approved", null);
            if (data.success) {
                const applicationToUpdate = document.getElementById(id);
                applicationToUpdate ? applicationToUpdate.classList.add("fade-out") : "";
                setTimeout(() => {
                    setApplications(prevState =>
                        prevState.filter(application => application.applicationId !== id)
                    );
                }, 700);
                setNoteInput('');
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Error approving application:', error);
        }
    };

    const handleReject = async (id: string, note: string) => {
        try {
            const data = await updateTimeSlot(id, "Rejected", note);
            if (data.success) {
                const applicationToUpdate = document.getElementById(id);
                applicationToUpdate ? applicationToUpdate.classList.add("fade-out") : "";
                setTimeout(() => {
                    setApplications(prevState =>
                        prevState.filter(application => application.applicationId !== id)
                    );
                }, 700);
                setNoteInput('');
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Error rejecting application:', error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4">Pending Applications</h1>
            <ul>
                {applications.map((application, index) => (
                    <li id={application.applicationId} key={application.applicationId} className="border-b py-4">
                        <p><span className="font-semibold">Number:</span> {index + 1}</p>
                        <p><span className="font-semibold">Date:</span> {formatDate(application.date)}</p>
                        <p><span className="font-semibold">Start Time:</span> {formatDate(application.startTime)}</p>
                        <p><span className="font-semibold">End Time:</span> {formatDate(application.endTime)}</p>
                        <p><span className="font-semibold">Volunteer ID:</span> {application.volunteerId}</p>
                        <p><span className="font-semibold">Status:</span> {application.status}</p>
                        <p><span className="font-semibold">Note:</span> {application.note}</p>
                        <p><span className="font-semibold">Volunteer Name:</span> {application.volunteerName}</p>
                        <div className="mt-4">
                            <button onClick={() => handleApprove(application.applicationId)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mr-2 rounded">
                                Approve
                            </button>
                            <button onClick={() => setNoteInput('true')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                Reject
                            </button>
                            {NoteInput && (
                                <div className="mt-2">
                                    <input type="text" value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Enter reject note" className="border p-2 rounded" />
                                    <button onClick={() => handleReject(application.applicationId, rejectNote)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-2 rounded">
                                        Confirm Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingApplicationsList;
