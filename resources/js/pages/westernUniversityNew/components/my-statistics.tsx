
const MyStatistics = () => {
    return (
        <div className='mt-12'>
            <div className="mx-auto max-w-screen-xl bg-white px-4 pb-16 text-center sm:px-16">
                <h2 className="text-3xl text-black sm:text-4xl">Statistics</h2>
                <div className="mx-auto my-4 h-1 w-16 bg-black"></div>
                <p className="font-noto-san-regular mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
                    Jonathan Carroll University was founded on the principle that by pursuing big ideas and sharing what we learn, we make the world a
                    better place. For more than 135 years, we haven’t strayed from that vision.
                </p>

                <div className="mx-auto mt-12 grid max-w-full grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="flex flex-col items-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300">
                            <img
                                src="/assets/demo-images/icons8-graduate-80.png"
                                alt="Graduates"
                                className="w-20 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-red-800">97%</p>
                        <div className="mx-auto my-4 h-0.5 w-10 bg-gray-200"></div>
                        <p className="text-xl font-semibold text-gray-800 sm:text-base">Graduates</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300">
                            <img
                                src="/assets/demo-images/icons8-certified-80.png"
                                alt="Certified Teachers"
                                className="w-20 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-red-800">30+</p>
                        <div className="mx-auto my-4 h-0.5 w-10 bg-gray-200"></div>
                        <p className="text-xl font-semibold text-gray-800 sm:text-base">Certified Teachers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300">
                            <img
                                src="/assets/demo-images/icons8-student-80.png"
                                alt="Student Campuses"
                                className="w-20 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-red-800">8</p>
                        <div className="mx-auto my-4 h-0.5 w-10 bg-gray-200"></div>
                        <p className="text-xl font-semibold text-gray-800 sm:text-base">Student Campuses</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300">
                            <img
                                src="/assets/demo-images/icons8-university-80.png"
                                alt="Students"
                                className="w-20 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-red-800">6510</p>
                        <div className="mx-auto my-4 h-0.5 w-10 bg-gray-200"></div>
                        <p className="text-xl font-semibold text-gray-800 sm:text-base">Students</p>
                    </div>
                </div>
            </div>
            <div className="relative h-[50vh] w-full">
                <img
                    src="/assets/demo-images/Homepage/07_leadership2.jpg"
                    alt="Background"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />

                <div className="bg-opacity-50 absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 px-4 text-center sm:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-white sm:text-5xl">Trusted by Over 6000+ Students</h2>
                    <p className="mt-4 max-w-2xl text-gray-300">Join our community of students around the world helping you succeed.</p>
                    <button className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700">
                        Get Started
                    </button>
                </div>
            </div>

            
        </div>
    );
};

export default MyStatistics;
