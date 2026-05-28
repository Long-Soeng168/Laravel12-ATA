import useTranslation from '@/hooks/use-translation';
import { router, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Category {
    id: number;
    name: string;
    name_kh: string;
    code: string;
    image_url?: string;
}

interface PageProps {
    itemCategories?: Category[];
    selectedCategory?: Category;
    [key: string]: any;
}

interface HeaderSearchInputProps {
    showCategories?: boolean;
    className?: string;
}

export default function HeaderSearchInput({ showCategories = true, className = '' }: HeaderSearchInputProps) {
    const { t, currentLocale } = useTranslation();
    const { url, props } = usePage();
    const { itemCategories, selectedCategory } = props as unknown as PageProps;

    const [q, setQ] = useState('');
    const [categoryCode, setCategoryCode] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams((url || '').split('?')[1] || '');
        setQ(searchParams.get('q') || '');
        setCategoryCode(selectedCategory?.code || searchParams.get('category_code') || 'all');
    }, [url, selectedCategory]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getCategoryName = (cat: Category) => {
        return currentLocale === 'kh' && cat.name_kh ? cat.name_kh : cat.name;
    };

    const activeCategory = itemCategories?.find((c) => c.code === categoryCode);
    const activeCategoryName = activeCategory ? getCategoryName(activeCategory) : t('All Categories');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const currentParams = new URLSearchParams(window.location.search);
        if (q.trim()) currentParams.set('q', q.trim());
        else currentParams.delete('q');

        if (categoryCode && categoryCode !== 'all') currentParams.set('category_code', categoryCode);
        else currentParams.delete('category_code');

        router.get('/products', Object.fromEntries(currentParams), { preserveState: true });
    };

    return (
        <form onSubmit={handleSearch} className={className}>
            <div className="bg-card border-border relative flex w-full border transition-colors focus-within:border-[#FF6D00]">
                {showCategories && (
                    <>
                        <div className="relative flex shrink-0 items-center" ref={dropdownRef}>
                            {/* Adaptive Trigger: Icon-only on mobile, Full-text on desktop */}
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-foreground hover:bg-accent/50 flex h-11 w-auto min-w-[50px] cursor-pointer items-center justify-between gap-2 bg-transparent px-3 text-sm font-medium transition-colors outline-none sm:min-w-[160px] sm:px-4"
                            >
                                <div className="flex items-center gap-2">
                                    {activeCategory?.image_url ? (
                                        <span className="size-6 overflow-hidden rounded-full bg-white p-0.5">
                                            <img src={activeCategory.image_url} alt="" className="size-full shrink-0 object-contain" />
                                        </span>
                                    ) : (
                                        <LayoutGrid className="text-muted-foreground size-4 shrink-0" />
                                    )}
                                    <span className="hidden truncate sm:inline">{activeCategoryName}</span>
                                </div>
                                <ChevronDown className={`size-4 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="bg-card border-border [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/60 absolute top-[100%] left-[-1px] z-50 mt-1 max-h-[50dvh] w-[70vw] min-w-[260px] overflow-y-auto border border-t-0 shadow-none sm:left-0 sm:w-full sm:min-w-[280px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent">
                                    <div className="flex flex-col">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCategoryCode('all');
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`hover:bg-accent flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                                categoryCode === 'all'
                                                    ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                                    : 'border-l-4 border-transparent'
                                            }`}
                                        >
                                            <div className="bg-white flex size-6 shrink-0 items-center justify-center rounded-full">
                                                <LayoutGrid className="text-muted-foreground size-3.5" />
                                            </div>
                                            <span className="truncate">{t('All Categories')}</span>
                                        </button>

                                        {itemCategories?.map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => {
                                                    setCategoryCode(category.code);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`hover:bg-accent flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                                    categoryCode === category.code
                                                        ? 'border-l-4 border-[#FF6D00] bg-[#FF6D00]/10 text-[#FF6D00]'
                                                        : 'border-l-4 border-transparent'
                                                }`}
                                            >
                                                {category.image_url ? (
                                                    <span className="size-6 overflow-hidden rounded-full bg-white p-[2px]">
                                                        <img src={category.image_url} alt="" className="size-full shrink-0 object-contain" />
                                                    </span>
                                                ) : (
                                                    <div className="bg-accent size-6 shrink-0 rounded-full"></div>
                                                )}
                                                <span className="truncate text-left">{getCategoryName(category)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="bg-border my-2 w-px shrink-0"></div>
                    </>
                )}

                <div className="relative flex flex-1 items-center">
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={t('Search Products...')}
                        className="placeholder:text-muted-foreground h-11 w-full bg-transparent px-4 pr-12 text-sm focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors hover:text-[#FF6D00]"
                    >
                        <Search className="size-5" />
                    </button>
                </div>
            </div>
        </form>
    );
}
