"use client";
import ProfileHeader from "../../../components/ProfileHeader";
import AboutSection from "../../../components/AboutSection";
import ExperienceSection from "../../../components/ExperienceSection";
import EducationSection from "../../../components/EducationSection";
import Testimonials from '../../../components/Testimonials'
import { useState } from "react";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

const ProfilePage = () => {
	const authUser = { username: "john_doe", name: "John Doe" };
	const userProfile = { username: "john_doe", name: "John Doe" };

	// Assuming this is the user's own profile for now
	const isOwnProfile = false;
	const userData = {
		about: "A passionate full-stack developer with 5+ years of experience in building scalable web applications. I love to work on innovative projects and am constantly seeking to learn new technologies.",
		experience: [
			{
				_id: "exp1",
				title: "Senior Software Engineer",
				company: "TechCorp",
				startDate: "2020-01-01",
				endDate: "2023-06-01",
				description: "Led a team of 5 developers to build a cutting-edge web platform used by over 500,000 users globally. Spearheaded the development of the core microservice architecture.",
				currentlyWorking: false,
			},
			{
				_id: "exp2",
				title: "Full Stack Developer",
				company: "InnoTech",
				startDate: "2017-06-01",
				endDate: "2019-12-31",
				description: "Developed full-stack features for a cloud-based enterprise solution, including front-end using React and back-end using Node.js.",
				currentlyWorking: false,
			},
			{
				_id: "exp3",
				title: "Junior Developer",
				company: "DevWorks",
				startDate: "2015-09-01",
				endDate: "",
				description: "Worked on a variety of projects, ranging from mobile app development to website back-end integration using JavaScript and Python.",
				currentlyWorking: true,
			},
		],
		education: [
			{
				_id: "edu1",
				school: "University of Technology",
				fieldOfStudy: "Computer Science",
				startYear: "2012",
				endYear: "2016",
			},
			{
				_id: "edu2",
				school: "High School of Science",
				fieldOfStudy: "Science & Math",
				startYear: "2008",
				endYear: "2012",
			},
		],
		location: "San Francisco, CA",  // Added location
		isOwnProfile: true,
	};
	

	// Mock handleSave function (no actual functionality)
	const handleSave = (updatedData) => {
		console.log("Saved data:", updatedData);
	};

	const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));
	const [selectedTime, setSelectedTime] = useState("");

	const timeSlots = [
		"00:00 - 00:15 PM",
		"00:15 - 00:30 PM",
		"00:30 - 00:45 PM",
		"00:45 - 01:00 PM",
		"01:00 - 01:15 PM",
		"01:15 - 01:30 PM",
		"01:30 - 01:45 PM",
		"01:45 - 02:00 PM",
		// Add more time slots as needed
	];

	const handleBooking = () => {
		if (selectedDate && selectedTime) {
			console.log(`Booking for ${selectedDate.format("YYYY-MM-DD")} at ${selectedTime}`);
			// Here you can integrate with your backend to save the booking
		} else {
			alert("Please select a date and time.");
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<div className='flex flex-col lg:flex-row'>
				<div className='lg:w-2/3 w-full p-4'>
					<ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
					<AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
					<ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
					<EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
					<Testimonials width={2} bg={true} />

				</div>

				<div className='lg:w-1/3 w-full  p-4 sticky top-0 h-full'>
					<div className='bg-white shadow rounded-lg p-4'>
						<h2 className='text-xl font-bold text-center'>Book a Consultation</h2>
						<div className='mt-4'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<StaticDatePicker
								displayStaticWrapperAs="desktop"
								openTo="day"
								value={selectedDate}
								onChange={(newValue) => setSelectedDate(newValue)}
								renderInput={(params) => <input {...params} />}
								shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')} 
							/>
						</LocalizationProvider>
						</div>
						<div className='mt-4'>
							<select
								value={selectedTime}
								onChange={(e) => setSelectedTime(e.target.value)}
								className='border rounded p-2 w-full'
							>
								<option value='' disabled>Select Time Slot</option>
								{timeSlots.map((slot, index) => (
									<option key={index} value={slot}>
										{slot}
									</option>
								))}
							</select>
						</div>
						<div className='mt-4'>
							<Link href="/booking/profile/book">
								<Button
									onClick={handleBooking}
									variant="contained"
									color="dark"
									className='w-full'
								>
									Book Now
								</Button>
							</Link>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
