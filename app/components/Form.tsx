'use client';

import React, { useContext, useState } from 'react';
import Button from '@mui/joy/Button';
import { ClassContext } from '../context/ClassContext';
import { useRouter } from 'next/navigation';
import ClassCheckBoxList from './ClassCheckBoxList';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import NameInput from './NameInput';
import AgeInput from './AgeInput';
import ExternalCheckBox from './ExternalCheckBox';
import ClassSelect from './ClassSelect';
import usePost from '@/hooks/usePost';

export interface userBodyInterface {
  email: string;
  password: string;
  role: string;
}

export interface memberBodyInterface {
  name: string;
  age: number;
  is_external?: boolean;
  mathilda_class_id?: number;
  class_ids?: number[];
}

export interface subjectBodyInterface {
  name: string;
  mathilda_class_id: number;
}

const Form = ({ slug, type, id }: { slug: string; type?: string; id?: string }) => {
  const [userBody, setUserBody] = useState<userBodyInterface>({
    email: '',
    password: '',
    role: slug === 'student' ? 'student' : 'teacher',
  });
  const initialMember: memberBodyInterface =
    slug === 'student'
      ? {
          name: '',
          age: 0,
          is_external: false,
          mathilda_class_id: 0,
        }
      : {
          name: '',
          age: 0,
          class_ids: [],
        };
  const [memberBody, setMemberBody] = useState<memberBodyInterface>(initialMember);
  const [subjectBody, setSubjectBody] = useState({
    name: '',
    mathilda_class_id: 0,
  });
  const { classes } = useContext(ClassContext);

  const handleUserBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserBody({ ...userBody, [name]: value });
  };

  const handleMemberBodyChange = (e: any): void => {
    const { name, value } = e.target;
    setMemberBody({
      ...memberBody,
      [name]: name === 'age' || name === 'mathilda_class_id' ? parseInt(value) : value,
    });
    console.log(memberBody);
  };

  const handleSubjectBodyChange = (e: any) => {
    const { name, value } = e.target;
    setSubjectBody({
      ...subjectBody,
      [name]: name === 'mathilda_class_id' ? parseInt(value) : value,
    });
  };

  const { postTeacher, postStudent, postNewSession, postSubject } = usePost();

  return (
    <div className="w-[90]%">
      <form
        className="flex flex-col gap-y-2"
        onSubmit={(e) => {
          if (type === 'new') {
            slug === 'teacher'
              ? postTeacher(e, 'new', userBody, memberBody)
              : slug === 'student'
              ? postStudent(e, 'new', userBody, memberBody)
              : slug === 'session'
              ? postNewSession(e, userBody)
              : slug === 'subject'
              ? postSubject(e, 'new', subjectBody)
              : () => {};
          } else if (type === 'edit') {
            slug === 'teacher'
              ? postTeacher(e, 'edit', userBody, memberBody, id)
              : slug === 'student'
              ? postStudent(e, 'edit', userBody, memberBody, id)
              : slug === 'subject'
              ? postSubject(e, 'edit', subjectBody, id)
              : () => {};
          }
        }}
      >
        {slug !== 'subject' && type === 'new' ? (
          <>
            <EmailInput handleUserBodyChange={handleUserBodyChange} />
            <PasswordInput handleUserBodyChange={handleUserBodyChange} />
          </>
        ) : null}

        {slug !== 'session' ? (
          <>
            <NameInput
              slug={slug}
              handleMemberBodyChange={handleMemberBodyChange}
              handleSubjectBodyChange={handleSubjectBodyChange}
            />
            {slug !== 'subject' ? (
              <AgeInput handleMemberBodyChange={handleMemberBodyChange} />
            ) : null}
          </>
        ) : null}

        {slug === 'student' ? (
          <>
            <ExternalCheckBox setMemberBody={setMemberBody} />
          </>
        ) : null}

        {slug === 'student' || slug === 'subject' ? (
          <ClassSelect
            slug={slug}
            handleMemberBodyChange={handleMemberBodyChange}
            handleSubjectBodyChange={handleSubjectBodyChange}
            classes={classes}
          />
        ) : slug === 'teacher' ? (
          <ClassCheckBoxList memberBody={memberBody} setMemberBody={setMemberBody} />
        ) : null}

        <button type="submit" className="border p-2 border-blue-200 rounded-md hover:bg-blue-200">
          {slug === 'student' || (slug === 'teacher' && type === 'new')
            ? 'Onboard a member'
            : type === 'edit'
            ? 'Confirm changes'
            : slug === 'subject' && type === 'new'
            ? 'Create a subject'
            : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Form;
