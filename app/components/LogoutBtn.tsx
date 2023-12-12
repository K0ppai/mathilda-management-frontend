'use client';
import React from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          deleteCookie('mathilda');
          router.replace('/session/new');
          router.refresh();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
