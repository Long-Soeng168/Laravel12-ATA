import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container overflow-hidden rounded-lg border">
                <ScrollArea className="w-full">
                    <Table>
                        <TableHeader className="table-header bg-accent/30">
                            <TableRow>
                                <TableHeadWithSort field="id" label={t('ID')} />
                                <TableHeadWithSort label={t('Action')} />
                                <TableHeadWithSort label={t('Logo')} />
                                <TableHeadWithSort label={t('Banner')} />
                                <TableHeadWithSort field="name" label={t('Name')} />
                                <TableHeadWithSort field="phone" label={t('Phone')} />
                                <TableHeadWithSort field="owner_user_id" label={t('Owner')} />
                                <TableHeadWithSort field="order_index" label={t('Order')} />
                                <TableHeadWithSort field="created_at" label={t('Created at')} />
                                <TableHeadWithSort field="updated_at" label={t('Updated at')} />
                            </TableRow>
                        </TableHeader>
                        <TableBody className="table-body">
                            {tableData?.data?.map((item: any) => (
                                <TableRow key={item.id} className="group table-row">
                                    <TableCellText value={item.id} />

                                    <TableCellActions>
                                        <div className="flex items-center gap-2">
                                            <EditItemButton url={`/admin/garages/${item.id}/edit`} permission="garage update" />
                                            <ViewItemButton url={`/admin/garages/${item.id}`} permission="garage view" />
                                            <DeleteItemButton deletePath="/admin/garages/" id={item.id} permission="garage delete" />
                                        </div>
                                    </TableCellActions>

                                    {/* Logo/Image */}
                                    <TableCell>
                                        <button className="bg-muted/50 size-10 overflow-hidden rounded border transition-transform hover:scale-110">
                                            <img
                                                src={item.logo ? `/assets/images/garages/thumb/${item.logo}` : `/assets/icons/image-icon.png`}
                                                className="h-full w-full object-contain"
                                                alt=""
                                            />
                                        </button>
                                    </TableCell>

                                    {/* Banner */}
                                    <TableCell>
                                        <button className="bg-muted/50 h-10 w-16 overflow-hidden rounded border transition-transform hover:scale-105">
                                            <img
                                                src={item.banner ? `/assets/images/garages/thumb/${item.banner}` : `/assets/icons/image-icon.png`}
                                                className="h-full w-full object-cover"
                                                alt=""
                                            />
                                        </button>
                                    </TableCell>

                                    <TableCellText value={item.name} />
                                    <TableCellText value={item.phone} className="whitespace-nowrap" />

                                    <TableCell>
                                        <div className="flex min-w-[20ch] flex-col gap-1">
                                            <span className="text-foreground text-[12px]">{item.owner?.name}</span>
                                            <span className="text-muted-foreground text-[10px]">{item.owner?.email}</span>
                                        </div>
                                    </TableCell>

                                    <TableCellText value={item.order_index} />

                                    <TableCellDate value={item.created_at} />
                                    <TableCellDate value={item.updated_at} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
