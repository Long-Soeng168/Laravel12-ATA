import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { usePage } from '@inertiajs/react';

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
                            <TableHeadWithSort field="label_en" label="Label (EN)" />
                            <TableHeadWithSort field="label_kh" label="Label (KH)" />
                            <TableHeadWithSort field="option_value" label="Value (Key)" />
                            <TableHeadWithSort field="order_index" label="Order" />
                            <TableHeadWithSort label="Field" />
                            <TableHeadWithSort field="created_at" label="Created at" />
                            <TableHeadWithSort field="updated_at" label="Updated at" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any) => (
                            <TableRow className="table-row" key={item.id}>
                                <TableCellText value={item.id} />

                                <TableCellActions>
                                    <div className="space-x-2">
                                        <EditItemButton url={`/admin/item-category-field-options/${item.id}/edit`} permission="item update" />
                                        <ViewItemButton url={`/admin/item-category-field-options/${item.id}`} permission="item view" />
                                        <DeleteItemButton deletePath="/admin/item-category-field-options/" id={item.id} permission="item delete" />
                                    </div>
                                </TableCellActions>

                                <TableCellText value={item.label_en} className="font-medium" />
                                <TableCellText value={item.label_kh} />
                                <TableCellText value={item.option_value} className="font-mono text-xs text-green-600 dark:text-green-400" />

                                <TableCellText value={item.order_index} />

                                <TableCell>
                                    <span className="flex w-auto flex-col gap-1">
                                        <Badge variant="outline">{item.field?.label}</Badge>
                                        <span className="text-muted-foreground text-[10px] italic">({item.field?.category?.name})</span>
                                    </span>
                                </TableCell>

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
