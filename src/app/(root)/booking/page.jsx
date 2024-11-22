"use client";
import React from 'react';
import Imagefade from '../../../components/Imagefade/Imagefade';
import DoctorCard from '../../../components/DoctorCard/DoctorCard';
import SearchDoctor from '../../../components/SearchDoctor/SearchDoctor';

const Page = () => {
  return (
    <>
      <Imagefade />
      <div className="container mx-auto px-4 bg-gray-100 w-4/5">
        <div className="grid grid-cols-12 gap-4 h-full">
          
          <div className="col-span-12  lg:col-span-4 border-x-1 border-gray-600 order-1 lg:order-none">
            <div className="w-full me-5 sticky top-4"> 
              <SearchDoctor />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-5 order-2 lg:order-none mt-16">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="col-span-12 sm:col-span-6 mb-10">
                <DoctorCard />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Page;
