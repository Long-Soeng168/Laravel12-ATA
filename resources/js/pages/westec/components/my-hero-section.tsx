import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Link } from '@inertiajs/react';

export function MyHeroSection() {
    return (
        <>
            {newFunction()}
            {newFunction()}

            {/* Contact */}
            <div className="relative mx-auto flex w-full flex-col bg-primary px-10 py-20">
                <div className="grid h-full w-full grid-cols-2 items-center justify-end gap-4 text-end">
                    {/* Left Section */}
                    <div></div>
                    <div className="flex flex-col items-end text-left">
                        <h1 className="font-proxima-nova-bold max-w-[80%] text-end text-2xl leading-[30px] text-white md:mb-4 md:text-3xl md:leading-[30px] lg:text-[39px] lg:leading-[50px]">
                            Smarter solutions start here! Find out what Westec can do for you.
                        </h1>
                        <a
                            href="/contact"
                            className="font-proxima-nova-regular bg-white px-4 py-2 text-xl text-black capitalize transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
                        >
                            Contact Us Now
                        </a>
                    </div>
                </div>
            </div>

            {newFunction()}
            {newFunction()}

            <div className="relative mx-auto flex w-full flex-col bg-primary px-10 py-20">
                <div className="grid h-full w-full grid-cols-2 items-center justify-end gap-4 text-end">
                    {/* Left Section */}
                    <div></div>
                    <div className="flex flex-col items-end text-left">
                        <h1 className="font-proxima-nova-bold max-w-[80%] text-end text-2xl leading-[30px] text-white md:mb-4 md:text-3xl md:leading-[30px] lg:text-[39px] lg:leading-[50px]">
                            Smarter solutions start here! Find out what Westec can do for you.
                        </h1>
                        <a
                            href="/contact"
                            className="font-proxima-nova-regular bg-white px-4 py-2 text-xl text-black capitalize transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
                        >
                            Contact Us Now
                        </a>
                    </div>
                </div>
            </div>
        </>
    );

    function newFunction() {
        return (
            <div className="relative bg-black">
                <img src="/assets/demo-images/Artboard2.jpg" className="w-full" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-10 text-start md:text-left lg:grid-cols-2">
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
                        <div className="flex w-full flex-nowrap justify-end gap-4 px-10 py-4">
                            {[
                                { img: 'support-maintenance.png', label: 'Support & Maintenance ICT' },
                                { img: 'network.png', label: 'Internet Support' },
                                { img: 'web-design.png', label: 'Website Design' },
                                { img: 'network.png', label: 'Network Monitoring' },
                                { img: 'monitoring1.png', label: 'Network Installation' },
                                { img: 'sytem-install.png', label: 'Server Installation' },
                                { img: 'stock.png', label: 'Stock Inventory & HelpDesk Software' },
                                { img: 'pickup.png', label: 'Pickup & Drop-off Logistics Platform' },
                                { img: 'sams.png', label: 'School Application and Management System (SAMS)' },
                                { img: 'support-system.png', label: 'Support Systems' },
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="flex size-16 flex-col items-center justify-center bg-teal-700/50 transition-transform duration-300 hover:scale-110 lg:size-[124px]"
                                >
                                    <img
                                        src={`/assets/demo-images/${item.img}`}
                                        className="size-[35px] object-cover lg:size-[50px]"
                                        alt={`${item.label} Icon`}
                                    />
                                    <p className="mt-2 line-clamp-3 text-center text-[11px] whitespace-normal text-white">{item.label}</p>
                                </Link>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="h-2" />
                    </ScrollArea>
                </div>
            </div>
        );
    }
}
