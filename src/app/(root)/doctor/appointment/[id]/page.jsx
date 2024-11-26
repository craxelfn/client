"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '../../../../../context/SocketProvider';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  TextField
} from '@mui/material';
import moment from 'moment';

const AppointmentDetails = () => {
  const router = useRouter();
  const socket = useSocket();
  
  const appointment = {
    userName: 'John',
    userLastName: 'Doe',
    phoneNumber: '+1 123 456 7890',
    time: '17:00', // 24-hour format
  };

  const [timeRemaining, setTimeRemaining] = useState('');
  const [isStartingSoon, setIsStartingSoon] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

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
        setCanJoin(duration.asMinutes() <= 50);
      } else {
        setTimeRemaining('Appointment Started');
        setCanJoin(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitForm = useCallback(async (e) => {
    e.preventDefault();
    if (socket && userId && roomId) {
      setIsRedirecting(true);
      try {
        socket.emit("room:join", { userId, roomId });
        // Add a small delay to ensure the socket event is processed
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/doctor/call');
      } catch (error) {
        console.error('Navigation error:', error);
        setIsRedirecting(false);
      }
    }
  }, [userId, roomId, socket, router]);

  const handleJoinRoom = useCallback((data) => {
    if (socket && !isRedirecting) {
      router.push('/doctor/call');
    }
  }, [socket, router, isRedirecting]);

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  const handleCancel = () => {
    console.log('Appointment canceled');
    setShowDialog(false);
  };

  const handleJoinRoomClick = () => {
    setShowDialog(true);
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
            onClick={handleJoinRoomClick}
            disabled={isRedirecting || !socket}
          >
            {isRedirecting ? 'Joining...' : 'Join Room'}
          </Button>
        </div>
      </div>

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <form onSubmit={handleSubmitForm}>
          <DialogTitle>
            {!canJoin ? 'Too Early to Join' : 'Enter Room Details'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {!canJoin 
                ? 'You cannot join the room yet. It is still too early before the appointment starts. You can only join 5 minutes before the scheduled time.' 
                : 'Please enter the user ID and room ID to begin the consultation.'}
            </DialogContentText>
            
            {canJoin && (
              <div className="mt-4 space-y-4">
                <TextField
                  autoFocus
                  margin="dense"
                  id="userId"
                  label="User ID"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
                <TextField
                  margin="dense"
                  id="roomId"
                  label="Room ID"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseDialog} 
              color="primary" 
              variant="outlined"
              disabled={isRedirecting}
            >
              Cancel
            </Button>
            {canJoin && (
              <Button 
                type="submit"
                color="primary" 
                variant="contained"
                disabled={!userId || !roomId || isRedirecting || !socket}
              >
                {isRedirecting ? 'Joining...' : 'Confirm'}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AppointmentDetails;