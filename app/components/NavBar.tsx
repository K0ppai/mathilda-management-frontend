'use client';
import Link from 'next/link';
import React from 'react';

const token: string | null = localStorage.getItem('mathilda');
const NavBar = () => (
  <div className={`${token ? 'block' : 'hidden'} flex justify-between`}>
    <Link href="/subjects">Subjects</Link>
    <Link href="/classes">Classes</Link>
    <Link href="/me">My Profile</Link>
    <button
      onClick={() => {
        localStorage.removeItem('mathilda');
        window.location.reload();
      }}
    >
      Logout
    </button>
  </div>
);

export default NavBar;
