'use client';

import { useState } from 'react';
import Input from '@mui/joy/Input';
import Radio from '@mui/joy/Radio';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';

const Form = ({ slug }: { slug: string }) => {
  const initialMember: {
    name: string;
    age: number;
    is_external?: boolean;
    mathilda_class_id?: string;
  } =
    slug === 'student'
      ? {
          name: '',
          age: 0,
          is_external: false,
          mathilda_class_id: '',
        }
      : {
          name: '',
          age: 0,
        };
  const [userBody, setUserBody] = useState({
    email: '',
    password: '',
    role: slug === 'student' ? 'student' : 'teacher',
  });
  const [memberBody, setMemberBody] = useState(initialMember);
  const [subjectBody, setSubjectBody] = useState({
    name: '',
    mathilda_class_id: '',
  });

  const handleUserBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserBody({ ...userBody, [name]: value });
  };

  const handleMemberBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberBody({ ...memberBody, [name]: value });
  };

  const handleSubjectBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectBody({ ...subjectBody, [name]: value });
  };

  return (
    <div className="w-[90]%">
      <form>
        {slug !== 'subject' ? (
          <>
            <Input
              color="primary"
              name="email"
              variant="soft"
              type="email"
              placeholder="Email"
              required
              onChange={handleUserBodyChange}
            />
            <Input
              color="primary"
              name="password"
              variant="soft"
              type="number"
              placeholder="Password"
              required
              onChange={handleUserBodyChange}
            />
          </>
        ) : null}

        {slug !== 'session' ? (
          <Input
            color="primary"
            name="name"
            variant="soft"
            type="text"
            placeholder="Name"
            required
            onChange={
              slug === 'student' || slug === 'teacher'
                ? handleMemberBodyChange
                : handleSubjectBodyChange
            }
          />
        ) : null}

        {slug === 'student' ? (
          <>
            <Checkbox
              color="primary"
              label="External"
              name="is_external"
              variant="soft"
              onChange={() => {
                setMemberBody({
                  ...memberBody,
                  is_external: !memberBody.is_external,
                });
              }}
            />
          </>
        ) : null}

        {slug === 'student' || slug === 'subject' ? (
          <Select color="primary" placeholder="Choose class" variant="soft">
            <Option></Option>
          </Select>
        ) : null}

        <Button type="submit" color="primary" variant="soft">
          {slug === 'student' || slug === 'teacher'
            ? 'Onboard a member'
            : slug === 'subject'
            ? 'Create a subject'
            : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Form;
