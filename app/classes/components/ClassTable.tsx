import { Class } from '@/types/api';
import React from 'react';

const ClassTables = ({ c }: { c: Class }) => {
  return (
    <>
      <div key={c.id} className="bg-slate-100">
        <h1 className="text-center text-xl capitalize border">{c.name}</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/3 border">Students</th>
              <th className="w-1/3 border">Subjects</th>
              <th className="w-1/3 border">Teachers</th>
            </tr>
          </thead>
          <tbody>
            <tr key={c.id} className="p-3">
              <td className="w-1/3 px-10 border">
                {c.students.length === 0 ? (
                  <div className="text-center">No students in this class</div>
                ) : (
                  <ol>
                    {c.students.map((s) => (
                      <li className="list-decimal">{s.name}</li>
                    ))}
                  </ol>
                )}
              </td>
              <td className="w-1/3 px-10 border">
                {c.subjects.length === 0 ? (
                  <div className="text-center">No subjects in this class</div>
                ) : (
                  <ol>
                    {c.subjects.map((s) => (
                      <li className="list-decimal">{s.name}</li>
                    ))}
                  </ol>
                )}
              </td>
              <td className="w-1/3 px-10 border">
                {c.teachers.length === 0 ? (
                  <div className="text-center">No teachers in this class</div>
                ) : (
                  <ol>
                    {c.teachers.map((t) => (
                      <li className="list-decimal">{t.name}</li>
                    ))}
                  </ol>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClassTables;
