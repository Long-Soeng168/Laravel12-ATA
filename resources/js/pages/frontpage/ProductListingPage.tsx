import { AlertTriangle, Ban, CheckCircle2, ChevronRight, ShoppingCart, Store, XCircle } from 'lucide-react';
import React from 'react';
import FrontPageLayout from './layouts/frontpage-layout';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 rounded-none border border-transparent cursor-pointer';
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }> = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => (
    <button className={getButtonStyles(variant, className)} {...props}>
        {children}
    </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
    <input
        className={`border-border placeholder:text-muted-foreground focus-visible:border-primary flex h-9 w-full rounded-none border bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
    <select
        className={`border-border bg-card placeholder:text-muted-foreground focus:border-primary flex h-9 w-full appearance-none items-center justify-between rounded-none border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    >
        {children}
    </select>
);

const Badge: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: 'success' | 'warning' | 'error' }> = ({
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
        error: 'border-border text-muted-foreground',
    };
    return (
        <div className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default function ProductListingPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="animate-in fade-in space-y-6 duration-300">
                    <div className="text-muted-foreground hide-scrollbar mb-4 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
                        <span>Toyota Camry 2021</span>
                        <ChevronRight className="h-3 w-3" />
                        <span>Brakes & Rotors</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground">Brake Pads</span>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h1 className="mb-1 text-2xl font-bold tracking-tight uppercase">Brake Pads</h1>
                            <p className="text-muted-foreground text-sm">Showing 142 results matching your vehicle.</p>
                        </div>
                        <Select className="w-full md:w-auto">
                            <option>Sort by: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating: High to Low</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Static Expanded Sidebar */}
                        <aside className="w-full flex-shrink-0 lg:w-64">
                            <div className="bg-card border-border sticky top-40 space-y-6 border p-4">
                                <div className="border-border flex items-center justify-between border-b pb-2">
                                    <h3 className="text-sm font-bold tracking-wider uppercase">Filters</h3>
                                    <button className="text-muted-foreground hover:text-foreground text-xs">Clear All</button>
                                </div>

                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-xs font-medium uppercase">Condition / Type</h4>
                                    <div className="flex flex-col space-y-2">
                                        {[
                                            { label: 'OEM Genuine', count: 45, checked: true },
                                            { label: 'Aftermarket New', count: 89, checked: false },
                                            { label: 'Remanufactured', count: 8, checked: false },
                                        ].map((item) => (
                                            <label key={item.label} className="group flex cursor-pointer items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={item.checked}
                                                        className="bg-background border-border h-4 w-4 rounded-none accent-[#FF6D00]"
                                                    />
                                                    <span className="text-sm transition-colors group-hover:text-[#FF6D00]">{item.label}</span>
                                                </div>
                                                <span className="text-muted-foreground text-xs">{item.count}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-xs font-medium uppercase">Brand</h4>
                                    <div className="custom-scrollbar flex max-h-48 flex-col space-y-2 overflow-y-auto pr-2">
                                        {['Bosch', 'Brembo', 'Akebono', 'Toyota Genuine'].map((brand) => (
                                            <label key={brand} className="group flex cursor-pointer items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="bg-background border-border h-4 w-4 rounded-none accent-[#FF6D00]"
                                                />
                                                <span className="text-sm transition-colors group-hover:text-[#FF6D00]">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-xs font-medium uppercase">Price Range</h4>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" placeholder="Min" className="bg-background h-8" />
                                        <span className="text-muted-foreground">-</span>
                                        <Input type="number" placeholder="Max" className="bg-background h-8" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-xs font-medium uppercase">Vendor Shop</h4>
                                    <Select className="bg-background border-border w-full text-sm">
                                        <option>All Shops</option>
                                        <option>Performance Parts Inc.</option>
                                        <option>OEM Direct Warehouse</option>
                                    </Select>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {/* Product 1: Fits */}
                            <div className="bg-card border-border group relative flex flex-col border transition-colors hover:border-[#FF6D00]">
                                <div className="absolute top-2 left-2 z-10">
                                    <Badge variant="success">
                                        <CheckCircle2 className="h-3 w-3" /> Fits Vehicle
                                    </Badge>
                                </div>
                                <div className="bg-background border-border relative flex aspect-square items-center justify-center overflow-hidden border-b p-4">
                                    <svg
                                        className="text-border h-3/4 w-3/4 transition-transform duration-300 group-hover:scale-105"
                                        viewBox="0 0 100 100"
                                        fill="currentColor"
                                    >
                                        <path d="M20,40 Q50,20 80,40 L85,60 Q50,80 15,60 Z" />
                                        <circle cx="30" cy="50" r="5" fill="#121212" />
                                        <circle cx="70" cy="50" r="5" fill="#121212" />
                                    </svg>
                                    <a
                                        href="/shops"
                                        className="bg-card border-border text-muted-foreground absolute right-2 bottom-2 flex items-center gap-1 border px-1.5 py-0.5 text-[10px] transition-colors hover:border-[#FF6D00] hover:text-[#FF6D00]"
                                    >
                                        <Store className="h-3 w-3" /> OEM Direct
                                    </a>
                                </div>
                                <div className="flex flex-grow flex-col p-4">
                                    <div className="text-muted-foreground mb-1 text-xs">OEM Genuine • SKU: 04465-33471</div>
                                    <h3 className="text-foreground mb-2 line-clamp-2 flex-grow text-sm leading-tight font-bold">
                                        Toyota Genuine Front Disc Brake Pad Set
                                    </h3>
                                    <div className="mt-4 flex items-end justify-between">
                                        <div>
                                            <span className="block text-lg font-bold">$68.45</span>
                                            <span className="flex items-center gap-1 text-[10px] text-green-500">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> In Stock (12)
                                            </span>
                                        </div>
                                        <Button variant="outline" className="h-9 w-9 p-0 hover:border-[#FF6D00] hover:text-[#FF6D00]">
                                            <ShoppingCart className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {/* Product 2: Warning */}
                            <div className="bg-card border-border group relative flex flex-col border transition-colors hover:border-[#FF6D00]">
                                <div className="absolute top-2 left-2 z-10">
                                    <Badge variant="warning">
                                        <AlertTriangle className="h-3 w-3" /> Verify Trim
                                    </Badge>
                                </div>
                                <div className="bg-background border-border relative flex aspect-square items-center justify-center overflow-hidden border-b p-4">
                                    <svg
                                        className="text-border h-3/4 w-3/4 transition-transform duration-300 group-hover:scale-105"
                                        viewBox="0 0 100 100"
                                        fill="currentColor"
                                    >
                                        <path d="M20,40 Q50,20 80,40 L85,60 Q50,80 15,60 Z" />
                                        <circle cx="30" cy="50" r="5" fill="#121212" />
                                        <circle cx="70" cy="50" r="5" fill="#121212" />
                                    </svg>
                                    <a
                                        href="/shops"
                                        className="bg-card border-border text-muted-foreground absolute right-2 bottom-2 flex items-center gap-1 border px-1.5 py-0.5 text-[10px] transition-colors hover:border-[#FF6D00] hover:text-[#FF6D00]"
                                    >
                                        <Store className="h-3 w-3" /> EuroAuto Imports
                                    </a>
                                </div>
                                <div className="flex flex-grow flex-col p-4">
                                    <div className="text-muted-foreground mb-1 text-xs">Performance • Brembo • SKU: P83155N</div>
                                    <h3 className="text-foreground mb-2 line-clamp-2 flex-grow text-sm leading-tight font-bold">
                                        Brembo Premium NAO Ceramic Front Brake Pads
                                    </h3>
                                    <div className="mt-4 flex items-end justify-between">
                                        <div>
                                            <span className="block text-lg font-bold">$85.00</span>
                                            <span className="flex items-center gap-1 text-[10px] text-[#FF6D00]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6D00]"></span> Low Stock (3)
                                            </span>
                                        </div>
                                        <Button variant="outline" className="h-9 w-9 p-0 hover:border-[#FF6D00] hover:text-[#FF6D00]">
                                            <ShoppingCart className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {/* Product 3: Does Not Fit */}
                            <div className="bg-card border-border group relative flex flex-col border opacity-75 transition-colors">
                                <div className="absolute top-2 left-2 z-10">
                                    <Badge variant="error">
                                        <XCircle className="h-3 w-3" /> Does Not Fit
                                    </Badge>
                                </div>
                                <div className="bg-background border-border relative flex aspect-square items-center justify-center overflow-hidden border-b p-4">
                                    <svg
                                        className="text-border h-3/4 w-3/4 transition-transform duration-300"
                                        viewBox="0 0 100 100"
                                        fill="currentColor"
                                    >
                                        <path d="M20,40 Q50,20 80,40 L85,60 Q50,80 15,60 Z" />
                                        <circle cx="30" cy="50" r="5" fill="#121212" />
                                        <circle cx="70" cy="50" r="5" fill="#121212" />
                                    </svg>
                                    <a
                                        href="/shops"
                                        className="bg-card border-border text-muted-foreground absolute right-2 bottom-2 flex items-center gap-1 border px-1.5 py-0.5 text-[10px] transition-colors hover:border-[#FF6D00] hover:text-[#FF6D00]"
                                    >
                                        <Store className="h-3 w-3" /> OEM Direct
                                    </a>
                                </div>
                                <div className="flex flex-grow flex-col p-4">
                                    <div className="text-muted-foreground mb-1 text-xs">OEM Genuine • SKU: 04465-06100</div>
                                    <h3 className="text-foreground mb-2 line-clamp-2 flex-grow text-sm leading-tight font-bold">
                                        Toyota Genuine Front Disc Brake Pad Set (V6 Only)
                                    </h3>
                                    <div className="mt-4 flex items-end justify-between">
                                        <div>
                                            <span className="text-muted-foreground block text-lg font-bold">$72.50</span>
                                        </div>
                                        <Button variant="outline" disabled className="border-border text-muted-foreground h-9 w-9 p-0">
                                            <Ban className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
