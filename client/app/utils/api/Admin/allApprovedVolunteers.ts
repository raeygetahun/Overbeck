import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const allApprovedVolunteers = async () => {
    try {
        const response = await axios.get(`${backendUrl}/api/admin/approved-volunteers`);
        return response.data;
    } catch (error) {
        // console.error('Error fetching approved appointments:', error.message);
        throw new Error('Failed to fetch pending new Volunteers');
    }
};
