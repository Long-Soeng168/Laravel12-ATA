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
        { title: t('Pages'), href: '/admin/pages' },
        { title: t('Positions'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                <div className="flex w-full gap-2 md:w-auto">
                    <TableDataSearch placeholder={t('Search...')} />
                    <RefreshButton />
                </div>

                <div className="flex w-full justify-end md:w-auto">
                    <NewItemButton url="/admin/page_positions/create" permission="page create" />
                </div>
            </div>

            <TableData />

            <div className="mt-4">
                <PaginationTabs />
            </div>
        </AppLayout>
    );
};

export default Index;
