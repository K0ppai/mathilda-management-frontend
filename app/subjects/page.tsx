import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const fetchSubjects = async () => {
  const response = await fetch('http://127.0.0.1:3001/subjects', {
    method: 'GET',
    cache: 'no-store',
  })
    .then((res) => res.json())
    .then((res) => res);
  return response;
};

const page = async () => {
  const subjects = await fetchSubjects();
  const cookie = getCookie('mathilda', { cookies }) || '';

  return (
    <div>
      <table className="w-full mb-2">
        <thead>
          <tr>
            <th className="w-1/4 border">Id</th>
            <th className="w-1/4 border">Name</th>
            <th className="w-1/4 border">Class</th>
            <th className="w-1/4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects?.map((subject: any) => (
            <tr key={subject.id} className="py-3">
              <td className="w-1/4 border text-center">{subject.id}</td>
              <td className="w-1/4 border text-center">{subject.name}</td>
              <td className="w-1/4 border text-center">{subject.mathilda_class.name}</td>
              <td className="w-1/4 border text-center">
                {cookie ? (
                  <Link
                    href={`/subject/edit/${subject.id.toString()}`}
                    className=" bg-green-300 hover:bg-green500 p-2 rounded-sm"
                  >
                    Edit
                  </Link>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {cookie ? (
          <Link href="/subject/new" className="bg-green-300 hover:bg-green500 p-2 rounded-sm">
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
