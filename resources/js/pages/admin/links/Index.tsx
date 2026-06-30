import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TableData from './components/TableData';

const Index = () => {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Links'),
            href: '/admin/links',
        },
    ];
    const hasPermission = usePermission();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex max-w-[100vw] flex-wrap items-center justify-between gap-2 p-4">
                <div className="flex items-center gap-2 max-lg:w-full">
                    <TableDataSearch />
                    <RefreshButton />
                </div>
                <div className="flex items-center gap-2">
                    {hasPermission('link create') && <NewItemButton url="/admin/links/create" />}
                </div>
            </div>
            <div className="px-4">
                <TableData />
            </div>
            <div className="p-4">
                <PaginationTabs />
            </div>
        </AppLayout>
    );
};

export default Index;
