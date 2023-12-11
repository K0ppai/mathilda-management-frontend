'use client';
import Link from 'next/link';
import React from 'react';

const token: string | null = localStorage.getItem('mathilda');
const NavBar = () => (
  <div className={`${token ? 'block' : 'hidden'}`}>
    <Link href="/subjects">Subjects</Link>
    <Link href="/subjects">Subjects</Link>
  </div>
);

export default NavBar;
