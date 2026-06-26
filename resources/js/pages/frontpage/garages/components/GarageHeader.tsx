import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    ChevronRightIcon,
    Edit,
    ImageOff,
    InfoIcon,
    MapPin,
    Maximize2Icon,
    Minimize2Icon,
    Phone,
    PlusCircleIcon,
    RotateCwSquareIcon,
    Warehouse, // Garage-specific icon
    Wrench, // Garage-specific icon
    ZoomInIcon,
    ZoomOutIcon,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// --- 1. Localization Helper ---
const getLocalizedText = (item: any, key: any, currentLocale: any): any => {
    if (!item) return '';

    const locale =
        typeof currentLocale === 'object' && currentLocale !== null
            ? currentLocale.code || currentLocale.locale || currentLocale.name || 'en'
            : currentLocale;

    const khKey = `${key}_kh`;
    return locale === 'kh' && item[khKey] ? item[khKey] : item[key] || '';
};

// --- 2. Production-Grade Reusable Safe Image Component ---
const SafeImage = React.forwardRef<HTMLImageElement | HTMLDivElement, any>(
    ({ src, alt, className, fallbackSrc = '/assets/images/placeholder.webp', ...props }, ref) => {
        const [imgSrc, setImgSrc] = useState<any>(src);
        const [isError, setIsError] = useState<boolean>(false);

        useEffect(() => {
            setImgSrc(src);
            setIsError(false);
        }, [src]);

        if (isError || !imgSrc) {
            return (
                <div
                    ref={ref as React.Ref<HTMLDivElement>}
                    className={`bg-muted text-muted-foreground flex items-center justify-center ${className}`}
                >
                    <ImageOff className="h-5 w-5 opacity-40" />
                </div>
            );
        }

        return (
            <img
                ref={ref as React.Ref<HTMLImageElement>}
                src={imgSrc}
                alt={alt || 'Image'}
                className={className}
                onError={() => {
                    if (fallbackSrc && imgSrc !== fallbackSrc) {
                        setImgSrc(fallbackSrc);
                    } else {
                        setIsError(true);
                    }
                }}
                {...props}
            />
        );
    },
);
SafeImage.displayName = 'SafeImage';

