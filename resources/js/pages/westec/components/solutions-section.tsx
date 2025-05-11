import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState } from 'react';

export function SolutionSection() {
    const data = [
        {
            id: 1,
            img: 'support-maintenance.png',
            banner: '/assets/westec/images/solutions/1.jpeg',
            label: 'Support & Maintenance ICT',
            short_description: 'Comprehensive IT support and maintenance services to keep your systems running smoothly and securely.',
        },
        {
            id: 2,
            banner: '/assets/westec/images/solutions/2.jpeg',
            img: 'network.png',
            label: 'Internet Support',
            short_description: 'Fast, reliable internet troubleshooting and optimization to ensure consistent connectivity for your business.',
        },
        {
            id: 3,
            img: 'web-design.png',
            banner: '/assets/westec/images/solutions/3.jpeg',
            label: 'Website Design',
            short_description: 'Custom, user-friendly website designs tailored to elevate your brand and engage your audience online.',
        },
        {
            id: 4,
            img: 'network.png',
            banner: '/assets/westec/images/solutions/4.jpeg',
            label: 'Network Monitoring',
            short_description: 'Real-time network performance monitoring to detect, prevent, and resolve issues before they affect operations.',
        },
        {
            id: 5,
            img: 'monitoring1.png',
            banner: '/assets/westec/images/solutions/5.jpeg',
            label: 'Network Installation',
            short_description: 'Professional network setup and infrastructure services designed for speed, security, and scalability.',
        },
        {
            id: 6,
            img: 'sytem-install.png',
            banner: '/assets/westec/images/solutions/6.jpeg',
            label: 'Server Installation',
            short_description: 'Efficient on-premises and cloud server installation with full configuration, backup, and security protocols.',
        },
        {
            id: 7,
            img: 'stock.png',
            banner: '/assets/westec/images/solutions/3.jpeg',
            label: 'Stock Inventory & HelpDesk Software',
            short_description: 'Simplify stock tracking and manage customer support efficiently with our integrated software solutions.',
        },
        {
            id: 8,
            img: 'pickup.png',
            banner: '/assets/westec/images/solutions/3.jpeg',
            label: 'Pickup & Drop-off Logistics Platform',
            short_description: 'A smart logistics platform for managing pickups, deliveries, and real-time route tracking with ease.',
        },
        {
            id: 9,
            img: 'sams.png',
            banner: '/assets/westec/images/solutions/3.jpeg',
            label: 'School Application and Management System (SAMS)',
            short_description: 'A comprehensive school management system covering admissions, attendance, grades, and communication tools.',
        },
        {
            id: 10,
            img: 'support-system.png',
            banner: '/assets/westec/images/solutions/3.jpeg',
            label: 'Support Systems',
            short_description: 'Centralized support ticketing and workflow management systems to streamline service operations.',
        },
    ];

    const [selectedData, setSelectedData] = useState(data[0]);

    return (
        <>
            <div className="relative bg-black">
                <img src="/assets/demo-images/Artboard2.jpg" className="w-full" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-16 text-start md:text-left lg:grid-cols-2">
                        <h1 className="font-proxima-nova-bold text-lg leading-[30px] text-white md:mb-4 md:text-3xl md:leading-[30px] lg:text-[40px] lg:leading-[50px]">
                            Security And Safety Solutions
                        </h1>
                        <p className="font-proxima-nova-regular text-sm text-white capitalize lg:max-w-[55%] lg:text-2xl">
                            We deliver advanced security and safety solutions that go beyond protection—offering peace of mind.
                        </p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0">
                    <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex w-full flex-nowrap justify-end gap-2.5 px-16 py-2.5">
                            {data.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedData(item)}
                                    className={`${item.id === selectedData.id ? 'border border-white' : ''} flex size-16 flex-col items-center justify-center bg-teal-700/50 transition-transform duration-300 hover:scale-110 lg:size-[125px]`}
                                >
                                    <img
                                        src={`/assets/demo-images/${item.img}`}
                                        className="size-[35px] object-cover lg:size-[50px]"
                                        alt={`${item.label} Icon`}
                                    />
                                    <p className="mt-2 line-clamp-3 text-center text-[11px] whitespace-normal text-white">{item.label}</p>
                                </button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="h-2" />
                    </ScrollArea>
                </div>
            </div>
            <div className="relative bg-black">
                <img src={`${selectedData.banner} `} className="w-full" alt="" />
                {/* <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-10 text-start md:text-left lg:grid-cols-2">
                        <h1 className="font-proxima-nova-bold text-lg leading-[30px] text-white md:mb-4 md:text-3xl md:leading-[30px] lg:text-[40px] lg:leading-[50px]">
                            {selectedData.label}
                        </h1>
                        <p className="font-proxima-nova-regular text-sm text-white capitalize lg:max-w-[55%] lg:text-2xl">
                            {selectedData.short_description}
                        </p>
                    </div>
                </div> */}
            </div>
        </>
    );
}
