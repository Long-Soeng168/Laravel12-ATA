const MyTable = () => {
    return (
        <div className="mx-auto max-w-screen-xl md:mt-16">
            <div className=" overflow-auto bg-white p-8 ">
                <h2 className="mb-4 text-center text-[#3a573a] text-3xl"> Kindergarten and Grade 1-3
                </h2>
                <div className="relative overflow-auto">
                    <div className="overflow-x-auto rounded-lg">
                        <table className="bg-[#dee4ed] mb-20 min-w-full border-collapse border border-[#3a573a]">
                            <thead>
                                <tr className="bg-[#3a573a] p-20 text-center text-xs font-thin text-white md:text-lg">
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Session</span>
                                    </th>
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Days</span>
                                    </th>
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Time</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Morning</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">7:30 11:30 AM</td>
                                </tr>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Afternoon</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">1:30 5:30 PM</td>
                                </tr>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Full Days</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">8:40 11:30 AM <br/>1:30-4:30 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className=" overflow-auto bg-white p-8 ">
                <h2 className="mb-4 text-center text-[#3a573a] text-3xl">Grade 4-12</h2>

                <div className="relative overflow-auto">
                <div className="overflow-x-auto rounded-lg">
                        <table className="bg-[#dee4ed] mb-20 min-w-full border-collapse border border-[#3a573a]">
                            <thead>
                                <tr className="bg-[#3a573a] p-20 text-center text-xs font-thin text-white md:text-lg">
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Session</span>
                                    </th>
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Days</span>
                                    </th>
                                    <th className="border-r border-gray-400 p-4">
                                        <span className="block">Time</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Morning</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">7:30 11:30 AM</td>
                                </tr>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Afternoon</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">1:30 5:30 PM</td>
                                </tr>
                                <tr className="text-center text-sm text-[#3a573a] md:text-sm">
                                    <td className="border border-gray-400 p-2 md:p-4">Full Days</td>
                                    <td className="border border-gray-400 p-2 md:p-4">Monday-Friday</td>
                                    <td className="border border-gray-400 p-2 md:p-4">8:40 11:30 AM <br/>1:30-4:30 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTable;
