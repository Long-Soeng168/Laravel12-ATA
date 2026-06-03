import PaginationTabs2 from '@/components/Pagination/PaginationTabs2';
import useTranslation from '@/hooks/use-translation';
import FrontPageLayout from '@/pages/frontpage/layouts/frontpage-layout';
import { Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon, MapPin, Phone, Store } from 'lucide-react';
import React, { useState } from 'react';
import ShopListingHeader from './shops/components/ShopListingHeader';

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

// --- TypeScript Definitions for API Data ---
type Province = {
    id: number;
    code: string;
    name: string;
    name_kh: string;
};

type ShopData = {
    id: number;
    name: string;
    name_kh?: string;
    is_verified: number; // 1 or 0
    province_code: string;
    province: Province;
    address: string;
    address_kh?: string;
    phone: string;
    short_description: string;
    short_description_kh?: string;
    banner_url: string;
    logo_url: string;
};

export default function ShopPage() {
    const { tableData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation(); // kh, en
    const shops: ShopData[] = tableData?.data || tableData?.shops?.data || [];

    // Helper to extract the localized text seamlessly
    const getLocalizedText = (item: any, key: string = 'name') => {
        if (!item) return '';
        const khKey = `${key}_kh`;
        return currentLocale === 'kh' && item[khKey] ? item[khKey] : item[key] || '';
    };

    const BannerImage = ({ src }: { src: string }) => {
        const [hasError, setHasError] = useState(false);

        // If no URL or previously errored, don't render the <img> tag at all
        if (!src || hasError) return null;

        return (
            <img
                src={src}
                alt={t('Shop Banner')}
                className="bg-background relative z-10 h-full w-full object-cover"
                onError={() => setHasError(true)}
            />
        );
    };

    return (
        <FrontPageLayout>
            <div className="bg-accent pt-2 pb-2 dark:bg-white/5">
                <ShopListingHeader />
            </div>
            <div className="section-container relative mt-6 pb-20">
                {/* Header & Search Section */}

                {/* Shops Grid (4 Columns) */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {shops.map((shop) => (
                        <Link
                            prefetch
                            href={`/shops/${shop.id}`}
                            key={shop.id}
                            className="bg-card border-border group flex w-full flex-col border transition-colors duration-200 hover:border-[#FF6D00] active:scale-[0.99]"
                        >
                            {/* Banner Image with Bottom Info Overlay */}
                            <div className="border-border bg-muted/30 relative flex h-[150px] w-full items-center justify-center overflow-hidden border-b">
                                {/* Fallback Background (Visible if image fails or is missing) */}
                                <div className="bg-muted/40 absolute inset-0 flex flex-col items-center justify-center">
                                    <Store className="text-muted-foreground mb-1 h-8 w-8 opacity-50" strokeWidth={1.5} />
                                </div>

                                {/* Render the banner image only if valid */}
                                <BannerImage src={shop.banner_url} />

                                {/* Dark Gradient Overlay */}
                                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                                {/* Bottom Info Row (Logo + Text) */}
                                <div className="absolute right-3 bottom-3 left-3 z-30 flex items-end gap-3">
                                    {/* Logo - Removed padding (p-0) and softened border so it looks flush/sleek */}
                                    <div className="border-border/40 bg-background relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border p-0">
                                        <img
                                            src={shop.logo_url}
                                            alt={t('Shop Logo')}
                                            className="z-10 h-full w-full object-cover"
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
                                            <h3 className="truncate text-[15px] font-semibold text-white">{getLocalizedText(shop, 'name')}</h3>
                                            {shop.is_verified === 1 && <CheckCircleIcon className="h-5 w-5 fill-blue-500 text-white" />}
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                                                <MapPin className="h-3 w-3" strokeWidth={2.5} />
                                                <span className="truncate">
                                                    {shop.province ? getLocalizedText(shop.province, 'name') : shop.province_code}
                                                </span>
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
                                <div className="text-foreground mb-2 flex items-start gap-1.5 text-[12px] font-medium">
                                    <MapPin className="text-muted-foreground mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                                    <span className="truncate">{getLocalizedText(shop, 'address')}</span>
                                </div>
                                <p className="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed">
                                    {getLocalizedText(shop, 'short_description')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <PaginationTabs2 />
            </div>
        </FrontPageLayout>
    );
}
