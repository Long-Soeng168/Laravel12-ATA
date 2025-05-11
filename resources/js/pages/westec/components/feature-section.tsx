import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';

export function FeatureSection({ defaultDropDown = true }: { defaultDropDown?: boolean }) {
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

    const [selectedData, setSelectedData] = useState(defaultDropDown ? data[0] : null);
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (item: any) => {
        setSelectedData(item);
        setTimeout(() => {
            bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // slight delay ensures the state update doesn't interrupt scroll
    };

    return (
        <>
            <div className="relative bg-black">
                <img src="/assets/demo-images/Artboard2.jpg" className="min-h-[250px] w-full object-cover" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-4 text-start md:text-left lg:grid-cols-2 lg:p-16">
                        <h1 className="font-proxima-nova-bold text-xl leading-[30px] text-white md:mb-4 md:text-2xl md:leading-[30px] lg:text-4xl lg:leading-[50px] 2xl:text-5xl">
                            Security And Safety Solutions
                        </h1>
                        <p className="font-proxima-nova-regular text-base text-white capitalize md:max-w-[65%] lg:text-xl 2xl:text-3xl">
                            We deliver advanced security and safety solutions that go beyond protection—offering peace of mind.
                        </p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0">
                    <div ref={bannerRef} className="h-[90px]"></div>
                    <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex w-full flex-nowrap justify-center gap-2.5 px-4 py-2.5 lg:justify-end lg:px-16">
                            {data.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className={`${
                                        item.id === selectedData?.id ? 'border border-white' : ''
                                    } bg-true-primary/45 flex aspect-square size-[100px] shrink-0 flex-col items-center justify-center p-1 transition-transform duration-300 hover:scale-110 lg:size-[125px]  2xl:size-[170px]  lg:p-2`}
                                >
                                    <img
                                        src={`/assets/demo-images/${item.img}`}
                                        className="w-[40px] object-contain lg:w-[50px]"
                                        alt={`${item.label} Icon`}
                                    />
                                    <p className="mt-2 line-clamp-3 text-center text-[10px] whitespace-normal text-white lg:text-xs 2xl:text-base">{item.label}</p>
                                </button>
                            ))}
                        </div>

                        <ScrollBar orientation="horizontal" className="h-2" />
                    </ScrollArea>
                </div>
            </div>
            {selectedData != null && (
                <div className="relative bg-black">
                    <img src={`${selectedData?.banner} `} className="w-full" alt="" />
                    <div className="absolute right-0 bottom-0 left-0">
                        <div className="flex w-full flex-nowrap justify-end px-4 lg:px-14">
                            <button className="rounded-none" onClick={() => setSelectedData(null)}>
                                <ChevronUp className="size-16 stroke-white stroke-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
