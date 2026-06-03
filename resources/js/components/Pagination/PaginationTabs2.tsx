import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PaginationTabs2({
    containerClassName,
    perPageList = [10, 20, 50, 100, 200],
}: {
    containerClassName?: string;
    perPageList?: number[];
}) {
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;
    const links = tableData?.links || [];

    if (!tableData) return null;

    // Initialize perPage from query param or tableData.per_page
    const getInitialPerPage = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return params.get('perPage') || tableData.per_page?.toString() || '10';
        }
        return tableData.per_page?.toString() || '10';
    };

    const [rowsPerPage, setRowsPerPage] = useState(getInitialPerPage);

    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    queryParams.delete('page');
    const queryString = queryParams.toString();

    const renderLabel = (label: string) => {
        return label;
    };

    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(value);
        queryParams.set('perPage', value);
        queryParams.delete('page'); // reset to first page
        const newQuery = queryParams.toString();
        const url = `${window.location.pathname}?${newQuery}`;
        router.visit(url, { preserveScroll: true });
    };

    return (
        <div className={cn('bg-card/50 mt-14 flex flex-col items-center justify-between gap-6 backdrop-blur-sm xl:flex-row', containerClassName)}>
            {/* Left Side: Select & Info */}
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-4">
                <div className="flex items-center gap-3">
                    <Select value={rowsPerPage} onValueChange={handleRowsPerPageChange}>
                        <SelectTrigger
                            disabled={perPageList[0] >= tableData.total}
                            className="border-border bg-background h-10 w-fit gap-2 rounded-md px-3 font-semibold shadow-none transition-all hover:border-[#FF6D00]/50 focus:ring-2 focus:ring-[#FF6D00]/20"
                        >
                            <SelectValue placeholder={rowsPerPage} />
                        </SelectTrigger>
                        <SelectContent className="rounded-md">
                            {perPageList
                                .filter((n) => n <= tableData.total)
                                .map((n) => (
                                    <SelectItem key={n} value={n.toString()} className="cursor-pointer rounded-sm font-medium">
                                        {n} /{t('Page')}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Subtle Divider for Desktop */}
                <div className="bg-border/60 hidden h-6 w-px sm:block"></div>

                <span className="text-muted-foreground text-sm">
                    {t('Showing')} <span className="text-foreground font-bold">{tableData.from}</span> -{' '}
                    <span className="text-foreground font-bold">{tableData.to}</span> {t('of')}{' '}
                    <span className="font-bold text-[#FF6D00]">{tableData.total}</span>
                </span>
            </div>

            {/* Right Side: Pagination Links */}
            <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
                {links.map((item: any, index: number) => {
                    const isPrevNext =
                        item.label.includes('Previous') ||
                        item.label.includes('Next') ||
                        item.label.includes('&laquo;') ||
                        item.label.includes('&raquo;');

                    return (
                        <Link
                            key={item.label + index}
                            preserveScroll
                            href={item.url ? `${item.url}&${queryString}` : '#'}
                            className={cn(
                                'relative flex h-10 min-w-[40px] items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all duration-300',

                                // Disabled State (e.g., Previous button on page 1)
                                !item.url && 'border-border/50 bg-muted/30 text-muted-foreground/40 cursor-not-allowed border',

                                // Default Inactive Hover State
                                item.url &&
                                    !item.active &&
                                    'border-border bg-background text-foreground border hover:-translate-y-0.5 hover:border-[#FF6D00]/50 hover:text-[#FF6D00] hover:shadow-[0_6px_15px_-5px_rgba(255,109,0,0.3)]',

                                // Active State (Using the premium Brand Gradient)
                                item.active &&
                                    'pointer-events-none border-transparent bg-gradient-to-br from-[#FF8A33] to-[#E66200] text-white shadow-[0_6px_15px_-5px_rgba(255,109,0,0.5)]',

                                isPrevNext && 'px-4',
                            )}
                        >
                            <span dangerouslySetInnerHTML={{ __html: t(renderLabel(item.label)) }} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
