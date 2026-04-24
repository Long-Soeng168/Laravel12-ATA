import NewItemButton from '@/components/Button/NewItemButton';
import RefreshButton from '@/components/Button/RefreshButton';
import PaginationTabs from '@/components/Pagination/PaginationTabs';
import TableDataSearch from '@/components/Search/TableDataSearch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import TableData from './TableData';

const Index = () => {
    // Note: We use filteredField here as the parent context
    const { filteredField } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/admin/item-categories' },
        {
            title: `Fields`,
            href: `#`,
        },
        {
            title: filteredField ? `(${filteredField.label}) options` : 'Field Options',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <>
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-6">
                    <div className="flex w-full gap-2 md:w-auto">
                        <TableDataSearch placeholder="Search options..." />
                        <RefreshButton />
                    </div>

                    <div className="flex w-full justify-end md:w-auto">
                        {/* Redirect to the option creation page. 
                            Pass the field_id so the option is automatically linked to the field.
                        */}
                        <NewItemButton
                            url={`/admin/item-category-field-options/create?field_id=${filteredField?.id || ''}`}
                            permission="item create"
                        />
                    </div>
                </div>

                {/* Optional: Header to show context */}
                {filteredField && (
                    <div className="mb-4 px-2">
                        <h2 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                            All Options for: <span className="text-foreground font-bold">{filteredField.label}</span> Field
                        </h2>
                    </div>
                )}

                <TableData />

                <div className="mt-4">
                    <PaginationTabs />
                </div>
            </>
        </AppLayout>
    );
};

export default Index;
