import { Link, usePage } from '@inertiajs/react';
import { ArrowUpCircleIcon } from 'lucide-react';

const footerSections = [
    {
        title: 'ACADEMICS',
        links: [
            {
                title: 'General English Program',
                href: '#',
            },
            {
                title: 'Curriculum',
                href: '#',
            },
            {
                title: 'Exchange Program',
                href: '#',
            },
            {
                title: 'Summer Program',
                href: '#',
            },
            {
                title: 'School Calendar',
                href: '#',
            },
        ],
    },
    {
        title: 'SCHOOL INFO',
        links: [
            {
                title: 'About',
                href: '#',
            },
            {
                title: 'Campuses',
                href: '#',
            },
            {
                title: 'School Facilities',
                href: '#',
            },
            {
                title: 'Class Schedule and Subjects',
                href: '#',
            },
            {
                title: 'Student Council',
                href: '#',
            },
        ],
    },
    {
        title: 'CONTACT',
        links: [
            {
                title: '016 699 192',
                src: '/assets/demo-images/icons8-call-80.png',
                href: '#',
            },
            {
                title: 'Find us on Google Map',
                src: '/assets/demo-images/icons8-location-80.png',
                href: '#',
            },
            {
                title: 'info@western.edu.kh',
                src: '/assets/demo-images/icons8-mail-80.png',
                href: '#',
            },
            {
                title: '#20, St. 598C,Phnom Penh Thmey,Sen Sok, Cambodia',
                src: '/assets/demo-images/icons8-home-80.png',
                href: '#',
            },
        ],
    },
];

const MyFooter = () => {
    const { application_info } = usePage().props;
    return (
        <div className="font-now-alt-medium relative flex flex-col bg-blue-900 text-white">
            <div className="bg-muted grow" />
            <footer>
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-16">
                    <div className="grid grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
                        {footerSections.map(({ title, links }) => (
                            <div key={title}>
                                <h6 className="mb-6 text-4xl tracking-wide">{title}</h6>
                                <ul className="space-y-4">
                                    {links.map(({ title, href, src }) => (
                                        <li key={title} className="flex gap-3 text-lg items-center">
                                            {src && <img src={src} alt={title} className=" h-6 w-6 object-contain" />}
                                            <Link href={href} className="transition duration-300 hover:text-slate-300">
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className='flex items-center lg:justify-center'>
                            {/* Social icons + Scroll to Top */}
                            <div className="space-y-6">
                                {/* Social Icons */}
                                <div className="flex w-16 flex-col items-center justify-center gap-4 rounded-full bg-gradient-to-b from-slate-100 to-slate-200 p-4">
                                    {/* Facebook */}
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="flex h-12 w-12 items-center justify-center text-white transition hover:scale-105"
                                    >
                                        <img src='/assets/demo-images/facebook.png'/>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="flex h-12 w-12 items-center justify-center text-white transition hover:scale-105"
                                    >
                                        <img src='/assets/demo-images/social.png'/>
                                    </a>


                                    {/* Telegram */}
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="flex h-12 w-12 items-center justify-center text-white transition hover:scale-105"
                                    >
                                        <img src='/assets/demo-images/telegram.png'/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="flex flex-col-reverse items-center justify-center gap-x-2 gap-y-5 px-6 py-8 xl:px-0">
                        {/* Copyright */}
                        <span className="text-white">Copyright © 2025 Western International School . All Rights Reserved.</span>

                        <div className="text-muted-foreground flex items-center gap-5">
                            <Link href="#" target="_blank">
                                <img src="/assets/demo-images/Homepage/01_Logo_WIS.png" className="h-20 w-20" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="absolute -top-8 right-6 flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-slate-100 to-slate-200 px-2 py-6 text-blue-900 shadow-md transition hover:shadow-lg md:right-20"
                >
                    <ArrowUpCircleIcon className="h-8 w-8" />
                    <span className="mt-1 text-[10px]">Scroll to Top</span>
                </button>
            </footer>
        </div>
    );
};

export default MyFooter;
