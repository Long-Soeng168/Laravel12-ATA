import React from 'react';

const MySchoolCurriculum = () => {
  return (
    <div className="mx-auto max-w-screen-xl py-16 px-4 bg-white text-gray-700 overflow-hidden">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold border-b pb-2">School Weekly Curriculum</h1>
        <p className="text-sm mt-2">Replace your text here! Replace your text here! Replace your text here! Replace your text here!</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 overflow-x-auto">
        <div className="flex-1">
          <div className="space-y-2">
            {[
              { label: 'Category 8', value: 89 },
              { label: 'Category 7', value: 69 },
              { label: 'Category 6', value: 58 },
              { label: 'Category 5', value: 43 },
              { label: 'Category 4', value: 67 },
              { label: 'Category 3', value: 55 },
              { label: 'Category 2', value: 35 },
              { label: 'Category 1', value: 72 },
            ].map((item, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <span className="w-24 shrink-0">{item.label}</span>
                <div className="bg-gray-200 w-full h-5 relative">
                  <div className="bg-blue-400 h-5" style={{ width: `${item.value}%` }}></div>
                  <span className="absolute right-1 top-0 text-sm">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 overflow-x-auto">
          <table className="min-w-max w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 p-2">Student</th>
                <th className="border border-gray-300 p-2">Be late</th>
                <th className="border border-gray-300 p-2">Leave early</th>
                <th className="border border-gray-300 p-2">Sign in</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Name</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <h2 className="text-xl font-bold text-center mb-4">School Timetable</h2>
        <table className="min-w-max w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-100 text-center">
              <th className="border border-gray-300 p-2">Class hour</th>
              <th className="border border-gray-300 p-2">Monday</th>
              <th className="border border-gray-300 p-2">Tuesday</th>
              <th className="border border-gray-300 p-2">Wednesday</th>
              <th className="border border-gray-300 p-2">Thursday</th>
              <th className="border border-gray-300 p-2">Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm mt-6">Replace your text here! Replace your text here! Replace your text here!</p>
    </div>
  );
};

export default MySchoolCurriculum;
