'use client';

import { Class } from '@/types/api';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


interface ClassStateType {
  loading: boolean;
  error: null | string;
  classes: [] | Class[];
}
interface ClassContextType extends ClassStateType {
  setClassState: React.Dispatch<React.SetStateAction<ClassStateType>>;
}

export const ClassContext = createContext<ClassContextType>({
  loading: false,
  error: null,
  classes: [],
  setClassState: () => {},
});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classState, setClassState] = useState<ClassStateType>({
    loading: true,
    error: null,
    classes: [],
  });

  const fetchClasses = async () => {
    setClassState({
      ...classState,
      loading: true,
    });

    try {
      const response = await axios.get('http://127.0.0.1:3001/mathilda_classes');

      setClassState({
        ...classState,
        loading: false,
        classes: response.data.classes,
      });
    } catch (error: any) {
      setClassState({
        ...classState,
        loading: false,
        error: error.response.classes.errorMessages,
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
