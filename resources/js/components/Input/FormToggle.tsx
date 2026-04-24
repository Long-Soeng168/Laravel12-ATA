import { cn } from '@/lib/utils';
import React from 'react';

interface FormToggleProps {
    id?: string;
    label: string;
    value: boolean | string | number;
    onChange: (checked: boolean) => void;
    error?: boolean;
    statusOn?: string;
    statusOff?: string;
}

const FormToggle: React.FC<FormToggleProps> = ({ id, label, value, onChange, error, statusOn = 'On', statusOff = 'Off' }) => {
    const isChecked = value === true || value === '1' || value === 1;

    return (
        <div
            onClick={() => onChange(!isChecked)}
            className={cn(
                'flex h-10 cursor-pointer items-center justify-between rounded-lg border px-3 transition-all duration-200 select-none',
                isChecked
                    ? 'bg-primary/5 border-primary/40 ring-primary/10 ring-1'
                    : 'bg-background border-input hover:border-primary/20 hover:bg-accent/30',
                error && 'border-destructive/50 bg-destructive/5',
            )}
        >
            <div className="flex items-center gap-3">
                {/* The Toggle Switch */}
                <div
                    className={cn(
                        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none',
                        isChecked ? 'bg-primary' : 'bg-input',
                    )}
                >
                    <span
                        className={cn(
                            'bg-background pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform duration-200',
                            isChecked ? 'translate-x-4' : 'translate-x-0',
                        )}
                    />
                </div>

                <span
                    className={cn(
                        'text-[11px] font-bold tracking-tight uppercase transition-colors',
                        isChecked ? 'text-primary' : 'text-muted-foreground',
                    )}
                >
                    {label}
                </span>
            </div>

            {/* Right Side Status Text */}
            <span className={cn('text-[9px] font-bold uppercase transition-opacity', isChecked ? 'text-primary/70' : 'text-muted-foreground/40')}>
                {isChecked ? statusOn : statusOff}
            </span>
        </div>
    );
};

export default FormToggle;
