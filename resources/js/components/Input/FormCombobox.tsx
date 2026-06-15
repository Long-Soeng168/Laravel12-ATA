import { ComboboxSelect } from '@/components/Section/ComboboxSelect';
import useTranslation from '@/hooks/use-translation';
import * as React from 'react';
import { FormDescription } from './FormDescription';
import { FormErrorLabel } from './FormErrorLabel';
import { FormLabel } from './FormLabel';

interface FormComboboxProps {
    id?: string;
    name: string;
    label: string;
    options: { value: string; label: string; image?: string | null }[];
    value: string;
    placeholder?: string;
    searchPlaceholder?: string;
    error?: string;
    onChange: (val: string) => void;
    required?: boolean;
    className?: string;
    comboboxClassName?: string;
    description?: string;
    disable?: boolean;
}

export const FormCombobox: React.FC<FormComboboxProps> = ({
    id,
    name,
    label,
    options,
    value,
    placeholder,
    searchPlaceholder,
    error,
    onChange,
    required = false,
    className,
    comboboxClassName,
    description,
    disable = false,
}) => {
    const { t } = useTranslation();
    return (
        <div className={`grid content-start gap-2 ${className || ''}`}>
            <FormLabel id={id} label={label} required={required} />
            <ComboboxSelect
                disable={disable}
                options={options}
                value={value}
                className={comboboxClassName}
                onChange={onChange}
                placeholder={placeholder || `${t('Select')} ${label}...`}
                searchPlaceholder={searchPlaceholder || `${t('Search')} ${label}...`}
            />
            {description && <FormDescription description={description} />}
            <FormErrorLabel error={error} />
        </div>
    );
};
