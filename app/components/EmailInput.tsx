import React from 'react';

const EmailInput = ({
  handleUserBodyChange,
}: {
  handleUserBodyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        className="w-full p-2 my-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleUserBodyChange}
      />
    </>
  );
};

export default EmailInput;
