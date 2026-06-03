import useTranslation from '@/hooks/use-translation';
import { router, usePage } from '@inertiajs/react';
import { ArrowDownUp, Check, ChevronDown, ChevronRightIcon, Image as ImageIcon, Layers3Icon, MapPin, Search, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- Shadcn Components ---
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// --- Standard Select Filter ---

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
                    className={`pointer-events-none absolute left-2.5 flex items-center ${
                        value ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                    {icon}
                </div>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full cursor-pointer appearance-none bg-transparent py-1.5 pr-8 text-sm font-medium outline-none ${
                    icon ? 'pl-8' : 'pl-3'
                }`}
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

// --- Sheet List Select (For Location) ---

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

// --- Sheet List Select (For Categories) ---

interface CategoryOption {
    value: string;
    label: string;
    imageUrl?: string | null;
}

interface CategoryListSelectSheetProps {
    icon?: React.ReactNode;
    title: string;
    value: string;
    onChange: (value: string) => void;
    options: CategoryOption[];
}

const CategoryListSelectSheet: React.FC<CategoryListSelectSheetProps> = ({ icon, title, value, onChange, options }) => {
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
                                <span className="flex items-center gap-3">
                                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                        <Layers3Icon className="h-3.5 w-3.5 text-gray-500" />
                                    </div>
                                    {t('All Categories')}
                                </span>
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
                                        <span className="flex items-center gap-3">
                                            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-0.5 dark:border-gray-700">
                                                {opt.imageUrl ? (
                                                    <img src={opt.imageUrl} alt={opt.label} className="h-full w-full object-contain" />
                                                ) : (
                                                    <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
                                                )}
                                            </div>
                                            {opt.label}
                                        </span>
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

export default function ShopListingHeader() {
    const { props, url } = usePage<any>();
    const { itemCategories, provinces } = props;
    const { t, currentLocale } = useTranslation();

    const [filters, setFilters] = useState<Record<string, string>>(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const initial: Record<string, string> = {};
        searchParams.forEach((val, key) => {
            initial[key] = val;
        });
        return initial;
    });

    const [mainSearchQuery, setMainSearchQuery] = useState(filters.q || '');
    const isFirstRender = useRef(true);

    // Sync filters when URL changes dynamically
    useEffect(() => {
        const searchParams = new URLSearchParams((url || '').split('?')[1] || '');
        const updatedFilters: Record<string, string> = {};
        searchParams.forEach((val, key) => {
            updatedFilters[key] = val;
        });
        setFilters(updatedFilters);
    }, [url]);

    // Keep local search input synced with URL state if it changes externally
    useEffect(() => {
        if (filters.q !== mainSearchQuery) {
            setMainSearchQuery(filters.q || '');
        }
    }, [filters.q]);

    const updateFilter = (key: string, value: string) => {
        const newFilters = { ...filters };

        if (value === '') {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }

        delete newFilters.page;

        setFilters(newFilters);
        router.get(window.location.pathname, newFilters, { preserveState: true, replace: true });
    };

    // Debounce for the search input
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            if (mainSearchQuery !== (filters.q || '')) {
                updateFilter('q', mainSearchQuery);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [mainSearchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mainSearchQuery !== (filters.q || '')) {
            updateFilter('q', mainSearchQuery);
        }
    };

    const categories = itemCategories || [];
    const allProvinces = provinces || [];

    const getLocalizedName = (item: any) => {
        return currentLocale === 'kh' && item.name_kh ? item.name_kh : item.name;
    };

    const activeCategory = categories.find((c: any) => c.code === filters.category_code);

    const categoryOptions = categories.map((c: any) => ({
        value: c.code,
        label: getLocalizedName(c),
        imageUrl: c.image_url,
    }));

    const provinceOptions = allProvinces
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((p: any) => ({ value: p.code, label: getLocalizedName(p) }));

    const sortOptions = [
        { value: 'name_asc', label: t('Name (A-Z)') },
        { value: 'name_desc', label: t('Name (Z-A)') },
    ];

    const clearFilters = () => {
        setFilters({});
        router.get(window.location.pathname, {}, { preserveState: true, replace: true });
    };

    const hasActiveFilters = Object.keys(filters).length > 0;
    const hideScrollbar = '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

    const breadcrumbs = [
        { label: t('Home'), action: () => router.get('/') },
        { label: t('Shops'), action: clearFilters },
    ];

    if (activeCategory) {
        breadcrumbs.push({
            label: getLocalizedName(activeCategory),
            action: () => updateFilter('category_code', activeCategory.code),
        });
    }

    return (
        <header className="section-container flex flex-col">
            {/* Breadcrumb - Placed clearly at the top */}
            <nav aria-label="Breadcrumb" className="flex items-center pb-2 text-[13px] text-gray-500 dark:text-gray-400">
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

            {/* Main Header Box */}
            <div className="bg-white/90 p-5 shadow dark:bg-black/50">
                {/* Search Bar Row */}
                <form onSubmit={handleSearchSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            value={mainSearchQuery}
                            onChange={(e) => setMainSearchQuery(e.target.value)}
                            className="h-11 w-full rounded-none border border-gray-300 bg-transparent pr-4 pl-10 text-sm font-medium text-gray-900 transition-colors focus-visible:border-gray-900 focus-visible:ring-0 dark:border-gray-700 dark:text-gray-100 dark:focus-visible:border-gray-100"
                            placeholder={t('Search by shop name, or address...')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary flex h-11 shrink-0 items-center justify-center rounded-none px-6 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none sm:w-auto dark:focus-visible:ring-offset-gray-900"
                    >
                        <Search className="mr-2 h-4 w-4" strokeWidth={2.5} /> {t('Search')}
                    </button>
                </form>

                {/* Filters Row */}
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <nav className={`flex flex-1 items-center gap-2 overflow-x-auto ${hideScrollbar}`}>
                        <CategoryListSelectSheet
                            icon={<Layers3Icon className="h-3.5 w-3.5" />}
                            title={t('Shop Categories')}
                            value={filters.category_code || ''}
                            onChange={(val) => updateFilter('category_code', val)}
                            options={categoryOptions}
                        />

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

                        <button
                            onClick={() => updateFilter('is_verified', filters.is_verified === '1' ? '' : '1')}
                            className={`flex shrink-0 items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:outline-none dark:focus-visible:ring-gray-100 ${
                                filters.is_verified === '1'
                                    ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                    : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-white/5'
                            }`}
                        >
                            <ShieldCheck
                                className={`h-4 w-4 ${
                                    filters.is_verified === '1' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'
                                }`}
                            />
                            <span>{t('Verified')}</span>
                            {filters.is_verified === '1' && <X className="h-3.5 w-3.5" />}
                        </button>
                    </nav>

                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="group flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-none border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline-none sm:w-auto dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-white"
                        >
                            <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                            <span>{t('Clear Filters')}</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
