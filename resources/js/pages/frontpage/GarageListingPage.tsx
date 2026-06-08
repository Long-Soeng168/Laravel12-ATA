import PaginationTabs2 from '@/components/Pagination/PaginationTabs2';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import FrontPageLayout from '@/pages/frontpage/layouts/frontpage-layout';
import { Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon, ChevronRight, FileText, MapIcon, MapPin, Navigation, Phone, Store, XIcon } from 'lucide-react';
import { useState } from 'react';
import GarageListingHeader from './garages/components/GarageListingHeader';
import MapFloatingButton from './garages/components/MapFloatingButton';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' | 'accent' | 'green' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-[42px] px-6 rounded-none border cursor-pointer active:scale-[0.97]';
    const variants = {
        default:
            'border-black bg-black text-white hover:bg-neutral-800 hover:border-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:border-gray-200',
        accent: 'border-[#FF6D00] bg-[#FF6D00] text-white hover:bg-[#E66200] hover:border-[#E66200]',
        outline: 'border-gray-300 bg-transparent text-gray-900 hover:border-[#FF6D00] hover:text-[#FF6D00] dark:border-gray-700 dark:text-white',
        green: 'border-green-600 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white dark:bg-green-950 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-800 dark:hover:text-white',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

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
    other_phones?: string[];
    short_description: string;
    short_description_kh?: string;
    banner_url: string;
    logo_url: string;
    latitude?: string | number;
    longitude?: string | number;
};

