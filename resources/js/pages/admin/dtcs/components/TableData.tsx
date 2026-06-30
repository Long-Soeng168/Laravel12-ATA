import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const TableData = () => {
    const { t } = useTranslation();
    const hasPermission = usePermission();
    const { tableData } = usePage<any>().props;

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <Table>
                    <TableHeader className="table-header bg-accent/30">
                        <TableRow>
                            <TableHeadWithSort label={t('No')} />
                            <TableHeadWithSort label={t('Action')} />

                            <TableHeadWithSort field="code" label={t('Code')} />
                            <TableHeadWithSort field="short_description" label={t('Short Description')} />
                            <TableHeadWithSort field="short_description_kh" label={t('Short Description Khmer')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            
                            <TableHeadWithSort field="created_at" label={t('Created at')} />
                            <TableHeadWithSort field="updated_at" label={t('Updated at')} />
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
                                            <EditItemButton url={`/admin/dtcs/${item.id}/edit`} permission="dtc update" />
                                            <ViewItemButton url={`/admin/dtcs/${item.id}`} permission="dtc view" />
                                            <DeleteItemButton deletePath="/admin/dtcs/" id={item.id} permission="dtc delete" />
                                        </div>
                                    </TableCellActions>
                                    
                                    <TableCellText value={item.code} />
                                    <TableCellText value={item.short_description} />
                                    <TableCellText value={item.short_description_kh} />
                                    <TableCell>
                                        {hasPermission('dtc update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/dtcs"
                                                currentStatus={item.status}
                                                statuses={['active', 'inactive']}
                                            />
                                        ) : (
                                            <span className="capitalize">{item.status}</span>
                                        )}
                                    </TableCell>
                                    
                                    <TableCellDate value={item.created_at} />
                                    <TableCellDate value={item.updated_at} />
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
