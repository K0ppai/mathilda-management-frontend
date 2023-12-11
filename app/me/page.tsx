"use client"
import React from 'react';
import ProfileCard from './components/ProfileCard';

const page = () => {
  const token = localStorage.getItem('mathilda');

  return (
    <div>
      {
        token ? (
          <ProfileCard />

        ): (
          <div>please login</div>
        )
      }
    </div>
  );
};

export default page;
