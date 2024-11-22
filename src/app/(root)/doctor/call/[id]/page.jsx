"use client";

import React from 'react';
import VideoCall from '../../../../../components/VideoCall/VideoCall';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const appointmentId = params.id;

  // Render loading state while params are undefined
  if (!appointmentId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <VideoCall appointmentId={appointmentId} />
    </div>
  );
};

export default Page;