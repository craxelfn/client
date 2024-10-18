"use client"
import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import MobileNav from './MobileNav';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='w-full px-5 pb-3 flex justify-between items-center pt-5 bg-transparent backdrop-blur-lg sticky top-0 z-50'>
      <div className='flex justify-start  items-center gap-5 cursor-pointer'>
        <a href="/home">Health care</a>
      </div>
      <div className='sm:hidden'>
        <MobileNav />
      </div>

      <div className='hidden sm:w-72 sm:flex sm:justify-center sm:gap-5'>
        <ul className='flex justify-center gap-5'>
          <li className='cursor-pointer'><a href="/booking">book a visit</a></li>
          <li className='cursor-pointer'><a href="">about</a></li>
          <li className='cursor-pointer'><a href="/other">other</a> </li>
        </ul>
      </div>

      <div className='hidden sm:flex items-center space-x-2'>
        <div 
          className='border-2 border-white rounded-full p-1 cursor-pointer'
          onClick={handleClick} 
        >
          <Image
            className='rounded-full'
            src="/assets/doctors1.jpg"
            width={35}
            height={35}
            alt='profile'
          />
        </div>
        <p className='cursor-pointer' onClick={handleClick}>Account</p>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><a href="/user/edit">profile</a></MenuItem>
        <MenuItem onClick={handleClose}><a href="/user/scheduling">My Scheduling</a></MenuItem>
        <MenuItem onClick={handleClose}><a href="/user/login">login</a></MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
