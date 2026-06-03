import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import {
    Camera,
    CheckCircle2Icon,
    ChevronRightIcon,
    Clock,
    ImageOff,
    MapIcon,
    MapPin,
    Maximize2Icon,
    Minimize2Icon,
    NavigationIcon,
    Phone,
    RotateCwSquareIcon,
    Store,
    XIcon,
    ZoomInIcon,
    ZoomOutIcon,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import FrontPageLayout from '../layouts/frontpage-layout';

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

// --- 3. Sub-Component: Garage Header Layout ---
const GarageHeader: React.FC<any> = ({ garage }) => {
    const { t, currentLocale } = useTranslation() as any;
    const bannerPath = `/assets/images/garages/${garage.banner}`;
    const logoPath = `/assets/images/garages/${garage.logo}`;

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
            window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
        } else {
            alert(t('Location coordinates not available for this garage.'));
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
            <div className="border-border bg-card relative mb-8 overflow-hidden rounded-none shadow">
                <div className="bg-muted relative h-64 w-full overflow-hidden lg:h-96">
                    <PhotoView src={bannerPath}>
                        <SafeImage
                            src={bannerPath}
                            alt={`${getLocalizedText(garage, 'name', currentLocale)} Banner`}
                            className="h-full w-full cursor-pointer object-cover"
                        />
                    </PhotoView>
                </div>

                <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-end">
                    <div className="border-background bg-background relative -mt-16 h-28 w-28 shrink-0 overflow-hidden rounded-none border-4 shadow-md sm:-mt-20">
                        <PhotoView src={logoPath}>
                            <SafeImage
                                src={logoPath}
                                alt={`${getLocalizedText(garage, 'name', currentLocale)} Logo`}
                                className="h-full w-full cursor-pointer object-cover"
                            />
                        </PhotoView>
                        {/* pointer-events-none ensures the Store icon doesn't block the user's click */}
                        <Store className="pointer-events-none absolute inset-0 m-auto h-8 w-8 text-orange-600/10 mix-blend-multiply" />
                    </div>

                    <div className="mb-2 text-center sm:text-left">
                        <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black tracking-tight sm:justify-start md:text-3xl">
                            {getLocalizedText(garage, 'name', currentLocale)}
                            {garage.is_verified === 1 && (
                                <CheckCircle2Icon className="h-6 w-6 rounded-full bg-blue-500 text-white" aria-label="Verified Garage" />
                            )}
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm font-medium">{getLocalizedText(garage, 'address', currentLocale)}</p>

                        {/* MAP LINK BUTTON ADDED HERE */}
                        <button
                            onClick={() => handleOpenMap(garage.latitude, garage.longitude)}
                            className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-[#FF6D00] transition-colors hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-500 dark:hover:bg-orange-500/20"
                        >
                            <MapPin className="h-3.5 w-3.5" />
                            {t('Open In Google Map')}
                        </button>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

// --- 4. Sub-Component: Contact Sidebar ---
const ContactSidebar: React.FC<any> = ({ garage }) => {
    const { t, currentLocale } = useTranslation() as any;

    const handleCallPhone = (phone: any) => {
        window.location.href = `tel:${phone}`;
    };

    const handleOpenMap = (lat?: any, lng?: any) => {
        if (lat && lng) {
            window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
        } else {
            alert(t('Location coordinates not available for this garage.'));
        }
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow">
            <div className="space-y-6">
                {garage.short_description && (
                    <section>
                        <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
                            {getLocalizedText(garage, 'short_description', currentLocale)}
                        </p>
                    </section>
                )}
                <section>
                    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                        <Phone className="h-4 w-4 text-[#FF6D00]" />
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('Contact')}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleCallPhone(garage.phone)}
                            className="group flex w-full cursor-pointer items-center justify-between bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                            <span className="text-base font-medium text-gray-900 dark:text-white">{garage.phone}</span>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                        </button>

                        {garage.other_phones?.map((phone: any, idx: any) => (
                            <button
                                key={idx}
                                onClick={() => handleCallPhone(phone)}
                                className="group flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                            >
                                <span className="text-base text-gray-600 dark:text-gray-400">{phone}</span>
                                <ChevronRightIcon className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 dark:text-gray-600" />
                            </button>
                        ))}
                    </div>
                </section>
                <section className="mb-8 lg:mb-0">
                    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                        <MapIcon className="h-4 w-4 text-[#FF6D00]" />
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('Location')}</h3>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 p-4 dark:bg-white/5">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {getLocalizedText(garage, 'address', currentLocale)}
                        </span>
                    </div>
                    <button
                        onClick={() => handleOpenMap(garage.latitude, garage.longitude)}
                        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border border-[#FF6D00] bg-[#FF6D00] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#FF6D00] focus-visible:outline-none dark:hover:bg-gray-950 dark:hover:text-[#FF6D00]"
                    >
                        <NavigationIcon className="h-4 w-4" />
                        {t('Open In Google Map')}
                    </button>
                </section>
            </div>
        </div>
    );
};

// --- 5. Sub-Component: Post Card Trigger ---
const PostCard: React.FC<any> = ({ post, onViewDetails }) => {
    const { t, currentLocale } = useTranslation() as any;

    const formattedDate = useMemo(() => {
        return new Date(post.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }, [post.created_at]);

    return (
        <div
            onClick={() => onViewDetails(post)}
            className="border-border bg-card group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:border-orange-500 hover:shadow-md"
            role="button"
            tabIndex={0}
            onKeyDown={(e: any) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewDetails(post);
                }
            }}
        >
            <div className="bg-muted relative aspect-video w-full overflow-hidden">
                <SafeImage
                    src={post.image_url}
                    alt={getLocalizedText(post, 'title', currentLocale)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                {post.total_images > 1 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <Camera className="h-3 w-3" />
                        {post.total_images}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-foreground mb-2 line-clamp-1 text-base leading-tight font-bold group-hover:text-orange-600">
                    {getLocalizedText(post, 'title', currentLocale)}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                    {getLocalizedText(post, 'short_description', currentLocale)}
                </p>
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-widest">
                        <Clock className="h-3 w-3" />
                        {formattedDate}
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 group-hover:underline">{t('View Details')}</span>
                </div>
            </div>
        </div>
    );
};

// --- 6. Sub-Component: Centralized Detail Modal Container ---
const DetailModal: React.FC<any> = ({ post, onClose }) => {
    const { t, currentLocale } = useTranslation() as any;
    const [activeImage, setActiveImage] = useState<any>('');

    useEffect(() => {
        if (post) {
            setActiveImage(post.image_url);
        }
    }, [post]);

    if (!post) return null;
    const galleryImages = post.images || [];

    return (
        <Dialog open={!!post} onOpenChange={(open: any) => !open && onClose()}>
            <DialogContent className="max-w-3xl border-none p-0 shadow-2xl sm:max-w-4xl sm:rounded-[2rem] [&>button]:hidden">
                <div className="bg-background flex max-h-[90vh] w-full flex-col overflow-y-auto [scrollbar-width:thin]">
                    {/* Floating Glass Close Button - Light Themed */}
                    <button
                        onClick={onClose}
                        className="bg-background/60 text-foreground hover:bg-background absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 sm:top-5 sm:right-5"
                        aria-label={t('Close modal')}
                    >
                        <XIcon className="h-5 w-5" />
                    </button>

                    {/* TOP STACK: High-End Light Image Viewer */}
                    <div className="bg-background flex w-full flex-col">
                        {/* Main Image Area */}
                        <div className="relative flex h-[300px] w-full items-center justify-center sm:h-[400px] md:h-[500px]">
                            <SafeImage
                                src={activeImage}
                                alt={getLocalizedText(post, 'title', currentLocale)}
                                className="h-full w-full object-cover drop-shadow-2xl"
                            />
                        </div>

                        {/* Thumbnail Strip (Lighter Background & Borders) */}
                        {galleryImages.length > 1 && (
                            <div className="flex h-24 shrink-0 items-center gap-3 overflow-x-auto overflow-y-hidden border-y p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {galleryImages.map((img: any) => {
                                    const isSelected = activeImage === img.url;
                                    return (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImage(img.url)}
                                            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm transition-all duration-300 ${
                                                isSelected
                                                    ? 'border-2 border-orange-500 opacity-100 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                                                    : 'border-2 border-transparent opacity-40 hover:scale-105 hover:opacity-100'
                                            }`}
                                            aria-label={t('View asset dynamic thumbnail')}
                                        >
                                            <SafeImage src={img.url} alt="Thumbnail preview" className="h-full w-full object-cover" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* BOTTOM STACK: Contextual Core Data */}
                    <div className="flex flex-col p-4 pb-10">
                        <div className="mx-auto w-full">
                            <DialogHeader className="mb-6 text-left">
                                <DialogTitle className="text-foreground text-lg leading-tight font-semibold tracking-tight sm:text-xl md:text-2xl">
                                    {getLocalizedText(post, 'title', currentLocale)}
                                </DialogTitle>
                            </DialogHeader>

                            {post.short_description && (
                                <DialogDescription className="text-muted-foreground/90 text-base leading-relaxed whitespace-pre-line sm:text-lg">
                                    {getLocalizedText(post, 'short_description', currentLocale)}
                                </DialogDescription>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- 7. Main Structural Scaffold ---
const Show: React.FC<any> = () => {
    const { t } = useTranslation() as any;
    const { tableData, garage } = usePage<any>().props;
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const posts = tableData?.data || [];

    return (
        <FrontPageLayout>
            <div className="section-container pb-20">
                <GarageHeader garage={garage} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <aside className="lg:col-span-1">
                        <ContactSidebar garage={garage} />
                    </aside>

                    <main className="lg:col-span-2">
                        <h2 className="text-foreground mb-6 text-lg font-semibold">{t('Recent Posts')}</h2>
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {posts.map((post: any) => (
                                    <PostCard key={post.id} post={post} onViewDetails={setSelectedPost} />
                                ))}
                            </div>
                        ) : (
                            <div className="border-border bg-muted/10 text-muted-foreground rounded-xl border border-dashed p-16 text-center">
                                <Store className="mx-auto mb-3 h-10 w-10 opacity-20" />
                                <p className="text-sm font-medium">{t('No posts posted yet.')}</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Rendered once globally down at the viewport root frame */}
            <DetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        </FrontPageLayout>
    );
};

export default Show;
