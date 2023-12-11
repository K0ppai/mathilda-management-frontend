import React from 'react'
import { Class } from '../context/ClassContext';

const ClassSelect = (
  {
    slug,
    classes,
    handleMemberBodyChange,
    handleSubjectBodyChange
  }: {
    slug: string,
    classes: Class[],
    handleMemberBodyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSubjectBodyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  }
) => {
  return (
    <>
      <select
        name="mathilda_class_id"
        onChange={slug === 'student' ? handleMemberBodyChange : handleSubjectBodyChange}
        required
        className="w-full p-2 my-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" className="px-4">
          Select a class
        </option>
        {classes?.map((c: Class) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default ClassSelect
