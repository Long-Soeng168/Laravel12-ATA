import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, LayersIcon, StoreIcon, UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function BottomNavbarHideAndShow() {
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const { t, currentLocale } = useTranslation();
    const { url } = usePage();

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 0) {
                setShow(true);
            } else if (currentScrollY > lastScrollY.current) {
                setShow(false);
            } else {
                setShow(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', controlNavbar, { passive: true });
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    const navItems = [
        { label: t('Home'), url: '/', icon: <HomeIcon size={22} /> },
        { label: t('Products'), url: '/products', icon: <LayersIcon size={22} /> },
        { label: t('Shops'), url: '/shops', icon: <StoreIcon size={22} /> },
        {
            label: t('Garages'),
            url: '/garages',
            icon: (
                <svg
                    className="size-5"
                    fill="current"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                >
                    <path d="M22.849,7.681l-9-7.043a2.989,2.989,0,0,0-3.7,0l-9,7.042A2.985,2.985,0,0,0,0,10.043V24H24V10.043A2.981,2.981,0,0,0,22.849,7.681ZM18,22H6V13a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Zm4,0H20V13a3,3,0,0,0-3-3H7a3,3,0,0,0-3,3v9H2V10.043a.994.994,0,0,1,.384-.788l9-7.043a1,1,0,0,1,1.232,0l9,7.044a.991.991,0,0,1,.384.787ZM10,18h4v2H10Z" />
                </svg>
            ),
        },
    ];

    const isAccountActive =
        url.startsWith('/profile') || url.startsWith('/user-settings') || url.startsWith('/login') || url.startsWith('/student-register');

    return (
        <nav
            className={`fixed right-0 bottom-3 left-0 z-40 mx-auto flex w-[94%] max-w-md gap-2 transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-[150%]'
            } lg:hidden`}
        >
            {/* Main Navigation Pill */}
            <div className="border-border/40 bg-background/90 flex flex-1 items-center justify-around gap-1 rounded-full border px-4 py-0 shadow-lg backdrop-blur-lg dark:border-white/15 dark:bg-zinc-800/90">
                {navItems.map((item) => {
                    const isActive = url === item.url || url.startsWith(item.url + '/');

                    return (
                        <Link
                            key={item.label}
                            href={item.url}
                            prefetch
                            className={`group relative flex shrink flex-col items-center justify-center rounded-full py-2 transition-all duration-300 ${
                                isActive
                                    ? 'text-primary fill-primary font-medium dark:text-[#fece00]'
                                    : 'text-muted-foreground fill-muted-foreground hover:text-primary dark:hover:text-[#fece00]'
                            }`}
                        >
                            <div className="transition-transform duration-300">{item.icon}</div>
                            <span className="mt-[2px] text-center text-[12px]">{item.label}</span>

                            {/* Floating Neon Pill Indicator */}
                            <span
                                className={`bg-primary shadow-primary/80 absolute bottom-[5px] left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full shadow-[0_0_12px_2px] transition-all duration-300 dark:bg-[#fece00] dark:shadow-[#fece00]/80 ${
                                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                                }`}
                            />
                        </Link>
                    );
                })}
            </div>

            {/* Account Pill */}
            <div className="border-border/40 bg-background/90 flex shrink-0 items-center justify-center rounded-full border px-0.5 py-0 shadow-lg backdrop-blur-lg dark:border-white/15 dark:bg-zinc-800/90">
                <Link
                    href="/profile"
                    prefetch
                    className={`group relative flex min-w-[70px] flex-col items-center justify-center rounded-full px-3 py-2 transition-all duration-300 ${
                        isAccountActive
                            ? 'text-primary font-medium dark:text-[#fece00]'
                            : 'text-muted-foreground hover:text-primary dark:hover:text-[#fece00]'
                    }`}
                >
                    <div className="transition-transform duration-300">
                        <UserIcon size={22} />
                    </div>
                    <span className="mt-[2px] text-center text-[12px]">{t('Profile')}</span>

                    {/* Floating Neon Pill Indicator */}
                    <span
                        className={`bg-primary shadow-primary/80 absolute bottom-[5px] left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full shadow-[0_0_12px_2px] transition-all duration-300 dark:bg-[#fece00] dark:shadow-[#fece00]/80 ${
                            isAccountActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                        }`}
                    />
                </Link>
            </div>
        </nav>
    );
}
