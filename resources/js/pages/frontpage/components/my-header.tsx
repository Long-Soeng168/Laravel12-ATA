import { UserIconAnimated } from '@/components/animated-icons/User';
import MySelectLanguageSwitch from '@/components/my-select-language-switch';
import ToggleModeSwitch from '@/components/toggle-mode-switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useInitials } from '@/hooks/use-initials';
import useRole from '@/hooks/use-role';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { MySearchProducts } from './my-search-products';

const MyHeader = () => {
    const { application_info, post_counts, item_categories } = usePage().props;
    const { t } = useTranslation();

    const navItems = [
        { label: t('Home'), href: '/' },
        { label: t('Products'), href: '/products' },
        { label: t('Shops'), href: '/shops' },
        { label: t('Garages'), href: '/garages' },
        // { label: t('Privacy'), href: '/privacy' },
        { label: t('About'), href: '/about-us' },
        { label: t('Contact'), href: '/contact-us' },
    ];

    const { auth } = usePage().props;
    const hasRole = useRole();
    const getInitials = useInitials();

    const renderNavLink = ({ label, href }) => {
        const isActive = typeof window !== 'undefined' ? window.location.pathname === href : false;

        return (
            <Link
                key={'link_key' + label + href}
                prefetch
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
            >
                {label}
            </Link>
        );
    };

    return (
        <>
            {/* Top Heading */}
            <div className="bg-background text-foreground border-border/40 border-b pt-4 pb-3">
                <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
                    {/* Logo & Mobile Menu */}
                    <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-start">
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-foreground lg:hidden">
                                        <Menu className="size-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                    side="left"
                                    className="bg-background/95 border-border/50 w-72 border-r p-6 shadow-2xl backdrop-blur-lg"
                                >
                                    <SheetHeader>
                                        <SheetTitle className="text-left text-2xl font-bold tracking-tight">Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-8 flex flex-col gap-2">{navItems.map(renderNavLink)}</div>
                                    <div className="border-border/50 mt-8 flex flex-col gap-4 border-t pt-6">
                                        <MySelectLanguageSwitch />
                                        <ToggleModeSwitch />
                                    </div>
                                </SheetContent>
                            </Sheet>

                            {application_info?.image && (
                                <Link prefetch href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                                    <img
                                        width={45}
                                        height={45}
                                        src={`/assets/images/application_info/thumb/${application_info.image}`}
                                        alt={`${application_info.name}'s logo`}
                                        className="border-border/50 size-10 rounded-xl border bg-white shadow-sm lg:size-12"
                                    />
                                    <span className="text-xl font-bold tracking-tight lg:text-2xl">{application_info.name}</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center gap-2 md:hidden">
                            <Link
                                prefetch
                                href="/download-app"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30 hover:shadow-primary/50 border-primary/20 dark:border-primary-foreground/10 flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                            >
                                <img src="/assets/icons/phone-car.png" alt="Download App" className="h-3.5 w-3.5 object-contain" />
                                <span>GET APP</span>
                            </Link>

                            {auth?.user ? (
                                <Link prefetch href={hasRole('User') || hasRole('Garage') || hasRole('Shop') ? '/user-dashboard' : '/dashboard'}>
                                    <Avatar className="border-border/50 h-8 w-8 overflow-hidden rounded-full border shadow-sm">
                                        <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                            {getInitials(auth?.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) : (
                                <Link prefetch href="/login">
                                    <Button size="icon" variant="outline" className="bg-background/50 border-border/50 hover:bg-muted rounded-full">
                                        <UserIconAnimated stroke="currentColor" className="size-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Search Bar - Center */}
                    <div className="mx-auto w-full px-2 md:max-w-md md:flex-1 lg:max-w-xl">
                        <div className="relative w-full">
                            <MySearchProducts className="w-full" />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden shrink-0 items-center gap-3 md:flex">
                        <Link
                            prefetch
                            href="/download-app"
                            className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30 hover:shadow-primary/50 border-primary/20 dark:border-primary-foreground/10 flex transform items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <img
                                src="/assets/icons/phone-car.png"
                                alt="Download App"
                                className="h-4 w-4 object-contain transition-transform duration-300 group-hover:-rotate-12"
                            />
                            <span>GET APP</span>
                        </Link>

                        <div className="border-border/50 ml-1 flex items-center gap-2 border-l pl-4">
                            {auth?.user ? (
                                <Link prefetch href={hasRole('User') || hasRole('Garage') || hasRole('Shop') ? '/user-dashboard' : '/dashboard'}>
                                    <Avatar className="border-border/50 h-9 w-9 overflow-hidden rounded-full border shadow-sm transition-transform hover:scale-105">
                                        <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                            {getInitials(auth?.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) : (
                                <Link prefetch href="/login">
                                    <Button size="icon" variant="outline" className="bg-background/50 border-border/50 hover:bg-muted rounded-full">
                                        <UserIconAnimated stroke="currentColor" className="size-4" />
                                    </Button>
                                </Link>
                            )}
                            <MySelectLanguageSwitch />
                            <ToggleModeSwitch />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Sticky Navigation */}
            <div className="bg-background/80 border-border/40 sticky top-0 z-50 hidden border-b shadow-sm backdrop-blur-xl lg:block">
                <nav className="mx-auto flex max-w-screen-xl items-center px-4 py-2">
                    <ul className="-ml-2 flex items-center gap-2">{navItems.map(renderNavLink)}</ul>
                </nav>
            </div>
        </>
    );
};

export default MyHeader;
