import React, { useState, useEffect } from 'react';
import { PendingNewVolunteers } from '../../utils/api/Admin/pendingNewVolunteers';
import updateVolunteer from "../../utils/api/Admin/updateVolunteerStatus";


interface Volunteer {
    volunteerId: string;
    email: string;
    firstName: string;
    lastName: string;
    accountStatus: string;
}

const PendingVolunteersList = () => {
    const [volunteers, setvolunteers] = useState<Volunteer[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [rejectNote, setRejectNote] = useState<string>('');
    const [NoteInput, setNoteInput] = useState<string>('');




    useEffect(() => {
        const fetchData = async () => {
            try {
                const Pendingvolunteers = [
                    {
                        volunteerId: '1',
                        email: 'volunteer1@example.com',
                        firstName: 'John',
                        lastName: 'Doe',
                        accountStatus: 'Pending',
                    },
                    {
                        volunteerId: '2',
                        email: 'volunteer2@example.com',
                        firstName: 'Jane',
                        lastName: 'Smith',
                        accountStatus: 'Pending',
                    },
                ];

                // const Pendingvolunteers = await PendingNewVolunteers(); // Assuming 'Pending' is the status for Pending volunteers
                setvolunteers(Pendingvolunteers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const data = await updateVolunteer(id, "Approved");
            if (data.success) {
                const volunteerToUpdate = document.getElementById(id);
                volunteerToUpdate ? volunteerToUpdate.classList.add("fade-out") : "";
                setTimeout(() => {
                    setvolunteers(prevState =>
                        prevState.filter(volunteer => volunteer.volunteerId !== id)
                    );
                }, 700); // Delay in milliseconds (e.g., 500ms)
                setNoteInput('');
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Error approving volunteer:', error);
        }
    };

    const handleReject = async (id: string, note: string) => {
        try {
            const data = await updateVolunteer(id, "Rejected");
            if (data.success) {
                const volunteerToUpdate = document.getElementById(id);
                volunteerToUpdate ? volunteerToUpdate.classList.add("fade-out") : "";
                setTimeout(() => {
                    setvolunteers(prevState =>
                        prevState.filter(volunteer => volunteer.volunteerId !== id)
                    );
                }, 700);
                setNoteInput('');
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
            console.error('Error rejecting volunteer:', error);
        }
    };

    return (
        <div className="container mx-auto py-8 ">
            <h1 className="text-3xl font-semibold mb-4">Pending volunteers</h1>
            <div className='mx-100'>
                <ul>
                    {volunteers.map((volunteer, index) => (
                        <li id={volunteer.volunteerId} key={volunteer.volunteerId} className="border-b py-4">
                            <p><span className="font-semibold">Number:</span> {index + 1}</p>
                            <p><span className="font-semibold">ID:</span> {volunteer.volunteerId}</p>
                            <p><span className="font-semibold">Email:</span> {volunteer.email}</p>
                            <p><span className="font-semibold">First Name:</span> {volunteer.firstName}</p>
                            <p><span className="font-semibold">Last Name:</span> {volunteer.lastName}</p>
                            <div className="mt-4">
                                <button onClick={() => handleApprove(volunteer.volunteerId)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mr-2 rounded">
                                    Approve
                                </button>
                                <button onClick={() => setNoteInput('true')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                    Reject
                                </button>
                                {NoteInput && (
                                    <div className="mt-2">
                                        <button onClick={() => handleReject(volunteer.volunteerId, rejectNote)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-2 rounded">
                                            Confirm Reject
                                        </button>
                                    </div>
                                )}

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PendingVolunteersList;
