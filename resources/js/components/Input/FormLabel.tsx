import { Label } from '@/components/ui/label';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface FormLabelProps {
    id?: string;
    label: string;
    required?: boolean;
    className?: string; // Added for flexibility
    error?: boolean; // Added to trigger the error style
}

export const FormLabel: React.FC<FormLabelProps> = ({ id, label, required = false, className, error = false }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between px-0.5">
            <Label
                htmlFor={id}
                className={cn(
                    'flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors',
                    error ? 'text-destructive' : 'text-muted-foreground',
                    className,
                )}
            >
                {/* Decorative Status Dot */}
                <span className={cn('h-1.5 w-1.5 rounded-full transition-all', error ? 'bg-destructive animate-pulse' : 'bg-primary/30')} />

                {t(label)}
            </Label>

            {/* Subtle Required Badge */}
            {required && !error && (
                <span className="border-border bg-muted/50 text-foreground rounded-full border px-2 py-0.5 text-[10px] font-medium">
                    {t('Required')}
                </span>
            )}

            {/* Required Error Badge */}
            {required && error && (
                <span className="bg-destructive/10 dark:bg-destructive/20 text-destructive border-destructive/20 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase">
                    {t('Required')}
                </span>
            )}
        </div>
    );
};
