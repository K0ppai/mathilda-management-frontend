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

interface State {
  token: string;
  loading: boolean;
  error: null | string;
  classes: null | Class[];
  user: null | any;
}

export const ClassContext = createContext<State>({
  token: '',
  loading: false,
  error: null,
  classes: null,
  user: null,
});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classState, setClassState] = useState<State>({
    token: '',
    loading: true,
    error: null,
    classes: null,
    user: null,
  });
  const token = localStorage.getItem('mathilda');

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
        token: '',
        classes: null,
        loading: false,
        error: error.response.classes.errorMessages,
        user: null,
      });
    }
  };

  const fetchClasses = async () => {
    setClassState({
      token: '',
      loading: true,
      error: null,
      classes: null,
      user: null,
    });

    try {
      const response = await axios.get('http://127.0.0.1:3001/mathilda_classes');

      setClassState({
        token: token ? token : '',
        loading: false,
        error: null,
        classes: response.data.classes,
        user: null,
      });
    } catch (error: any) {
      setClassState({
        token: '',
        classes: null,
        loading: false,
        error: error.response.classes.errorMessages,
        user: null,
      });
    }
  };

  useEffect(() => {
    fetchClasses();
    if (token) {
      fetchUser(token);
    }
  }, []);

  return <ClassContext.Provider value={{ ...classState }}>{children}</ClassContext.Provider>;
};

export default Context;
