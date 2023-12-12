import { Class } from '@/types/api';
import axios from 'axios';
import React from 'react';
import ClassTables from './components/ClassTable';

const fetchClasses = async (): Promise<Class[]> => {
  const response = await axios.get(
    'https://mathilda-management-6d5c387a84e7.herokuapp.com/mathilda_classes',
  );
  return response.data.classes;
};

const page = async () => {
  const classes = await fetchClasses();

  return (
    <div className="flex flex-col gap-y-5">
      {classes?.map((c) => (
        <ClassTables key={c.id} c={c} />
      ))}
    </div>
  );
};

export default page;
