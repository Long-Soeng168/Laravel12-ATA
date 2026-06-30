import { Input } from '@/components/ui/input';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { FormDescription } from './FormDescription';
import { FormErrorLabel } from './FormErrorLabel';
import { FormLabel } from './FormLabel';

interface FormFieldProps {
    id: string;
    name?: string;
    label: string;
    description?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[] | undefined;
    error?: string;
    onChange: (val: string) => void;
    className?: string;
    containerClassName?: string;
    required?: boolean;
    disable?: boolean;
    disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    name,
    label,
    description,
    placeholder,
    type = 'text',
    value,
    error,
    onChange,
    className,
    containerClassName,
    required = false,
    disable = false,
    disabled = false,
}) => {
    const { t } = useTranslation();
    return (
        <div className={cn('grid content-start gap-2', containerClassName)}>
            <FormLabel id={id} label={label} required={required} />
            <Input
                disabled={disabled || disable}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder ? t(placeholder) : t(label)}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`rounded dark:border-white/20 ${error ? 'border-destructive' : ''} ${className || ''}`}
            />
            {description && <FormDescription description={description} />}
            <FormErrorLabel error={error} />
        </div>
    );
};
