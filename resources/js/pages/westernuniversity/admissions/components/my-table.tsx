const MyTable = ({ table }) => {
    return (
        <div className="mx-auto mt-10 max-w-screen-xl md:mt-16">
            <h2 className="mb-4 text-center text-5xl text-[#234090]">{table.title}</h2>
            {/* <div className="prose ck-content max-w-none">
                <div dangerouslySetInnerHTML={{ __html: table.long_description }}></div>
            </div> */}
            <div className="prose ck-content max-w-none">
                <div dangerouslySetInnerHTML={{ __html: table.long_description }} />
            </div>
            {/* <div className="overflow-auto bg-white p-8">
                <h2 className="mb-4 text-center text-3xl text-[#234090]">Kindergarten</h2>
                <div className="relative overflow-auto">
                    <div className="overflow-x-auto rounded-lg">
                        <table className="mb-20 min-w-full border-collapse border border-green-900 bg-white">
                            <thead>
                                <tr className="bg-[#302891] text-center text-xs font-thin text-white md:text-sm">
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Grade</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Sessions</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Yearly</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Termly (3 months)</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Monthly</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Admin Fee</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['N-K2 Kindergarten', 'Afternoon', '$1,850', '$530', '$190', '$250'],
                                    ['N-K2 Kindergarten', 'Morning', '$2,050', '$590', '$210', '$250'],
                                    ['N-K2 Kindergarten', 'Full Time', '$2,250', '$650', '$230', '$250'],
                                    ['K3 Kindergarten', 'Afternoon', '$1,950', '$560', '$200', '$250'],
                                    ['K3 Kindergarten', 'Morning', '$2,150', '$620', '$220', '$250'],
                                    ['K3 Kindergarten', 'Full Time', '$2,350', '$680', '$240', '$250'],
                                ].map(([grade, session, yearly, termly, monthly, admin], idx) => (
                                    <tr key={idx} className="text-center text-xs text-[#302891] md:text-sm">
                                        <td className="border border-gray-300 p-2 md:p-4">{grade}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{session}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{yearly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{termly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{monthly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{admin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="overflow-auto bg-white p-8">
                <h2 className="mb-4 text-center text-3xl text-[#234090]">Grade 4-12</h2>

                <div className="relative overflow-auto">
                    <div className="overflow-x-auto rounded-lg">
                        <table className="mb-20 min-w-full border-collapse border border-green-900 bg-white">
                            <thead>
                                <tr className="bg-[#302891] text-center text-xs font-thin text-white md:text-sm">
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Grade</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Session</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Yearly (10 months)</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Semesterly (5 months)</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Monthly</span>
                                    </th>
                                    <th className="border-r border-gray-300 p-10">
                                        <span className="block">Admin Fee</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['1–3', 'Morning/Afternoon', '$1,8850', '$1,040', '$220', '$250'],
                                    ['1–3', 'Full Time', '$2,150', '$1,200', '$260', '$250'],
                                    ['4–5', 'Morning/Afternoon', '$1,950', '$1,090', '$230', '$250'],
                                    ['4–5', 'Full Time', '$2,250', '$1,260', '$270', '$250'],
                                    ['6–8', 'Morning/Afternoon', '$2,050', '$1,150', '$250', '$250'],
                                    ['6–8', 'Full Time', '$2,350', '$1,320', '$280', '$250'],
                                    ['9–11', 'Morning/Afternoon', '$2,150', '$1,200', '$260', '$250'],
                                    ['9–11', 'Full Time', '$2,450', '$1,370', '$290', '$250'],
                                    ['12', 'Morning/Afternoon', '$2,250', '$1,260', '$270', '$250'],
                                    ['12', 'Full Time', '$2,550', '$1,430', '$310', '$250'],
                                ].map(([grade, session, yearly, semesterly, monthly, admin], idx) => (
                                    <tr key={idx} className="text-center text-xs text-[#302891] md:text-sm">
                                        <td className="border border-gray-300 p-2 md:p-4">{grade}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{session}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{yearly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{semesterly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{monthly}</td>
                                        <td className="border border-gray-300 p-2 md:p-4">{admin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MyTable;
