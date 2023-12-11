import React from 'react';
import { memberBodyInterface } from './Form';
import Checkbox from '@mui/joy/Checkbox';

const ExternalCheckBox = ({ setMemberBody }: {
  setMemberBody: React.Dispatch<React.SetStateAction<memberBodyInterface>>;
}) => {
  return (
    <div className='flex items-center gap-x-2'>
      <input type='checkbox'
        name="is_external"
        onChange={() => {
          setMemberBody((prev: memberBodyInterface) => ({
            ...prev,
            is_external: !prev.is_external,
          }));
        }}
      />
      <label>External</label>
    </div>
  );
};

export default ExternalCheckBox;
