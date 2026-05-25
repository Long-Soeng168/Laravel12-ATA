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
import { Menu, Search } from 'lucide-react';
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
                className={`transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium ${
                    isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
            >
                {label}
            </Link>
        );
    };

    return (
        <>
            {/* Top Heading */}
            <div className="bg-background text-foreground border-b border-border/40 pb-3 pt-4">
                <div className="mx-auto flex flex-col md:flex-row max-w-screen-xl items-center justify-between px-4 gap-4">
                    {/* Logo & Mobile Menu */}
                    <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4">
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
                                        <Menu className="size-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-72 bg-background/95 backdrop-blur-lg border-r border-border/50 p-6 shadow-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="text-2xl font-bold tracking-tight text-left">Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-2 mt-8">
                                        {navItems.map(renderNavLink)}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-border/50 flex flex-col gap-4">
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
                                        className="size-10 lg:size-12 rounded-xl shadow-sm border border-border/50 bg-white"
                                    />
                                    <span className="text-xl lg:text-2xl font-bold tracking-tight">{application_info.name}</span>
                                </Link>
                            )}
                        </div>
                        
                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center gap-2">
                            <Link prefetch href="/download-app" className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/30 hover:shadow-primary/50 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all hover:scale-105 active:scale-95 border border-primary/20 dark:border-primary-foreground/10">
                                <img src="/assets/icons/phone-car.png" alt="Download App" className="w-3.5 h-3.5 object-contain" />
                                <span>GET APP</span>
                            </Link>

                            {auth?.user ? (
                                <Link prefetch href={hasRole('User') || hasRole('Garage') || hasRole('Shop') ? '/user-dashboard' : '/dashboard'}>
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full border border-border/50 shadow-sm">
                                        <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                            {getInitials(auth?.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) : (
                                <Link prefetch href="/login">
                                    <Button size="icon" variant="outline" className="rounded-full bg-background/50 border-border/50 hover:bg-muted">
                                        <UserIconAnimated stroke="currentColor" className="size-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Search Bar - Center */}
                    <div className="w-full md:flex-1 md:max-w-md lg:max-w-xl mx-auto px-2">
                        <div className="relative w-full">
                            <MySearchProducts className="w-full" />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <Link prefetch href="/download-app" className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-primary/20 dark:border-primary-foreground/10">
                            <img src="/assets/icons/phone-car.png" alt="Download App" className="w-4 h-4 object-contain transition-transform duration-300 group-hover:-rotate-12" />
                            <span>GET APP</span>
                        </Link>
                        
                        <div className="flex items-center gap-2 pl-4 ml-1 border-l border-border/50">
                            {auth?.user ? (
                                <Link prefetch href={hasRole('User') || hasRole('Garage') || hasRole('Shop') ? '/user-dashboard' : '/dashboard'}>
                                    <Avatar className="h-9 w-9 overflow-hidden rounded-full border border-border/50 shadow-sm transition-transform hover:scale-105">
                                        <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                            {getInitials(auth?.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) : (
                                <Link prefetch href="/login">
                                    <Button size="icon" variant="outline" className="rounded-full bg-background/50 border-border/50 hover:bg-muted">
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
            <div className="bg-background/80 sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl shadow-sm hidden lg:block">
                <nav className="mx-auto flex max-w-screen-xl items-center py-2 px-4">
                    <ul className="flex items-center gap-2 -ml-2">
                        {navItems.map(renderNavLink)}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default MyHeader;
