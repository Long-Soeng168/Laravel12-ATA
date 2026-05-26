import { Map, MapPin, Search, Star, Wrench } from 'lucide-react';
import React from 'react';
import FrontPageLayout from '../layouts/frontpage-layout';
const getButtonStyles = (variant: 'default' | 'outline' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 rounded-none border border-transparent cursor-pointer';
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
    <select
        className={`border-border bg-card placeholder:text-muted-foreground focus:border-primary flex h-9 w-full appearance-none items-center justify-between rounded-none border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    >
        {children}
    </select>
);

// --- Mock Data ---
const GARAGES = [
    { id: 'g1', name: 'Elite Auto Care', rating: '4.9', province: 'Phnom Penh', address: 'Dangkao, Street 217', services: ['Diagnostics', 'Engine'] },
    { id: 'g2', name: 'Precision Garage', rating: '4.8', province: 'Siem Reap', address: 'National Road 6', services: ['Tire Change', 'Oil'] },
    {
        id: 'g3',
        name: 'Reliable Mechanic',
        rating: '4.5',
        province: 'Battambang',
        address: 'Street 3, City Center',
        services: ['AC Repair', 'Brakes'],
    },
    { id: 'g4', name: 'Fast Track Auto', rating: '4.7', province: 'Phnom Penh', address: 'Toul Kork, St 516', services: ['Suspension', 'Tuning'] },
    { id: 'g5', name: 'Sihanouk Repair', rating: '4.6', province: 'Sihanoukville', address: 'Independence St', services: ['Body Work', 'Painting'] },
];

export default function GaragePage() {
    return (
        <FrontPageLayout>
            <div className="relative container mx-auto px-4 py-12 md:px-6">
                {/* Hero Search Section */}
                <section className="bg-card border-border mb-12 border p-8 text-center">
                    <h1 className="text-foreground mb-4 text-3xl font-black tracking-tighter uppercase">Find Local Garages</h1>
                    <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-sm">
                        Search by name or address, and filter by province to find trusted service centers.
                    </p>
                    <div className="mx-auto flex max-w-xl flex-col gap-2 sm:flex-row">
                        <input
                            className="border-border bg-background flex-1 rounded-none border px-4 py-2 text-sm focus:border-[#FF6D00] focus:outline-none"
                            placeholder="Search by garage name or address..."
                        />
                        <Select className="w-full sm:w-48">
                            <option>All Provinces</option>
                            <option>Phnom Penh</option>
                            <option>Siem Reap</option>
                            <option>Battambang</option>
                        </Select>
                        <button className={getButtonStyles('default', 'px-6')}>
                            <Search className="mr-2 h-4 w-4" /> Find
                        </button>
                    </div>
                </section>

                {/* Garages Grid (4 Columns) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {GARAGES.map((garage) => (
                        <div
                            key={garage.id}
                            className="bg-card border-border group flex flex-col border p-5 transition-colors hover:border-[#FF6D00]"
                        >
                            <div className="bg-background border-border mb-4 flex h-14 w-14 items-center justify-center border text-[#FF6D00]">
                                <Wrench className="h-7 w-7" />
                            </div>

                            <div className="mb-4 flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                    <h3 className="truncate text-sm font-bold">{garage.name}</h3>
                                    <div className="bg-background border-border ml-auto flex items-center gap-1 border px-1.5 py-0.5">
                                        <Star className="h-3 w-3 fill-[#FF6D00] text-[#FF6D00]" />
                                        <span className="text-[10px] font-bold">{garage.rating}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-3 flex items-center gap-1 text-[11px]">
                                    <MapPin className="h-3 w-3" /> {garage.province}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {garage.services.map((s) => (
                                        <span
                                            key={s}
                                            className="bg-background border-border text-muted-foreground border px-2 py-0.5 text-[10px] tracking-wider uppercase"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-border mt-auto flex flex-col gap-2 border-t pt-4">
                                <button className={getButtonStyles('outline', 'h-8 w-full text-[11px]')}>View Details</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fixed Bottom Left Map Button */}
                <a
                    href="/garages_map"
                    className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#FF6D00] px-6 py-4 font-bold tracking-wider text-white uppercase shadow-lg transition-colors hover:bg-[#e66200]"
                >
                    <Map className="h-5 w-5" /> View on Map
                </a>
            </div>
        </FrontPageLayout>
    );
}
