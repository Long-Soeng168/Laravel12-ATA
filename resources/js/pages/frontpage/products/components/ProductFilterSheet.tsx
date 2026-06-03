import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import useTranslation from '@/hooks/use-translation';
import { Check, ChevronDown, Image as ImageIcon, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// --- Reusable Searchable Dialog Select (Internal Component) ---

interface DialogSelectOption {
    value: string;
    label: string;
    imageUrl?: string;
}

interface FilterSelectDialogProps {
    title: string;
    value: string;
    options: DialogSelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    clearLabel?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
}

const FilterSelectDialog: React.FC<FilterSelectDialogProps> = ({
    title,
    value,
    options,
    onChange,
    placeholder = 'Select...',
    clearLabel = 'All',
    searchPlaceholder = 'Search...',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = selectedOption ? selectedOption.label : placeholder;

    const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className={`flex h-9 w-full items-center justify-between rounded-none border px-3 text-sm transition-colors focus:outline-none ${
                        disabled
                            ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
                            : 'cursor-pointer border-gray-300 bg-transparent hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500'
                    }`}
                >
                    <span className={value ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}>{displayLabel}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
            </DialogTrigger>

            <DialogContent className="gap-0 overflow-hidden rounded-none border-gray-200 p-0 sm:max-w-md dark:border-gray-800 dark:bg-gray-950">
                <DialogHeader className="border-b border-gray-200 p-4 dark:border-gray-800">
                    <DialogTitle className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">{title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col bg-white dark:bg-gray-950">
                    <div className="border-b border-gray-200 p-3 dark:border-gray-800">
                        <Input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 rounded-none border-gray-300 bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-900"
                            autoFocus
                        />
                    </div>

                    <div className="hide-scrollbar max-h-[40vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => handleSelect('')}
                            className={`flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 ${
                                !value
                                    ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            <span>{clearLabel}</span>
                            {!value && <Check className="h-4 w-4" />}
                        </button>

                        {filteredOptions.length > 0
                            ? filteredOptions.map((opt) => {
                                  const isActive = value === opt.value;
                                  return (
                                      <button
                                          key={opt.value}
                                          type="button"
                                          onClick={() => handleSelect(opt.value)}
                                          className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-2.5 text-left text-sm transition-colors last:border-0 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 ${
                                              isActive
                                                  ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                                                  : 'text-gray-700 dark:text-gray-300'
                                          }`}
                                      >
                                          {opt.imageUrl !== undefined && (
                                              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white p-1 dark:border-gray-700">
                                                  {opt.imageUrl ? (
                                                      <img src={opt.imageUrl} alt={opt.label} className="object-contain" loading="lazy" />
                                                  ) : (
                                                      <ImageIcon className="h-4 w-4 text-gray-400" />
                                                  )}
                                              </div>
                                          )}
                                          <span className="flex-1">{opt.label}</span>
                                          {isActive && <Check className="h-4 w-4" />}
                                      </button>
                                  );
                              })
                            : searchQuery && <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">No items found.</div>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- Main Filter Sheet Component ---

interface ProductFilterSheetProps {
    filters: Record<string, string>;
    dynamicFields: any[];
    provinceOptions: { value: string; label: string }[];
    sortOptions: { value: string; label: string }[];
    categories?: any[];
    brands?: any[];
    bodyTypes?: any[];
    onApply: (newFilters: Record<string, string>) => void;
    onClear: () => void;
}

