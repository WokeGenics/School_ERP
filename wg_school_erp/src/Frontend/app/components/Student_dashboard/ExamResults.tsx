export default function ExamResults() {
    const results = [
      { id: '#0251', exam: 'Class Test', subject: 'English', grade: 'A', percent: '90.0%', date: '22/02/2019' },
      { id: '#0252', exam: 'Class Test', subject: 'Math', grade: 'B', percent: '80.0%', date: '22/02/2019' },
      { id: '#0253', exam: 'Class Test', subject: 'Chemistry', grade: 'C', percent: '70.0%', date: '22/02/2019' },
    ];
  
    return (
      <div className="bg-white shadow-md p-6 rounded-md overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-black">All Exam Results</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-red-600">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Exam Name</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Percent</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-b text-black">
                <td className="p-3">{result.id}</td>
                <td className="p-3">{result.exam}</td>
                <td className="p-3">{result.subject}</td>
                <td className="p-3">{result.grade}</td>
                <td className="p-3">{result.percent}</td>
                <td className="p-3">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  