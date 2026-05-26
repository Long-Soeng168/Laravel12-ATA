import FrontPageLayout from '@/pages/frontpage/layouts/frontpage-layout';
import { CheckCircleIcon, MapPin, Phone, Search, Store } from 'lucide-react';
import React from 'react';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' | 'accent' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-bold tracking-widest uppercase transition-all duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-[42px] px-6 rounded-none border cursor-pointer active:scale-[0.97]';
    const variants = {
        default: 'border-black bg-black text-white hover:bg-neutral-800 hover:border-neutral-800',
        accent: 'border-[#FF6D00] bg-[#FF6D00] text-white hover:bg-black hover:border-black',
        outline: 'border-border bg-transparent text-foreground hover:border-[#FF6D00] hover:text-[#FF6D00]',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
    <select
        className={`border-border bg-card placeholder:text-muted-foreground flex h-[42px] w-full appearance-none items-center justify-between rounded-none border px-4 text-sm font-medium focus:border-[#FF6D00] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    >
        {children}
    </select>
);

// --- Mock Data ---
type Shop = {
    id: string;
    name: string;
    isVerified: boolean;
    province: string;
    address: string;
    phone: string;
    description: string;
    banner: string;
    logo: string;
};

const SHOPS: Shop[] = [
    {
        id: 's1',
        name: 'AutoParts Hub',
        isVerified: true,
        province: 'Phnom Penh',
        address: 'Toul Kork, Street 289',
        phone: '012 334 556',
        description: 'Premium supplier of genuine OEM parts, filters, and synthetic engine oils for all major brands.',
        banner: '/assets/images/shops/shop-banner-1.jpg',
        logo: '/assets/images/shops/shop-logo-1.jpg',
    },
    {
        id: 's2',
        name: 'GearHead Accessories',
        isVerified: false,
        province: 'Siem Reap',
        address: 'Sok San Road, Svay Dangkum',
        phone: '098 776 554',
        description: 'High-quality aftermarket accessories, LED lighting, custom floor mats, and interior detailing supplies.',
        banner: '/assets/images/shops/shop-banner-2.jpg',
        logo: '/assets/images/shops/shop-logo-2.jpg',
    },
    {
        id: 's3',
        name: 'ProTool Equipment',
        isVerified: true,
        province: 'Battambang',
        address: 'Street 3, Near Central Market',
        phone: '085 112 233',
        description: 'Heavy-duty mechanic tools, hydraulic jacks, OBD2 scanners, and professional garage equipment.',
        banner: '/assets/images/shops/shop-banner-3.jpg',
        logo: '/assets/images/shops/shop-logo-3.jpg',
    },
    {
        id: 's4',
        name: 'Tire & Wheel Center',
        isVerified: false,
        province: 'Phnom Penh',
        address: 'Dangkao, Street 217',
        phone: '099 888 777',
        description: 'Wide selection of off-road and highway tires, custom alloy wheels, and alignment kits.',
        banner: '/assets/images/shops/shop-banner-4.jpg',
        logo: '/assets/images/shops/shop-logo-4.jpg',
    },
];

export default function ShopPage() {
    return (
        <FrontPageLayout>
            <div className="relative container mx-auto mt-6 px-4 pb-20 md:px-6">
                {/* Header & Search Section */}
                <section className="border-border bg-card mb-12 flex flex-col items-center border p-6 md:p-10">
                    <h1 className="text-foreground mb-6 text-3xl font-black tracking-tighter uppercase md:text-4xl">
                        Shop <span className="text-[#FF6D00]">Directory</span>
                    </h1>

                    <div className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
                        <input
                            className="border-border bg-background flex-1 rounded-none border px-4 py-2 text-sm font-medium focus:border-[#FF6D00] focus:outline-none"
                            placeholder="Search by shop name, parts, or address..."
                        />
                        <Select className="bg-background w-full sm:w-48">
                            <option>All Provinces</option>
                            <option>Phnom Penh</option>
                            <option>Siem Reap</option>
                            <option>Battambang</option>
                        </Select>
                        <button className={getButtonStyles('default', 'w-full sm:w-auto')}>
                            <Search className="mr-2 h-4 w-4" strokeWidth={2.5} /> Search
                        </button>
                    </div>
                </section>

                {/* Shops Grid (4 Columns) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {SHOPS.map((shop) => (
                        <a
                            href={`/shop/${shop.id}`} // Direct navigation, no pop-up
                            key={shop.id}
                            className="bg-card border-border group flex w-full flex-col border transition-colors duration-200 hover:border-[#FF6D00] active:scale-[0.99]"
                        >
                            {/* Banner Image with Bottom Info Overlay */}
                            <div className="border-border bg-muted relative h-[180px] w-full border-b">
                                <img
                                    src={shop.banner}
                                    alt="Shop Banner"
                                    className="h-full w-full object-cover"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                {/* Bottom Info Row (Logo + Text) */}
                                <div className="absolute right-3 bottom-3 left-3 flex items-end gap-3">
                                    {/* Logo */}
                                    <div className="border-border bg-background relative flex h-14 w-14 shrink-0 items-center justify-center border p-1">
                                        <img
                                            src={shop.logo}
                                            alt="Shop Logo"
                                            className="z-10 h-full w-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                        {/* Fallback Icon */}
                                        <Store className="absolute h-5 w-5 text-[#FF6D00] opacity-40" strokeWidth={2} />
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                            <h3 className="truncate text-[15px] font-semibold text-white">{shop.name}</h3>
                                            {shop.isVerified && <CheckCircleIcon className="h-5 w-5 fill-blue-500 text-white" />}
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                <MapPin className="h-3 w-3" strokeWidth={2.5} />
                                                <span className="truncate">{shop.province}</span>
                                            </p>
                                            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                <Phone className="h-3 w-3" strokeWidth={2.5} />
                                                <span className="truncate">{shop.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area (Address & Description) */}
                            <div className="flex flex-1 flex-col p-4">
                                <div className="text-foreground mb-2 flex items-start gap-1.5 text-[12px] font-bold">
                                    <MapPin className="text-muted-foreground mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                                    <span className="truncate">{shop.address}</span>
                                </div>
                                <p className="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed">{shop.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </FrontPageLayout>
    );
}
