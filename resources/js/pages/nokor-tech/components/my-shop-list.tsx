import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ChevronRight, Store } from 'lucide-react'; // Added an icon for fallback
import React from 'react';

interface ShopItem {
    id: number | string;
    logo?: string;
    name: string;
    name_kh?: string;
}

interface MyShopListProps {
    items: ShopItem[];
}

const MyShopList: React.FC<MyShopListProps> = ({ items }) => {
    const { t, currentLocale } = useTranslation();

    if (!items?.length) return null;

    return (
        <div className="w-full py-4">
            <div className="mb-2 flex items-center justify-between px-1">
                <Label className="text-foreground/90 text-lg font-bold tracking-tight">{t('Shops')}</Label>
                <Link href={`/shops`}>
                    <p className="text-md text-primary flex items-center gap-2 underline-offset-2 transition-all duration-300 hover:translate-x-2 hover:underline">
                        {t('See More')} <ChevronRight size={24} />
                    </p>
                </Link>
            </div>

            <ScrollArea className="w-full pb-4">
                <div className="flex gap-4 px-1 py-2">
                    {items.map((item) => {
                        const displayName = currentLocale === 'kh' && item.name_kh ? item.name_kh : item.name;

                        return (
                            <Link
                                key={item.id}
                                href={`/shops/${item.id}`}
                                prefetch
                                className="group relative flex w-[100px] flex-col items-center gap-3 sm:w-[120px]"
                            >
                                {/* Logo Container with Inner Shadow and Border Ring */}
                                <div className="from-background to-muted/30 group-hover:border-primary/50 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-b transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                                    {item.logo ? (
                                        <img
                                            src={`/assets/images/shops/thumb/${item.logo}`}
                                            alt={displayName}
                                            className="h-full w-full object-contain transition-transform duration-500"
                                        />
                                    ) : (
                                        <Store className="text-muted-foreground/40 size-8" />
                                    )}

                                    {/* Hover Overlay Gradient */}
                                    <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                {/* Text with improved legibility */}
                                <div className="space-y-1 px-1 text-center">
                                    <p className="text-foreground group-hover:text-primary line-clamp-2 text-[13px] font-semibold transition-colors sm:text-sm">
                                        {displayName}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" className="invisible group-hover:visible" />
            </ScrollArea>
        </div>
    );
};

export default MyShopList;
