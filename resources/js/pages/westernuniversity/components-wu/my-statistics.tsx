import { User } from 'lucide-react';

const MyStatistics = () => {
    return (
        <div>
            <div className="mx-auto max-w-screen-2xl  bg-white px-4 pb-16 text-center sm:px-8 lg:px-16">
                <h2 className="font-noto-san-extra-light text-3xl text-black sm:text-4xl">Statistics</h2>
                <div className="mx-auto my-4 h-1 w-16 bg-black"></div>
                <p className="font-noto-san-regular mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
                    Jonathan Carroll University was founded on the principle that by pursuing big ideas and sharing what we learn, we make the world a
                    better place. For more than 135 years, we haven’t strayed from that vision.
                </p>

                <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#2c318a] bg-gray-100">
                            <img
                                src="assets/demo-images/icons8-graduate-80.png"
                                alt="Graduates"
                                className="w-10 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-red-600">97%</p>
                        <div className="mx-auto my-1 h-0.5 w-7 bg-gray-200"></div>
                        <p className="text-sm font-semibold text-gray-800 sm:text-base">Graduates</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#2c318a] bg-gray-100">
                            <img
                                src="assets/demo-images/icons8-certified-80.png"
                                alt="Certified Teachers"
                                className="w-10 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-red-600">30+</p>
                        <div className="mx-auto my-1 h-0.5 w-7 bg-gray-200"></div>
                        <p className="text-sm font-semibold text-gray-800 sm:text-base">Certified Teachers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#2c318a] bg-gray-100">
                            <img
                                src="assets/demo-images/icons8-student-80.png"
                                alt="Student Campuses"
                                className="w-10 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-red-600">8</p>
                        <div className="mx-auto my-1 h-0.5 w-7 bg-gray-200"></div>
                        <p className="text-sm font-semibold text-gray-800 sm:text-base">Student Campuses</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#2c318a] bg-gray-100">
                            <img
                                src="assets/demo-images/icons8-university-80.png"
                                alt="Students"
                                className="w-10 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-red-600">6510</p>
                        <div className="mx-auto my-1 h-0.5 w-7 bg-gray-200"></div>
                        <p className="text-sm font-semibold text-gray-800 sm:text-base">Students</p>
                    </div>
                </div>
            </div>
            <div className="relative h-[50vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('assets/demo-images/banner3.jpg')" }}>
                <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black px-4 text-center sm:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-white sm:text-5xl">Trusted by Over 6000+ Students</h2>
                    <p className="mt-4 max-w-2xl text-gray-300">Join our community of students around the world helping you succeed.</p>
                    <button className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700">
                        Get Started
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-screen-2xl bg-white px-4 py-16 text-center sm:px-8 lg:px-16">
                <h2 className="font-noto-san-extra-light text-3xl text-black sm:text-4xl">Events</h2>
                <div className="mx-auto my-4 h-1 w-16 bg-[#2c318a]"></div>
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/banner3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/courses3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">International Conference on Biomolecular Engineering Engineering </h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/banner3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/courses2.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/banner3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/courses3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">International Conference on Biomolecular Engineering Engineering </h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/banner3.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden bg-white shadow-lg">
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img className="aspect-[9/10] w-full object-cover" src="assets/demo-images/courses2.jpg" alt="Event Image" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                        Book Now
                                    </a>
                                    <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex h-full space-x-3 pr-4">
                                <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                    <p className="text-sm font-bold">31</p>
                                    <p className="text-sm uppercase">September</p>
                                    <p className="text-sm font-bold">5:00pm</p>
                                </div>
                                <div className="my-2">
                                    <h2 className="font-noto-san-extra-light line-clamp-2 mb-2 text-base text-red-700">Spacewalking Conference</h2>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <User className="mr-1 h-4 w-4 text-red-700" />
                                        Walter Stanley
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    href="#"
                    className="mt-6 inline-flex items-center rounded-md bg-[#e31c24] px-6 py-3 font-semibold text-[#ffff] shadow-md transition"
                >
                    Learn More{' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default MyStatistics;
