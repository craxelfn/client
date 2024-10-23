"use client";
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import moment from 'moment';

const AppointmentDetails = () => {
  const appointment = {
    userName: 'John',
    userLastName: 'Doe',
    phoneNumber: '+1 123 456 7890',
    time: '23:55', // 24-hour format
  };

  const [timeRemaining, setTimeRemaining] = useState('');
  const [isStartingSoon, setIsStartingSoon] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const appointmentTime = moment(appointment.time, 'HH:mm');
      const duration = moment.duration(appointmentTime.diff(now));

      const daysLeft = Math.floor(duration.asDays());
      const hoursLeft = Math.floor(duration.asHours() % 24);
      const minutesLeft = Math.floor(duration.asMinutes() % 60);
      const secondsLeft = duration.seconds();

      if (minutesLeft <= 1 && minutesLeft >= 0 && hoursLeft === 0 && daysLeft === 0) {
        setIsStartingSoon(true);
      } else {
        setIsStartingSoon(false);
      }

      if (duration.asMilliseconds() >= 0) {
        setTimeRemaining(
          `${daysLeft > 0 ? `${daysLeft} day(s) ` : ''}${hoursLeft > 0 ? `${hoursLeft} hour(s) ` : ''}${minutesLeft} min ${secondsLeft} sec`
        );
        setCanJoin(duration.asMinutes() <= 5);
      } else {
        setTimeRemaining('Appointment Started');
        setCanJoin(true); 
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    console.log('Appointment canceled');
  };

  const handleJoinRoom = () => {
    if (!canJoin) {
      setShowDialog(true); // Show dialog if the user cannot join yet
    } else {
      console.log('Joining room');
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Appointment Details</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-semibold">Name:</p>
            <p className="text-gray-700">{appointment.userName}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Last Name:</p>
            <p className="text-gray-700">{appointment.userLastName}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Phone Number:</p>
            <p className="text-gray-700">{appointment.phoneNumber}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Time Remaining:</p>
            <p className={`text-gray-700 ${isStartingSoon ? 'text-red-500' : ''}`}>
              {isStartingSoon ? 'Starting Soon' : timeRemaining}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <Button 
            variant="outlined" 
            color="error" 
            fullWidth 
            onClick={handleCancel}
          >
            Cancel Appointment
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        </div>
      </div>

      {/* Dialog for explaining why the user cannot join */}
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Too Early to Join</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot join the room yet. It is still too early before the appointment starts. You can only join 5 minutes before the scheduled time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentDetails;
