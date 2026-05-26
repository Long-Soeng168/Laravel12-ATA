import { MapPin, Star } from 'lucide-react';
import React from 'react';
import FrontPageLayout from './layouts/frontpage-layout';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 rounded-none border border-transparent';
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
const SHOPS = [
    {
        id: 's1',
        initials: 'PP',
        name: 'Performance Parts Inc.',
        rating: '4.9',
        desc: 'Specializing in high-performance aftermarket upgrades for domestic and import vehicles.',
        tags: ['Turbochargers', 'Exhaust Systems', 'ECU Tuning'],
        loc: 'Detroit, MI',
        stats: 'Est. 2010 • 15k+ Sales',
    },
    {
        id: 's2',
        initials: 'OD',
        name: 'OEM Direct Warehouse',
        rating: '4.8',
        desc: 'Direct-from-factory replacement parts guaranteeing fit and function.',
        tags: ['Factory Replacements', 'Body Panels', 'OEM Filters'],
        loc: 'Dallas, TX',
        stats: 'Est. 2015 • 42k+ Sales',
    },
    {
        id: 's3',
        initials: 'EA',
        name: 'EuroAuto Imports',
        rating: '4.7',
        desc: 'Specialists in hard-to-find parts for European makes including BMW, Audi, and Mercedes.',
        tags: ['European Makes', 'Sensors', 'Cooling'],
        loc: 'Los Angeles, CA',
        stats: 'Est. 2018 • 8k+ Sales',
    },
];

export default function ShopListingPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="animate-in fade-in space-y-6 duration-300">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h1 className="mb-2 text-2xl font-bold tracking-tight uppercase">Vendor Directory</h1>
                            <p className="text-muted-foreground text-sm">Browse independent sellers and specialist warehouses on the platform.</p>
                        </div>
                        <Select className="w-full md:w-auto">
                            <option>Sort by: Rating</option>
                            <option>Sort by: Name (A-Z)</option>
                            <option>Sort by: Distance</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Static Expanded Sidebar */}
                        <aside className="w-full flex-shrink-0 md:w-64">
                            <div className="bg-card border-border sticky top-40 border p-4">
                                <h3 className="border-border mb-4 border-b pb-2 text-sm font-bold tracking-wider uppercase">Filter Shops</h3>

                                <div className="mb-6">
                                    <h4 className="text-muted-foreground mb-2 text-xs font-medium uppercase">Specialty</h4>
                                    <div className="flex flex-col space-y-2">
                                        {['OEM Parts (42)', 'Aftermarket (85)', 'Performance (24)', 'Salvage/Used (18)'].map((label) => (
                                            <label key={label} className="flex cursor-pointer items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="bg-background border-border h-4 w-4 rounded-none accent-[#FF6D00]"
                                                />
                                                <span className="text-sm">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-muted-foreground mb-2 text-xs font-medium uppercase">Region</h4>
                                    <Select className="bg-background border-border w-full">
                                        <option>All Regions</option>
                                        <option>Midwest</option>
                                        <option>West Coast</option>
                                        <option>East Coast</option>
                                        <option>South</option>
                                    </Select>
                                </div>
                            </div>
                        </aside>

                        {/* Shop List */}
                        <div className="flex flex-1 flex-col gap-4">
                            {SHOPS.map((shop) => (
                                <a
                                    href="/products"
                                    key={shop.id}
                                    className="bg-card border-border group text-foreground block flex cursor-pointer flex-col items-start gap-6 border p-4 transition-colors hover:border-[#FF6D00] md:flex-row md:items-center"
                                >
                                    <div className="bg-background border-border flex h-16 w-16 flex-shrink-0 items-center justify-center border text-xl font-bold text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-[#121212]">
                                        {shop.initials}
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-3">
                                            <h3 className="text-lg font-bold">{shop.name}</h3>
                                            <div className="bg-background border-border flex items-center gap-1 border px-2 py-0.5">
                                                <Star className="h-3 w-3 fill-[#FF6D00] text-[#FF6D00]" />
                                                <span className="text-xs font-bold">{shop.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-2 text-sm">{shop.desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {shop.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-background border-border text-muted-foreground border px-2 py-1 text-[10px] tracking-wider uppercase"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-2 md:w-auto md:text-right">
                                        <span className="text-muted-foreground flex items-center gap-1 text-xs md:justify-end">
                                            <MapPin className="h-3 w-3" /> {shop.loc}
                                        </span>
                                        <span className="text-muted-foreground text-xs">{shop.stats}</span>
                                        <div
                                            className={getButtonStyles(
                                                'outline',
                                                'mt-2 h-8 text-xs group-hover:border-[#FF6D00] group-hover:text-[#FF6D00]',
                                            )}
                                        >
                                            View Inventory
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
