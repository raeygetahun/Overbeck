import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const createApplication = async (applicationData) => {
//   try {
//     const response = await axios.post(API_URL, applicationData);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// };

// Function to fetch all approved appointments
export const fetchApprovedAppointments = async (option: string) => {
  try {
    let response;
    if (option === 'all') {
      response = await axios.get(`${backendUrl}/api/application/approved-timeslots`);

    }
    else {
      response = await axios.get(`${backendUrl}/api/volunteer/my-time-slots/${option}`);
    }
    return response.data;
  } catch (error) {
    // console.error('Error fetching approved appointments:', error.message);
    throw new Error('Failed to fetch approved appointments');
  }
};

// Function to fetch all pending timeslots
export const fetchPendingTimeslots = async (email: string) => {
  try {
    const response = await axios.get(`${backendUrl}/api/volunteer/applied-time-slots/${email}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching pending timeslots:', error.message);
    throw new Error('Failed to fetch pending timeslots');
  }
};
// export const fetchMyApprovedAppointments = async () => {
//   try {
//     const session = useSession();
//     const email = session.data?.user?.email
//     const response = await axios.get(`${backendUrl}/api/volunteer/my-time-slots/${email}`);

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching approved appointments:', error);
//     throw new Error('Failed to fetch approved appointments');
//   }
// };

