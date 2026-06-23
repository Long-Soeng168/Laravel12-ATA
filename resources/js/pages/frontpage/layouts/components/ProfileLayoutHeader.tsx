import { SwitchDarkModeSingleIcon } from '@/components/SwitchDarkModeSingleIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import useTranslation from '@/hooks/use-translation';
import { Link, router, usePage } from '@inertiajs/react';
import { HomeIcon, LogIn, LogOutIcon, MenuIcon, UserIcon, UserPlus, X } from 'lucide-react';
import { useState } from 'react';

export default function ProfileLayoutHeader() {
    const { t, currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const currentPath = url.split('?')[0];

    const isActive = (path: string) => {
        if (path === '/') return currentPath === '/';
        return currentPath === path || currentPath.startsWith(`${path}/`);
    };

    const { website_info, auth } = usePage<any>().props;

    const logo = website_info?.logo ? `/assets/images/website_infos/thumb/${website_info.logo}` : '/assets/images/default-logo.png';

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        const logoutRoute = '/logout';
        router.post(
            logoutRoute,
            {},
            {
                onFinish: () => router.flushAll(),
            },
        );
    };

    return (
        <div className="relative">
            {/* ROW 1: Top Utility Bar - Added relative z-50 and bg-background to sit above the overlay */}
            <div className="border-border bg-background relative z-50 border-b py-1.5 text-base dark:border-b-white/10">
                <div className="section-container flex items-center justify-between">
                    {/* Left Menu */}
                    <div className="text-muted-foreground flex h-full items-center gap-3">
                        <div className="flex shrink-0 items-center">
                            <Link prefetch href="/" className="text-primary flex cursor-pointer items-center gap-1 font-bold">
                                <img src="/android-chrome-512x512.png" className="size-12 rounded-full p-1 md:size-16" alt="A-Tech Auto Logo" />
                                <div>
                                    <p className="text-[20px] md:text-[24px]">
                                        អេ ធិច <span className="text-primary">អូតូ</span>
                                    </p>
                                    <p className="text-[14px] leading-tight md:text-[17px]">
                                        A-Tech <span className="text-primary">Auto</span>
                                    </p>
                                </div>
                            </Link>
                        </div>
                        {auth?.user?.id ? (
                            <>
                                <div className="bg-border hidden h-6 w-px min-[850px]:block"></div>
                                <Link
                                    prefetch
                                    href="/"
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <HomeIcon className="size-4" />
                                        {t('Home')}
                                    </span>
                                </Link>
                                <div className="bg-border hidden h-3.5 w-px min-[850px]:block"></div>
                                <Link
                                    prefetch
                                    href="/profile"
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/profile')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <UserIcon className="size-4" />
                                        {t('Profile')}
                                    </span>
                                </Link>
                                <div className="bg-border hidden h-3.5 w-px min-[850px]:block"></div>
                                <button
                                    onClick={() => setIsLogoutDialogOpen(true)}
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/logout')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <LogOutIcon className="size-4" />
                                        {t('Log out')}
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="bg-border hidden h-6 w-px min-[850px]:block"></div>
                                <Link
                                    prefetch
                                    href="/"
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <HomeIcon className="size-4" />
                                        {t('Home')}
                                    </span>
                                </Link>
                                <div className="bg-border hidden h-3.5 w-px min-[850px]:block"></div>
                                <Link
                                    prefetch
                                    href="/register"
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/register')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <UserPlus className="size-4" />
                                        {t('Register')}
                                    </span>
                                </Link>
                                <div className="bg-border hidden h-3.5 w-px min-[850px]:block"></div>
                                <Link
                                    prefetch
                                    href="/login"
                                    className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 min-[850px]:inline-flex ${
                                        isActive('/login')
                                            ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                            : 'before:bg-foreground hover:text-foreground before:scale-x-0 hover:before:scale-x-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <LogIn className="size-4" />
                                        {t('Login')}
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right Menu */}
                    <div className="text-muted-foreground flex items-center gap-2 sm:gap-3">
                        {/* <LanguageSwitcher /> */}
                        <div className="bg-border h-3.5 w-px"></div>
                        <SwitchDarkModeSingleIcon />
                        <div className="bg-border h-3.5 w-px min-[850px]:hidden"></div>
                        <button
                            className="border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex h-8 w-8 cursor-pointer items-center justify-center border transition-colors focus-visible:ring-1 focus-visible:outline-none min-[850px]:hidden dark:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Dark Overlay Backdrop - Always rendered, transitions opacity */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-in-out min-[850px]:hidden ${
                    isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Dropdown Menu - Slides down from behind the z-50 header */}
            <div
                className={`border-border bg-background absolute z-40 w-full border-b px-4 py-4 shadow-lg transition-all duration-300 ease-in-out min-[850px]:hidden dark:border-white/20 ${
                    isMobileMenuOpen
                        ? 'pointer-events-auto visible translate-y-0 opacity-100'
                        : 'pointer-events-none invisible -translate-y-8 opacity-0'
                }`}
            >
                <nav className="flex flex-col gap-1">
                    {/* Conditionally render mobile options based on Auth state */}
                    {auth?.user?.id ? (
                        <>
                            <Link
                                prefetch
                                href="/profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/profile')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <UserIcon className="size-4" />
                                    {t('Profile')}
                                </span>
                            </Link>

                            <button
                                onClick={() => {
                                    setIsLogoutDialogOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`text-foreground hover:bg-accent w-full cursor-pointer border-l-4 border-transparent px-4 py-3 text-left text-sm font-medium transition-colors`}
                            >
                                <span className="flex items-center gap-2">
                                    <LogOutIcon className="size-4" />
                                    {t('Log out')}
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                prefetch
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <HomeIcon className="size-4" />
                                    {t('Home')}
                                </span>
                            </Link>

                            <Link
                                prefetch
                                href="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/register')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <UserPlus className="size-4" />
                                    {t('Register')}
                                </span>
                            </Link>

                            <Link
                                prefetch
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/login')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <LogIn className="size-4" />
                                    {t('Login')}
                                </span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Logout Confirmation Dialog */}
            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent className="rounded-none sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{isKh ? 'បញ្ជាក់ការចាកចេញ' : 'Confirm Logout'}</DialogTitle>
                        <DialogDescription className="mt-2 text-base">
                            {isKh ? 'តើអ្នកពិតជាចង់ចាកចេញពីគណនីរបស់អ្នកមែនទេ?' : 'Are you sure you want to log out of your account?'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2 sm:justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            className="rounded-xs"
                            onClick={() => {
                                setIsLogoutDialogOpen(false);
                                handleLogout();
                            }}
                        >
                            <LogOutIcon className="size-4" />
                            {t('Log out')}
                        </Button>
                        <Button type="button" variant="outline" className="rounded-xs" onClick={() => setIsLogoutDialogOpen(false)}>
                            {isKh ? 'បោះបង់' : 'Cancel'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
