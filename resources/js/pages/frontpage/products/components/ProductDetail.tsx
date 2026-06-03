import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { BadgeCheck, Box, Car, ChevronRight, Clock, Eye, Info, Layers3, MapPin, Phone, Store, Tag, TruckIcon, User } from 'lucide-react';
import ProductImages from './ProductImages'; // Adjust import path if needed

const getTimeAgo = (dateString: string, t: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' ' + t('years ago');
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' ' + t('months ago');
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' ' + t('days ago');
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' ' + t('hours ago');
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' ' + t('minutes ago');
    return Math.floor(seconds) + ' ' + t('seconds ago');
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const ProductDetail = () => {
    const { t, currentLocale } = useTranslation();
    const { itemShow } = usePage<any>().props;
    const isKh = currentLocale === 'kh';

    // --- Price Logic ---
    const originalPrice = parseFloat(itemShow?.price || '0');
    const discountValue = parseFloat(itemShow?.discount || '0');
    const discountType = itemShow?.discount_type || 'percentage';
    let finalPrice = originalPrice;

    if (discountValue > 0) {
        if (discountType === 'percentage') {
            finalPrice = originalPrice - originalPrice * (discountValue / 100);
        } else {
            finalPrice = originalPrice - discountValue;
        }
    }

    // --- Profile Logic (Shop vs User) ---
    const isShop = itemShow?.shop && itemShow.shop.status === 'approved';
    const profile = isShop ? itemShow.shop : itemShow.owner;
    const profileName = profile?.name || '';
    const profileImg = profile?.logo_url;
    const isVerified = profile?.is_verified === true || profile?.is_verified === 1;
    const address = profile?.address;

    // Extract Location
    const lat = profile?.latitude;
    const lng = profile?.longitude;
    const hasLocation = !!lat && !!lng;

    // Aggregate all phones into a single flat array
    const mainPhone = profile?.phone;
    const otherPhones = profile?.other_phones || [];
    const allPhones = [mainPhone, ...(Array.isArray(otherPhones) ? otherPhones : [])].filter(Boolean);

    // --- Breadcrumb Logic (Strict Hierarchy) ---
    const breadcrumbs = [
        { label: t('Home'), url: '/' },
        { label: t('Products'), url: '/products' },
    ];

    // Must have Category to show Category
    if (itemShow?.category) {
        breadcrumbs.push({
            label: isKh ? itemShow.category.name_kh || itemShow.category.name : itemShow.category.name,
            url: `/products?category_code=${itemShow.category.code}`,
        });

        // Must have Category AND Brand to show Brand
        if (itemShow?.brand) {
            breadcrumbs.push({
                label: isKh ? itemShow.brand.name_kh || itemShow.brand.name : itemShow.brand.name,
                url: `/products?category_code=${itemShow.category.code}&brand_code=${itemShow.brand.code}`,
            });

            // Must have Category AND Brand AND Model to show Model
            if (itemShow?.model) {
                breadcrumbs.push({
                    label: isKh ? itemShow.model.name_kh || itemShow.model.name : itemShow.model.name,
                    url: `/products?category_code=${itemShow.category.code}&brand_code=${itemShow.brand.code}&model_code=${itemShow.model.code}`,
                });
            }
        }
    }

    // Current Product Name (Always Last)
    breadcrumbs.push({
        label: isKh ? itemShow?.name_kh || itemShow?.name : itemShow?.name,
        url: '#',
    });

    return (
        <div>
            <nav aria-label="Breadcrumb" className="section-container flex items-center py-2 text-[13px] text-gray-500 dark:text-gray-400">
                <ol className="flex flex-wrap items-center gap-1.5">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-1.5">
                                {isLast ? (
                                    <span className="text-foreground line-clamp-1 max-w-[50ch] truncate font-medium">{crumb.label}</span>
                                ) : (
                                    <Link
                                        href={crumb.url}
                                        className="hover:text-foreground max-w-[30ch] truncate transition-colors focus-visible:outline-none"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                                {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <div className="bg-background relative min-h-screen pb-12">
                {/* Gradient Top Border Highlight */}
                <div className="absolute top-0 left-1/2 h-[1.5px] w-full max-w-screen-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6D00]/60 to-transparent"></div>

                {/* Top Center Radial Mesh Glow */}
                <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-full bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(255,109,0,0.08),transparent)]"></div>
                {/* Breadcrumb Navigation */}

                <div className="section-container relative z-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                        {/* LEFT COLUMN: Main Product Details */}
                        <div className="min-w-0 flex-1 space-y-6">
                            <div>
                                <h1 className="text-foreground my-4 mt-6 text-2xl font-bold md:text-3xl">
                                    {isKh ? itemShow?.name_kh || itemShow?.name : itemShow?.name}
                                </h1>

                                <div className="mb-4 flex flex-wrap items-end gap-3">
                                    <span className="text-primary text-2xl font-bold md:text-3xl">{formatCurrency(finalPrice)}</span>
                                    {discountValue > 0 && (
                                        <span className="text-muted-foreground mb-1 text-lg font-medium line-through">
                                            {formatCurrency(originalPrice)}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-between gap-4">
                                    {(discountValue > 0 || itemShow?.is_free_delivery == 1) && (
                                        <div className="flex flex-wrap gap-2">
                                            {discountValue > 0 && (
                                                <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-500 ring-1 ring-red-500/20">
                                                    <Tag className="h-3.5 w-3.5" />
                                                    {discountType == 'percentage'
                                                        ? `${Math.floor(discountValue)}% OFF`
                                                        : `$${Math.floor(discountValue)} OFF`}
                                                </span>
                                            )}
                                            {itemShow?.is_free_delivery == 1 && (
                                                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                                                    <TruckIcon className="h-3.5 w-3.5" />
                                                    {t('Free Delivery')}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Eye className="h-4 w-4 text-[#FF6D00]/80" />
                                            <span>
                                                {itemShow?.total_view_counts || 0} {t('views')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-[#FF6D00]/80" />
                                            <span>{getTimeAgo(itemShow?.created_at, t)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Extracted React-Photo-View Component */}
                            <ProductImages images={itemShow?.images || []} name={isKh ? itemShow?.name_kh || itemShow?.name : itemShow?.name} />

                            {/* Specifications Grid */}
                            <div className="bg-background rounded-xl p-6 shadow-md dark:bg-white/[0.02]">
                                <div className="border-border/50 mb-5 flex items-center gap-2 border-b pb-3">
                                    <Layers3 className="h-5 w-5 text-[#FF6D00]" />
                                    <h2 className="text-foreground text-lg font-semibold">{t('Specifications')}</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                    {itemShow?.code && (
                                        <div className="group flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6D00]/5 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[#FF6D00] dark:bg-[#FF6D00]/10">
                                                <Box className="h-4 w-4 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs font-medium">{t('Code')}</p>
                                                <p className="text-foreground mt-0.5 text-sm font-medium">{itemShow.code}</p>
                                            </div>
                                        </div>
                                    )}
                                    {itemShow?.category && (
                                        <div className="group flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6D00]/5 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[#FF6D00] dark:bg-[#FF6D00]/10">
                                                <Layers3 className="h-4 w-4 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs font-medium">{t('Category')}</p>
                                                <Link
                                                    href={`/products?category_code=${itemShow.category.code}`}
                                                    className="mt-0.5 inline-block text-sm font-medium text-[#FF6D00] hover:underline"
                                                >
                                                    {isKh ? itemShow.category.name_kh || itemShow.category.name : itemShow.category.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    {itemShow?.brand && (
                                        <div className="group flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6D00]/5 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[#FF6D00] dark:bg-[#FF6D00]/10">
                                                <Tag className="h-4 w-4 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs font-medium">{t('Brand')}</p>
                                                <Link
                                                    href={`/products?${itemShow.category ? `category_code=${itemShow.category.code}&` : ''}brand_code=${itemShow.brand.code}`}
                                                    className="mt-0.5 inline-block text-sm font-medium text-[#FF6D00] hover:underline"
                                                >
                                                    {isKh ? itemShow.brand.name_kh || itemShow.brand.name : itemShow.brand.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    {itemShow?.model && (
                                        <div className="group flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6D00]/5 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[#FF6D00] dark:bg-[#FF6D00]/10">
                                                <Car className="h-4 w-4 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs font-medium">{t('Model')}</p>
                                                <Link
                                                    href={`/products?${itemShow.category ? `category_code=${itemShow.category.code}&` : ''}${itemShow.brand ? `brand_code=${itemShow.brand.code}&` : ''}model_code=${itemShow.model.code}`}
                                                    className="mt-0.5 inline-block text-sm font-medium text-[#FF6D00] hover:underline"
                                                >
                                                    {isKh ? itemShow.model.name_kh || itemShow.model.name : itemShow.model.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dynamic Attributes Map */}
                                    {itemShow?.display_attributes &&
                                        Object.entries(itemShow.display_attributes).map(([key, attr]: [string, any]) => {
                                            if (!attr.value) return null;
                                            const attrLabel = isKh ? attr.label_kh || attr.label : attr.label;
                                            const attrValue = isKh
                                                ? attr.value_label_kh || attr.value_label_en || attr.value
                                                : attr.value_label_en || attr.value;

                                            return (
                                                <div key={key} className="group flex items-start gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6D00]/5 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[#FF6D00] dark:bg-[#FF6D00]/10">
                                                        <Info className="h-4 w-4 text-[#FF6D00]/70 transition-all group-hover:text-[#FF6D00]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground text-xs font-medium">{attrLabel}</p>
                                                        <p className="text-foreground mt-0.5 text-sm font-medium">{String(attrValue)}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="bg-background rounded-xl p-6 shadow-md dark:bg-white/[0.02]">
                                <h2 className="text-foreground mb-4 text-lg font-semibold">{t('Details')}</h2>
                                {itemShow?.short_description ? (
                                    <div
                                        className="text-muted-foreground text-sm whitespace-pre-line md:text-base"
                                        dangerouslySetInnerHTML={{ __html: itemShow.short_description }}
                                    />
                                ) : (
                                    <p className="text-muted-foreground text-sm italic">{t('No description available.')}</p>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sticky Shop Card */}
                        {profileName && (
                            <div className="w-full shrink-0 pt-8 lg:sticky lg:top-4 lg:w-[340px]">
                                <div className="group bg-background relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:ring-2 hover:shadow-[#FF6D00]/15 hover:ring-[#FF6D00] dark:bg-white/[0.02]">
                                    {/* Inner Glow Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6D00]/0 to-[#FF6D00]/0 transition-colors group-hover:from-[#FF6D00]/5 group-hover:to-transparent"></div>

                                    <div className="relative p-6">
                                        <h3 className="text-muted-foreground mb-5 text-sm font-semibold">{t('Seller Information')}</h3>
                                        <Link href={isShop ? `/shops/${profile.id}` : `/users/${profile.id}`}>
                                            <div className="mb-5 flex flex-col items-center text-center">
                                                <div className="dark:ring-background mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-50 shadow-sm ring-4 ring-white dark:bg-white/10">
                                                    {profileImg ? (
                                                        <img
                                                            src={profileImg}
                                                            alt={profileName}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <Store className="h-8 w-8 text-gray-400" />
                                                    )}
                                                </div>

                                                <div className="mb-1.5 flex items-center justify-center gap-1.5">
                                                    <h4 className="text-foreground text-lg font-bold">{profileName}</h4>
                                                    {isVerified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                                                </div>

                                                <div className="flex justify-center">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isShop ? 'bg-[#FF6D00]/10 text-[#FF6D00]' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'}`}
                                                    >
                                                        {isShop ? <Store className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                                                        {isShop ? t('Shop') : t('User')}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        {(allPhones.length > 0 || address) && (
                                            <div className="mb-6 space-y-3">
                                                {allPhones.length > 0 && (
                                                    <div className="border-border/50 flex flex-col gap-1.5 rounded-sm border bg-gray-50/50 p-3 dark:bg-white/[0.02]">
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-[#FF6D00]" />
                                                            <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                                                                {t('Contact')}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                                                            {allPhones.map((p, index) => (
                                                                <a
                                                                    key={index}
                                                                    href={`tel:${p}`}
                                                                    className="text-foreground text-sm font-medium transition-colors hover:text-[#FF6D00]"
                                                                >
                                                                    {p}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {address && (
                                                    <div className="border-border/50 flex flex-col gap-1.5 rounded-sm border bg-gray-50/50 p-3 dark:bg-white/[0.02]">
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 text-[#FF6D00]" />
                                                            <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                                                                {t('Address')}
                                                            </span>
                                                        </div>
                                                        <span className="text-foreground text-sm leading-relaxed font-medium">{address}</span>
                                                        {hasLocation && (
                                                            <a
                                                                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="group mt-1.5 inline-flex w-fit items-center gap-1 border-b border-[#FF6D00]/40 pb-0.5 text-[13px] font-bold tracking-wide text-[#FF6D00] transition-colors hover:border-[#FF6D00]"
                                                            >
                                                                {t('Open on Google Map')}
                                                                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <Link
                                            href={isShop ? `/shops/${profile.id}` : `/users/${profile.id}`}
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md"
                                        >
                                            {isShop ? t('View Shop Profile') : t('View User Profile')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
