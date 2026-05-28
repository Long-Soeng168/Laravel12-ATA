import useTranslation from '@/hooks/use-translation';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export interface SectionHeaderAction {
    label: string;
    href: string;
}

export interface SectionHeaderProps {
    icon?: React.ReactNode | null; // Made optional and nullable
    title: string;
    subtitle?: string;
    action?: SectionHeaderAction | null;
}

export function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
    const { t, currentLocale } = useTranslation(); //currentLocale == 'end', 'kh'

    return (
        <header className="border-border mb-8 flex items-center justify-between gap-3 border-b pb-4 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Conditionally render the entire box only if an icon is passed */}
                {icon && (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-none border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00] sm:size-8">
                        {icon}
                    </div>
                )}

                <div>
                    {/* Replaced text-foreground with gradient classes */}
                    <h2 className="text-primary text-base font-semibold sm:text-xl">{t(title)}</h2>
                    {subtitle ? (
                        <p className="text-muted-foreground text-xs sm:text-sm">{t(subtitle)} text-muted-foreground mt-1 text-xs sm:text-sm</p>
                    ) : (
                        <div className="h-1 w-6 rounded-full bg-[#FF6D00]"></div>
                    )}
                </div>
            </div>

            {action && (
                <a
                    href={action.href}
                    className="group text-muted-foreground hover:text-primary flex shrink-0 items-center gap-1 text-xs font-medium transition-colors sm:text-sm"
                >
                    {t(action.label)}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </a>
            )}
        </header>
    );
}
