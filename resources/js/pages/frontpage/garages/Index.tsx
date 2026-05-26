import { ArrowRight, CheckCircleIcon, Map, MapPin, Phone, Search, Star, Wrench, X } from 'lucide-react';
import React, { useState } from 'react';
import FrontPageLayout from '../layouts/frontpage-layout';

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
type Garage = {
    id: string;
    name: string;
    isVerified: boolean;
    rating: string;
    province: string;
    address: string;
    phone: string;
    description: string;
    services: string[];
    banner: string;
    logo: string;
};

const GARAGES: Garage[] = [
    {
        id: 'g1',
        name: 'Elite Auto Care',
        isVerified: true,
        rating: '4.9',
        province: 'Phnom Penh',
        address: 'Dangkao, Street 217',
        phone: '085 839 881',
        description: 'Professional auto care specializing in deep diagnostics, engine tuning, and full-service repairs.',
        services: ['Diagnostics', 'Engine'],
        banner: '/assets/images/garages/banner-1.jpg',
        logo: '/assets/images/garages/logo-1.jpg',
    },
    {
        id: 'g2',
        name: 'Precision Garage',
        isVerified: false,
        rating: '4.8',
        province: 'Siem Reap',
        address: 'National Road 6, Svay Dangkum',
        phone: '012 345 678',
        description: 'Quick reliable service for tire changes, oil replacement, and routine maintenance.',
        services: ['Tire Change', 'Oil'],
        banner: '/assets/images/garages/banner-2.jpg',
        logo: '/assets/images/garages/logo-2.jpg',
    },
    {
        id: 'g3',
        name: 'Reliable Mechanic',
        isVerified: true,
        rating: '4.5',
        province: 'Battambang',
        address: 'Street 3, City Center',
        phone: '098 765 432',
        description: 'Expert AC repair and brake pad replacement with high quality imported spare parts.',
        services: ['AC Repair', 'Brakes'],
        banner: '/assets/images/garages/banner-3.jpg',
        logo: '/assets/images/garages/logo-3.jpg',
    },
    {
        id: 'g4',
        name: 'Fast Track Auto',
        isVerified: false,
        rating: '4.7',
        province: 'Phnom Penh',
        address: 'Toul Kork, St 516',
        phone: '099 112 233',
        description: 'Performance suspension upgrades, custom tuning, and advanced electrical troubleshooting.',
        services: ['Suspension', 'Tuning'],
        banner: '/assets/images/garages/banner-4.jpg',
        logo: '/assets/images/garages/logo-4.jpg',
    },
];

