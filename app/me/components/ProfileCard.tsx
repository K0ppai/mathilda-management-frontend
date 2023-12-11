'use client';

import { ClassContext } from '@/app/context/ClassContext';
import React, { useContext } from 'react';

const ProfileCard = () => {
  const { user } = useContext(ClassContext);
  const role = user?.role;

  return (
    <>
      <h1>Profile</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{role === 'student' ? user.student.name : user.teacher.name}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{role === 'student' ? user.student.age : user.teacher.age}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{role}</td>
          </tr>
          <tr>
            <td>Class</td>
            <td>
              {role === 'student'
                ? user.student.mathilda_class.name
                : user.teacher.mathilda_classes.map((c: any) => c.name).join(', ')}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProfileCard;
