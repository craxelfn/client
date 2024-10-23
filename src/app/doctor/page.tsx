"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import UpcomingAppointments from '../../components/UpcomingAppointments'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete icon

const Page: React.FC = () => {
  const today = dayjs();
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(today);
  const [availability, setAvailability] = useState<{
    [key: string]: { start: Dayjs | null; end: Dayjs | null }[];
  }>({});
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [workingStartTime, setWorkingStartTime] = useState<Dayjs | null>(null);
  const [workingEndTime, setWorkingEndTime] = useState<Dayjs | null>(null);
  const [additionalTimeSlots, setAdditionalTimeSlots] = useState<
    { start: Dayjs | null; end: Dayjs | null }[]
  >([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const generateCalendarDays = () => {
    const startOfMonth = selectedMonth.startOf("month");
    const endOfMonth = selectedMonth.endOf("month");
    const daysInMonth: (Dayjs | null)[] = [];
    // Add blank spaces for the start of the month
    for (let i = 0; i < startOfMonth.day(); i++) {
      daysInMonth.push(null);
    }
    // Add actual days of the month
    for (let day = 1; day <= endOfMonth.date(); day++) {
      daysInMonth.push(dayjs(selectedMonth).date(day));
    }
    return daysInMonth;
  };
  const days = generateCalendarDays();
  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    const currentAvailability = availability[date.format("YYYY-MM-DD")];
    // Set existing working hours if they exist
    if (currentAvailability) {
      setWorkingStartTime(currentAvailability[0]?.start || null);
      setWorkingEndTime(currentAvailability[0]?.end || null);
      setAdditionalTimeSlots(currentAvailability.slice(1) || []);
    } else {
      setWorkingStartTime(null);
      setWorkingEndTime(null);
      setAdditionalTimeSlots([]);
    }
    setOpenDialog(true); // Open dialog when a date is clicked
  };
  const appointmentsData = [
    { userName: 'John Doe', time: '10:00 AM' },
    { userName: 'Jane Smith', time: '11:30 AM' },
    { userName: 'Alex Johnson', time: '2:00 PM' },
    // Additional appointments if necessary
  ];
  const handleSaveAvailability = () => {
    if (
      selectedDate &&
      workingStartTime &&
      workingEndTime &&
      workingEndTime.isAfter(workingStartTime)
    ) {
      const dateKey = selectedDate.format("YYYY-MM-DD");
      const newSlot = { start: workingStartTime, end: workingEndTime };
      // Check for duplicate or overlapping time slots
      const isDuplicate = (slot: { start: Dayjs; end: Dayjs }) =>
        slot.start.isSame(newSlot.start) && slot.end.isSame(newSlot.end);
      const isOverlapping = (slot: { start: Dayjs; end: Dayjs }) =>
        slot.start.isBefore(newSlot.end) && newSlot.start.isBefore(slot.end);
      const existingSlots = availability[dateKey] || [];
      // Check for duplicates and overlaps in existing slots
      if (existingSlots.some(isDuplicate)) {
        alert("This time slot already exists.");
        return;
      }
      if (existingSlots.some(isOverlapping)) {
        alert("This time slot overlaps with an existing slot.");
        return;
      }
      // If no duplicates or overlaps, save the new slot
      const updatedAvailability = {
        ...availability,
        [dateKey]: [...existingSlots, newSlot, ...additionalTimeSlots],
      };
      setAvailability(updatedAvailability);
      handleCloseDialog();
    }
  };
  const handleAddAdditionalTime = () => {
    setAdditionalTimeSlots([
      ...additionalTimeSlots,
      { start: null, end: null }, // Add a new time slot with null values
    ]);
  };
  const handleDeleteAdditionalTime = (index: number) => {
    const updatedSlots = additionalTimeSlots.filter((_, i) => i !== index);
    setAdditionalTimeSlots(updatedSlots);
  };
  const handleDeletePrimaryAvailability = () => {
    if (selectedDate) {
      const dateKey = selectedDate.format("YYYY-MM-DD");
      const updatedSlots = availability[dateKey]?.slice(1) || []; // Remove the first slot
      setAvailability({
        ...availability,
        [dateKey]: updatedSlots,
      });
      handleCloseDialog();
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDate(null);
    setWorkingStartTime(null);
    setWorkingEndTime(null);
    setAdditionalTimeSlots([]);
  };
  const isDateAvailable = (date: Dayjs | null) => {
    return date ? availability[date.format("YYYY-MM-DD")]?.length > 0 : false;
  };
  const renderAvailabilityTimes = (date: Dayjs) => {
    const slots = availability[date.format("YYYY-MM-DD")];
    if (!slots) return null;
    return (
      <div className="text-xs text-green-500">
        {slots.map((slot, index) => (
          <div key={index}>
            {slot.start?.format("HH:mm")} - {slot.end?.format("HH:mm")}
          </div>
        ))}
      </div>
    );
  };
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <div className='container mx-auto p-4 '>
			<div className='flex flex-col lg:flex-row '>
				<div className='lg:w-2/3 w-full p-4'>
        <p className="text-xl text-gray-400">Hi. Stevan dux</p>
      <p className="text-3xl font-bold pb-5 ">My Availability</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Month"
          views={["year", "month"]}
          value={selectedMonth}
          onChange={(newValue) =>
            setSelectedMonth(newValue ? dayjs(newValue).startOf("month") : today)
          }
          renderInput={(params) => <input {...params} />}
        />
        {/* Days of the Week Header */}
        <div className="mt-6 grid grid-cols-7 gap-2 bg-blue-50 p-2 rounded-sm">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              className={`p-4 border ${
                day ? "hover:bg-blue-200 bg-white cursor-pointer" : "bg-transparent"
              } ${isDateAvailable(day) ? "bg-green-100 " : ""}`}
              onClick={() => day && handleDateClick(day)}
            >
              {day ? (
                <div className="text-center">
                  {day.date()}
                  {isDateAvailable(day) && renderAvailabilityTimes(day)}
                </div>
              ) : (
                <div className="text-center text-gray-300">-</div>
              )}
            </div>
          ))}
        </div>
        {/* Availability Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            Set Availability for {selectedDate?.format("YYYY-MM-DD")}
          </DialogTitle>
          <DialogContent>
            <div className="flex gap-4">
              <TimePicker
                label="Start Time"
                value={workingStartTime}
                onChange={setWorkingStartTime}
                ampm={false}
                minutesStep={15}
                renderInput={(params) => <input {...params} />}
              />
              <TimePicker
                label="End Time"
                value={workingEndTime}
                onChange={setWorkingEndTime}
                ampm={false}
                minutesStep={15}
                renderInput={(params) => <input {...params} />}
              />
            </div>
            {/* Additional Time Slots */}
            {additionalTimeSlots.map((slot, index) => (
              <div key={index} className="flex gap-4 mt-4">
                <Button onClick={() => handleDeleteAdditionalTime(index)}>
                  <DeleteIcon />
                </Button>
                <TimePicker
                  label={`Additional Start Time ${index + 1}`}
                  value={slot.start}
                  onChange={(newValue) => {
                    const updatedSlots = [...additionalTimeSlots];
                    updatedSlots[index].start = newValue;
                    setAdditionalTimeSlots(updatedSlots);
                  }}
                  ampm={false}
                  minutesStep={15}
                  renderInput={(params) => <input {...params} />}
                />
                <TimePicker
                  label={`Additional End Time ${index + 1}`}
                  value={slot.end}
                  onChange={(newValue) => {
                    const updatedSlots = [...additionalTimeSlots];
                    updatedSlots[index].end = newValue;
                    setAdditionalTimeSlots(updatedSlots);
                  }}
                  ampm={false}
                  minutesStep={15}
                  renderInput={(params) => <input {...params} />}
                />
              </div>
            ))}
            {/* Delete Primary Availability Button */}
            {selectedDate && (
              <Button
                onClick={handleDeletePrimaryAvailability}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete Primary Availability
              </Button>
            )}
            <Button onClick={handleAddAdditionalTime} color="primary">
              Add Other Time Availability
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
              Cancel Availability
            </Button>
            <Button onClick={handleSaveAvailability} color="primary">
              Save Availability
            </Button>
            <Button onClick={handleCloseDialog} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
        </div>
        <div className='lg:w-1/3 w-full p-4 sticky top-10'>
          <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <UpcomingAppointments appointments={appointmentsData} />
          </div>
        </div>
      </div>
    </div>
      
  );
};

export default Page;
