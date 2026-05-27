import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Disc,
    Filter,
    Fuel,
    Layers,
    MapPin,
    MoveUpRight,
    Settings,
    ShieldCheck,
    Star,
    Thermometer,
    Wind,
    Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FrontPageLayout from './layouts/frontpage-layout';

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

const Badge: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: 'success' | 'warning' | 'outline' }> = ({
    children,
    variant = 'success',
    className = '',
    ...props
}) => {
    const baseStyle =
        'inline-flex items-center border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors rounded-none gap-1 bg-background';
    const variants = {
        success: 'border-green-500 text-green-500',
        warning: 'border-[#FFD600] text-[#FFD600]',
        outline: 'border-border bg-transparent text-muted-foreground',
    };
    return (
        <div className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

// --- Mock Data ---
const HERO_SLIDES = [
    {
        id: 'slide-1',
        titleLine1: 'Find the Perfect',
        titleLine2: 'Spare Parts',
        desc: 'Discover high-quality aftermarket components and OEM direct parts. Precision engineered for exact fitment and maximum reliability.',
        btnText: 'Shop Catalog',
        btnLink: '/products',
        background_color: '#75BEEA',
        forground_color: '#293A4A',
        img: '/assets/images/sample/spare_parts_banner4.png',
    },
    {
        id: 'slide-2',
        titleLine1: 'Connect With',
        titleLine2: 'Top Auto Shops',
        desc: 'Browse our extensive directory of independent sellers, specialist warehouses, and dealerships selling cars and spare parts.',
        btnText: 'Explore Shops',
        btnLink: '/shops',
        background_color: '#67cef6',
        forground_color: '#1b3358',
        img: '/assets/images/sample/spare_parts_banner2.png',
    },
    {
        id: 'slide-3',
        titleLine1: 'Locate Nearby',
        titleLine2: 'Service Garages',
        desc: 'Find professional mechanics and specialized repair shops ready to install your parts and perform routine vehicle maintenance.',
        btnText: 'Find Garages',
        btnLink: '/garages',
        background_color: '#438ba9',
        forground_color: '#fff',
        img: '/assets/images/sample/garage_banner1.png',
    },
];

const APP_EXCLUSIVE_BANNERS = [
    {
        id: 'b1',
        title: 'Video Training Online',
        desc: 'Master auto mechanics with our comprehensive library of expert video tutorials and step-by-step practical guides.',
        btnText: 'Watch in App',
        btnLink: '/download',
        background_color: '#0f172a',
        forground_color: '#ffffff',
        img: '/assets/images/sample/training_online_banner1.webp',
    },
    {
        id: 'b2',
        title: 'Engineering Documents',
        desc: 'Access thousands of car manuals and schematics.',
        btnText: 'Read in App',
        btnLink: '/download',
        background_color: '#0f172a',
        forground_color: '#ffffff',
        img: '/assets/images/sample/documents_banner1.webp',
    },
];

const HIGHLIGHT_PRODUCTS = [
    { id: 'h1', name: 'Stage 2 Performance Clutch Kit', price: 450.0, vendor: 'Performance Parts Inc.', sku: 'CT-9921', icon: Settings },
    { id: 'h2', name: 'Drilled & Slotted Brake Rotors (Pair)', price: 185.5, vendor: 'OEM Direct', sku: 'BR-8442', icon: Disc },
    { id: 'h3', name: 'Adjustable Coilover Suspension System', price: 899.99, vendor: 'EuroAuto Imports', sku: 'SU-1100', icon: MoveUpRight },
    { id: 'h4', name: 'High-Flow Cold Air Intake', price: 210.0, vendor: 'Performance Parts Inc.', sku: 'IN-443', icon: Wind },
];

const LATEST_PRODUCTS = [
    { id: 'l1', name: 'LED Headlight Conversion Kit', price: 89.99, vendor: 'EuroAuto Imports', sku: 'LT-882', icon: Zap },
    { id: 'l2', name: 'Heavy Duty Alternator 150A', price: 145.0, vendor: 'OEM Direct', sku: 'EL-901', icon: Zap },
    { id: 'l3', name: 'Aluminum Performance Radiator', price: 320.0, vendor: 'Performance Parts Inc.', sku: 'CL-404', icon: Thermometer },
    { id: 'l4', name: 'Premium Synthetic Oil Filter (Pack of 3)', price: 34.5, vendor: 'OEM Direct', sku: 'FL-002', icon: Filter },
];

export default function HomePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const renderHomeProductCard = (product: any, fitmentStatus: 'success' | 'warning' = 'success') => (
        <a
            href="/products"
            key={product.id}
            className="bg-card border-border group relative flex flex-col border transition-colors hover:border-[#FF6D00]"
        >
            <div className="absolute top-2 left-2 z-10">
                {fitmentStatus === 'success' ? (
                    <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3" /> Fits Vehicle
                    </Badge>
                ) : (
                    <Badge variant="warning">
                        <AlertTriangle className="h-3 w-3" /> Universal Fit
                    </Badge>
                )}
            </div>
            <div className="bg-background border-border relative flex aspect-square items-center justify-center overflow-hidden border-b p-4">
                <product.icon className="text-border group-hover:text-muted-foreground h-1/3 w-1/3 transition-all duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-grow flex-col p-4">
                <div className="text-muted-foreground mb-1 text-xs">SKU: {product.sku}</div>
                <h3 className="text-foreground mb-2 line-clamp-2 flex-grow text-sm leading-tight font-bold">{product.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                    <span className="text-foreground block text-lg font-bold">${product.price.toFixed(2)}</span>
                    <div className={getButtonStyles('outline', 'h-10 w-10 p-0 hover:border-[#FF6D00] hover:text-[#FF6D00]')}>
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </a>
    );

    return (
        <FrontPageLayout>
            <div className="section-container flex-grow py-8">
                <div className="animate-in fade-in space-y-12 duration-300">
                    {/* Full-Width Background Slideshow Hero Section */}
                    <div className="border-border bg-card relative min-h-[450px] overflow-hidden border md:min-h-[550px]">
                        {HERO_SLIDES.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 h-full w-full transition-opacity duration-[1000ms] ease-in-out ${
                                    currentSlide === index ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
                                }`}
                                style={{
                                    backgroundColor: slide.background_color,
                                }}
                            >
                                {/* Full Background Image */}
                                <img
                                    src={slide.img}
                                    alt={slide.titleLine2}
                                    className={`absolute inset-0 h-full w-full object-cover object-right transition-transform duration-[6000ms] ease-linear ${
                                        currentSlide === index ? 'scale-105' : 'scale-100'
                                    }`}
                                />
                                <div className="absolute inset-0 z-20 flex max-w-3xl flex-col justify-center p-8 md:p-12 lg:p-16">
                                    <div
                                        className="absolute inset-0 z-10 hidden w-3/4 md:block"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${slide.background_color}f2 0%, ${slide.background_color}99 60%, transparent 100%)`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute inset-0 z-10 md:hidden"
                                        style={{
                                            backgroundColor: slide.background_color,
                                            opacity: 0.9,
                                        }}
                                    ></div>
                                    <h1
                                        className="z-20 mb-4 text-4xl leading-[1.05] font-black tracking-tighter uppercase md:text-5xl lg:text-6xl"
                                        style={{ color: slide.forground_color }}
                                    >
                                        {slide.titleLine1} <br />
                                        <span className="mt-1 block text-[#FF6D00]">{slide.titleLine2}</span>
                                    </h1>
                                    <p
                                        className="z-20 mb-8 max-w-lg text-base leading-relaxed font-medium md:text-lg md:font-normal"
                                        style={{ color: slide.forground_color, opacity: 0.9 }}
                                    >
                                        {slide.desc}
                                    </p>
                                    <a href={slide.btnLink} className={getButtonStyles('accent', 'z-20 w-max gap-2 px-8 py-6 text-base shadow-none')}>
                                        {slide.btnText} <ArrowRight className="ml-1 h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Slideshow Navigation Controls */}
                        <div className="absolute bottom-6 left-8 z-30 flex gap-2 md:bottom-10 md:left-12 lg:left-16">
                            {HERO_SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1.5 cursor-pointer rounded-none transition-all duration-300 ${
                                        currentSlide === idx ? 'w-8 bg-[#FF6D00]' : 'w-4 bg-white/50 hover:bg-white/80'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Browse By Category */}
                    <section>
                        <div className="border-border mb-8 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-foreground text-xl font-black tracking-tight uppercase">Browse by Category</h2>
                                    <p className="text-muted-foreground mt-0.5 text-sm">Explore our wide selection of automotive components</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {[
                                { icon: Disc, label: 'Brakes & Rotors' },
                                { icon: Settings, label: 'Engine Components' },
                                { icon: MoveUpRight, label: 'Suspension & Steering' },
                                { icon: Zap, label: 'Electrical & Lighting' },
                                { icon: Thermometer, label: 'Cooling & Climate' },
                                { icon: Wind, label: 'Exhaust Systems' },
                                { icon: Filter, label: 'Filters & PCV' },
                                { icon: Fuel, label: 'Fuel Delivery' },
                            ].map((category, idx) => (
                                <a
                                    href="/products"
                                    key={idx}
                                    className="bg-card border-border hover:bg-muted/50 group text-foreground flex flex-col items-center justify-center gap-4 border p-6 transition-colors hover:border-[#FF6D00]"
                                >
                                    <category.icon className="text-muted-foreground h-10 w-10 transition-colors group-hover:text-[#FF6D00]" />
                                    <span className="text-center text-sm font-medium">{category.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Highlight Products */}
                    <section>
                        <div className="border-border mb-8 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <Star className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-foreground text-xl font-black tracking-tight uppercase">Highlight Products</h2>
                                    <p className="text-muted-foreground mt-0.5 text-sm">Top rated parts and accessories</p>
                                </div>
                            </div>
                            <a
                                href="/products"
                                className="group text-muted-foreground flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-colors hover:text-[#FF6D00]"
                            >
                                View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {HIGHLIGHT_PRODUCTS.map((product) => renderHomeProductCard(product))}
                        </div>
                    </section>

                    {/* Dynamic App Exclusive Banners */}
                    <section>
                        <div className={`grid grid-cols-1 gap-4 ${APP_EXCLUSIVE_BANNERS.length === 2 ? 'sm:grid-cols-3' : ''}`}>
                            {APP_EXCLUSIVE_BANNERS.map((banner, index) => {
                                const isLarge = APP_EXCLUSIVE_BANNERS.length === 1 || index === 0;

                                return (
                                    <div
                                        key={banner.id}
                                        className={`group bg-card border-border relative h-48 overflow-hidden border md:h-[260px] ${isLarge && APP_EXCLUSIVE_BANNERS.length === 2 ? 'sm:col-span-2' : ''}`}
                                    >
                                        <img
                                            src={banner.img}
                                            alt={banner.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {isLarge ? (
                                            <>
                                                {/* Fade out background from left to right */}
                                                <div
                                                    className="absolute inset-0 z-10"
                                                    style={{
                                                        backgroundImage: `linear-gradient(to right, ${banner.background_color}F2 0%, ${banner.background_color}99 60%, transparent 100%)`,
                                                    }}
                                                ></div>
                                                <div className="absolute inset-0 z-20 flex items-center p-6 md:px-10">
                                                    <div>
                                                        <h3
                                                            className="mt-1 text-2xl font-black tracking-tight uppercase md:text-3xl"
                                                            style={{ color: banner.forground_color }}
                                                        >
                                                            {banner.title}
                                                        </h3>
                                                        <p
                                                            className="mt-2 max-w-sm text-sm leading-relaxed"
                                                            style={{ color: banner.forground_color, opacity: 0.85 }}
                                                        >
                                                            {banner.desc}
                                                        </p>
                                                        <a href={banner.btnLink} className={getButtonStyles('accent', 'mt-5 px-6 shadow-none')}>
                                                            {banner.btnText} <ArrowRight className="ml-2 h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Fade out background from bottom to top */}
                                                <div
                                                    className="absolute inset-0 z-10"
                                                    style={{
                                                        backgroundImage: `linear-gradient(to top, ${banner.background_color}F2 0%, ${banner.background_color}66 70%, transparent 100%)`,
                                                    }}
                                                ></div>
                                                <div className="absolute inset-0 z-20 flex items-end p-6">
                                                    <div className="w-full">
                                                        <h3
                                                            className="mt-0.5 text-lg leading-tight font-black tracking-tight uppercase md:text-xl"
                                                            style={{ color: banner.forground_color }}
                                                        >
                                                            {banner.title}
                                                        </h3>
                                                        <a
                                                            href={banner.btnLink}
                                                            className="mt-3 inline-flex items-center text-xs font-bold tracking-wider uppercase transition-colors hover:text-[#FF6D00]"
                                                            style={{ color: banner.forground_color }}
                                                        >
                                                            {banner.btnText} <ArrowRight className="ml-1 h-3 w-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Latest Products */}
                    <section>
                        <div className="border-border mb-8 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-foreground text-xl font-black tracking-tight uppercase">Latest Products</h2>
                                    <p className="text-muted-foreground mt-0.5 text-sm">Newly added inventory to our catalog</p>
                                </div>
                            </div>
                            <a
                                href="/products"
                                className="group text-muted-foreground flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-colors hover:text-[#FF6D00]"
                            >
                                View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {LATEST_PRODUCTS.map((product) => renderHomeProductCard(product, 'warning'))}
                        </div>
                    </section>

                    {/* Shops */}
                    <section>
                        <div className="border-border mb-8 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-foreground text-xl font-black tracking-tight uppercase">Trusted Shops</h2>
                                    <p className="text-muted-foreground mt-0.5 text-sm">Explore independent sellers and specialist warehouses</p>
                                </div>
                            </div>
                            <a
                                href="/shops"
                                className="group text-muted-foreground flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-colors hover:text-[#FF6D00]"
                            >
                                View Directory <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    initials: 'PP',
                                    name: 'Performance Parts Inc.',
                                    rating: '4.9',
                                    loc: 'Detroit, MI',
                                    tags: ['Turbochargers', 'Exhaust', 'Tuning'],
                                },
                                {
                                    initials: 'OD',
                                    name: 'OEM Direct Warehouse',
                                    rating: '4.8',
                                    loc: 'Dallas, TX',
                                    tags: ['Factory Replacements', 'Body Panels'],
                                },
                                { initials: 'EA', name: 'EuroAuto Imports', rating: '4.7', loc: 'Los Angeles, CA', tags: ['BMW', 'Audi', 'Sensors'] },
                            ].map((shop, idx) => (
                                <a
                                    href="/shops"
                                    key={idx}
                                    className="bg-card border-border hover:border-muted-foreground group text-foreground block flex flex-col border p-5 transition-colors"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="bg-background border-border flex h-12 w-12 items-center justify-center border text-lg font-bold text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-white">
                                            {shop.initials}
                                        </div>
                                        <div className="bg-background border-border flex items-center gap-1 border px-2 py-1">
                                            <Star className="h-3 w-3 fill-[#FF6D00] text-[#FF6D00]" />
                                            <span className="text-xs font-bold">{shop.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="mb-1 text-lg font-bold">{shop.name}</h3>
                                    <p className="text-muted-foreground mb-4 flex items-center gap-1 text-xs">
                                        <MapPin className="h-3 w-3" /> {shop.loc}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {shop.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-background border-border text-muted-foreground border px-2 py-1 text-[10px] tracking-wider uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </FrontPageLayout>
    );
}
