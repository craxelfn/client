"use client"
import React, { useState } from 'react';
import { Person, Event, Chat, Settings, Help, Logout } from '@mui/icons-material';
import Image from 'next/image';

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className={`flex h-screen sticky top-10 min-h-full z-10 ${sidebarActive ? 'w-24' : 'w-64'} transition-all duration-300 bg-white shadow-lg ${sidebarActive ? 'md:flex' : 'hidden md:flex'}`}>
      <div className="relative flex flex-col gap-5 p-6 w-full">
        <div className="absolute right-[-14px] top-[3.5%] w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-2 border-gray-200 bg-white" onClick={() => setSidebarActive(!sidebarActive)}>
          <i className={`transition-all duration-300 ${sidebarActive ? 'rotate-180' : ''}`}>
            <Person />
          </i>
        </div>

        {/* User Info */}
        <div className="flex gap-5 pb-5 border-b border-gray-100">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Image 
                src="/assets/doctors1.jpg"
                width={50}
                height={50}
                alt='avatar'
                className='rounded-full'
            />
          </div>
          {!sidebarActive && (
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase text-gray-500 mb-1">Healthcare Specialist</p>
              <p className="text-sm font-medium">Dr. Jane Doe</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1">
          <div className="mb-5">
            <p className={`text-xs uppercase text-gray-500 mb-2 ${sidebarActive ? 'text-center' : ''}`}>Main</p>
            <ul>
              {/* Dashboard */}
              <li className={`relative mb-1 ${activeMenu === 1 ? 'active' : ''}`} onClick={() => handleMenuClick(1)}>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Person />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Consultations</span>
                  {!sidebarActive && <i className="arrow ml-auto transition-transform duration-300" style={{ transform: activeMenu === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>}
                </a>
                <ul className={`ml-5 pl-5 border-l border-gray-200 ${activeMenu === 1 ? 'block' : 'hidden'}`}>
                  <li className="mb-1">
                    <a href="#" className="text-xs text-gray-500 p-2 block">Upcoming Consultations</a>
                  </li>
                  <li>
                    <a href="#" className="text-xs text-gray-500 p-2 block">Past Consultations</a>
                  </li>
                </ul>
              </li>

              {/* Appointments */}
              <li className={`relative mb-1 ${activeMenu === 2 ? 'active' : ''}`} onClick={() => handleMenuClick(2)}>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Event />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Appointments</span>
                  {!sidebarActive && <i className="arrow ml-auto transition-transform duration-300" style={{ transform: activeMenu === 2 ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>}
                </a>
                <ul className={`ml-5 pl-5 border-l border-gray-200 ${activeMenu === 2 ? 'block' : 'hidden'}`}>
                  <li className="mb-1">
                    <a href="#" className="text-xs text-gray-500 p-2 block">Upcoming Appointments</a>
                  </li>
                  <li>
                    <a href="#" className="text-xs text-gray-500 p-2 block">Reschedule Appointment</a>
                  </li>
                </ul>
              </li>

              {/* Chat */}
              <li className={`relative mb-1 ${activeMenu === 3 ? 'active' : ''}`} onClick={() => handleMenuClick(3)}>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Chat />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Messages</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Settings */}
          <div className="mb-5">
            <p className={`text-xs uppercase text-gray-500 mb-2 ${sidebarActive ? 'text-center' : ''}`}>Settings</p>
            <ul>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Settings />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Account Settings</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className={`text-xs uppercase text-gray-500 mb-2 ${sidebarActive ? 'text-center' : ''}`}>Account</p>
            <ul>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Help />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Help</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300">
                  <Logout />
                  <span className={`${sidebarActive ? 'hidden' : 'flex-1'}`}>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