// --- 3. Main Component: Garage Header ---
const GarageHeader = () => {
    // 1. Extract the props from the backend
    const { garage, isOwner } = usePage<any>().props;
    const { t, currentLocale } = useTranslation() as any;

    // 2. Failsafe: if garage doesn't exist, don't render
    if (!garage) return null;

    // 3. Dynamic Profile Mappings
    const hasBanner = !!garage.banner;
    const bannerPath = garage.banner_url;
    const logoPath = garage.logo_url;

    const garageName = getLocalizedText(garage, 'name', currentLocale);
    const garageAddress = getLocalizedText(garage, 'address', currentLocale);
    const isVerified = garage.is_verified === 1 || garage.is_verified === true;

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        const doc = document;
        const el = doc.documentElement;
        if (!doc.fullscreenElement) {
            el.requestFullscreen()
                .then(() => setIsFullScreen(true))
                .catch(() => {});
        } else {
            doc.exitFullscreen()
                .then(() => setIsFullScreen(false))
                .catch(() => {});
        }
    };

    const handleVisibleChange = (visible: boolean) => {
        if (!visible && document.fullscreenElement) {
            document
                .exitFullscreen()
                .then(() => setIsFullScreen(false))
                .catch(() => {});
        }
    };

    const handleOpenMap = (lat?: any, lng?: any) => {
        if (lat && lng) {
            // Gently corrected the Google Maps URL structure so it pins correctly
            window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
        } else {
            alert(t('Location coordinates not available.'));
        }
    };

    const handleCallPhone = (phone: string) => {
        if (phone) {
            window.location.href = `tel:${phone}`;
        }
    };

    return (
        <PhotoProvider
            onVisibleChange={handleVisibleChange}
            maskOpacity={0.9}
            toolbarRender={({ scale, onScale, rotate, onRotate }) => (
                <div className="mx-2 flex h-[44px] items-center gap-2 rounded-md bg-black/50 px-2">
                    <button onClick={() => onScale(scale + 0.25)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <ZoomInIcon size={16} className="text-white" />
                    </button>
                    <button onClick={() => onScale(scale - 0.25)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <ZoomOutIcon size={16} className="text-white" />
                    </button>
                    <button onClick={() => onRotate(rotate + 90)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <RotateCwSquareIcon size={16} className="text-white" />
                    </button>
                    <button onClick={toggleFullScreen} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        {isFullScreen ? <Minimize2Icon size={16} className="text-white" /> : <Maximize2Icon size={16} className="text-white" />}
                    </button>
                </div>
            )}
        >
            {isOwner && (
                <div className="bg-background sticky top-0 z-50">
                    <div className="z-30 flex flex-col items-center justify-between gap-3 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 sm:flex-row sm:px-6 dark:bg-emerald-500/20">
                        <div className="flex items-center gap-2 text-center text-sm font-semibold text-emerald-600 sm:text-left dark:text-emerald-400">
                            <Wrench className="h-4 w-4 shrink-0" />
                            <span>
                                {currentLocale === 'kh'
                                    ? 'សូមស្វាគមន៍! អ្នកកំពុងមើលយានដ្ឋានផ្ទាល់របស់អ្នក។'
                                    : 'Welcome! You are currently viewing your own garage.'}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/garage-posts/create" // <-- Update this to your actual create post route
                                className="bg-true-primary hover:bg-true-primary dark:bg-true-primary dark:hover:bg-true-primary inline-flex shrink-0 items-center justify-center gap-1.5 rounded px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
                            >
                                <PlusCircleIcon className="h-3.5 w-3.5" />
                                {currentLocale === 'kh' ? 'បង្កើតការបង្ហោះ' : 'Create Post'}
                            </Link>
                            <Link
                                href="/edit-garage"
                                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                            >
                                <Edit className="h-3.5 w-3.5" />
                                {currentLocale === 'kh' ? 'កែប្រែយានដ្ឋាន' : 'Edit Garage'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="border-border bg-card relative mx-auto max-w-[2000px] overflow-hidden rounded-none shadow">
                {/* Banner */}
                {hasBanner && bannerPath && (
                    <div className="bg-muted relative z-10 h-64 w-full overflow-hidden lg:h-96">
                        <PhotoView src={bannerPath}>
                            <SafeImage src={bannerPath} alt={`${garageName} Banner`} className="h-full w-full cursor-pointer object-cover" />
                        </PhotoView>
                        <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
                    </div>
                )}

                <div
                    className={`section-container relative z-20 flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start ${hasBanner ? '-mt-16 sm:-mt-20' : ''}`}
                >
                    {/* Logo Wrapper */}
                    <div className="h-28 w-28 shrink-0">
                        <div className="border-background bg-background relative h-full w-full overflow-hidden rounded-none border-4 shadow-md">
                            <Warehouse className="pointer-events-none absolute inset-0 z-0 m-auto h-8 w-8 text-blue-600/20" />

                            <div className="relative z-10 h-full w-full">
                                {logoPath ? (
                                    <PhotoView src={logoPath}>
                                        <SafeImage src={logoPath} alt={`${garageName} Logo`} className="h-full w-full cursor-pointer object-cover" />
                                    </PhotoView>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                                        <Warehouse className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Garage Info & Triggers */}
                    <div className="w-full flex-1 text-center sm:text-left">
                        <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black tracking-tight sm:justify-start md:text-3xl">
                            {garageName}
                            {isVerified && <CheckCircle2Icon className="h-6 w-6 rounded-full bg-blue-500 text-white" aria-label="Verified Garage" />}
                        </h1>

                        {/* Phone & Other Phones Display */}
                        <div className="text-foreground mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-semibold sm:justify-start">
                            {garage.phone && (
                                <a
                                    href={`tel:${garage.phone}`}
                                    className="flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <Phone className="h-4 w-4 text-blue-500" />
                                    <span>{garage.phone}</span>
                                </a>
                            )}
                            {Array.isArray(garage.other_phones) &&
                                garage.other_phones.map((phone: any, idx: any) => (
                                    <a
                                        key={idx}
                                        href={`tel:${phone}`}
                                        className="flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <Phone className="h-4 w-4 text-blue-500" />
                                        <span>{phone}</span>
                                    </a>
                                ))}
                        </div>

                        {garageAddress && <p className="text-muted-foreground mt-1 text-sm font-medium">{garageAddress}</p>}

                        {/* Action Buttons Row */}
                        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            {/* Map Button */}
                            <button
                                onClick={() => handleOpenMap(garage.latitude, garage.longitude)}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-[#FF6D00] transition-colors hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-500 dark:hover:bg-orange-500/20"
                            >
                                <MapPin className="h-3.5 w-3.5" />
                                {t('Open In Google Map')}
                            </button>

                            {/* Detail Dialog Trigger */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-500 dark:hover:bg-blue-500/20">
                                        <InfoIcon className="h-3.5 w-3.5" />
                                        {t('Garage Details')}
                                    </button>
                                </DialogTrigger>

                                {/* Detail Dialog Content */}
                                <DialogContent className="sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                            <Warehouse className="h-5 w-5 text-blue-500" />
                                            {garageName}
                                        </DialogTitle>
                                    </DialogHeader>

                                    <div className="space-y-4 pt-4">
                                        {garage.short_description && (
                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                                                    {getLocalizedText(garage, 'short_description', currentLocale)}
                                                </p>
                                            </div>
                                        )}

                                        <div className="grid gap-4">
                                            {/* Phones Block */}
                                            <div className="flex flex-col gap-2 rounded-lg border p-2 shadow-sm">
                                                {garage.phone && (
                                                    <button
                                                        onClick={() => handleCallPhone(garage.phone)}
                                                        className="group flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-blue-500" />
                                                            <span className="text-base font-medium text-gray-900 dark:text-white">
                                                                {garage.phone}
                                                            </span>
                                                        </div>
                                                        <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                                                    </button>
                                                )}

                                                {Array.isArray(garage.other_phones) &&
                                                    garage.other_phones.map((phone: any, idx: any) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleCallPhone(phone)}
                                                            className="group flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-gray-400" />
                                                                <span className="text-base text-gray-600 dark:text-gray-400">{phone}</span>
                                                            </div>
                                                            <ChevronRightIcon className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 dark:text-gray-600" />
                                                        </button>
                                                    ))}
                                            </div>

                                            {/* Address Block with Map Button */}
                                            {garageAddress && (
                                                <div className="flex items-start gap-3 rounded-lg border p-3 shadow-sm">
                                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                                    <div className="flex w-full flex-col items-start">
                                                        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                                            {t('Address')}
                                                        </p>
                                                        <p className="mt-1 text-sm font-medium">{garageAddress}</p>

                                                        <button
                                                            onClick={() => handleOpenMap(garage.latitude, garage.longitude)}
                                                            className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-[#FF6D00] transition-colors hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-500 dark:hover:bg-orange-500/20"
                                                        >
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            {t('Open In Google Map')}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default GarageHeader;
