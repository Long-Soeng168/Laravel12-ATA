import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container">
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
                                <TableHeadWithSort field="status" label={t('Status')} />
                                <TableHeadWithSort field="expired_at" label={t('Expired at')} />
                                <TableHeadWithSort field="is_verified" label={t('Verified')} />
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
                                            <EditItemButton url={`/admin/shops/${item.id}/edit`} permission="shop update" />
                                            <ViewItemButton url={`/admin/shops/${item.id}`} permission="shop view" />
                                            <DeleteItemButton deletePath="/admin/shops/" id={item.id} permission="shop delete" />
                                        </div>
                                    </TableCellActions>

                                    {/* Logo Cell */}
                                    <TableCell>
                                        <button className="bg-muted/50 size-10 overflow-hidden rounded border transition-transform hover:scale-110">
                                            <img
                                                src={item.logo ? `/assets/images/shops/thumb/${item.logo}` : `/assets/icons/image-icon.png`}
                                                className="h-full w-full object-contain"
                                                alt=""
                                            />
                                        </button>
                                    </TableCell>

                                    {/* Banner Cell */}
                                    <TableCell>
                                        <button className="bg-muted/50 h-10 w-16 overflow-hidden rounded border transition-transform hover:scale-105">
                                            <img
                                                src={item.banner ? `/assets/images/shops/thumb/${item.banner}` : `/assets/icons/image-icon.png`}
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

                                    <TableCell>
                                        {hasPermission('shop update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/shops"
                                                currentStatus={item.status}
                                                statuses={['pending', 'approved', 'suspended', 'rejected']}
                                            />
                                        ) : (
                                            <TableCellBadge className="capitalize" value={item.status} />
                                        )}
                                    </TableCell>

                                    {/* Expiry Logic */}
                                    <TableCell>
                                        {(() => {
                                            if (!item.expired_at) return <TableCellText value="---" />;
                                            const today = new Date();
                                            const expiredDate = new Date(item.expired_at);
                                            const diffDays = Math.ceil((expiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                            let badgeVariant: any = 'outline';
                                            if (diffDays <= 0) badgeVariant = 'destructive';
                                            else if (diffDays <= 30) badgeVariant = 'secondary';

                                            return (
                                                <div className="flex flex-col">
                                                    <TableCellBadge variant={badgeVariant} value={format(expiredDate, 'dd MMM yyyy')} />
                                                    {diffDays <= 30 && diffDays > 0 && (
                                                        <span className="mt-1 text-[9px] font-bold text-orange-500 uppercase">
                                                            {diffDays} {t('days left')}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </TableCell>

                                    {/* Verified Status */}
                                    <TableCell>
                                        {item.is_verified ? (
                                            <TableCellBadge variant="default" className="bg-blue-500 hover:bg-blue-600" value={t('Verified')} />
                                        ) : (
                                            <TableCellText value="---" />
                                        )}
                                    </TableCell>

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
