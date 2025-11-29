import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { FormLabel } from './FormLabel';
import useTranslation from '@/hooks/use-translation';

interface FormFieldMultiSelectProps {
    label: string;
    options: Option[];
    value: { value: string; label: string }[]; // selected author IDs
    onChange: (objectValue: { value: string; label: string }[]) => void;
    error?: string;
}

const FormFieldMultiSelect = ({ label, options, value, onChange, error }: FormFieldMultiSelectProps) => {
      const { t } = useTranslation();
    return (
        <div className="grid w-full gap-2 content-start">
            <FormLabel label={label} />
            <MultipleSelector
                defaultOptions={options}
                badgeClassName='bg-border text-border-forground text-sm rounded'
                value={value} // pass current selected values
                onChange={onChange} // callback when selection changes
                placeholder={t(`Select ${label}...`)}
                className='dark:border-white/20 rounded'
                emptyIndicator={<p className="text-center text-sm text-gray-500 dark:text-gray-400">{t('No results found.')}</p>}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default FormFieldMultiSelect;
