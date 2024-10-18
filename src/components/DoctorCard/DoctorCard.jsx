import React from 'react';
import Link from 'next/link';

const DoctorCard = () => {
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
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[1em] w-[1em]"
                fill="black"
              >
                <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z"></path>
              </svg>
            ))}
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
