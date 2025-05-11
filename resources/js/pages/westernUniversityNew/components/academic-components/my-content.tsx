import { Link } from '@inertiajs/react';

const departments = [
    'African American Studies',
    'African Studies',
    'American Studies',
    'Anthropology',
    'Applied Mathematics',
    'Architecture',
    'Art',
    'Astronomy',
    'Biomedical Engineering',
    'Chemical Engineering',
    'Chemistry',
    'Computer Science',
    'East Asian Languages',
    'Ecology and Biology',
    'Economics',
    'Mathematics',
    'Physics',
    'Political Science',
    'Portuguese',
    'Psychology',
    'Religious Studies',
    'Sociology',
    'Spanish',
    'Statistics',
];

const MyContent = () => {
    return (
        <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-xl grid  grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Sidebar */}
                <div className="lg:col-span-4 ">
                    <div className="flex flex-col space-y-3 rounded-lg border p-4 lg:items-end lg:border-r lg:border-y-0 lg:border-l-0 ">
                        {[
                            'Undergraduate Study',
                            'Graduate & Professional Study',
                            'Departments & Programs',
                            'Global Education',
                            'Summer Session',
                            'Non-Degree Offerings',
                            'Online Learning',
                        ].map((label, idx) => {
                            const isActive = label === 'Undergraduate Study';
                            return (
                                <Link
                                    key={idx}
                                    href="#"
                                    className={`w-full rounded-md px-4 py-2 text-center text-lg transition-colors duration-300  lg:w-auto ${
                                        isActive ? 'bg-red-700 text-white' : 'text-gray-800 hover:bg-red-700 hover:text-white'
                                    } `}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:col-span-8">
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-3xl leading-tight font-bold md:text-4xl">Undergraduate Study</h1>
                            <div className="mt-4 w-16 border-b-2 border-black" />
                            <p className="mt-6 max-w-prose text-gray-600">
                                Western International School (WIS) first opened its doors on September 1, 2003, and has experienced exponential growth
                                every year. In 2003, we recruited 262 students from kindergarten to grade 11 with only 1 campus. For the Academic Year
                                2019-2020, nearly 7,561 students enrolled from Nursery to Grade 12 and we have 16 Campuses in Phnom Penh, Takhmao, and
                                Sihanouk Branch.
                            </p>
                        </div>

                        <div>
                            <img
                                src="/assets/demo-images/Homepage/03_welcome_to_western_1.jpg"
                                alt="Welcome to Western"
                                className="h-auto w-full rounded-md object-cover"
                            />

                            <h2 className="mt-6 text-xl font-semibold">Programs</h2>
                            <div className="relative mt-2 mb-4 h-[1px] w-full bg-gray-200">
                                <div className="absolute top-0 left-0 h-full bg-red-700" style={{ width: '10%' }} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {departments.map((dept, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-sm text-red-700">›</span>
                                        <p className="text-sm text-gray-700">{dept}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContent;
