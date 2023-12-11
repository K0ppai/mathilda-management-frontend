'use client';

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface Student {
  id: number;
  name: string;
  age: number;
  is_external: boolean;
}

interface Teacher {
  id: number;
  name: string;
  age: number;
}

interface Subject {
  id: number;
  name: string;
  teachers: Teacher[];
}

export interface Class {
  id: number;
  name: string;
  students: Student[];
  subjects: Subject[];
  teachers: Teacher[];
}

interface ClassStateType {
  loading: boolean;
  error: null | string;
  classes: null | Class[];
  user: null | any;
}
interface ClassContextType extends ClassStateType {
  setClassState: React.Dispatch<React.SetStateAction<ClassStateType>>;
}

export const ClassContext = createContext<ClassContextType>({
  loading: false,
  error: null,
  classes: null,
  user: null,
  setClassState: () => {},
});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classState, setClassState] = useState<ClassStateType>({
    loading: true,
    error: null,
    classes: null,
    user: null,
  });

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClassState({
        ...classState,
        user: response.data,
      });
    } catch (error: any) {
      setClassState({
        classes: null,
        loading: false,
        error: error.response.classes.errorMessages,
        user: null,
      });
    }
  };

  const fetchClasses = async () => {
    setClassState({
      loading: true,
      error: null,
      classes: null,
      user: null,
    });

    try {
      const response = await axios.get('http://127.0.0.1:3001/mathilda_classes');

      setClassState({
        loading: false,
        error: null,
        classes: response.data.classes,
        user: null,
      });
    } catch (error: any) {
      setClassState({
        classes: null,
        loading: false,
        error: error.response.classes.errorMessages,
        user: null,
      });
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <ClassContext.Provider value={{ ...classState, setClassState }}>
      {children}
    </ClassContext.Provider>
  );
};

export default Context;
