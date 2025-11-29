import { TableCell } from '@/components/ui/table';

interface TableCellDateProps {
    value?: string | null;
    fallback?: string;
    className?: string;
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
}

const TableCellDate = ({
    value,
    fallback = '---',
    className = '',
    locale = 'en-UK',
    options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
}: TableCellDateProps) => {
    return <TableCell className={className}>{value ? new Date(value).toLocaleDateString(locale, options) : fallback}</TableCell>;
};

export default TableCellDate;
