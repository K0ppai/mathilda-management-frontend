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
}

export interface Class {
  id: number;
  name: string;
  students: Student[];
  subjects: Subject[];
  teachers: Teacher[];
}
