import axios from 'axios';
import Link from 'next/link';

const fetchSubjects = async () => {
  const response = await axios.get('http://127.0.0.1:3001/subjects');
  return response.data;
};

const page = async () => {
  const subjects = await fetchSubjects();
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/4">Id</th>
            <th className="w-1/4">Name</th>
            <th className="w-1/4">Class</th>
            <th className="w-1/4">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects?.map((subject: any) => (
            <tr key={subject.id} className="py-3">
              <td className="w-1/4 text-center">{subject.id}</td>
              <td className="w-1/4 text-center">{subject.name}</td>
              <td className="w-1/4 text-center">{subject.mathilda_class.name}</td>
              <td className="w-1/4 text-center">
                <Link
                  href={'/subject/edit'}
                  className=" bg-green-300 hover:bg-green500 p-2 rounded-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center'>
        <Link
          href="/subject/new"
          className="bg-green-300 hover:bg-green500 p-2 rounded-sm"
        >
          Add Subject
        </Link>
      </div>
    </div>
  );
};

export default page;
