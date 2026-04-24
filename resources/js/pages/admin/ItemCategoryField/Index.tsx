import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
// import FilterData from './FilterData'; // Uncomment if you use the category filter
// import HelpDialog from './HelpDialog';
import TableData from './TableData';

const Index = () => {
    const { filteredCategory } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Items', href: '/admin/items' },
        { title: 'Categories', href: '/admin/item-categories' },
        {
            title: 'Fields',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <>
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                    <div className="flex w-full gap-2 md:w-auto">
                        {/* Search now targets label, label_kh, and field_key */}
                        <TableDataSearch placeholder="Search fields..." />
                        <RefreshButton />
                    </div>

                    <div className="flex w-full justify-end md:w-auto">
                        {/* Redirect to the field creation page. 
                            Pass the category_id so the field is automatically linked.
                        */}
                        <NewItemButton
                            url={`/admin/item-category-fields/create?category_id=${filteredCategory?.id || ''}`}
                            permission="item create"
                        />
                    </div>
                </div>

                <TableData />

                <div className="mt-4">
                    <PaginationTabs />
                </div>
            </>
        </AppLayout>
    );
};

export default Index;
