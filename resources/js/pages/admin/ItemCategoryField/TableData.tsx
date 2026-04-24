import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';

const TableData = () => {
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container">
                <Table>
                    <TableHeader className="table-header">
                        <TableRow>
                            <TableHeadWithSort field="id" label="ID" />
                            <TableHeadWithSort label="Action" />
                            <TableHeadWithSort field="label" label="Label (EN)" />
                            <TableHeadWithSort field="label_kh" label="Label (KH)" />
                            <TableHeadWithSort field="field_key" label="Field Key" />
                            <TableHeadWithSort field="field_type" label="Type" />
                            <TableHeadWithSort field="order_index" label="Order" />
                            <TableHeadWithSort label="Options" />
                            <TableHeadWithSort label="Category" />
                            <TableHeadWithSort field="created_at" label="Created at" />
                            <TableHeadWithSort field="updated_at" label="Updated at" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any) => (
                            <TableRow
                                className="table-row"
                                key={item.id}
                                // Double click to manage options for this specific field
                                onDoubleClick={() => router.visit(`/admin/item-category-field-options?field_id=${item.id}`)}
                            >
                                <TableCellText value={item.id} />

                                <TableCellActions>
                                    <div className="space-x-2">
                                        <EditItemButton url={`/admin/item-category-fields/${item.id}/edit`} permission="item update" />
                                        <ViewItemButton url={`/admin/item-category-fields/${item.id}`} permission="item view" />
                                        <DeleteItemButton deletePath="/admin/item-category-fields/" id={item.id} permission="item delete" />
                                    </div>
                                </TableCellActions>

                                <TableCellText value={item.label} className="font-medium" />
                                <TableCellText value={item.label_kh} />
                                <TableCellText value={item.field_key} className="font-mono text-xs text-blue-600 dark:text-blue-400" />

                                <TableCell>
                                    <TableCellBadge className="capitalize" variant="outline" value={item.field_type} />
                                </TableCell>

                                <TableCellText value={item.order_index} />

                                <TableCell>
                                    {/* Link to show how many options exist for this field */}
                                    <button
                                        onClick={() => router.visit(`/admin/item-category-field-options?field_id=${item.id}`)}
                                        className="text-xs hover:underline"
                                    >
                                        <TableCellBadge variant="secondary" value={`${item.options_count || 0} Options`} />
                                    </button>
                                </TableCell>

                                <TableCellBadge variant="outline" value={`${item.category?.name}`} />

                                <TableCellDate value={item.created_at} />
                                <TableCellDate value={item.updated_at} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
