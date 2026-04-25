import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TableData from './components/TableData';

const Index = () => {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Dashboard'), href: '/dashboard' },
        { title: t('Garages'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                <div className="flex w-full gap-2 md:w-auto">
                    {/* Standardized Search and Refresh */}
                    <TableDataSearch placeholder={t('Search garages...')} />
                    <RefreshButton />
                </div>

                <div className="flex w-full justify-end md:w-auto">
                    {/* Standardized Create Button */}
                    <NewItemButton url="/admin/garages/create" permission="garage create" />
                </div>
            </div>

            {/* Garage Table Component */}
            <TableData />

            {/* Standardized Pagination */}
            <div className="mt-4">
                <PaginationTabs />
            </div>
        </AppLayout>
    );
};

export default Index;
