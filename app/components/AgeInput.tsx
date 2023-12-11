import React from 'react'
import Input from '@mui/joy/Input';

const AgeInput = ({
  handleMemberBodyChange,
}: {
  handleMemberBodyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        name="age"
        type="number"
        placeholder="Age"
        required
        onChange={handleMemberBodyChange}
        className='w-full p-2 my-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
      />
    </>
  );
}

export default AgeInput
