import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useTranslation from '@/hooks/use-translation';
import { Check, ChevronDown, Image as ImageIcon, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// --- Types needed from the parent ---
interface BrandItem {
    id: number;
    name: string;
    name_kh: string;
    code: string;
    image_url?: string;
    brand_models?: any[];
}

interface BrandFilterSectionProps {
    displayedBrands: BrandItem[];
    activeBrand?: BrandItem;
    brandModels: any[];
    filters: Record<string, string>;
    updateFilter: (key: string, value: string) => void;
    getLocalizedName: (item: any) => string;
    CategoryItemComponent: React.FC<any>; // Passing the UI component for grid items
    SeeMoreSheetComponent: React.FC<any>; // Passing the UI component for the "See More" sheet
    checkHiddenActive: (items: any[], activeCode: string, displayLimit: number) => boolean;
    maxBrandItems: number;
    maxModelItems: number;
}

export default function BrandFilterSection({
    displayedBrands,
    activeBrand,
    brandModels,
    filters,
    updateFilter,
    getLocalizedName,
    CategoryItemComponent,
    SeeMoreSheetComponent,
    checkHiddenActive,
    maxBrandItems,
    maxModelItems,
}: BrandFilterSectionProps) {
    const { t } = useTranslation();
    const [brandSearchQuery, setBrandSearchQuery] = useState('');

    const filteredBrands = useMemo(() => {
        if (!brandSearchQuery.trim()) return displayedBrands;
        const query = brandSearchQuery.toLowerCase();
        return displayedBrands.filter((brand) => {
            const nameEn = (brand.name || '').toLowerCase();
            const nameKh = (brand.name_kh || '').toLowerCase();
            return nameEn.includes(query) || nameKh.includes(query);
        });
    }, [displayedBrands, brandSearchQuery]);

    if (displayedBrands.length === 0) return null;

    return (
        <section>
            {activeBrand && brandModels.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex w-max cursor-pointer items-center gap-2 rounded-sm border border-transparent bg-gray-50 p-1.5 transition-colors hover:border-gray-200 focus-visible:outline-none dark:bg-white/5 dark:hover:border-gray-700">
                                <div className="flex size-7 items-center justify-center overflow-hidden rounded-full bg-white">
                                    {activeBrand.image_url ? (
                                        <img src={activeBrand.image_url} alt={activeBrand.name} className="size-6 object-contain" />
                                    ) : (
                                        <ImageIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{getLocalizedName(activeBrand)}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            side="left"
                            className="flex flex-col gap-0 overflow-hidden rounded-none border-gray-200 bg-white p-0 sm:max-w-md dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="border-b border-gray-200 p-4 pb-3 dark:border-gray-800">
                                <SheetHeader className="mb-0 px-0">
                                    <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">
                                        {t('Popular Brands')}
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder={`${t('Search')}...`}
                                        value={brandSearchQuery}
                                        onChange={(e) => setBrandSearchQuery(e.target.value)}
                                        className="h-9 rounded-none border-gray-300 bg-transparent pl-9 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                            <div className="hide-scrollbar flex-1 overflow-y-auto">
                                <div className="flex flex-col pb-4">
                                    <SheetClose asChild>
                                        <button
                                            onClick={() => {
                                                updateFilter('brand_code', '');
                                                setBrandSearchQuery('');
                                            }}
                                            className="flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                        >
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('All Brands')}</span>
                                        </button>
                                    </SheetClose>
                                    {filteredBrands.map((brand) => (
                                        <SheetClose asChild key={brand.id}>
                                            <button
                                                onClick={() => updateFilter('brand_code', brand.code)}
                                                className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-1.5 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 ${
                                                    activeBrand.code === brand.code ? 'bg-gray-50 dark:bg-gray-900' : ''
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ${
                                                        activeBrand.code === brand.code
                                                            ? 'border-gray-900 dark:border-gray-100'
                                                            : 'border-gray-200 dark:border-gray-700'
                                                    }`}
                                                >
                                                    {brand.image_url ? (
                                                        <img src={brand.image_url} className="object-contain" />
                                                    ) : (
                                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                                <span
                                                    className={`flex-1 text-sm ${
                                                        activeBrand.code === brand.code
                                                            ? 'font-medium text-gray-900 dark:text-gray-100'
                                                            : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {getLocalizedName(brand)}
                                                </span>
                                                {activeBrand.code === brand.code && <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />}
                                            </button>
                                        </SheetClose>
                                    ))}
                                    {filteredBrands.length === 0 && (
                                        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">{t('No items found.')}</div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                        {brandModels.slice(0, maxModelItems - 1).map((model: any) => (
                            <CategoryItemComponent
                                key={model.id}
                                name={getLocalizedName(model)}
                                imageUrl={model.image_url}
                                isActive={filters.model_code === model.code}
                                onClick={() => updateFilter('model_code', filters.model_code === model.code ? '' : model.code)}
                            />
                        ))}
                        {brandModels.length >= maxModelItems && (
                            <SeeMoreSheetComponent
                                title={t('Models')}
                                items={brandModels}
                                activeCode={filters.model_code || ''}
                                onSelect={(code: string) => updateFilter('model_code', code)}
                                getLocalizedName={getLocalizedName}
                                hasHiddenActiveFilter={checkHiddenActive(brandModels, filters.model_code || '', maxModelItems)}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">{t('Popular Brands')}</h2>
                    <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                        {displayedBrands.slice(0, maxBrandItems - 1).map((brand) => (
                            <CategoryItemComponent
                                key={brand.id}
                                name={getLocalizedName(brand)}
                                imageUrl={brand.image_url}
                                isActive={filters.brand_code === brand.code}
                                onClick={() => updateFilter('brand_code', filters.brand_code === brand.code ? '' : brand.code)}
                            />
                        ))}
                        {displayedBrands.length >= maxBrandItems && (
                            <SeeMoreSheetComponent
                                title={t('Popular Brands')}
                                items={displayedBrands}
                                activeCode={filters.brand_code || ''}
                                onSelect={(code: string) => updateFilter('brand_code', code)}
                                getLocalizedName={getLocalizedName}
                                hasHiddenActiveFilter={checkHiddenActive(displayedBrands, filters.brand_code || '', maxBrandItems)}
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}
