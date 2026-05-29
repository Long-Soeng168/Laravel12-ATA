import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SwitchDarkModeSingleIcon } from '@/components/SwitchDarkModeSingleIcon';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { ImagePlusIcon, Menu, Search, Smartphone, User, X } from 'lucide-react';
import React, { useState } from 'react';
import HeaderSearchInput from './HeaderSearchInput';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' | 'accent' | 'inverse' | 'ghost' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 rounded-none border border-transparent cursor-pointer';
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground text-muted-foreground',
        accent: 'bg-[#FF6D00] text-white hover:bg-[#e66200]',
        inverse: 'bg-[#121212] text-[#FF6D00] hover:bg-neutral-900 border border-[#121212]',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'accent' | 'inverse' | 'ghost' }> = ({
    children,
    variant,
    className,
    ...props
}) => (
    <button className={getButtonStyles(variant, className)} {...props}>
        {children}
    </button>
);

export default function Header() {
    const { t } = useTranslation();
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Strip search parameters (e.g., '?category_code=...') to get the pure path
    const currentPath = url.split('?')[0];

    // Helper to determine if a path is active
    const isActive = (path: string) => {
        if (path === '/') return currentPath === '/';
        return currentPath.startsWith(path);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        // { name: 'Shops', path: '/shops' },
        // { name: 'Garages', path: '/garages' },
    ];

    // Determine if we should show the mobile search icon
    const shouldShowMobileSearch = currentPath !== '/products';

    return (
        <div>
            {/* ROW 1: Top Utility Bar - Now visible on mobile */}
            <div className="bg-card border-border border-b py-1.5 text-sm">
                <div className="section-container flex items-center justify-between">
                    {/* Left Menu */}
                    <div className="text-muted-foreground flex h-full items-center gap-3">
                        <Link
                            prefetch
                            href="/download-app"
                            className={`relative flex cursor-pointer items-center gap-1.5 py-1 font-semibold transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 ${
                                isActive('/download-app')
                                    ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                    : 'text-[#FF6D00] before:scale-x-0 before:bg-[#FF6D00] hover:text-[#FF6D00] hover:before:scale-x-100'
                            }`}
                        >
                            <Smartphone className="h-3.5 w-3.5" />
                            <span>{t('Download App')}</span>
                        </Link>

                        {/* Hide About/Contact on mobile, show on md and up */}
                        <div className="bg-border hidden h-3.5 w-px md:block"></div>
                        <Link
                            prefetch
                            href="/about"
                            className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 md:inline-flex ${
                                isActive('/about')
                                    ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                    : 'hover:text-foreground before:bg-foreground before:scale-x-0 hover:before:scale-x-100'
                            }`}
                        >
                            {t('About')}
                        </Link>
                        <div className="bg-border hidden h-3.5 w-px md:block"></div>
                        <Link
                            prefetch
                            href="/contact"
                            className={`relative hidden cursor-pointer px-2 py-1 font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 md:inline-flex ${
                                isActive('/contact')
                                    ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                    : 'hover:text-foreground before:bg-foreground before:scale-x-0 hover:before:scale-x-100'
                            }`}
                        >
                            {t('Contact')}
                        </Link>
                    </div>

                    {/* Right Menu - Always visible */}
                    <div className="text-muted-foreground flex items-center gap-2 sm:gap-3">
                        <LanguageSwitcher />
                        <div className="bg-border h-3.5 w-px"></div>
                        <SwitchDarkModeSingleIcon />
                        <div className="bg-border h-3.5 w-px"></div>
                        <Link
                            prefetch
                            href="/login"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors sm:px-3.5 sm:py-2 sm:text-sm"
                        >
                            <User className="h-3.5 w-3.5 max-[455px]:hidden" />
                            <span className="text-center">{t('Login')}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ROW 2: Main Navigation Header */}
            <header className="bg-background border-border sticky top-0 z-40 border-b">
                <div className="section-container py-3 md:py-4">
                    <div className="flex items-center justify-between gap-4 md:gap-6">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link prefetch href="/" className="text-primary flex cursor-pointer items-center gap-2 font-bold">
                                <img src="/android-chrome-512x512.png" className="size-12 rounded-full md:size-16" alt="A-Tech Auto Logo" />
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

                        {/* Global Search - Desktop Only */}
                        <HeaderSearchInput className="hidden w-full max-w-3xl flex-1 md:block" showCategories={true} />

                        {/* Actions & Mobile Triggers */}
                        <div className="flex shrink-0 items-center gap-2">
                            {/* Mobile Actions: Search Sheet & Menu Toggle */}
                            <div className="flex items-center gap-2 md:hidden">
                                {/* Search Sheet (Drops from top) - Hidden on /products */}
                                {shouldShowMobileSearch && (
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <button className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex h-10 w-10 cursor-pointer items-center justify-center border transition-colors focus-visible:ring-1 focus-visible:outline-none">
                                                <Search className="h-5 w-5" />
                                            </button>
                                        </SheetTrigger>
                                        <SheetContent
                                            onOpenAutoFocus={(e) => e.preventDefault()}
                                            side="top"
                                            className="border-border bg-background border-b p-4 pt-12 shadow-none"
                                        >
                                            <SheetTitle className="sr-only">Search Products</SheetTitle>
                                            <HeaderSearchInput />
                                        </SheetContent>
                                    </Sheet>
                                )}

                                {/* Mobile Menu Toggle */}
                                <button
                                    className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex h-10 w-10 cursor-pointer items-center justify-center border transition-colors focus-visible:ring-1 focus-visible:outline-none"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Desktop Sell Button */}
                            <Link href={`/login`} className="hidden md:block">
                                <Button variant="accent" className="gap-2 px-6">
                                    <ImagePlusIcon className="h-4 w-4" /> {t('Sell Your Products')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="border-border bg-background absolute z-50 w-full border-y px-4 py-4 md:hidden">
                        {/* Nav Links */}
                        <nav className="flex flex-col gap-1 pb-4">
                            {navLinks.map((link) => (
                                <Link
                                    prefetch
                                    key={link.path}
                                    href={link.path}
                                    className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                        isActive(link.path)
                                            ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                            : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                    }`}
                                >
                                    {t(link.name)}
                                </Link>
                            ))}
                        </nav>

                        <div className="border-border border-t"></div>

                        {/* Secondary Links (About / Contact) styled like main nav links */}
                        <div className="flex flex-col gap-1 py-4">
                            <Link
                                prefetch
                                href="/about"
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/about')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                {t('About')}
                            </Link>
                            <Link
                                prefetch
                                href="/contact"
                                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive('/contact')
                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                        : 'text-foreground hover:bg-accent border-l-4 border-transparent'
                                }`}
                            >
                                {t('Contact')}
                            </Link>
                        </div>

                        <div className="border-border border-t"></div>

                        {/* Action Buttons */}
                        <Link href={`/login`} className="flex flex-col pt-4">
                            <Button variant="accent" className="w-full justify-center gap-2">
                                <ImagePlusIcon className="h-4 w-4" /> {t('Sell Your Products')}
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Secondary Navigation - Left Aligned (Desktop only) */}
                <div className="bg-card hidden md:block">
                    <div className="section-container flex items-center justify-start gap-5">
                        {navLinks.map((link) => (
                            <Link
                                prefetch
                                key={link.path}
                                href={link.path}
                                className={`relative cursor-pointer px-2 py-3 text-sm font-medium transition-colors before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:transition-transform before:duration-200 ${
                                    isActive(link.path)
                                        ? 'text-[#FF6D00] before:scale-x-100 before:bg-[#FF6D00]'
                                        : 'text-muted-foreground hover:text-foreground before:bg-foreground before:scale-x-0 hover:before:scale-x-100'
                                }`}
                            >
                                {t(link.name)}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}
