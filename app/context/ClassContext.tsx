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
}

interface State {
  loading: boolean;
  error: null | string;
  data: null | Class[];
}

export const ClassContext = createContext<State>({
  loading: false,
  error: null,
  data: null,
});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classState, setClassState] = useState<State>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchClasses = async () => {
    setClassState({
      loading: true,
      error: null,
      data: null,
    });

    try {
      const response = await axios.get('http://127.0.0.1:3001/mathilda_classes');

      setClassState({
        loading: false,
        error: null,
        data: response.data.classes,
      });
      console.log(classState.data)
    } catch (error: any) {
      setClassState({
        data: null,
        loading: false,
        error: error.response.data.errorMessages,
      });
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return <ClassContext.Provider value={{ ...classState }}>{children}</ClassContext.Provider>;
};

export default Context;
