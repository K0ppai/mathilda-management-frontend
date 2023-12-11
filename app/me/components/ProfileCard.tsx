import React from 'react';

const ProfileCard = ({ user }: { user: any }) => {
  const role = user?.role;

  return (
    <div className='mb-2'>
      <h1 className='text-xl mb-2'>Profile</h1>
      <table>
        <tbody>
          <tr>
            <td className='border border-collapse p-2'>Name</td>
            <td className='border border-collapse p-2'>{role === 'student' ? user.student.name : user.teacher.name}</td>
          </tr>
          <tr>
            <td className='border border-collapse p-2'>Age</td>
            <td className='border border-collapse p-2'>{role === 'student' ? user.student.age : user.teacher.age}</td>
          </tr>
          <tr>
            <td className='border border-collapse p-2'>Role</td>
            <td className='border border-collapse p-2'>{role}</td>
          </tr>
          <tr>
            <td className='border border-collapse p-2'>Class</td>
            <td className='border border-collapse p-2'>
              {role === 'student'
                ? user.student.mathilda_class.name
                : user.teacher.mathilda_classes.map((c: any) => c.name).join(', ')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileCard;
