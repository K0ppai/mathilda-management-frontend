import Link from 'next/link';
import React from 'react';
import { getCookie } from 'cookies-next';
import LogoutBtn from './LogoutBtn';
import { cookies } from 'next/headers';

const NavBar = () => {
  const cookie = getCookie('mathilda', { cookies });

  return (
    <div className="flex justify-around w-full py-2">
      <Link href="/subjects">Subjects</Link>
      <Link href="/classes">Classes</Link>
      {cookie ? (
        <>
          <Link href="/me">My Profile</Link>
          <LogoutBtn />
        </>
      ) : (
        <>
          <Link href="/session/new">Login</Link>
          <Link href="/">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
