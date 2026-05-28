import useTranslation from '@/hooks/use-translation';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowDownUp,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRightIcon,
    Image as ImageIcon,
    Layers3Icon,
    LayoutGridIcon,
    MapPin,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// --- Shadcn Components ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import HeaderSearchInput from '../../layouts/components/HeaderSearchInput';

// --- Standard Select Filter (For select/radio <= 5 Options) ---

interface SelectFilterProps {
    icon?: React.ReactNode;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const SelectFilter: React.FC<SelectFilterProps> = ({ icon, label, value, onChange, options }) => {
    return (
        <div
            className={`relative flex shrink-0 items-center rounded-none border transition-colors focus-within:border-gray-900 hover:border-gray-500 dark:focus-within:border-gray-100 dark:hover:border-gray-400 ${
                value
                    ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                    : 'border-gray-300 bg-white/90 text-gray-700 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300'
            }`}
        >
            {icon && (
                <div
                    className={`pointer-events-none absolute left-2.5 flex items-center ${value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    {icon}
                </div>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full cursor-pointer appearance-none bg-transparent py-1.5 pr-8 text-sm font-medium outline-none ${icon ? 'pl-8' : 'pl-3'}`}
            >
                <option value="" className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                    {label}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                className={`pointer-events-none absolute right-2 h-3.5 w-3.5 ${value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400'}`}
            />
        </div>
    );
};

// --- Sheet List Select (For Location & select/radio > 5 Options) ---

interface ListSelectSheetProps {
    icon?: React.ReactNode;
    title: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const ListSelectSheet: React.FC<ListSelectSheetProps> = ({ icon, title, value, onChange, options }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption ? selectedOption.label : title;

    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) return options;
        const query = searchQuery.toLowerCase();
        return options.filter((opt) => opt.label.toLowerCase().includes(query));
    }, [options, searchQuery]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className={`flex shrink-0 items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:outline-none dark:focus-visible:ring-gray-100 ${
                        value
                            ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                            : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-white/5'
                    }`}
                >
                    {icon && <span className={value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}>{icon}</span>}
                    <span>{displayLabel}</span>
                    <ChevronDown className={`h-3.5 w-3.5 ${value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400'}`} />
                </button>
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left"
                className="flex flex-col gap-0 overflow-hidden rounded-none border-gray-200 bg-white p-0 sm:max-w-sm dark:border-gray-800 dark:bg-gray-950"
            >
                <div className="border-b border-gray-200 p-4 pb-3 dark:border-gray-800">
                    <SheetHeader className="mb-0 px-0">
                        <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">{title}</SheetTitle>
                    </SheetHeader>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder={`${t('Search')}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent pl-9 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div className="hide-scrollbar flex-1 overflow-y-auto">
                    <div className="flex flex-col">
                        <SheetClose asChild>
                            <button
                                onClick={() => onChange('')}
                                className={`flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 ${
                                    !value
                                        ? 'bg-gray-50 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <span>{t('All')}</span>
                                {!value && <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />}
                            </button>
                        </SheetClose>
                        {filteredOptions.map((opt) => {
                            const isActive = value === opt.value;
                            return (
                                <SheetClose asChild key={opt.value}>
                                    <button
                                        onClick={() => onChange(isActive ? '' : opt.value)}
                                        className={`flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 ${
                                            isActive
                                                ? 'bg-gray-50 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <span>{opt.label}</span>
                                        {isActive && <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />}
                                    </button>
                                </SheetClose>
                            );
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// --- Text/Number/Textarea Filter Sheet ---

interface TextFilterSheetProps {
    title: string;
    value: string;
    type: 'text' | 'number' | 'textarea';
    onChange: (value: string) => void;
}

const TextFilterSheet: React.FC<TextFilterSheetProps> = ({ title, value, type, onChange }) => {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className={`flex shrink-0 items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:outline-none dark:focus-visible:ring-gray-100 ${
                        value
                            ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                            : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-white/5'
                    }`}
                >
                    <span>{value ? `${title}: ${value}` : title}</span>
                    <ChevronDown className={`h-3.5 w-3.5 ${value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400'}`} />
                </button>
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left"
                className="flex flex-col gap-4 rounded-none border-gray-200 bg-white p-4 sm:max-w-md dark:border-gray-800 dark:bg-gray-950"
            >
                <SheetHeader>
                    <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">{title}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="text-filter" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {t('Enter Value')}
                    </Label>
                    {type === 'textarea' ? (
                        <Textarea
                            id="text-filter"
                            placeholder={`${t('Type here')}...`}
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            className="min-h-[100px] rounded-none border-gray-300 bg-transparent text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    ) : (
                        <Input
                            id="text-filter"
                            type={type}
                            placeholder={`${t('Type here')}...`}
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    )}
                </div>

                <SheetFooter className="mt-auto flex-col gap-2 sm:flex-col sm:justify-end">
                    <SheetClose asChild>
                        <Button
                            className="h-9 w-full rounded-none font-medium text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                            onClick={() => onChange(localValue)}
                        >
                            {t('Apply Filter')}
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            className="h-9 w-full rounded-none border-gray-300 bg-transparent font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                            onClick={() => {
                                setLocalValue('');
                                onChange('');
                            }}
                        >
                            {t('Clear')}
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

// --- Price Filter Sheet ---

interface PriceFilterSheetProps {
    min: string;
    max: string;
    onChange: (min: string, max: string) => void;
}

const PriceFilterSheet: React.FC<PriceFilterSheetProps> = ({ min, max, onChange }) => {
    const { t } = useTranslation();
    const [localMin, setLocalMin] = useState(min);
    const [localMax, setLocalMax] = useState(max);

    useEffect(() => {
        setLocalMin(min);
        setLocalMax(max);
    }, [min, max]);

    const hasActivePrice = min !== '' || max !== '';
    let priceLabel = t('Price');
    if (min && max) priceLabel = `$${min} - $${max}`;
    else if (min) priceLabel = `> $${min}`;
    else if (max) priceLabel = `< $${max}`;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className={`flex shrink-0 items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-1 focus-visible:outline-none dark:focus-visible:ring-gray-100 ${
                        hasActivePrice
                            ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                            : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-white/5'
                    }`}
                >
                    <span>{priceLabel}</span>
                    <ChevronDown className={`h-3.5 w-3.5 ${hasActivePrice ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400'}`} />
                </button>
            </SheetTrigger>
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left"
                className="flex flex-col gap-4 rounded-none border-gray-200 bg-white p-4 sm:max-w-md dark:border-gray-800 dark:bg-gray-950"
            >
                <SheetHeader>
                    <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">{t('Price Range')}</SheetTitle>
                </SheetHeader>

                <div className="flex items-center gap-3 py-2">
                    <div className="grid flex-1 gap-1.5">
                        <Label htmlFor="min-price" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {t('Min')}
                        </Label>
                        <Input
                            id="min-price"
                            type="number"
                            placeholder="0"
                            value={localMin}
                            onChange={(e) => setLocalMin(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    </div>
                    <div className="pt-5 text-gray-400 dark:text-gray-500">-</div>
                    <div className="grid flex-1 gap-1.5">
                        <Label htmlFor="max-price" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {t('Max')}
                        </Label>
                        <Input
                            id="max-price"
                            type="number"
                            placeholder={t('Any')}
                            value={localMax}
                            onChange={(e) => setLocalMax(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>

                <SheetFooter className="mt-auto flex-col gap-2 sm:flex-col sm:justify-end">
                    <SheetClose asChild>
                        <Button
                            className="h-9 w-full rounded-none font-medium text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                            onClick={() => onChange(localMin, localMax)}
                        >
                            {t('Apply Filter')}
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            className="h-9 w-full rounded-none border-gray-300 bg-transparent font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                            onClick={() => {
                                setLocalMin('');
                                setLocalMax('');
                                onChange('', '');
                            }}
                        >
                            {t('Clear')}
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

// --- See More Sheet (1 Col Layout) ---

interface SeeMoreSheetProps {
    title: string;
    items: any[];
    activeCode: string;
    onSelect: (code: string) => void;
    getLocalizedName: (item: any) => string;
    hasHiddenActiveFilter?: boolean;
}

const SeeMoreSheet: React.FC<SeeMoreSheetProps> = ({ title, items, activeCode, onSelect, getLocalizedName, hasHiddenActiveFilter = false }) => {
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
                    <div
                        className={`relative flex size-[45px] items-center justify-center rounded-full border border-transparent transition-all focus-visible:ring-1 focus-visible:ring-offset-1 sm:size-[60px] ${
                            hasHiddenActiveFilter
                                ? 'bg-blue-50 ring ring-blue-500 dark:bg-blue-950/40 dark:ring-blue-400'
                                : 'bg-gray-200/80 hover:bg-gray-300/80 dark:bg-gray-800 dark:hover:bg-gray-700'
                        } focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100`}
                    >
                        <LayoutGridIcon
                            className={`size-[18px] transition-colors sm:size-[24px] ${
                                hasHiddenActiveFilter
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'
                            }`}
                        />
                        {hasHiddenActiveFilter && (
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 animate-pulse rounded-full bg-red-500 dark:bg-red-400" />
                        )}
                    </div>
                    <span
                        className={`text-center text-[13px] transition-colors ${
                            hasHiddenActiveFilter
                                ? 'font-medium text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200'
                        }`}
                    >
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
                    <SheetHeader className="mb-0 px-0">
                        <SheetTitle className="text-left text-base font-medium text-gray-900 dark:text-gray-100">{title}</SheetTitle>
                    </SheetHeader>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder={`${t('Search')}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 rounded-none border-gray-300 bg-transparent pl-9 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div className="hide-scrollbar flex-1 overflow-y-auto">
                    <div className="flex flex-col pb-4">
                        <SheetClose asChild>
                            <button
                                onClick={() => onSelect('')}
                                className={`flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 ${
                                    !activeCode
                                        ? 'bg-gray-50 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <span>
                                    {t(`All ${title}`)} {}
                                </span>
                                {!activeCode && <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />}
                            </button>
                        </SheetClose>

                        {filteredItems.map((item) => {
                            const isActive = activeCode === item.code;
                            return (
                                <SheetClose asChild key={item.id}>
                                    <button
                                        onClick={() => onSelect(isActive ? '' : item.code)}
                                        className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-1.5 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 ${
                                            isActive ? 'bg-gray-50 dark:bg-gray-900' : ''
                                        }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1`}
                                        >
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="object-contain" loading="lazy" />
                                            ) : (
                                                <ImageIcon className="h-6 w-6 text-gray-400" />
                                            )}
                                        </div>
                                        <span
                                            className={`flex-1 text-sm ${isActive ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}
                                        >
                                            {getLocalizedName(item)}
                                        </span>
                                        {isActive && <Check className="size-5 text-gray-900 dark:text-gray-100" />}
                                    </button>
                                </SheetClose>
                            );
                        })}
                        {filteredItems.length === 0 && (
                            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">{t('No items found.')}</div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// --- Standard Category Item Grid Tile ---

interface CategoryItemProps {
    name: string;
    imageUrl?: string | null;
    isActive?: boolean;
    onClick?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, imageUrl, isActive, onClick }) => (
    <button onClick={onClick} className="group relative flex cursor-pointer flex-col items-center gap-1.5 outline-none">
        <div
            className={`flex size-[45px] items-center justify-center overflow-hidden rounded-full bg-white transition-all focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-1 sm:size-[60px] dark:focus-visible:ring-gray-100 ${
                isActive
                    ? 'border-gray-900 dark:border-gray-100'
                    : 'border-gray-300 hover:border-gray-500 dark:border-gray-700 dark:hover:border-gray-400'
            }`}
        >
            {imageUrl ? (
                <img src={imageUrl} alt={name} className="size-[40px] object-contain sm:size-[50px]" loading="lazy" />
            ) : (
                <ImageIcon className="h-6 w-6 text-gray-400 transition-colors group-hover:text-gray-600" />
            )}
        </div>
        <span
            className={`line-clamp-2 text-center text-[13px] transition-colors ${
                isActive
                    ? 'font-medium text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200'
            }`}
        >
            {name}
        </span>
        {isActive && <CheckCircle2 className="absolute top-0 right-5 size-5 rounded-full bg-blue-500 text-white" />}
    </button>
);

// --- Main Layout ---

interface InertiaProps {
    form_data: {
        itemCategories?: any[];
        itemBrands?: any[];
        itemBodyTypes?: any[];
        provinces?: any[];
    };
    [key: string]: any;
}

export default function ProductListingHeader() {
    const { props, url } = usePage<InertiaProps>();
    const { form_data, selectedCategory } = props;
    const { t, currentLocale } = useTranslation();

    const MAX_BRAND_ITEMS = 10;
    const MAX_MODEL_ITEMS = 10;

    const [filters, setFilters] = useState<Record<string, string>>(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const initial: Record<string, string> = {};
        searchParams.forEach((val, key) => {
            initial[key] = val;
        });
        return initial;
    });

    const [brandSearchQuery, setBrandSearchQuery] = useState('');

    // --- Added: Synchronize filters when URL changes dynamically via Inertia ---
    useEffect(() => {
        const searchParams = new URLSearchParams((url || '').split('?')[1] || '');
        const updatedFilters: Record<string, string> = {};
        searchParams.forEach((val, key) => {
            updatedFilters[key] = val;
        });
        setFilters(updatedFilters);
    }, [url]);

    const categories = form_data?.itemCategories || [];
    const allBrands = form_data?.itemBrands || [];
    const allBodyTypes = form_data?.itemBodyTypes || [];
    const provinces = form_data?.provinces || [];

    const getLocalizedName = (item: any) => {
        return currentLocale === 'kh' && item.name_kh ? item.name_kh : item.name;
    };

    // --- Dynamic Filtering Logic ---
    const activeCategory = categories.find((c) => c.code === filters.category_code);
    const dynamicFields = activeCategory?.fields || [];

    const displayedBrands = activeCategory ? allBrands.filter((brand) => (activeCategory.brand_ids || []).includes(brand.id)) : allBrands;

    const filteredBrands = useMemo(() => {
        if (!brandSearchQuery.trim()) return displayedBrands;
        const query = brandSearchQuery.toLowerCase();
        return displayedBrands.filter((brand) => {
            const nameEn = (brand.name || '').toLowerCase();
            const nameKh = (brand.name_kh || '').toLowerCase();
            return nameEn.includes(query) || nameKh.includes(query);
        });
    }, [displayedBrands, brandSearchQuery]);

    const activeBrand = displayedBrands.find((b) => b.code === filters.brand_code);
    const brandModels = activeBrand?.brand_models || [];

    const hasBodyType = activeCategory ? activeCategory.has_body_type === 1 : true;

    const provinceOptions = provinces.sort((a, b) => a.order_index - b.order_index).map((p) => ({ value: p.code, label: getLocalizedName(p) }));

    const sortOptions = [
        { value: 'latest', label: t('Latest') },
        { value: 'price_low_to_high', label: t('Price: Low to High') },
        { value: 'price_high_to_low', label: t('Price: High to Low') },
    ];

    const updateFilter = (key: string, value: string) => {
        const newFilters = { ...filters };

        if (value === '') {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }

        if (key === 'category_code') {
            const keysToKeep = ['province_code', 'sort', 'min_price', 'max_price', 'category_code', 'q'];
            Object.keys(newFilters).forEach((k) => {
                if (!keysToKeep.includes(k)) delete newFilters[k];
            });
        }

        if (key === 'brand_code') {
            delete newFilters['model_code'];
        }

        if (key === 'model_code') {
            delete newFilters['body_type_code'];
        }

        setFilters(newFilters);
        router.get(window.location.pathname, newFilters, { preserveState: true, replace: true });
    };

    const updatePriceFilter = (min: string, max: string) => {
        const newFilters = { ...filters };
        if (min) newFilters.min_price = min;
        else delete newFilters.min_price;
        if (max) newFilters.max_price = max;
        else delete newFilters.max_price;

        setFilters(newFilters);
        router.get(window.location.pathname, newFilters, { preserveState: true, replace: true });
    };

    const clearFilters = () => {
        setFilters({});
        router.get(window.location.pathname, {}, { preserveState: true, replace: true });
    };

    const hasActiveFilters = Object.keys(filters).length > 0;
    const hideScrollbar = '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

    const checkHiddenActive = (items: any[], activeCode: string, displayLimit: number) => {
        if (!activeCode || items.length <= displayLimit) return false;
        const visibleItems = items.slice(0, displayLimit - 1);
        return !visibleItems.some((i) => i.code === activeCode);
    };

    const showCategories = categories.length > 0 && !selectedCategory;
    const showBrands = displayedBrands.length > 0 && !!selectedCategory;
    const showBodyTypes = hasBodyType && allBodyTypes.length > 0 && displayedBrands.length > 0 && !!selectedCategory && !filters.model_code;
    const hasContentToShow = showCategories || showBrands || showBodyTypes;

    // --- ADDED: Breadcrumb Logic ---
    const activeModel = activeBrand?.brand_models?.find((m: any) => m.code === filters.model_code);

    const breadcrumbs = [
        { label: t('Home'), action: () => router.get('/') },
        { label: t('Products'), action: clearFilters },
    ];

    if (activeCategory) {
        breadcrumbs.push({
            label: getLocalizedName(activeCategory),
            action: () => updateFilter('category_code', activeCategory.code),
        });
    }

    if (activeBrand) {
        breadcrumbs.push({
            label: getLocalizedName(activeBrand),
            action: () => updateFilter('brand_code', activeBrand.code),
        });
    }

    if (activeModel) {
        breadcrumbs.push({
            label: getLocalizedName(activeModel),
            action: () => updateFilter('model_code', activeModel.code),
        });
    }
    // --------------------------------

    return (
        <div>
            <header className="section-container">
                {/* --- ADDED: Breadcrumb UI --- */}
                <nav aria-label="Breadcrumb" className="mb-2 flex items-center text-[13px] text-gray-500 dark:text-gray-400">
                    <ol className="flex flex-wrap items-center gap-1.5">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <li key={index} className="flex items-center gap-1.5">
                                    <button
                                        onClick={crumb.action}
                                        disabled={isLast}
                                        className={`transition-colors hover:text-gray-900 focus-visible:outline-none dark:hover:text-gray-100 ${
                                            isLast ? 'pointer-events-none font-medium text-gray-900 dark:text-gray-100' : 'cursor-pointer'
                                        }`}
                                    >
                                        {crumb.label}
                                    </button>
                                    {!isLast && <ChevronRightIcon className="h-3.5 w-3.5 shrink-0" />}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
                <div className="mb-2 md:hidden">
                    <HeaderSearchInput showCategories={false} />
                </div>
                {/* ----------------------------- */}
                <div className="bg-white p-4 shadow dark:bg-white/5">
                    <div className="mb-3 flex items-center justify-between">
                        {/* --- Dynamic Main Title Area --- */}
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
                                {activeCategory?.image_url ? (
                                    <img
                                        src={activeCategory.image_url}
                                        alt={getLocalizedName(activeCategory)}
                                        className="h-full w-full bg-white object-contain p-1"
                                    />
                                ) : (
                                    <Layers3Icon className="h-4 w-4" />
                                )}
                            </div>
                            <h1 className="text-base font-medium text-gray-900 dark:text-gray-100">
                                {activeCategory ? getLocalizedName(activeCategory) : t('All Products')}
                            </h1>
                        </div>
                        {/* ----------------------------- */}

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="group flex cursor-pointer items-center gap-1 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none dark:bg-red-600/30 dark:text-white dark:hover:bg-red-600 dark:hover:text-white"
                            >
                                <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                                <span>{t('Clear Filters')}</span>
                            </button>
                        )}
                    </div>

                    <nav className={`flex gap-1.5 overflow-x-auto pb-1 ${hideScrollbar}`}>
                        <button className="flex shrink-0 items-center gap-1.5 rounded-none border border-gray-300 bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-500 focus-visible:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span>{t('All Filters')}</span>
                        </button>

                        <div className="mx-1 h-6 w-px shrink-0 self-center bg-gray-300 dark:bg-gray-700" />

                        <ListSelectSheet
                            icon={<MapPin className="h-3.5 w-3.5" />}
                            title={t('Location')}
                            value={filters.province_code || ''}
                            onChange={(val) => updateFilter('province_code', val)}
                            options={provinceOptions}
                        />

                        <SelectFilter
                            icon={<ArrowDownUp className="h-3.5 w-3.5" />}
                            label={t('Sort By')}
                            value={filters.sort || ''}
                            onChange={(val) => updateFilter('sort', val)}
                            options={sortOptions}
                        />

                        <PriceFilterSheet min={filters.min_price || ''} max={filters.max_price || ''} onChange={updatePriceFilter} />

                        {dynamicFields.map((field: any) => {
                            const labelStr = currentLocale === 'kh' ? field.label_kh || field.label : field.label;
                            const type = field.field_type;
                            const currentValue = filters[field.field_key] || '';

                            if (type === 'select' || type === 'radio') {
                                const options = (field.options || []).map((opt: any) => ({
                                    value: opt.option_value,
                                    label: currentLocale === 'kh' ? opt.label_kh || opt.label_en : opt.label_en || opt.label_kh,
                                }));

                                if (options.length > 5) {
                                    return (
                                        <ListSelectSheet
                                            key={field.field_key}
                                            title={labelStr}
                                            value={currentValue}
                                            onChange={(val) => updateFilter(field.field_key, val)}
                                            options={options}
                                        />
                                    );
                                }
                                return (
                                    <SelectFilter
                                        key={field.field_key}
                                        label={labelStr}
                                        value={currentValue}
                                        onChange={(val) => updateFilter(field.field_key, val)}
                                        options={options}
                                    />
                                );
                            }

                            if (type === 'text' || type === 'number' || type === 'textarea') {
                                return (
                                    <TextFilterSheet
                                        key={field.field_key}
                                        title={labelStr}
                                        type={type as 'text' | 'number' | 'textarea'}
                                        value={currentValue}
                                        onChange={(val) => updateFilter(field.field_key, val)}
                                    />
                                );
                            }

                            if (type === 'checkbox') {
                                return (
                                    <button
                                        key={field.field_key}
                                        onClick={() => updateFilter(field.field_key, currentValue ? '' : '1')}
                                        className={`flex shrink-0 items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:outline-none dark:focus-visible:ring-gray-100 ${
                                            currentValue
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <span>{labelStr}</span>
                                        {currentValue && <X className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />}
                                    </button>
                                );
                            }

                            return null;
                        })}
                    </nav>
                </div>
            </header>

            <main className={`section-container mt-2 ${!hasContentToShow ? 'hidden' : ''}`}>
                <div className="space-y-6 bg-white p-4 shadow dark:bg-white/5">
                    {showCategories && (
                        <section>
                            <h2 className="mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">{t('Product Categories')}</h2>
                            <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                                {categories.slice(0, 9).map((cat) => (
                                    <CategoryItem
                                        key={cat.id}
                                        name={getLocalizedName(cat)}
                                        imageUrl={cat.image_url}
                                        isActive={filters.category_code === cat.code}
                                        onClick={() => updateFilter('category_code', filters.category_code === cat.code ? '' : cat.code)}
                                    />
                                ))}
                                {categories.length > 9 && (
                                    <SeeMoreSheet
                                        title={t('Product Categories')}
                                        items={categories}
                                        activeCode={filters.category_code || ''}
                                        onSelect={(code) => updateFilter('category_code', code)}
                                        getLocalizedName={getLocalizedName}
                                        hasHiddenActiveFilter={checkHiddenActive(categories, filters.category_code || '', 10)}
                                    />
                                )}
                            </div>
                        </section>
                    )}

                    {showBrands && (
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
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {getLocalizedName(activeBrand)}
                                                </span>
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
                                                            onClick={() => updateFilter('brand_code', '')}
                                                            className="flex w-full items-center justify-between border-b border-gray-100 p-4 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                                        >
                                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {t('All Brands')}
                                                            </span>
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
                                                                {activeBrand.code === brand.code && (
                                                                    <Check className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                                                                )}
                                                            </button>
                                                        </SheetClose>
                                                    ))}
                                                    {filteredBrands.length === 0 && (
                                                        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                                            {t('No items found.')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>

                                    <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                                        {brandModels.slice(0, MAX_MODEL_ITEMS - 1).map((model: any) => (
                                            <CategoryItem
                                                key={model.id}
                                                name={getLocalizedName(model)}
                                                imageUrl={model.image_url}
                                                isActive={filters.model_code === model.code}
                                                onClick={() => updateFilter('model_code', filters.model_code === model.code ? '' : model.code)}
                                            />
                                        ))}
                                        {brandModels.length >= MAX_MODEL_ITEMS && (
                                            <SeeMoreSheet
                                                title={t('Models')}
                                                items={brandModels}
                                                activeCode={filters.model_code || ''}
                                                onSelect={(code) => updateFilter('model_code', code)}
                                                getLocalizedName={getLocalizedName}
                                                hasHiddenActiveFilter={checkHiddenActive(brandModels, filters.model_code || '', MAX_MODEL_ITEMS)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">{t('Popular Brands')}</h2>
                                    <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                                        {displayedBrands.slice(0, MAX_BRAND_ITEMS - 1).map((brand) => (
                                            <CategoryItem
                                                key={brand.id}
                                                name={getLocalizedName(brand)}
                                                imageUrl={brand.image_url}
                                                isActive={filters.brand_code === brand.code}
                                                onClick={() => updateFilter('brand_code', filters.brand_code === brand.code ? '' : brand.code)}
                                            />
                                        ))}
                                        {displayedBrands.length >= MAX_BRAND_ITEMS && (
                                            <SeeMoreSheet
                                                title={t('Popular Brands')}
                                                items={displayedBrands}
                                                activeCode={filters.brand_code || ''}
                                                onSelect={(code) => updateFilter('brand_code', code)}
                                                getLocalizedName={getLocalizedName}
                                                hasHiddenActiveFilter={checkHiddenActive(displayedBrands, filters.brand_code || '', MAX_BRAND_ITEMS)}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </section>
                    )}

                    {showBodyTypes && (
                        <section>
                            <h2 className="mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">{t('Body Types')}</h2>
                            <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                                {allBodyTypes.slice(0, 9).map((type) => (
                                    <CategoryItem
                                        key={type.id}
                                        name={getLocalizedName(type)}
                                        imageUrl={type.image_url}
                                        isActive={filters.body_type_code === type.code}
                                        onClick={() => updateFilter('body_type_code', filters.body_type_code === type.code ? '' : type.code)}
                                    />
                                ))}
                                {allBodyTypes.length > 9 && (
                                    <SeeMoreSheet
                                        title={t('Body Types')}
                                        items={allBodyTypes}
                                        activeCode={filters.body_type_code || ''}
                                        onSelect={(code) => updateFilter('body_type_code', code)}
                                        getLocalizedName={getLocalizedName}
                                        hasHiddenActiveFilter={checkHiddenActive(allBodyTypes, filters.body_type_code || '', 10)}
                                    />
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
