import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { Home, Info, Layers3Icon, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';

export default function Footer() {
    const { t, currentLocale } = useTranslation();
    const { application_info, links } = usePage<any>().props;

    const quickLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Products', path: '/products', icon: Layers3Icon },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: MessageSquare },
    ];

    // Simple ternary logic for copyright text
    const copyrightText =
        (currentLocale === 'kh' ? application_info?.copyright_kh : application_info?.copyright) ||
        `© ${new Date().getFullYear()} A-Tech Auto. All rights reserved.`;

    return (
        <footer className="bg-background relative mt-auto overflow-hidden">
            {/* ========================================= */}
            {/* 1. PREMIUM BACKGROUND LAYERS              */}
            {/* ========================================= */}

            {/* Gradient Top Border Highlight */}
            <div className="absolute top-0 left-1/2 h-[1.5px] w-full max-w-screen-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6D00]/60 to-transparent"></div>

            {/* Top Center Radial Mesh Glow */}
            <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-full bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(255,109,0,0.12),transparent)]"></div>

            {/* ========================================= */}
            {/* 2. FOREGROUND CONTENT                     */}
            {/* ========================================= */}
            <div className="section-container relative z-10 pt-16 md:pt-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left lg:pr-10">
                        <Link prefetch href="/" className="group mb-6 flex cursor-pointer items-center gap-4">
                            <div className="relative">
                                <img
                                    src="/android-chrome-512x512.png"
                                    className="relative size-16 rounded-full transition-transform duration-500 group-hover:scale-105 md:size-20"
                                    alt="A-Tech Auto Logo"
                                />
                            </div>
                            <div className="flex flex-col justify-center text-left">
                                <p className="text-primary text-[20px] font-extrabold md:text-[24px]">អេ ធិច អូតូ</p>
                                <p className="text-[15px] font-bold text-[#FF6D00] md:text-[17px]">A-Tech Auto</p>
                                <div className="mt-1 h-[3px] w-8 rounded-full bg-[#FF6D00] transition-all duration-500 ease-out group-hover:w-full"></div>
                            </div>
                        </Link>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {t(
                                'Your all-in-one automotive platform. Buy & sell parts, locate garages & EV stations, decode DTC errors, access repair documents, and learn through our video tutorials and in-person courses.',
                            )}
                        </p>
                    </div>

                    {/* Information Column */}
                    <div className="md:col-span-3 md:pl-4">
                        <h4 className="text-foreground mb-8 text-sm font-semibold">{t('Information')}</h4>
                        <div className="text-muted-foreground space-y-3 text-sm">
                            <div className="group hover:text-foreground flex items-start gap-3 transition-colors">
                                <div className="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-all group-hover:bg-[#FF6D00]/5 group-hover:ring-2 group-hover:ring-[#FF6D00]">
                                    <MapPin className="h-4 w-4 text-[#FF6D00] transition-transform group-hover:scale-110" />
                                </div>
                                <span className="pt-1">{application_info?.address}</span>
                            </div>
                            <div className="group hover:text-foreground flex items-center gap-3 transition-colors">
                                <div className="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-all group-hover:bg-[#FF6D00]/5 group-hover:ring-2 group-hover:ring-[#FF6D00]">
                                    <Phone className="h-4 w-4 text-[#FF6D00] transition-transform group-hover:rotate-12" />
                                </div>
                                <a href={`tel:${application_info?.phone}`} className="pt-1">
                                    {application_info?.phone}
                                </a>
                            </div>
                            <div className="group hover:text-foreground flex items-center gap-3 transition-colors">
                                <div className="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-all group-hover:bg-[#FF6D00]/5 group-hover:ring-2 group-hover:ring-[#FF6D00]">
                                    <Mail className="h-4 w-4 text-[#FF6D00] transition-transform group-hover:-rotate-12" />
                                </div>
                                <a href={`mailto:${application_info?.email}`} className="pt-1">
                                    {application_info?.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:col-span-2 md:pl-4">
                        <h4 className="text-foreground mb-8 text-sm font-semibold">{t('Quick Links')}</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <Link prefetch href={item.path} className="group hover:text-foreground flex items-center gap-3 transition-colors">
                                        <item.icon className="h-4 w-4 shrink-0 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                        <span className="font-medium transition-transform group-hover:translate-x-1">{t(item.name)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Column */}
                    <div className="md:col-span-3 md:pl-4">
                        <h4 className="text-foreground mb-8 text-sm font-semibold">{t('Connect With Us')}</h4>
                        {/* Box layout for social media with image above text */}
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {links?.map((item: any) => {
                                // Simple ternary logic for links display title using only title and title_kh
                                const displayTitle = currentLocale === 'kh' ? item?.title_kh || item?.title : item?.title;

                                return (
                                    <a
                                        key={item?.id}
                                        href={item?.url || item?.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={displayTitle}
                                        className="group bg-background relative flex flex-col items-center justify-center gap-1.5 rounded-md py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(255,109,0,0.3)] hover:ring-2 hover:ring-[#FF6D00]"
                                    >
                                        {/* Subtle inner glow on hover */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#FF6D00]/0 to-[#FF6D00]/0 transition-colors group-hover:from-[#FF6D00]/5 group-hover:to-transparent"></div>
                                        <img
                                            src={`/assets/images/links/thumb/${item?.image}`}
                                            alt={displayTitle}
                                            className="relative size-8 object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <span className="text-muted-foreground relative text-center text-[10px] font-medium transition-colors group-hover:text-[#FF6D00]">
                                            {displayTitle}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright Area */}
                <div className="border-border/50 mt-16 flex flex-col items-center justify-between border-t py-8 text-sm md:flex-row">
                    <p className="text-muted-foreground font-medium">{copyrightText}</p>
                    <div className="mt-4 flex gap-8 md:mt-0">
                        <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-[#FF6D00]">
                            {t('Privacy Policy')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
