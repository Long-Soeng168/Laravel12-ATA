const MyMiddleSection = () => {
    return (
        <div className="bg-[#2c318a] my-16">
        <div className="grid grid-cols-2 items-center max-w-screen-2xl mx-auto">
        <div className="h-full w-full">
            <img src="assets/demo-images/courses1.jpg" alt="Students" className="w-full h-full object-cover"/>
        </div>

        <div className="w-full h-full  text-white px-4 sm:px-10 md:px-20 py-12">
            <h2 className="text-4xl font-noto-san-extra-light">Our Featured Courses</h2>
            <div className="w-16 h-1 bg-white my-4"></div>
            <p className="text-lg text-gray-300">
                Our Featured Courses are selected through a rigorous process and uniquely created for each semester.
            </p>

            <div className="bg-white text-gray-800 mt-6 flex  overflow-hidden shadow-md">
                <img src="assets/demo-images/banner3.jpg" alt="Course Image" className="w-1/4 object-cover"/>
                <div className="p-4 w-3/4">
                    <h3 className="text-red-700 font-semibold text-lg">Financial Analyst Course</h3>
                    <p className="text-gray-700">Major Designation</p>
                    <p className="text-gray-500 text-sm">June 3, 2022</p>
                </div>
            </div>
            <div className="bg-white text-gray-800 mt-6 flex  overflow-hidden shadow-md">
                <img src="assets/demo-images/courses2.jpg" alt="Course Image" className="w-1/4 object-cover"/>
                <div className="p-4 w-3/4">
                    <h3 className="text-red-700 font-semibold text-lg">Management & Hotel-tourism</h3>
                    <p className="text-gray-700">Major Designation</p>
                    <p className="text-gray-500 text-sm">June 3, 2022</p>
                </div>
            </div>
            <div className="bg-white text-gray-800 mt-6 flex  overflow-hidden shadow-md">
                <img src="assets/demo-images/courses3.jpg" alt="Course Image" className="w-1/4 object-cover"/>
                <div className="p-4 w-3/4">
                    <h3 className="text-red-700 font-semibold text-lg">Management & Hotel-tourism</h3>
                    <p className="text-gray-700">Major Designation</p>
                    <p className="text-gray-500 text-sm">June 3, 2022</p>
                </div>
            </div>
            <a href="#" className="inline-flex shadow-md items-center mt-6 px-6 py-3 bg-[#e31c24] border-2 border-[#2c318a] rounded-md text-white hover:text-[#244494] font-semibold hover:bg-gray-100 transition">
            View All Courses
        </a>
        </div>
    </div>
    </div>

    );
};

export default MyMiddleSection;
