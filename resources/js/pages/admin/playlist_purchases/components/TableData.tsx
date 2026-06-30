import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const TableData = () => {
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;
    const hasPermission = usePermission();

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <Table>
                    <TableHeader className="table-header bg-accent/30">
                        <TableRow>
                            <TableHeadWithSort label={t('No')} />
                            <TableHeadWithSort label={t('Action')} />

                            <TableHeadWithSort field="playlist_id" label={t('Playlist')} />
                            <TableHeadWithSort field="user_id" label={t('Buyer')} />
                            <TableHeadWithSort field="status" label={t('Status')} />

                            <TableHeadWithSort field="created_at" label={t('Created at')} />
                            <TableHeadWithSort label={t('Created by')} />
                            <TableHeadWithSort field="updated_at" label={t('Updated at')} />
                            <TableHeadWithSort label={t('Updated by')} />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any, index: number) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {tableData?.current_page > 1 ? tableData?.per_page * (tableData?.current_page - 1) + index + 1 : index + 1}
                                    </TableCell>
                                    <TableCellActions>
                                        <div className="flex items-center gap-2">
                                            <EditItemButton url={`/admin/playlist_purchases/${item.id}/edit`} permission="video update" />
                                            <ViewItemButton url={`/admin/playlist_purchases/${item.id}`} permission="video view" />
                                            <DeleteItemButton deletePath="/admin/playlist_purchases/" id={item.id} permission="video delete" />
                                        </div>
                                    </TableCellActions>
                                    <TableCellText value={item.playlist?.name} />
                                    <TableCellText value={`${item.buyer?.name} (${item.buyer?.email})`} />
                                    <TableCell>
                                        {hasPermission('video update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/playlist_purchases"
                                                currentStatus={item.status}
                                                statuses={['pending', 'completed', 'cancelled']}
                                            />
                                        ) : (
                                            <span className="capitalize">{item.status}</span>
                                        )}
                                    </TableCell>
                                    <TableCellDate value={item.created_at} />
                                    <TableCellText value={item.created_by?.name} />
                                    <TableCellDate value={item.updated_at} />
                                    <TableCellText value={item.updated_by?.name} />
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
