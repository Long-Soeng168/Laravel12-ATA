import React from 'react';

const schedules = {
  'Grade 3': [
    { hour: '1', Monday: 'Math', Tuesday: 'English', Wednesday: 'Science', Thursday: 'Art', Friday: 'PE' },
    { hour: '2', Monday: 'Reading', Tuesday: 'Math', Wednesday: 'English', Thursday: 'Music', Friday: 'Science' },
    { hour: '3', Monday: 'Art', Tuesday: 'Science', Wednesday: 'Math', Thursday: 'Reading', Friday: 'English' },
  ],
  'Grade 4': [
    { hour: '1', Monday: 'Science', Tuesday: 'Math', Wednesday: 'History', Thursday: 'English', Friday: 'PE' },
    { hour: '2', Monday: 'Geography', Tuesday: 'English', Wednesday: 'Math', Thursday: 'Science', Friday: 'Art' },
    { hour: '3', Monday: 'Reading', Tuesday: 'Music', Wednesday: 'Science', Thursday: 'Math', Friday: 'English' },
  ],
  'Grade 5': [
    { hour: '1', Monday: 'Math', Tuesday: 'Geography', Wednesday: 'English', Thursday: 'Biology', Friday: 'PE' },
    { hour: '2', Monday: 'History', Tuesday: 'Math', Wednesday: 'Science', Thursday: 'Music', Friday: 'Art' },
    { hour: '3', Monday: 'Reading', Tuesday: 'English', Wednesday: 'Math', Thursday: 'Geography', Friday: 'Science' },
  ],
  'Grade 6': [
    { hour: '1', Monday: 'Biology', Tuesday: 'Math', Wednesday: 'History', Thursday: 'Science', Friday: 'PE' },
    { hour: '2', Monday: 'English', Tuesday: 'Chemistry', Wednesday: 'Math', Thursday: 'Art', Friday: 'Computer' },
    { hour: '3', Monday: 'Geography', Tuesday: 'English', Wednesday: 'Science', Thursday: 'Math', Friday: 'Music' },
  ]
};

const MyClassSchedules = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto py-16">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-10">Weekly Schedules and Subjects (Grades 3–6)</h1>
      {Object.entries(schedules).map(([grade, schedule]) => (
        <div key={grade} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">{grade}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-100 text-center">
                  <th className="border border-gray-300 p-2">Class Hour</th>
                  <th className="border border-gray-300 p-2">Monday</th>
                  <th className="border border-gray-300 p-2">Tuesday</th>
                  <th className="border border-gray-300 p-2">Wednesday</th>
                  <th className="border border-gray-300 p-2">Thursday</th>
                  <th className="border border-gray-300 p-2">Friday</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="text-center">
                    <td className="border border-gray-300 p-2 font-medium">{row.hour}</td>
                    <td className="border border-gray-300 p-2">{row.Monday}</td>
                    <td className="border border-gray-300 p-2">{row.Tuesday}</td>
                    <td className="border border-gray-300 p-2">{row.Wednesday}</td>
                    <td className="border border-gray-300 p-2">{row.Thursday}</td>
                    <td className="border border-gray-300 p-2">{row.Friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyClassSchedules;