export default function GarageListingPage() {
    const { tableData } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    const garages: ShopData[] = tableData?.data || tableData?.garages?.data || [];

    // State for Shadcn Dialog Quick View
    const [selectedGarage, setSelectedGarage] = useState<ShopData | null>(null);

    // Helper to extract the localized text seamlessly
    const getLocalizedText = (item: any, key: string = 'name') => {
        if (!item) return '';
        const khKey = `${key}_kh`;
        return currentLocale === 'kh' && item[khKey] ? item[khKey] : item[key] || '';
    };

    const BannerImage = ({ src, className = '' }: { src: string; className?: string }) => {
        const [hasError, setHasError] = useState(false);
        if (!src || hasError) return null;
        return (
            <img
                src={src}
                alt={t('Shop Banner')}
                className={`bg-background relative z-10 h-full w-full object-cover ${className}`}
                onError={() => setHasError(true)}
            />
        );
    };

    const LogoImage = ({ src, className = '' }: { src: string; className?: string }) => {
        const [hasError, setHasError] = useState(false);
        if (!src || hasError) return null;
        return <img src={src} alt={t('Shop Logo')} className={`z-10 h-full w-full object-cover ${className}`} onError={() => setHasError(true)} />;
    };

    // Quick View Dialog Components
    const handleOpenMap = (lat?: string | number, lng?: string | number) => {
        if (lat && lng) {
            window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
        } else {
            alert(t('Location coordinates not available for this garage.'));
        }
    };

    const handleCallPhone = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <FrontPageLayout>
            <div className="bg-accent pt-2 pb-2 dark:bg-white/5">
                <GarageListingHeader />
            </div>
            <div className="section-container relative mt-6 pb-20">
                {/* garages Grid (4 Columns) */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {garages.map((shop) => (
                        <button
                            key={shop.id}
                            onClick={() => setSelectedGarage(shop)}
                            className="bg-card border-border group flex w-full flex-col border text-left transition-colors duration-200 hover:border-[#FF6D00] focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:outline-none active:scale-[0.99]"
                        >
                            {/* Banner Image with Bottom Info Overlay */}
                            <div className="border-border bg-muted/30 relative flex h-[150px] w-full items-center justify-center overflow-hidden border-b">
                                {/* Fallback Background */}
                                <div className="bg-muted/40 absolute inset-0 flex flex-col items-center justify-center">
                                    <Store className="text-muted-foreground mb-1 h-8 w-8 opacity-50" strokeWidth={1.5} />
                                </div>

                                <BannerImage src={shop.banner_url} />

                                {/* Dark Gradient Overlay */}
                                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                                {/* Bottom Info Row (Logo + Text) */}
                                <div className="absolute right-3 bottom-3 left-3 z-30 flex items-end gap-3">
                                    {/* Logo */}
                                    <div className="border-border/40 bg-background relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border p-0">
                                        <LogoImage src={shop.logo_url} />
                                        <Store className="absolute h-5 w-5 text-[#FF6D00] opacity-40" strokeWidth={2} />
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                            <h3 className="truncate text-[15px] font-semibold text-white">{getLocalizedText(shop, 'name')}</h3>
                                            {shop.is_verified === 1 && (
                                                <div className="flex shrink-0 items-center justify-center rounded-full bg-blue-500 p-0.5">
                                                    <CheckCircleIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
                                                </div>
                                            )}
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
                                <p className="text-muted-foreground line-clamp-2 text-[11px]">{getLocalizedText(shop, 'short_description')}</p>
                            </div>
                        </button>
                    ))}
                </div>
                <PaginationTabs2 />
            </div>

            {/* Premium Industrial Quick View Dialog */}
            <Dialog open={!!selectedGarage} onOpenChange={(open) => !open && setSelectedGarage(null)}>
                <DialogContent className="max-w-3xl gap-0 overflow-hidden border-0 bg-white p-0 shadow-2xl sm:rounded-none dark:bg-[#0a0a0a]">
                    <DialogTitle className="sr-only">{selectedGarage ? getLocalizedText(selectedGarage, 'name') : 'Garage Details'}</DialogTitle>

                    {selectedGarage && (
                        <div className="relative flex max-h-[90vh] flex-col overflow-y-auto">
                            {/* Custom Close Button - Fixed to Top Right */}
                            <DialogClose className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-none bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
                                <XIcon className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogClose>

                            {/* --- TOP: BANNER HERO SECTION --- */}
                            <div className="relative h-[240px] w-full shrink-0 bg-gray-100 dark:bg-gray-900">
                                {/* Fallback Icon */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Store className="h-16 w-16 text-gray-300 dark:text-gray-800" strokeWidth={1} />
                                </div>

                                <BannerImage src={selectedGarage.banner_url} className="opacity-95" />

                                {/* Industrial Grid Overlay (Subtle) */}
                                <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />

                                {/* Top Gradient for Close Button */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/60 to-transparent" />

                                {/* Bottom Gradient for Text Readability */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Banner Content (Province Tag) */}
                                {(selectedGarage.province || selectedGarage.province_code) && (
                                    <div className="absolute right-6 bottom-6 z-20 flex items-center gap-1.5 border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                        <MapPin className="h-3.5 w-3.5 text-[#FF6D00]" />
                                        {selectedGarage.province ? getLocalizedText(selectedGarage.province, 'name') : selectedGarage.province_code}
                                    </div>
                                )}
                            </div>

                            {/* --- BOTTOM: SCROLLABLE CONTENT --- */}
                            <div className="relative px-6 pt-0 pb-8 sm:px-10">
                                {/* Header (Logo + Title) */}
                                <div className="mb-8 flex items-end gap-5">
                                    {/* Offset Logo Container */}
                                    <div className="relative z-30 -mt-12 flex h-24 w-24 shrink-0 items-center justify-center border-2 border-white bg-white shadow-xl dark:border-[#0a0a0a] dark:bg-gray-900">
                                        <LogoImage src={selectedGarage.logo_url} />
                                        <Store className="absolute h-10 w-10 text-[#FF6D00] opacity-20" strokeWidth={1.5} />
                                    </div>

                                    {/* Title Block */}
                                    <div className="flex-1 pb-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white" tabIndex={0}>
                                                {getLocalizedText(selectedGarage, 'name')}
                                            </h2>
                                            {selectedGarage.is_verified === 1 && (
                                                <div className="flex shrink-0 items-center justify-center rounded-full bg-blue-500 p-0.5">
                                                    <CheckCircleIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                    {/* Left Column: Description & Address */}
                                    <div className="lg:col-span-2">
                                        {/* Description Section */}
                                        {selectedGarage.short_description && (
                                            <section className="mb-8">
                                                <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                                                    <FileText className="h-4 w-4 text-[#FF6D00]" />
                                                    <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">{t('About')}</h3>
                                                </div>
                                                <p className="text-sm whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                                                    {getLocalizedText(selectedGarage, 'short_description')}
                                                </p>
                                            </section>
                                        )}

                                        {/* Address Section */}
                                        <section className="mb-8 lg:mb-0">
                                            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                                                <MapIcon className="h-4 w-4 text-[#FF6D00]" />
                                                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">{t('Location')}</h3>
                                            </div>
                                            <div className="flex items-start gap-3 bg-gray-50 p-4 dark:bg-white/5">
                                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500" />
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                    {getLocalizedText(selectedGarage, 'address')}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleOpenMap(selectedGarage.latitude, selectedGarage.longitude)}
                                                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border border-[#FF6D00] bg-[#FF6D00] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#FF6D00] focus-visible:outline-none dark:hover:bg-gray-950 dark:hover:text-[#FF6D00]"
                                            >
                                                <Navigation className="h-4 w-4" />
                                                {t('Open In Google Map')}
                                            </button>
                                        </section>
                                    </div>

                                    {/* Right Column: Contact & Actions */}
                                    <div className="flex flex-col gap-6 lg:border-l lg:border-gray-100 lg:pl-8 dark:lg:border-gray-800">
                                        {/* Phone Numbers */}
                                        <section>
                                            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                                                <Phone className="h-4 w-4 text-[#FF6D00]" />
                                                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">{t('Contact')}</h3>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleCallPhone(selectedGarage.phone)}
                                                    className="group flex w-full cursor-pointer items-center justify-between bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                                                >
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {selectedGarage.phone}
                                                    </span>
                                                    <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                                                </button>

                                                {selectedGarage.other_phones?.map((phone, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleCallPhone(phone)}
                                                        className="group flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                                    >
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">{phone}</span>
                                                        <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 dark:text-gray-600" />
                                                    </button>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Call to Actions */}
                                        <div className="mt-auto flex flex-col gap-3 pt-4">
                                            <Link
                                                href={`/garages/${selectedGarage.id}`}
                                                className={getButtonStyles('outline', 'w-full cursor-pointer bg-white dark:bg-transparent')}
                                            >
                                                {t('Detail')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <MapFloatingButton />
        </FrontPageLayout>
    );
}
