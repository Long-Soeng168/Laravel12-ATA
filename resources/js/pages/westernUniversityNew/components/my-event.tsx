import { User } from 'lucide-react';

const MyEvent = () => {
    return (
        <div className="mx-auto max-w-screen-2xl bg-white px-4 py-16 text-center sm:px-16">
            <h2 className="font-noto-san-extra-light text-3xl text-black sm:text-4xl">Events</h2>
            <div className="mx-auto my-10 h-1 w-16 bg-[#282d91]"></div>
            <div className="container mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="group relative overflow-hidden bg-white shadow-lg">
                        {/* Image with Hover Effect */}
                        <div className="relative">
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/banner3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/courses3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">
                                    International Conference on Biomolecular Engineering Engineering{' '}
                                </h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/banner3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/courses2.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/banner3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/courses3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">
                                    International Conference on Biomolecular Engineering Engineering{' '}
                                </h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/banner3.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                            <img className="aspect-[9/10] w-full object-cover" src="/assets/demo-images/courses2.jpg" alt="Event Image" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* <a href="#" className="mb-2 rounded-lg bg-[#e31c24] px-6 py-2 font-semibold text-white">
                                    Book Now
                                </a> */}
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
                                <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700 text-start">Spacewalking Conference</h2>
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
                className="mt-6 inline-flex items-center rounded-md bg-[#e31c24] px-6 py-3 font-semibold text-[#ffff] shadow-md transition hover:bg-blue-950"
            >
                View Event Calendar{' '}
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
    );
};

export default MyEvent;
