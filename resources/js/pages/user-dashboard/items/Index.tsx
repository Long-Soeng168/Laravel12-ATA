import MyAddNewButton from '@/components/my-add-new-button';
import { MyPagination } from '@/components/my-pagination';
import { MyRefreshButton } from '@/components/my-refresh-button';
import { MySearchTableData } from '@/components/my-search-table-data';
import useRole from '@/hooks/use-role';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import ContactUsButton from '../components/contact-us-button';
import UserSuspended from '../shops/components/user-suspended';
import { MyFilterButton } from './components/my-filter-button';
import MyTableData from './components/my-table-data';

const Index = () => {
    const hasRole = useRole();
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Items'),
            href: '/user-items',
        },
    ];
    const { tableData, auth } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {auth?.shop?.status &&
                ['pending', 'suspended', 'rejected'].includes(auth?.shop?.status) &&
                (() => {
                    let title = '';
                    let subTitle = '';
                    let type: 'pending' | 'suspended' | 'rejected' = 'pending'; // default

                    switch (auth?.shop?.status) {
                        case 'pending':
                            title = t('Shop Pending!');
                            subTitle = 'Your shop is currently under review. Please wait until it gets approved.';
                            type = 'pending';
                            break;
                        case 'suspended':
                            title = t('Shop Suspended!');
                            subTitle = 'Your shop has been temporarily suspended. Please contact our support team.';
                            type = 'suspended';
                            break;
                        case 'rejected':
                            title = t('Shop Rejected!');
                            subTitle = 'Your shop application has been rejected. Please contact our support team for details.';
                            type = 'rejected';
                            break;
                        default:
                            break;
                    }

                    return <UserSuspended type={type} title={title} subTitle={subTitle} />;
                })()}
            <div className="flex max-w-[100vw] flex-wrap items-center justify-end gap-2">
                <div className="flex max-w-[100vw] flex-wrap items-center justify-start gap-2 max-lg:w-full lg:flex-1">
                    <MySearchTableData />
                    <MyFilterButton />
                    <MyRefreshButton />
                    <span className="flex-1"></span>
                    {/* <MyExportButton />
                    <MyImportButton /> */}
                     {auth?.shop?.status !== 'approved' ? (
                        ['pending', 'suspended', 'rejected'].includes(auth.shop.status) ? (
                            <div className="space-y-2">
                                <p
                                    className={
                                        auth.shop.status === 'pending'
                                            ? 'text-yellow-500'
                                            : auth.shop.status === 'suspended'
                                              ? 'text-gray-400'
                                              : 'text-red-600' // rejected
                                    }
                                >
                                    {auth.shop.status === 'pending' && t('Shop Pending!')}
                                    {auth.shop.status === 'suspended' && t('Shop Suspended!')}
                                    {auth.shop.status === 'rejected' && t('Shop Rejected!')}
                                </p>
                                <ContactUsButton />
                            </div>
                        ) : null
                    ) : (
                        hasRole('Shop') && <MyAddNewButton url="/user-items/create" type="link" />
                    )}
                </div>
            </div>
            <div className="h-2" />
            <MyTableData />
            <MyPagination />
        </AppLayout>
    );
};

export default Index;