export default function ProductFilterSheet({
    filters,
    dynamicFields,
    provinceOptions,
    sortOptions,
    categories = [],
    brands = [],
    bodyTypes = [],
    onApply,
    onClear,
}: ProductFilterSheetProps) {
    const { t, currentLocale } = useTranslation();
    const [localFilters, setLocalFilters] = useState<Record<string, string>>(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const getLocalizedName = (item: any) => {
        return currentLocale === 'kh' && item.name_kh ? item.name_kh : item.name;
    };

    const updateLocalFilter = (key: string, value: string) => {
        setLocalFilters((prev) => {
            const next = { ...prev };
            if (value === '') {
                delete next[key];
            } else {
                next[key] = value;
            }

            // --- Cascading clear logic with whitelist approach ---
            if (key === 'category_code') {
                // Keep only global/standard filters, delete everything else (brands, models, and ALL old dynamic attributes)
                const keysToKeep = [
                    'category_code',
                    'province_code',
                    'sort',
                    'min_price',
                    'max_price',
                    'created_at',
                    'is_free_delivery',
                    'is_discount',
                    'q',
                ];

                Object.keys(next).forEach((k) => {
                    if (!keysToKeep.includes(k)) {
                        delete next[k];
                    }
                });
            }
            if (key === 'brand_code') {
                delete next['model_code'];
            }
            if (key === 'model_code') {
                delete next['body_type_code'];
            }

            return next;
        });
    };

    const handleApply = () => onApply(localFilters);
    const handleClear = () => {
        setLocalFilters({});
        onClear();
    };

    // Calculate exact number of active filters
    const activeFilterCount = Object.keys(filters).filter((k) => filters[k] !== '').length;
    const localActiveFilterCount = Object.keys(localFilters).filter((k) => localFilters[k] !== '').length;

    // --- Dynamic Taxonomy Logic ---
    const activeCategory = categories.find((c) => c.code === localFilters.category_code);
    const displayedBrands = activeCategory ? brands.filter((b) => (activeCategory.brand_ids || []).includes(b.id)) : brands;
    const activeBrand = displayedBrands.find((b) => b.code === localFilters.brand_code);
    const brandModels = activeBrand?.brand_models || [];
    const showBodyTypes = activeCategory ? activeCategory.has_body_type === 1 : true;

    // Use fields from the locally selected category immediately, fallback to props
    const displayDynamicFields = activeCategory?.fields || dynamicFields;

    // --- Format Options for Dialogs ---
    const categoryOptions = categories.map((c) => ({ value: c.code, label: getLocalizedName(c), imageUrl: c.image_url }));
    const brandOptions = displayedBrands.map((b) => ({ value: b.code, label: getLocalizedName(b), imageUrl: b.image_url }));
    const modelOptions = brandModels.map((m: any) => ({ value: m.code, label: getLocalizedName(m), imageUrl: m.image_url }));
    const bodyTypeOptions = bodyTypes.map((bt) => ({ value: bt.code, label: getLocalizedName(bt), imageUrl: bt.image_url }));

    // --- Static Filter Options from Flutter App ---
    const dateAddedOptions = [
        { code: '', name: 'Any Time', name_kh: 'ពេលណាក៏បាន' },
        { code: 'today', name: 'Today', name_kh: 'ថ្ងៃនេះ' },
        { code: 'last_7_days', name: 'Last 7 Days', name_kh: '៧ថ្ងៃចុងក្រោយ' },
        { code: 'last_15_days', name: 'Last 15 Days', name_kh: '១៥ថ្ងៃចុងក្រោយ' },
        { code: 'last_30_days', name: 'Last 30 Days', name_kh: '៣០ថ្ងៃចុងក្រោយ' },
    ];

    const booleanOptions = [
        { code: '', name: 'All', name_kh: 'ទាំងអស់' },
        { code: '1', name: 'Yes', name_kh: 'មាន' },
        { code: '0', name: 'No', name_kh: 'គ្មាន' },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none ${
                        activeFilterCount > 0
                            ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                            : 'border-gray-300 bg-white/90 text-gray-700 hover:border-gray-500 hover:bg-gray-50/90 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-500'
                    }`}
                >
                    <SlidersHorizontal
                        className={`h-3.5 w-3.5 ${activeFilterCount > 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}
                    />
                    <span>{t('All Filters')}</span>
                    {/* Badge displaying number of applied filters */}
                    {activeFilterCount > 0 && (
                        <span className="ml-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </SheetTrigger>

            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left"
                className="flex flex-col gap-0 overflow-hidden rounded-none border-gray-200 bg-white p-0 sm:max-w-md dark:border-gray-800 dark:bg-gray-950"
            >
                <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                    <SheetHeader className="mb-0 px-0">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">{t('All Filters')}</SheetTitle>
                        </div>
                    </SheetHeader>
                </div>

                <div className="hide-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
                    {/* --- Sort By (Defaults to 'latest') --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Sort By')}</Label>
                        <div className="flex flex-wrap gap-2">
                            {sortOptions.map((opt) => {
                                // Default to 'latest' if localFilters.sort is empty/undefined
                                const currentSort = localFilters.sort || 'latest';
                                const isActive = currentSort === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateLocalFilter('sort', opt.value)}
                                        className={`flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <span>{opt.label}</span>
                                        {isActive && <Check className="h-3.5 w-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- Date Added --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Date Added')}</Label>
                        <div className="flex flex-wrap gap-2">
                            {dateAddedOptions.map((opt) => {
                                const isActive = (localFilters.created_at || '') === opt.code;
                                const displayLabel = currentLocale === 'kh' ? opt.name_kh : opt.name;
                                return (
                                    <button
                                        key={opt.code}
                                        onClick={() => updateLocalFilter('created_at', opt.code)}
                                        className={`flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <span>{displayLabel}</span>
                                        {isActive && <Check className="h-3.5 w-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- Free Delivery --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Free Delivery')}</Label>
                        <div className="flex flex-wrap gap-2">
                            {booleanOptions.map((opt) => {
                                const isActive = (localFilters.is_free_delivery || '') === opt.code;
                                const displayLabel = currentLocale === 'kh' ? opt.name_kh : opt.name;
                                return (
                                    <button
                                        key={opt.code}
                                        onClick={() => updateLocalFilter('is_free_delivery', opt.code)}
                                        className={`flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <span>{displayLabel}</span>
                                        {isActive && <Check className="h-3.5 w-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- Discount --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Discount')}</Label>
                        <div className="flex flex-wrap gap-2">
                            {booleanOptions.map((opt) => {
                                const isActive = (localFilters.is_discount || '') === opt.code;
                                const displayLabel = currentLocale === 'kh' ? opt.name_kh : opt.name;
                                return (
                                    <button
                                        key={opt.code}
                                        onClick={() => updateLocalFilter('is_discount', opt.code)}
                                        className={`flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <span>{displayLabel}</span>
                                        {isActive && <Check className="h-3.5 w-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- Price Range --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Price Range')}</Label>
                        <div className="flex items-center gap-3">
                            <Input
                                type="number"
                                placeholder={t('Min')}
                                value={localFilters.min_price || ''}
                                onChange={(e) => updateLocalFilter('min_price', e.target.value)}
                                className="h-9 rounded-none border-gray-300 bg-transparent text-sm dark:border-gray-700"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                                type="number"
                                placeholder={t('Max')}
                                value={localFilters.max_price || ''}
                                onChange={(e) => updateLocalFilter('max_price', e.target.value)}
                                className="h-9 rounded-none border-gray-300 bg-transparent text-sm dark:border-gray-700"
                            />
                        </div>
                    </div>

                    {/* --- Core Taxonomy (Categories, Brands, Models, Body Types) --- */}
                    {categoryOptions.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Category')}</Label>
                            <FilterSelectDialog
                                title={t('Select Category')}
                                value={localFilters.category_code || ''}
                                options={categoryOptions}
                                onChange={(val) => updateLocalFilter('category_code', val)}
                                placeholder={t('All Categories')}
                                clearLabel={t('All Categories')}
                                searchPlaceholder={`${t('Search')}...`}
                            />
                        </div>
                    )}

                    {brandOptions.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Brand')}</Label>
                            <FilterSelectDialog
                                title={t('Select Brand')}
                                value={localFilters.brand_code || ''}
                                options={brandOptions}
                                onChange={(val) => updateLocalFilter('brand_code', val)}
                                placeholder={t('All Brands')}
                                clearLabel={t('All Brands')}
                                searchPlaceholder={`${t('Search')}...`}
                            />
                        </div>
                    )}

                    {localFilters.brand_code && modelOptions.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Model')}</Label>
                            <FilterSelectDialog
                                title={t('Select Model')}
                                value={localFilters.model_code || ''}
                                options={modelOptions}
                                onChange={(val) => updateLocalFilter('model_code', val)}
                                placeholder={t('All Models')}
                                clearLabel={t('All Models')}
                                searchPlaceholder={`${t('Search')}...`}
                            />
                        </div>
                    )}

                    {showBodyTypes && bodyTypeOptions.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Body Type')}</Label>
                            <FilterSelectDialog
                                title={t('Select Body Type')}
                                value={localFilters.body_type_code || ''}
                                options={bodyTypeOptions}
                                onChange={(val) => updateLocalFilter('body_type_code', val)}
                                placeholder={t('All Body Types')}
                                clearLabel={t('All Body Types')}
                                searchPlaceholder={`${t('Search')}...`}
                            />
                        </div>
                    )}

                    {/* --- Location --- */}
                    <div className="space-y-3">
                        <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{t('Location')}</Label>
                        <FilterSelectDialog
                            title={t('Select Location')}
                            value={localFilters.province_code || ''}
                            options={provinceOptions}
                            onChange={(val) => updateLocalFilter('province_code', val)}
                            placeholder={t('All Provinces')}
                            clearLabel={t('All Provinces')}
                            searchPlaceholder={`${t('Search location')}...`}
                        />
                    </div>

                    {/* --- Dynamic Fields --- */}
                    {displayDynamicFields.map((field: any) => {
                        const labelStr = currentLocale === 'kh' ? field.label_kh || field.label : field.label;
                        const type = field.field_type;
                        const currentValue = localFilters[field.field_key] || '';

                        if (type === 'select' || type === 'radio') {
                            const options = (field.options || []).map((opt: any) => ({
                                value: String(opt.option_value),
                                label: currentLocale === 'kh' ? opt.label_kh || opt.label_en : opt.label_en || opt.label_kh,
                            }));

                            return (
                                <div key={field.field_key} className="space-y-3">
                                    <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{labelStr}</Label>

                                    {options.length > 5 ? (
                                        <FilterSelectDialog
                                            title={labelStr}
                                            value={currentValue}
                                            options={options}
                                            onChange={(val) => updateLocalFilter(field.field_key, val)}
                                            placeholder={`All ${labelStr}`}
                                            clearLabel={`All ${labelStr}`}
                                            searchPlaceholder={`${t('Search')}...`}
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {options.map((opt: any) => {
                                                const isActive = currentValue === opt.value;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => updateLocalFilter(field.field_key, isActive ? '' : opt.value)}
                                                        className={`flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-sm font-medium transition-colors ${
                                                            isActive
                                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                                        }`}
                                                    >
                                                        <span>{opt.label}</span>
                                                        {isActive && <Check className="h-3.5 w-3.5" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        if (type === 'text' || type === 'number' || type === 'textarea') {
                            return (
                                <div key={field.field_key} className="space-y-3">
                                    <Label className="text-xs font-bold text-gray-500 dark:text-gray-400">{labelStr}</Label>
                                    {type === 'textarea' ? (
                                        <Textarea
                                            placeholder={`${t('Type here')}...`}
                                            value={currentValue}
                                            onChange={(e) => updateLocalFilter(field.field_key, e.target.value)}
                                            className="min-h-[80px] rounded-none border-gray-300 bg-transparent text-sm dark:border-gray-700"
                                        />
                                    ) : (
                                        <Input
                                            type={type}
                                            placeholder={`${t('Type here')}...`}
                                            value={currentValue}
                                            onChange={(e) => updateLocalFilter(field.field_key, e.target.value)}
                                            className="h-9 rounded-none border-gray-300 bg-transparent text-sm dark:border-gray-700"
                                        />
                                    )}
                                </div>
                            );
                        }

                        if (type === 'checkbox') {
                            return (
                                <div key={field.field_key} className="space-y-3">
                                    <button
                                        onClick={() => updateLocalFilter(field.field_key, currentValue ? '' : '1')}
                                        className={`flex w-full items-center justify-between border p-3 text-left transition-colors ${
                                            currentValue
                                                ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <span className="text-sm font-medium">{labelStr}</span>
                                        {currentValue && <Check className="h-4 w-4" />}
                                    </button>
                                </div>
                            );
                        }

                        return null;
                    })}

                    {/* Empty padding at bottom to ensure last dialog opens nicely */}
                    <div className="pb-8"></div>
                </div>

                <div className="relative z-10 flex gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
                    <SheetClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClear}
                            className="h-10 flex-1 rounded-none border-gray-300 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            {t('Clear All')}
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            onClick={handleApply}
                            className="h-10 flex-1 rounded-none font-medium text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                        >
                            {t('Apply Filters')}
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
