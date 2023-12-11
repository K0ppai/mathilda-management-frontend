import axios from 'axios';
import React, { useContext } from 'react';
import { Class } from '../context/ClassContext';

const fetchClasses = async (): Promise<Class[]> => {
  const response = await axios.get('http://127.0.0.1:3001/mathilda_classes');
  return response.data.classes;
};

const page = async () => {
  const classes = await fetchClasses();
  return (
    <div>
      {classes?.map((c) => (
        <div key={c.id}>
          <h1 className="text-center text-xl">{c.name}</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/3">Students</th>
                <th className="w-1/3">Subjects</th>
                <th className="w-1/3">Teachers</th>
              </tr>
            </thead>
            <tbody>
              <tr key={c.id} className="p-3">
                <td className="w-1/3 px-10">
                  <ol>
                    {c.students.map((s) => (
                      <li className="list-decimal">{s.name}</li>
                    ))}
                  </ol>
                </td>
                <td className="w-1/3 px-10">
                  <ol>
                    {c.subjects.map((s) => (
                      <li className="list-decimal">{s.name}</li>
                    ))}
                  </ol>
                </td>
                <td className="w-1/3 px-10">
                  <ol>
                    {c.teachers.map((t) => (
                      <li className="list-decimal">{t.name}</li>
                    ))}
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default page;
