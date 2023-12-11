import React from 'react';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import axios from 'axios';
import ProfileCard from './components/ProfileCard';

const fetchUser = async (cookie: string) => {
  const response = await axios.get('http://127.0.0.1:3001/me', {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.data;
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

  return (
    <>
      <div>
        <ProfileCard user={user} />
      </div>
    </>
  );
};

export default page;
