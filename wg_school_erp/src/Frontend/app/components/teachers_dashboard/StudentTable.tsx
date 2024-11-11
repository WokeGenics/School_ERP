import { FaSearch } from 'react-icons/fa';

export default function StudentTable() {
  const students = Array(10).fill({
    roll: '#0021',
    name: 'Mark Willy',
    gender: 'Male',
    class: '2',
    section: 'A',
    parents: 'Jack Sparrow',
    address: 'TA-107 New York',
    dob: '02/05/2001',
    phone: '+123 9988558',
    email: 'kazifahim93@gmail.com',
  });

  return (
    <div className="bg-white shadow-md p-6 rounded-md overflow-x-auto ">
      <h2 className="text-lg font-bold mb-4">My Students</h2>
      <div className="flex space-x-4 mb-4 text-black">
        <input
          type="text"
          placeholder="Search by Roll..."
          className="border p-2 rounded-md w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Name..."
          className="border p-2 rounded-md w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Class..."
          className="border p-2 rounded-md w-1/3"
        />
        <button className="bg-yellow-500 text-white p-2 rounded-md">
          <FaSearch />
        </button>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-blue-600">
            <th className="p-3 text-left">Roll</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Parents</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Date of Birth</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">E-mail</th>
          </tr>
        </thead>
        <tbody className='text-gray-600'>
          {students.map((student, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{student.roll}</td>
              <td className="p-3">
                <img src="/profile-pic.png" alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.gender}</td>
              <td className="p-3">{student.class}</td>
              <td className="p-3">{student.section}</td>
              <td className="p-3">{student.parents}</td>
              <td className="p-3">{student.address}</td>
              <td className="p-3">{student.dob}</td>
              <td className="p-3">{student.phone}</td>
              <td className="p-3">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
