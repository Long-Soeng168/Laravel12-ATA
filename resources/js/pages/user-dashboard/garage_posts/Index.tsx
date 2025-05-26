import MyAddNewButton from '@/components/my-add-new-button';
import { MyPagination } from '@/components/my-pagination';
import { MyRefreshButton } from '@/components/my-refresh-button';
import { MySearchTableData } from '@/components/my-search-table-data';
import useRole from '@/hooks/use-role';
import useTranslation from '@/hooks/use-translation';
import { BreadcrumbItem } from '@/types';
import UserDashboardAppLayout from '../layouts/app-layout';
import { MyFilterButton } from './components/my-filter-button';
import MyTableData from './components/my-table-data';

const Index = () => {
    const hasRole = useRole();
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Garage Posts'),
            href: '/admin/user-garage_posts',
        },
    ];
    return (
        <UserDashboardAppLayout breadcrumbs={breadcrumbs}>
            <div className="flex max-w-[100vw] flex-wrap items-center justify-end gap-2">
                <div className="flex max-w-[100vw] flex-wrap items-center justify-start gap-2 max-lg:w-full lg:flex-1">
                    <MySearchTableData />
                    <MyFilterButton />
                    <MyRefreshButton />
                    <span className="flex-1"></span>
                    {/* <MyExportButton />
                    <MyImportButton /> */}
                    {hasRole('Garage') && <MyAddNewButton url="/user-garage_posts/create" type="link" />}
                </div>
            </div>
            <div className="h-2" />
            <MyTableData />
            <MyPagination />
        </UserDashboardAppLayout>
    );
};

export default Index;
