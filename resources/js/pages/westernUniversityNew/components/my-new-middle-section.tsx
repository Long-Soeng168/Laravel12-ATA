import { Link } from '@inertiajs/react';

const MyNewMiddleSection = () => {
    return (
        <div className="bg-blue-950">
            <div className="mx-auto grid max-w-screen-2xl items-center lg:grid-cols-2">
                <div className="h-full w-full">
                    <img src="assets/demo-images/Homepage/05_caring_environment_2.jpg" alt="Students" className="h-full w-full object-cover" />
                </div>

                <div className="h-full w-full px-4 py-12 text-white sm:px-10 md:p-24">
                    <h2 className="text-4xl">Our Featured Courses</h2>
                    <div className="my-10 h-1 w-16 bg-white"></div>
                    <p className="text-sm text-gray-300">
                        Our Featured Courses are selected through a rigorous process and uniquely created for each semester.
                    </p>
                    <Link href={`/programs`}>
                        <div className="mt-6 flex overflow-hidden bg-white text-gray-800 shadow-md">
                            <img src="assets/demo-images/banner3.jpg" alt="Course Image" className="w-1/4 object-cover" />
                            <div className="w-3/4 space-y-2 p-4">
                                <h3 className="text-lg font-semibold text-red-700">Financial Analyst Course</h3>
                                <p className="text-gray-700">Major Designation</p>
                                <p className="text-sm text-gray-500">June 3, 2022</p>
                            </div>
                        </div>
                    </Link>
                    <Link href={`/programs`}>
                    <div className="mt-6 flex overflow-hidden bg-white text-gray-800 shadow-md">
                        <img src="assets/demo-images/courses2.jpg" alt="Course Image" className="w-1/4 object-cover" />
                        <div className="w-3/4 space-y-2 p-4">
                            <h3 className="text-lg font-semibold text-red-700">Management & Hotel-tourism</h3>
                            <p className="text-gray-700">Major Designation</p>
                            <p className="text-sm text-gray-500">June 3, 2022</p>
                        </div>
                    </div>
                    </Link>
                    <Link href={`/programs`}>
                    <div className="mt-6 flex overflow-hidden bg-white text-gray-800 shadow-md">
                        <img src="assets/demo-images/courses3.jpg" alt="Course Image" className="w-1/4 object-cover" />
                        <div className="w-3/4 space-y-2 p-4">
                            <h3 className="text-lg font-semibold text-red-700">Management & Hotel-tourism</h3>
                            <p className="text-gray-700">Major Designation</p>
                            <p className="text-sm text-gray-500">June 3, 2022</p>
                        </div>
                    </div>
                    </Link>
                    <Link
                       href={`/programs`}
                        className="mt-6 inline-flex items-center rounded-md border bg-[#e31c24] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-gray-100 hover:text-[#244494]"
                    >
                        View All Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyNewMiddleSection;
