import { Link } from '@inertiajs/react';
import { CalendarArrowUp, CalendarClock, CalendarIcon } from 'lucide-react';

const MyLastestNew = () => {
    return (
        <div>
            <div className="mx-auto max-w-screen-2xl bg-white px-4 py-12 text-center sm:px-16 ">
                <h2 className="font-noto-san-extra-light text-4xl text-black sm:text-4xl">Latest News</h2>
                <div className="mx-auto my-10 h-1 w-16 bg-[#2c318a]"></div>

                <div className="mx-auto mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner5.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Liberal Arts Colleges Rankings</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner3.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Ways Parents and Counselors Can Help Students Earn Scholarships</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner3.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Ways Parents and Counselors Can Help Students Earn Scholarships</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner4.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Ways Parents and Counselors Can Help Students Earn Scholarships</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner3.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Liberal Arts Colleges Rankings</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-lg hover:cursor-pointer">
                        <img
                            src="assets/demo-images/banner3.jpg"
                            alt="Students studying together"
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl text-start font-noto-san-extra-light font-bold text-red-700">Liberal Arts Colleges Rankings</h2>
                            <p className="my-6 text-gray-500 text-start">
                                Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts
                                fields of study.
                            </p>
                            <div className="mt-3 flex text-sm text-blue-950">
                                <CalendarClock className="mr-2 h-4 w-4 text-blue-950" />
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/news" className="inline-flex shadow-md items-center mt-6 px-6 py-3 bg-[#e31c24] rounded-md text-white hover:bg-blue-950 font-semibold duration-500 transition">
            View All Courses
        </Link>
            </div>
        </div>
    );
};

export default MyLastestNew;
