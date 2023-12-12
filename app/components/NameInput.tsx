import React from 'react'

const NameInput = ({
  slug,
  handleMemberBodyChange,
  handleSubjectBodyChange,
}: {
  slug: string;
  handleMemberBodyChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubjectBodyChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        onChange={
          slug === 'student' || slug === 'teacher'
            ? handleMemberBodyChange
            : handleSubjectBodyChange
        }
        className="w-full p-2 my-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </>
  );
}

export default NameInput
