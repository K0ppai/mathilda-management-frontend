import React from 'react';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import ProfileCard from './components/ProfileCard';
import Link from 'next/link';

const fetchUser = async (cookie: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookie}`,
  };

  const response = await fetch('http://127.0.0.1:3001/me', {
    method: 'GET',
    cache: 'no-store',
    headers,
  })
    .then((res) => res.json())
    .then((res) => res);
  return response;
};

const page = async () => {
  const cookie = getCookie('mathilda', { cookies }) || '';
  if (!cookie) {
    return (
      <div>
        <div>please login</div>
      </div>
    );
  }
  const user = await fetchUser(cookie);
  const role = user.role;

  return (
    <div className="w-full flex flex-col justify-center items-center h-[500px]">
      <ProfileCard user={user} />
      <Link
        href={`/${
          role === 'student'
            ? `student/edit/${user.student.id.toString()}`
            : `teacher/edit/${user.teacher.id.toString()}`
        }`}
        className="bg-blue-200 hover:bg-blue-300 p-2 rounded-sm"
      >
        Edit profile
      </Link>
    </div>
  );
};

export default page;
