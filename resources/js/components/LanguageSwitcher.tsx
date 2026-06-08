import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useState } from 'react';

export default function LanguageSwitcher({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { t, currentLocale } = useTranslation();
    // Track which language is currently loading
    const [loadingLocale, setLoadingLocale] = useState<string | null>(null);

    const tabs: { value: string; icon: string; label: string }[] = [
        { value: 'kh', icon: '/assets/icons/khmer.png', label: t('Khmer') },
        { value: 'en', icon: '/assets/icons/english.png', label: t('English') },
    ];

    return (
        <div className={cn('bg-accent my-1 inline-flex w-auto justify-start gap-[3px] rounded-none p-[3px]', className)} {...props}>
            {tabs.map(({ value, icon, label }) => {
                const isLoading = loadingLocale === value;

                return (
                    <a
                        key={value}
                        href={`/lang/${value}`}
                        // Set the loading state when clicked
                        onClick={() => setLoadingLocale(value)}
                        className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-none p-[3px] px-1.5 transition-colors',
                            currentLocale === value
                                ? 'bg-white shadow dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            // Add pointer-events-none to prevent double-clicking while it's loading
                            isLoading && 'pointer-events-none opacity-70',
                        )}
                    >
                        {isLoading ? (
                            <span className="px-2 text-xs italic">{currentLocale === 'kh' ? 'កំពុងផ្ទុក...' : 'Loading...'}</span>
                        ) : (
                            // What to show normally
                            <>
                                {icon && <img src={icon} alt="" className="aspect-square size-5 shrink-0 rounded-full object-contain" />}
                                <span className="text-xs max-[455px]:hidden">{label}</span>
                            </>
                        )}
                    </a>
                );
            })}
        </div>
    );
}
