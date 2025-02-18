import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const PendingtimeSlotApp = async () => {
    try {
        const response = await axios.get(`${backendUrl}/api/application/pending-timeslots`);

        return response.data;
    } catch (error) {
        // console.error('Error fetching approved appointments:', error.message);
        throw new Error('Failed to fetch pending appointments');
    }
};
