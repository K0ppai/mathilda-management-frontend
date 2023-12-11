'use client';

import React, { useContext, useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import axios from 'axios';
import { Class, ClassContext } from '../context/ClassContext';
import { useRouter } from 'next/navigation';
import ClassCheckBoxList from './ClassCheckBoxList';

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

const Form = ({ slug }: { slug: string }) => {
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
  const router = useRouter();

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
  };

  const handleSubjectBodyChange = (e: any) => {
    const { name, value } = e.target;
    setSubjectBody({
      ...subjectBody,
      [name]: name === 'mathilda_class_id' ? parseInt(value) : value,
    });
    console.log(subjectBody);
  };

  const postTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      user: userBody,
      teacher: memberBody,
    };
    const res = await axios.post('http://127.0.0.1:3001/teachers', body).then((res) => {
      res.status === 201 ? router.push('/session/new') : null;
    });
    return res;
  };

  const postStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      user: userBody,
      student: memberBody,
    };
    const res = await axios.post('http://127.0.0.1:3001/students', body).then((res) => {
      res.status === 201 ? router.push('/session/new') : null;
    });
    return res;
  };

  const postNewSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      user: userBody,
    };
    const res = await axios.post('http://127.0.0.1:3001/login', body).then((res) => {
      if (res.status === 202) {
        localStorage.setItem('mathilda', res.data.token);
        router.push('/me');
      }
    });
    return res;
  };

  const postSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      subject: subjectBody,
    };
    const token = localStorage.getItem('mathilda');
    const res = await axios.post('http://127.0.0.1:3001/subjects', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  const { classes } = useContext(ClassContext);

  return (
    <div className="w-[90]%">
      <form
        onSubmit={
          slug === 'teacher'
            ? postTeacher
            : slug === 'student'
            ? postStudent
            : slug === 'session'
            ? postNewSession
            : slug === 'subject'
            ? postSubject
            : () => {}
        }
      >
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
              type="password"
              placeholder="Password"
              required
              onChange={handleUserBodyChange}
            />
          </>
        ) : null}

        {slug !== 'session' ? (
          <>
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
            {slug !== 'subject' ? (
              <Input
                color="primary"
                name="age"
                variant="soft"
                type="number"
                placeholder="Age"
                required
                onChange={handleMemberBodyChange}
              />
            ) : null}
          </>
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
          <select
            name="mathilda_class_id"
            onChange={slug === 'student' ? handleMemberBodyChange : handleSubjectBodyChange}
            required
            className="w-full bg-slate-400"
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
        ) : slug === 'teacher' ? (
          <ClassCheckBoxList memberBody={memberBody} setMemberBody={setMemberBody} />
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