export default function GaragePage() {
    const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (selectedGarage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedGarage]);

    return (
        <FrontPageLayout>
            <div className="relative container mx-auto mt-6 px-4 pb-20 md:px-6">
                {/* Header & Search Section */}
                <section className="border-border bg-card mb-12 flex flex-col items-center border p-6 md:p-10">
                    <h1 className="text-foreground mb-6 text-3xl font-black tracking-tighter uppercase md:text-4xl">
                        Find a <span className="text-[#FF6D00]">Garage</span>
                    </h1>

                    <div className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
                        <input
                            className="border-border bg-background flex-1 rounded-none border px-4 py-2 text-sm font-medium focus:border-[#FF6D00] focus:outline-none"
                            placeholder="Search by garage name or address..."
                        />
                        <Select className="bg-background w-full sm:w-48">
                            <option>All Provinces</option>
                            <option>Phnom Penh</option>
                            <option>Siem Reap</option>
                            <option>Battambang</option>
                        </Select>
                        <button className={getButtonStyles('default', 'w-full sm:w-auto')}>
                            <Search className="mr-2 h-4 w-4" strokeWidth={2.5} /> Find
                        </button>
                    </div>
                </section>

                {/* Garages Grid (4 Columns) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {GARAGES.map((garage) => (
                        <button
                            key={garage.id}
                            onClick={() => setSelectedGarage(garage)}
                            className="bg-card border-border group flex w-full flex-col border text-left transition-colors duration-200 hover:border-[#FF6D00] active:scale-[0.99]"
                        >
                            {/* Banner Image with Bottom Info Overlay */}
                            <div className="border-border bg-muted relative h-[180px] w-full border-b">
                                <img
                                    src={garage.banner}
                                    alt="Banner"
                                    className="h-full w-full object-cover"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute right-3 bottom-3 left-3 flex items-end gap-3">
                                    <div className="border-border bg-background relative flex h-14 w-14 shrink-0 items-center justify-center border p-1">
                                        <img
                                            src={garage.logo}
                                            alt="Logo"
                                            className="z-10 h-full w-full object-contain"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        <Wrench className="absolute h-5 w-5 text-[#FF6D00] opacity-40" strokeWidth={2} />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                            <h3 className="truncate text-[15px] font-semibold text-white">{garage.name}</h3>
                                            {garage.isVerified && <CheckCircleIcon className="h-5 w-5 fill-blue-500 text-white" />}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                <MapPin className="h-3 w-3" strokeWidth={2.5} />
                                                <span className="truncate">{garage.province}</span>
                                            </p>
                                            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                <Phone className="h-3 w-3" strokeWidth={2.5} />
                                                <span className="truncate">{garage.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex flex-1 flex-col p-4">
                                <p className="text-foreground mb-2 truncate text-[12px] font-bold">{garage.address}</p>
                                <p className="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed">{garage.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Fixed Bottom Left Map Button */}
                <a
                    href="/garages_map"
                    className="fixed bottom-6 left-6 z-40 flex items-center gap-3 border border-[#FF6D00] bg-[#FF6D00] px-6 py-4 text-[13px] font-bold tracking-widest text-white uppercase transition-all duration-150 ease-out hover:border-black hover:bg-black active:scale-[0.97]"
                >
                    <Map className="h-5 w-5" strokeWidth={2.5} /> View on Map
                </a>

                {/* --- Quick View Modal --- */}
                {selectedGarage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
                        onClick={() => setSelectedGarage(null)}
                    >
                        {/* Modal Container - Constrained to 90vh and sets up overflow-hidden 
                            so the close button stays outside the scrollable area 
                        */}
                        <div
                            className="bg-background border-border relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden border shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Fixed Close Button */}
                            <button
                                onClick={() => setSelectedGarage(null)}
                                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center border border-white/20 bg-black text-white transition-colors hover:bg-neutral-800 active:scale-95"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Scrollable Content Wrapper */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Modal Header/Banner */}
                                <div className="border-border bg-muted relative h-48 w-full shrink-0 border-b">
                                    <img
                                        src={selectedGarage.banner}
                                        alt="Banner"
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Province Tag */}
                                    <div className="absolute right-4 bottom-4 flex items-center gap-1.5 border border-white/20 bg-black/60 px-3 py-1.5 text-white backdrop-blur-md">
                                        <MapPin className="h-3 w-3" />
                                        <span className="text-[11px] font-bold tracking-widest uppercase">{selectedGarage.province}</span>
                                    </div>

                                    {/* Floating Logo */}
                                    <div className="border-border bg-background absolute -bottom-10 left-6 z-20 flex h-[84px] w-[84px] items-center justify-center border p-1.5">
                                        <img
                                            src={selectedGarage.logo}
                                            alt="Logo"
                                            className="z-10 h-full w-full object-contain"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        <Wrench className="absolute h-8 w-8 text-[#FF6D00] opacity-40" strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Modal Content Area */}
                                <div className="p-6 pt-14 sm:p-8 sm:pt-16">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-foreground text-2xl font-black tracking-tighter uppercase">{selectedGarage.name}</h2>
                                            <div className="mt-2 flex items-center gap-3">
                                                <div className="border-border bg-card flex items-center gap-1 border px-2 py-0.5">
                                                    <Star className="h-3.5 w-3.5 fill-[#FF6D00] text-[#FF6D00]" />
                                                    <span className="text-[12px] font-bold">{selectedGarage.rating}</span>
                                                </div>
                                                {selectedGarage.isVerified && (
                                                    <span className="border-border border bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                                                        Verified Partner
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{selectedGarage.description}</p>

                                    <div className="border-border mb-8 flex flex-col gap-4 border-t pt-6">
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6D00]" />
                                            <span className="text-foreground text-sm font-bold tracking-wide">{selectedGarage.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6D00]" />
                                            <span className="text-muted-foreground text-sm leading-relaxed font-medium">
                                                {selectedGarage.address}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-auto flex flex-col gap-3">
                                        <a
                                            href={`https://maps.google.com/?q=${encodeURIComponent(selectedGarage.name + ' ' + selectedGarage.address)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={getButtonStyles('accent', '!h-12 w-full gap-2')}
                                        >
                                            <Map className="h-4 w-4" strokeWidth={2.5} /> Open in Google Map
                                        </a>

                                        <div className="flex gap-3">
                                            <a href={`/garage/${selectedGarage.id}`} className={getButtonStyles('default', 'flex-1 gap-2')}>
                                                View Detail <ArrowRight className="h-4 w-4" />
                                            </a>
                                            <a
                                                href={`tel:${selectedGarage.phone.replace(/\s/g, '')}`}
                                                className={getButtonStyles('outline', 'flex-1 gap-2')}
                                            >
                                                <Phone className="h-4 w-4" /> Contact
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FrontPageLayout>
    );
}
