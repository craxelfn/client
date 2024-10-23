import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className='w-full'>
      <p className='text-xl font-bold'>Upcoming Appointments</p>
      <div className='flex justify-end pb-5 text-green-500 cursor-pointer'>
        <p>View All</p>
        <ArrowForwardIcon className='text-green-500' />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {appointments.slice(0, 3).map((appointment, index) => (
          <Link href={`/doctor/appointment/55`} key={index} passHref className='w-full'>
            <div className="flex items-center ps-5 gap-5 h-24 w-full rounded-lg bg-blue-50 cursor-pointer transition-transform duration-400 hover:scale-105">
              <CalendarTodayIcon className="text-blue-500 mb-1" />
              <div className='flex flex-col gap-2'> 
                <p className="text-lg font-bold">{appointment.userName}</p>
                <p className="text-sm">{appointment.time}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
