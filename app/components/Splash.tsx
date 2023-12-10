import Link from 'next/link';
import React from 'react';

const Splash = () => {
  return (
    <div className='flex flex-col gap-y-8'>
      <h1 className='text-xl'>Let's onboard a member!</h1>
      <div className='flex justify-between border-b border-b-gray-300'>
        <Link href="/student/new" className='hover:underline border-r-gray-300 border-r w-1/2 text-center'>Student</Link>
        <Link href="/teacher/new" className='hover:underline w-1/2 text-center'>Teacher</Link>
      </div>
      <div>
        <span>Already a member?</span>
        <Link href="/session/new" className='underline ml-2'>Login</Link>
      </div>
    </div>
  );
};

export default Splash;
