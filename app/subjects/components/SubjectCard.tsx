import React from 'react';
import { subjectInterface } from '../page';
import Link from 'next/link';

const SubjectCard = ({ subject, cookie }: { subject: subjectInterface; cookie: string }) => {
  return (
    <>
      <tr key={subject.id} className="py-3">
        <td className="w-1/4 border p-2 text-center">{subject.id}</td>
        <td className="w-1/4 border p-2 text-center">{subject.name}</td>
        <td className="w-1/4 border p-2 text-center">{subject.mathilda_class.name}</td>
        <td className="w-1/4 border p-2 text-center">
          {cookie ? (
            <Link
              href={`/subject/edit/${subject.id.toString()}`}
              className=" bg-blue-200 hover:bg-blue-300 p-1 px-2 rounded-sm"
            >
              Edit
            </Link>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
};

export default SubjectCard;
