'use client';

import Link from 'next/link';
import React from 'react';
import { deleteCookie, getCookie } from 'cookies-next';

const NavBar = () => {
  const cookie = getCookie('mathilda');

  return (
    <div className={`flex justify-between`}>
      <Link href="/subjects">Subjects</Link>
      <Link href="/classes">Classes</Link>
      <Link href="/me">My Profile</Link>
      <Link href="/session/new">Login</Link>
      <Link
        href="/session/new"
        onClick={() => {
          deleteCookie('mathilda');
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default NavBar;
