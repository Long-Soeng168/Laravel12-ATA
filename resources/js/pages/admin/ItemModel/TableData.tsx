import TableCellAvatar from '@/components/Avatar/TableCellAvatar';
import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
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
                            <TableHeadWithSort label="Image" />
                            <TableHeadWithSort field="code" label="Code" />
                            <TableHeadWithSort field="name" label="Name" />
                            <TableHeadWithSort field="name_kh" label="Name Khmer" />
                            {/* <TableHeadWithSort field="order_index" label="Order Index" /> */}
                            <TableHeadWithSort field="brand_code" label="Brand Code" />
                            <TableHeadWithSort field="created_at" label="Created at" />
                            <TableHeadWithSort field="created_by" label="Created by" />
                            <TableHeadWithSort field="updated_at" label="Updated at" />
                            <TableHeadWithSort field="updated_by" label="Updated by" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow
                                className="table-row"
                                key={item.id}
                                // onDoubleClick={() => router.visit(`/admin/item-models?category_code=${item.code}`)}
                            >
                                <TableCellText value={item.id} />
                                <TableCellActions>
                                    {item.deleted_at ? (
                                        <RecoverItem
                                            deleted_at={item.deleted_at}
                                            recoverPath={`/admin/item-models/${item.id}/recover`}
                                            permission="user update"
                                        />
                                    ) : (
                                        <div className="space-x-2">
                                            {/* Edit Dialog */}
                                            <EditItemButton url={`/admin/item-models/${item.id}/edit`} permission="item update" />

                                            {/* View Dialog */}
                                            <ViewItemButton url={`/admin/item-models/${item.id}`} permission="item view" />

                                            {/* Delete Item */}
                                            <DeleteItemButton deletePath="/admin/item-models/" id={item.id} permission="item delete" />
                                        </div>
                                    )}
                                </TableCellActions>
                                <TableCell>
                                    <TableCellAvatar
                                        className="rounded-none border-none object-contain"
                                        alt={item.name}
                                        image={`/assets/images/item_models/thumb/${item.image}`}
                                    />
                                </TableCell>
                                <TableCellText value={item.code} />
                                <TableCellText value={item.name} />
                                <TableCellText value={item.name_kh} />
                                {/* <TableCellText value={item.order_index} /> */}
                                <TableCellBadge variant="accent" value={item.brand_code} />
                                <TableCellDate value={item.created_at} />
                                <TableCellText value={item.created_user?.name} />
                                <TableCellDate value={item.updated_at} />
                                <TableCellText value={item.updated_user?.name} />
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
