import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SwitchDarkModeSingleIcon } from '@/components/SwitchDarkModeSingleIcon';
import useTranslation from '@/hooks/use-translation';
import { Camera, Facebook, Mail, MapPin, Menu, MessageCircle, Phone, Search, Send, Smartphone, User, Wrench, X } from 'lucide-react';
import React, { useState, type ReactNode } from 'react';

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

interface FrontPageLayoutProps {
    children: ReactNode;
}

const FrontPageLayout = ({ children }: FrontPageLayoutProps) => {
    const { currentLocale } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-background text-foreground selection:bg-primary/20 flex min-h-screen flex-col font-sans">
            {/* --- Header Section --- */}
            <div>
                {/* Top Utility Bar - Hidden on mobile */}
                <div className="bg-card border-border hidden border-b py-1.5 text-xs md:block">
                    <div className="section-container flex items-center justify-between">
                        {/* Left Menu */}
                        <div className="text-muted-foreground flex h-full items-center gap-3">
                            <a
                                href="/download-app"
                                className="flex items-center gap-1.5 font-semibold tracking-wide text-[#FF6D00] transition-colors hover:text-[#e66200]"
                            >
                                <Smartphone className="h-3.5 w-3.5" /> Download App
                            </a>
                            <div className="bg-border mx-1 h-3.5 w-px"></div>
                            <a href="/about" className="hover:text-foreground font-medium transition-colors">
                                About
                            </a>
                            <div className="bg-border mx-1 h-3.5 w-px"></div>
                            <a href="/contact" className="hover:text-foreground font-medium transition-colors">
                                Contact
                            </a>
                        </div>

                        {/* Right Menu */}
                        <div className="text-muted-foreground flex items-center gap-3">
                            {/* <div className="hover:text-foreground flex cursor-pointer items-center gap-1 transition-colors">
                                <Globe className="h-3.5 w-3.5" />
                                <select className="cursor-pointer appearance-none border-none bg-transparent pr-1 text-xs font-medium uppercase outline-none">
                                    <option value="en">
                                        <a href="lange/en">English</a>
                                    </option>
                                    <option value="km">
                                        <a href="lange/kh">Khmer</a>
                                    </option>
                                </select>
                            </div> */}
                            <LanguageSwitcher />

                            <div className="bg-border ml-1 h-3.5 w-px"></div>

                            <SwitchDarkModeSingleIcon />

                            <div className="bg-border mr-1 h-3.5 w-px"></div>

                            <a
                                href="/login"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium transition-colors"
                            >
                                <User className="h-3.5 w-3.5" /> Login
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Header */}
                <header className="bg-background border-border sticky top-0 z-40 border-b">
                    <div className="section-container py-4">
                        <div className="flex items-center justify-between gap-6">
                            {/* Logo */}
                            <div className="flex w-full shrink-0 items-center justify-between md:w-auto">
                                <a href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                                    <Wrench className="h-7 w-7 text-[#FF6D00]" />
                                    <span>
                                        A-Tech <span className="text-[#FF6D00]">Auto</span>
                                    </span>
                                </a>
                                {/* Mobile Menu Toggle */}
                                <button
                                    className="text-muted-foreground hover:text-foreground p-2 transition-colors md:hidden"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>

                            {/* Global Search - Hidden on mobile, unified row on desktop */}
                            <div className="hidden w-full max-w-3xl flex-1 md:block">
                                <div className="bg-card border-border relative flex w-full border transition-colors focus-within:border-[#FF6D00]">
                                    <select className="text-foreground w-auto min-w-[160px] cursor-pointer appearance-none border-none bg-transparent bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_0.5rem_center] bg-no-repeat px-4 pr-8 text-sm font-medium outline-none">
                                        <option value="all">All Categories</option>
                                        <option value="brakes">Brakes & Rotors</option>
                                        <option value="engine">Engine Components</option>
                                        <option value="suspension">Suspension & Steering</option>
                                    </select>

                                    {/* Vertical Divider */}
                                    <div className="bg-border my-2 w-px"></div>

                                    <div className="relative flex flex-1 items-center">
                                        <input
                                            type="text"
                                            placeholder="What are you looking for..."
                                            className="placeholder:text-muted-foreground h-11 w-full bg-transparent px-4 pr-12 text-sm focus:outline-none"
                                        />
                                        <button
                                            className="text-muted-foreground absolute right-3 transition-colors hover:text-[#FF6D00]"
                                            aria-label="Search"
                                        >
                                            <Search className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Header Actions - Hidden on mobile */}
                            <div className="hidden shrink-0 items-center md:flex">
                                <Button variant="accent" className="gap-2 px-6 shadow-none">
                                    <Camera className="h-4 w-4" /> Sell Your Products
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMobileMenuOpen && (
                        <div className="border-border bg-background absolute z-50 w-full space-y-6 border-t px-4 py-4 shadow-lg md:hidden">
                            {/* Mobile Search */}
                            <div className="bg-card border-border relative flex w-full border transition-colors focus-within:border-[#FF6D00]">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="placeholder:text-muted-foreground h-11 w-full bg-transparent px-4 pr-12 text-sm focus:outline-none"
                                />
                                <button className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors hover:text-[#FF6D00]">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Mobile Nav Links */}
                            <nav className="border-border flex flex-col gap-4 border-b pb-6">
                                <a href="/" className="text-foreground text-sm font-semibold">
                                    Home
                                </a>
                                <a href="/products" className="text-foreground text-sm font-semibold">
                                    Products
                                </a>
                                <a href="/shops" className="text-foreground text-sm font-semibold">
                                    Shops
                                </a>
                                <a href="/garages" className="text-foreground text-sm font-semibold">
                                    Garages
                                </a>
                            </nav>

                            {/* Mobile Utilities */}
                            <div className="flex flex-col gap-4">
                                <a href="/login" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium">
                                    <User className="h-4 w-4" /> Login to Account
                                </a>
                                <Button variant="accent" className="mt-2 w-full justify-center gap-2">
                                    <Camera className="h-4 w-4" /> Sell Your Products
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Secondary Navigation - Left Aligned (Desktop only) */}
                    <div className="bg-card border-border hidden border-b md:block">
                        <div className="section-container flex items-center justify-start gap-8 py-3">
                            <a href="/" className="text-foreground text-sm font-medium transition-colors">
                                Home
                            </a>
                            <a href="/products" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Products
                            </a>
                            <a href="/shops" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Shops
                            </a>
                            <a href="/garages" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Garages
                            </a>
                        </div>
                    </div>
                </header>
            </div>

            {/* --- Main Page Content --- */}
            <main className="flex-grow">{children}</main>

            {/* --- Footer Section --- */}
            <footer className="bg-card border-border mt-auto border-t">
                <div className="section-container py-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
                        {/* Logo & Description */}
                        <div className="col-span-1 md:col-span-1">
                            <a href="/" className="text-foreground mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                                <Wrench className="h-6 w-6 text-[#FF6D00]" />
                                <span>
                                    ATECH <span className="text-[#FF6D00]">AUTO</span>
                                </span>
                            </a>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Your premier multi-vendor marketplace for high-quality automotive spare parts. Precision engineered solutions directly
                                to your garage.
                            </p>
                        </div>

                        {/* Information */}
                        <div>
                            <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Information</h4>
                            <div className="text-muted-foreground space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6D00]" />
                                    <span className="leading-tight">ភូមិគោកឪឡឹក, សង្កាត់ស្ពានថ្ម, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 shrink-0 text-[#FF6D00]" />
                                    <a href="tel:+85585839881" className="hover:text-foreground transition-colors">
                                        +855 85 839 881
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 shrink-0 text-[#FF6D00]" />
                                    <a href="mailto:longsoeng017@gmail.com" className="hover:text-foreground transition-colors">
                                        longsoeng017@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Quick Links</h4>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <a href="/" className="transition-colors hover:text-[#FF6D00]">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/products" className="transition-colors hover:text-[#FF6D00]">
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="transition-colors hover:text-[#FF6D00]">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="transition-colors hover:text-[#FF6D00]">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="transition-colors hover:text-[#FF6D00]">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Social Media</h4>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                        <Facebook className="h-4 w-4" /> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                        <MessageCircle className="h-4 w-4" /> Messenger
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                        <Send className="h-4 w-4" /> Telegram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright Area */}
                    <div className="border-border text-muted-foreground mt-12 flex flex-col items-center justify-between border-t pt-6 text-xs md:flex-row">
                        <p>&copy; 2025 A-Tech Auto. All rights reserved.</p>
                        <div className="mt-4 flex gap-4 md:mt-0">
                            <a href="#" className="hover:text-foreground transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-foreground transition-colors">
                                Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FrontPageLayout;
