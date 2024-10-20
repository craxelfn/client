"use client"; // Add this at the top

import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import Rating from '@mui/material/Rating';

const DoctorCard = () => {
  const [value, setValue] = useState(5); // Use useState to manage value

  return (
    <div
      className="card border border-black shadow-black h-[340px] w-full group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden bg-white"
      style={{
        marginTop: '-50px',
        backgroundImage: `url("/assets/doctors2.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-[0]"></div>

      <div className="container text-black z-[2] relative font-nunito flex flex-col gap-[0.5em]">
        <div className="h-fit w-full">
          <Link href="/booking/profile">
            <h1
              className="card_heading text-black text-[1.5em] tracking-[.2em] cursor-pointer"
              style={{
                fontWeight: 900,
                WebkitTextFillColor: 'transparent',
                WebkitTextStrokeWidth: '1px',
                textShadow: '0 0 7px #fff',
              }}
            >
              STEEL BALL RUN
            </h1>
          </Link>
          <Link href="/booking/profile">
            <p
              className="text-[1.2em] cursor-pointer"
              style={{
                fontWeight: 900,
                WebkitTextFillColor: 'transparent',
                WebkitTextStrokeWidth: '1px',
                textShadow: '0 0 7px #fff',
              }}
            >
              By Hirohiko Araki
            </p>
          </Link>
        </div>

        <div className="flex justify-start items-center h-fit w-full gap-[1.5em]">
          <div className="w-fit h-fit flex justify-left gap-[0.5em]">
          <Rating name="read-only" value={value} readOnly />
          </div>

          <div className="w-fit h-fit text-black font-nunito text-[1.2em] font-light">
            <p>Price</p>
          </div>
        </div>

        <div className="flex justify-center items-center h-fit w-fit gap-[0.5em]">
          {['Drama', 'Action', 'Balls'].map((label) => (
            <div
              key={label}
              className="border-2 border-black rounded-[0.5em] text-black font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-black hover:text-white duration-300 cursor-pointer"
            >
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <p
        className="font-nunito block text-black font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet officiis,
        dolorem ab animi magnam culpa fugit error voluptates adipisci, debitis ut
        fuga at nisi laborum suscipit a eos similique unde.
      </p>
    </div>
  );
};

export default DoctorCard;
