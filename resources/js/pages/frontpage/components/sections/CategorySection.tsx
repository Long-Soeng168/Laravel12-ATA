import useTranslation from '@/hooks/use-translation';
import { router, usePage } from '@inertiajs/react';
import { ChevronRight, Image as ImageIcon, LayersIcon, LayoutGridIcon, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// --- Shadcn Components ---
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SectionHeader } from '../headers/HeaderSection';

// --- Standard Category Item Grid Tile ---
interface CategoryItemProps {
    name: string;
    imageUrl?: string | null;
    onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, imageUrl, onClick }) => (
    <button onClick={onClick} className="group relative flex cursor-pointer flex-col items-center gap-1.5 outline-none">
        <div className="flex size-[45px] items-center justify-center overflow-hidden rounded-full bg-white transition-all hover:border-gray-500 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-1 sm:size-[60px] dark:border-gray-700 dark:hover:border-gray-400 dark:focus-visible:ring-gray-100">
            {imageUrl ? (
                <img src={imageUrl} alt={name} className="size-[40px] object-contain sm:size-[50px]" loading="lazy" />
            ) : (
                <ImageIcon className="h-6 w-6 text-gray-400 transition-colors group-hover:text-gray-600" />
            )}
        </div>
        <span className="line-clamp-2 text-center text-[13px] text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200">
            {name}
        </span>
    </button>
);

// --- See More Sheet (Navigation Variant) ---
interface SeeMoreSheetProps {
    title: string;
    items: any[];
    onSelect: (code: string) => void;
    getLocalizedName: (item: any) => string;
}

const SeeMoreSheet: React.FC<SeeMoreSheetProps> = ({ title, items, onSelect, getLocalizedName }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter((item) => {
            const nameEn = (item.name || '').toLowerCase();
            const nameKh = (item.name_kh || '').toLowerCase();
            return nameEn.includes(query) || nameKh.includes(query);
        });
    }, [items, searchQuery]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="group flex cursor-pointer flex-col items-center gap-1.5 outline-none">
                    <div className="relative flex size-[45px] items-center justify-center rounded-full border border-transparent bg-gray-200/80 transition-all hover:bg-gray-300/80 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-1 sm:size-[60px] dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-100">
                        <LayoutGridIcon className="size-[18px] text-gray-500 transition-colors group-hover:text-gray-700 sm:size-[24px] dark:text-gray-400 dark:group-hover:text-gray-200" />
                    </div>
                    <span className="text-center text-[13px] text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200">
                        {t('See More')}
                    </span>
                </button>
            </SheetTrigger>

            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left"
                className="flex flex-col gap-0 overflow-hidden rounded-none border-gray-200 bg-white p-0 sm:max-w-md dark:border-gray-800 dark:bg-gray-950"
            >
                <div className="border-b border-gray-200 p-4 pb-3 dark:border-gray-800">
                    <SheetHeader className="mb-3">
                        <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">{title}</SheetTitle>
                    </SheetHeader>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            autoFocus={false}
                            placeholder={`${t('Search')}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent pl-9 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div className="hide-scrollbar flex-1 overflow-y-auto">
                    <div className="flex flex-col pb-4">
                        {/* Option to view all products */}
                        <SheetClose asChild>
                            <button
                                onClick={() => onSelect('')}
                                className="flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                            >
                                <span>{t('All Products')}</span>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                        </SheetClose>

                        {filteredItems.map((item) => (
                            <SheetClose asChild key={item.id}>
                                <button
                                    onClick={() => onSelect(item.code)}
                                    className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-1.5 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="object-contain" loading="lazy" />
                                        ) : (
                                            <ImageIcon className="h-6 w-6 text-gray-400" />
                                        )}
                                    </div>
                                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{getLocalizedName(item)}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </button>
                            </SheetClose>
                        ))}
                        {filteredItems.length === 0 && (
                            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">{t('No items found.')}</div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// --- Main Component ---
export default function CategorySections() {
    const { t, currentLocale } = useTranslation();
    const { itemCategories = [] } = usePage<{ itemCategories: any[] }>().props;

    const getLocalizedName = (item: any) => {
        return currentLocale === 'kh' && item.name_kh ? item.name_kh : item.name;
    };

    // The handler to push to the product listing page
    const handleCategoryClick = (category_code: string) => {
        if (!category_code) {
            router.visit('/products');
        } else {
            router.visit(`/products?category_code=${category_code}`);
        }
    };

    if (!itemCategories || itemCategories.length === 0) return null;

    return (
        <section>
            <div>
                <SectionHeader icon={<LayersIcon className="size-5" />} title="Browse by Category" />

                <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                    {itemCategories.slice(0, 9).map((cat) => (
                        <CategoryItem
                            key={cat.id}
                            name={getLocalizedName(cat)}
                            imageUrl={cat.image_url}
                            onClick={() => handleCategoryClick(cat.code)}
                        />
                    ))}

                    {itemCategories.length > 9 && (
                        <SeeMoreSheet
                            title={t('All Categories')}
                            items={itemCategories}
                            onSelect={handleCategoryClick}
                            getLocalizedName={getLocalizedName}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
