import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import SubjectCard from './components/SubjectCard';

const fetchSubjects = async () => {
  const response = await fetch('https://mathilda-management-6d5c387a84e7.herokuapp.com/subjects', {
    method: 'GET',
    cache: 'no-store',
  })
    .then((res) => res.json())
    .then((res) => res);
  return response;
};

interface mathildaClassInterface {
  id: number;
  name: string;
}
export interface subjectInterface {
  id: number;
  name: string;
  mathilda_class_id: number;
  mathilda_class: mathildaClassInterface;
}

const page = async () => {
  const subjects = await fetchSubjects();
  const cookie = getCookie('mathilda', { cookies }) || '';

  return (
    <div>
      <table className="w-full mb-2">
        <thead>
          <tr>
            <th className="w-1/4 border p-2">Id</th>
            <th className="w-1/4 border p-2">Name</th>
            <th className="w-1/4 border p-2">Class</th>
            <th className="w-1/4 border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects?.map((subject: subjectInterface) => (
            <SubjectCard key={subject.id} subject={subject} cookie={cookie} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {cookie ? (
          <Link href="/subject/new" className="bg-blue-200 hover:bg-blue-300 p-2 rounded-sm">
            Add Subject
          </Link>
        ) : (
          <div>Please sign up or login to create new or edit subjects</div>
        )}
      </div>
    </div>
  );
};

export default page;
