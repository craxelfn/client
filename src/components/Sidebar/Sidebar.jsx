"use client";
import React, { useState } from "react";
import { Person, Event, Chat, Help, Logout } from "@mui/icons-material";
import Image from "next/image";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const { user } = useAuthContext(); // Get user info from AuthContext
  const { logout } = useLogout(); // Logout hook

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  if (!user) {
    return null; // Render nothing if the user is not logged in
  }

  return (
    <div
      className={`hidden md:block flex h-screen sticky top-10 min-h-full z-10 ${
        sidebarActive ? "w-24" : "w-64"
      } transition-all duration-300 bg-white shadow-lg`}
    >
      <div className="relative flex flex-col gap-5 p-6 w-full">
        {/* Sidebar Toggle */}
        <div
          className="absolute right-[-14px] top-[3.5%] w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-2 border-gray-200 bg-white"
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <i className={`transition-all duration-300 ${sidebarActive ? "rotate-180" : ""}`}>
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
              alt="avatar"
              className="rounded-full"
            />
          </div>
          {!sidebarActive && (
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase text-gray-500 mb-1">Logged in as:</p>
              <p className="text-sm font-medium">{user.name || "Dr. Jane Doe"}</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1">
          <div className="mb-5">
            <p
              className={`text-xs uppercase text-gray-500 mb-2 ${
                sidebarActive ? "text-center" : ""
              }`}
            >
              Main
            </p>
            <ul>
              <li
                className={`relative mb-1 ${activeMenu === 1 ? "active" : ""}`}
                onClick={() => handleMenuClick(1)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300"
                >
                  <Person />
                  <span className={`${sidebarActive ? "hidden" : "flex-1"}`}>Consultations</span>
                </a>
              </li>
              <li
                className={`relative mb-1 ${activeMenu === 2 ? "active" : ""}`}
                onClick={() => handleMenuClick(2)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300"
                >
                  <Event />
                  <span className={`${sidebarActive ? "hidden" : "flex-1"}`}>My Space</span>
                </a>
              </li>
              <li className="relative mb-1">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300"
                >
                  <Chat />
                  <span className={`${sidebarActive ? "hidden" : "flex-1"}`}>Messages</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <p
              className={`text-xs uppercase text-gray-500 mb-2 ${
                sidebarActive ? "text-center" : ""
              }`}
            >
              Account
            </p>
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300"
                >
                  <Help />
                  <span className={`${sidebarActive ? "hidden" : "flex-1"}`}>Help</span>
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 p-3 rounded transition-all duration-300 w-full"
                >
                  <Logout />
                  <span className={`${sidebarActive ? "hidden" : "flex-1"}`}>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
