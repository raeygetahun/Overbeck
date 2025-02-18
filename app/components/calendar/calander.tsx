import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Appointment {
    applicationId: string;
    startTime: Date | string;
    endTime: Date | string;
    volunteerName: string | null;
}
interface FetchAppointments {
    success: true;
    data: Array<Appointment>;
}

interface CalendarProps {
    fetchAppointments: (data: string) => Promise<FetchAppointments>;
    passedData: string | null | undefined;
}

const CalendarWithAppointments = ({ fetchAppointments, passedData }: CalendarProps) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const volunteers = [
        "John Doe",
        "Jane Smith",
        "Michael Brown",
        "Sarah White",
        "Emily Green"
    ];

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const currentMonth = moment().month(); 
                const demoAppointments: Appointment[] = [];

                if (passedData == "volunteer@demo.com") {
                    const volunteer = "John Doe"; 

                    for (let day = 1; day <= moment().daysInMonth(); day = day + 3) {
                        if (day % 2 == 0) {
                            demoAppointments.push({
                                applicationId: `${currentMonth + 1}-${day}-1`,
                                startTime: moment().month(currentMonth).date(day).hour(11).minute(0).toISOString(),
                                endTime: moment().month(currentMonth).date(day).hour(14).minute(0).toISOString(),
                                volunteerName: volunteer, 
                            });
                        }
                        else {
                            demoAppointments.push({
                                applicationId: `${currentMonth + 1}-${day}-2`,
                                startTime: moment().month(currentMonth).date(day).hour(14).minute(0).toISOString(),
                                endTime: moment().month(currentMonth).date(day).hour(17).minute(0).toISOString(),
                                volunteerName: volunteer, 
                            });
                        }
                    }
                } else {
                    for (let day = 1; day <= moment().daysInMonth(); day++) {
                        demoAppointments.push({
                            applicationId: `${currentMonth + 1}-${day}-1`,
                            startTime: moment().month(currentMonth).date(day).hour(11).minute(0).toISOString(),
                            endTime: moment().month(currentMonth).date(day).hour(14).minute(0).toISOString(),
                            volunteerName: volunteers[(day - 1) % volunteers.length], 
                        });

                        demoAppointments.push({
                            applicationId: `${currentMonth + 1}-${day}-2`,
                            startTime: moment().month(currentMonth).date(day).hour(14).minute(0).toISOString(),
                            endTime: moment().month(currentMonth).date(day).hour(17).minute(0).toISOString(),
                            volunteerName: volunteers[day % volunteers.length], 
                        });
                    }
                }

                setAppointments(demoAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        getAppointments();
    }, [fetchAppointments, passedData]);

    const localizer = momentLocalizer(moment);
    const today = new Date();
    const dayStartHour = 11;
    const dayEndHour = 17;

    const initProps = {
        localizer: localizer,
        defaultDate: today,
        defaultView: Views.WEEK,
        min: moment(today).startOf('day').hour(dayStartHour).toDate(),
        max: moment(today).endOf('day').hour(dayEndHour).toDate(),
        step: 15,
        timeslots: 4,
        views: [Views.MONTH, Views.WEEK, Views.DAY],
    };

    const formats = {
        eventTimeRangeFormat: () => {
            return "";
        },
    };

    const eventStyleGetter = function () {
        var style = {
            color: 'white',
            border: '2px solid',
            display: 'block',
        };
        return {
            style: style
        };
    };

    const events = appointments.map(appointment => ({
        id: appointment.applicationId,
        title: appointment.volunteerName,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime),
    }));

    return (
        <div style={{ height: 500 }} className='py-7'>
            <Calendar
                events={events}
                {...initProps}
                eventPropGetter={(eventStyleGetter)}
                formats={formats}
            />
        </div>
    );
};

export default CalendarWithAppointments;
