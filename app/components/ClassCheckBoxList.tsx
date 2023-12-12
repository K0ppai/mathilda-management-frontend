'use client';

import React, { useContext } from 'react';
import { memberBodyInterface } from './Form';
import { ClassContext } from '../context/ClassContext';
import Checkbox from '@mui/joy/Checkbox';

const ClassCheckBoxList = ({
  memberBody,
  setMemberBody,
}: {
  memberBody: memberBodyInterface;
  setMemberBody: React.Dispatch<React.SetStateAction<memberBodyInterface>>;
}) => {
  const { classes } = useContext(ClassContext);
  return (
    <div>
      {classes?.map((item) => (
        <div key={item.id} className='flex items-center gap-x-2'>
          <input type='checkbox'
            onChange={(e) => {
              if (e.target.checked) {
                setMemberBody({
                  ...memberBody,
                  class_ids: [...(memberBody.class_ids || []), item.id],
                });
              } else {
                setMemberBody((prev) => ({
                  ...prev,
                  class_ids: prev.class_ids?.filter((id) => id !== item.id),
                }));
              }
            }}
          />
          <label>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default ClassCheckBoxList;
