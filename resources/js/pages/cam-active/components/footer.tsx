import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from 'lucide-react';
import BackgroundAnimated from '../../../components/background-animated';

const footerLinks = [
    {
        title: 'Home',
        href: '#',
    },
    {
        title: 'Solutions',
        href: '#',
    },
    {
        title: 'Company',
        href: '#',
    },
    {
        title: 'Blogs',
        href: '#',
    },
    {
        title: 'Career',
        href: '#',
    },
    {
        title: 'Contact Us',
        href: '#',
    },
];

const Footer = () => {
    return (
        <footer className="relative border-t border-white/50">
            <BackgroundAnimated />
            <div className="relative z-10 mx-auto max-w-7xl text-white">
                <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-12 sm:flex-row xl:px-0">
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src="/assets/cam-active/logo.png" className="h-16" alt="" />
                            {/* <img src="/assets/icons/image-icon.png" className="h-16" alt="" /> */}
                            <p className="text-xl font-bold">Cam Active</p>
                        </div>
                        <ul className="mt-6 flex flex-wrap items-center gap-4">
                            {footerLinks.map(({ title, href }) => (
                                <li key={title}>
                                    <Link href={href} className="hover:underline">
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div>
                        <div>
                            <h3 className="mb-6 text-lg font-semibold">Get in Touch</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-blue-500/20">
                                            <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">Email</p>
                                        <a href="mailto:manueljosedala@hotmail.com" className="text-white transition hover:text-blue-400">
                                            manueljosedala@hotmail.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-blue-500/20">
                                            <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-300">Phone</p>
                                        <a href="tel:+244941540352" className="text-white transition hover:text-blue-400">
                                            +244 941 540 352
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <Separator className="bg-white/50" />
                <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
                    {/* Copyright */}
                    <span>
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href="/" target="_blank">
                            Company Name
                        </Link>
                        . All rights reserved.
                    </span>

                    <div className="flex items-center gap-5">
                        <Link href="#" target="_blank">
                            <TwitterIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <DribbbleIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <TwitchIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <GithubIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
