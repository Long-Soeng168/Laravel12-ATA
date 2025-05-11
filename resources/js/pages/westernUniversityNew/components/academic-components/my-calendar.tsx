import { User } from 'lucide-react';
import { useState } from 'react';

const months = [
    {
        month: 'Jun 2025',
        Children: [
            {
                id: '1',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '31 May 5:00Pm',
                image: '/assets/demo-images/banner3.jpg',
            },
            {
                id: '2',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '2 May 5:00Pm',
                image: '/assets/demo-images/banner4.jpg',
            },

            // ... (rest of events)
        ],
    },
    {
        month: 'May 2025',
        Children: [
            {
                id: '1',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '31 May 5:00Pm',
                image: '/assets/demo-images/banner3.jpg',
            },
            {
                id: '2',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '2 May 5:00Pm',
                image: '/assets/demo-images/banner4.jpg',
            },

            {
                id: '4',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '2 May 5:00Pm',
                image: '/assets/demo-images/banner4.jpg',
            },
            {
                id: '4',
                title: 'Spacewalking Conference Spacewalking Conference',
                short_description: '2 May 5:00Pm',
                image: '/assets/demo-images/banner4.jpg',
            },
            // ... (rest of events)
        ],
    },
];

const MyCalendar = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const currentMonth = months[currentMonthIndex];

    const handlePrev = () => {
        setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : prev));
    };

    return (
        <div>
            <div className="mx-auto max-w-screen-2xl bg-white px-4 py-16 text-center sm:px-16">
                {/* Month Navigation */}
                <div className="my-8 flex items-center justify-center space-x-6">
                    <button
                        onClick={handlePrev}
                        className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-gray-100 disabled:opacity-50"
                        disabled={currentMonthIndex === 0}
                    >
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h2 className="text-2xl font-semibold">{currentMonth.month}</h2>

                    <button
                        onClick={handleNext}
                        className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-gray-100 disabled:opacity-50"
                        disabled={currentMonthIndex === months.length - 1}
                    >
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="mx-auto my-10 h-1 w-16 bg-[#282d91]"></div>

                {/* Events Grid */}
                <div className="container mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,_minmax(250px,400px))]">
                        {currentMonth.Children.map((event) => {
                            const [day, monthName, time] = event.short_description.split(' ');
                            return (
                                <div key={event.id} className="group relative overflow-hidden bg-white shadow-lg">
                                    <div className="relative">
                                        <img className="aspect-[9/10] w-full object-cover" src={event.image} alt="Event" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <a href="#" className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex h-full space-x-3 pr-4">
                                        <div className="rounded-bl-lg bg-[#2c318a] p-2 text-center text-white">
                                            <p className="text-sm font-bold">{day}</p>
                                            <p className="text-sm uppercase">{monthName}</p>
                                            <p className="text-sm font-bold">{time}</p>
                                        </div>
                                        <div className="my-2 text-left">
                                            <h2 className="font-noto-san-extra-light mb-2 line-clamp-2 text-base text-red-700">{event.title}</h2>
                                            <p className="flex items-center text-sm text-gray-600">
                                                <User className="mr-1 h-4 w-4 text-red-700" />
                                                Walter Stanley
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;
