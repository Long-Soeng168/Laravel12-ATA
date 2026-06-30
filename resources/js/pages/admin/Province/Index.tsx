import CategoryBreadcrumb from '@/components/Breadcrumb/CategoryBreadcrumb';
import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TableData from './TableData';

const Index = () => {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Dashboard'), href: '/dashboard' },
        {
            title: t('Provinces'),
            href: '/admin/provinces',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <>
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                    <div className="flex w-full gap-2 md:w-auto">
                        {/* <FilterData /> */}
                        <TableDataSearch />
                        <RefreshButton />
                        {/* <HelpDialog /> */}
                    </div>
                    <div className="flex w-full justify-end md:w-auto">
                        {/* Add New Dialog */}
                        <NewItemButton url={`/admin/provinces/create`} permission="garage create" />
                    </div>
                </div>
                <CategoryBreadcrumb path="/admin/provinces" />
                <TableData />
                <PaginationTabs />
            </>
        </AppLayout>
    );
};

export default Index;
