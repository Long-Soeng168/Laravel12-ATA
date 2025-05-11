import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { AlignLeft, ChevronDown, ChevronUp } from 'lucide-react';

const categories = [
    {
        name: 'Security & Safety Solutions',
        count: 102,
        icon: 'assets/demo-images/86.png',
        subcategories: [
            { name: 'Surveillance Cameras', count: 24 },
            { name: 'Fire Safety', count: 7 },
            { name: 'Alarm Systems', count: 32 },
        ],
    },
    {
        name: 'Smart Home & Office Solutions',
        count: 78,
        icon: 'assets/demo-images/90.png',
        subcategories: [
            { name: 'Smart Lighting', count: 18 },
            { name: 'Automated Doors', count: 12 },
        ],
    },
    {
        name: 'Commercial & Residential Equipments',
        count: 65,
        icon: 'assets/demo-images/85.png',
        subcategories: [
            { name: 'Air Conditioning', count: 20 },
            { name: 'Office Chairs', count: 10 },
        ],
    },
    {
        name: 'IT Solutions',
        count: 91,
        icon: 'assets/demo-images/91.png',
        subcategories: [
            { name: 'Networking', count: 25 },
            { name: 'Data Storage', count: 14 },
        ],
    },
];

const MyCategories = () => {
    const [openCategory, setOpenCategory] = useState(null);

    return (
        <div className="w-full overflow-hidden text-black dark:text-white rounded-lg ">
            {/* Header */}
            <button className={`flex w-full items-center py-4 px-4 justify-between border-b border-gray-300 dark:border-gray-700 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-xl font-semibold`}>
                <span className="flex items-center gap-2">
                    <AlignLeft className="h-7 w-7 text-gray-700 dark:text-gray-300" /> All Solutions
                </span>
            </button>

            {/* Category List */}
            <div className="space-y-2">
                {categories.map((category) => (
                    <div key={category.name}>
                        {/* Main Category */}
                        <button
                            className={`flex items-center justify-between w-full gap-2 p-4 rounded-br-md rounded-bl-md transition-all duration-300 cursor-pointer
                            bg-white dark:bg-gray-800 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700
                            transform hover:scale-[1.02] ${openCategory === category.name ? 'background text-white' : ''}`}
                            onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                        >
                            <Link href="#" className="flex items-center gap-3 text-sm font-medium dark:text-gray-200">
                                <img src={category.icon} className="w-12 h-12 object-cover rounded-md shadow-md" alt={category.name} />
                                <p className="flex flex-col text-start">
                                    {category.name}<span className="text-xs ">({category.count})</span>
                                </p>
                            </Link>

                            {category.subcategories && (
                                <button className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md">
                                    {openCategory === category.name ? (
                                        <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 rotate-180" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300" />
                                    )}
                                </button>
                            )}
                        </button>

                        {/* Subcategories */}
                        {category.subcategories && openCategory === category.name && (
                            <div className="mt-2 ml-6 space-y-2 border-l-2 border-[#273896] pl-4 max-h-[400px] overflow-hidden transition-all duration-500 ease-in-out opacity-100 scale-100">
                                {category.subcategories.map((sub) => (
                                    <a key={sub.name} href="#" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                                        • {sub.name} <span className="text-xs">({sub.count})</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCategories;
