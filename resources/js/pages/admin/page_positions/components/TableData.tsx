import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import MyNoData from '@/components/my-no-data';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{t('No')}</TableHead>
                            <TableHead className="text-left">{t('Action')}</TableHead>
                            <TableHeadWithSort field="code" label={t('Code')} />
                            <TableHeadWithSort field="name" label={t('Name')} />
                            <TableHeadWithSort field="name_kh" label={t('Name Khmer')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            <TableHeadWithSort field="created_at" label={t('Created At')} />
                            <TableHeadWithSort field="created_by" label={t('Created By')} />
                            <TableHeadWithSort field="updated_at" label={t('Updated At')} />
                            <TableHeadWithSort field="updated_by" label={t('Updated By')} />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    {tableData?.current_page > 1
                                        ? tableData?.per_page * (tableData?.current_page - 1) + index + 1
                                        : index + 1}
                                </TableCell>
                                <TableCellActions>
                                    <div className="flex items-center gap-2">
                                        <EditItemButton url={`/admin/page_positions/${item.id}/edit`} permission="page update" />
                                        <ViewItemButton url={`/admin/page_positions/${item.id}`} />
                                        <DeleteItemButton deletePath="/admin/page_positions/" id={item.id} permission="page delete" />
                                    </div>
                                </TableCellActions>
                                <TableCellText value={item.code} />
                                <TableCellText value={item.name} />
                                <TableCellText value={item.name_kh} />
                                <TableCell>
                                    {hasPermission('page update') ? (
                                        <MyUpdateStatusButton
                                            id={item.id}
                                            pathName="/admin/page_positions"
                                            currentStatus={item.status}
                                            statuses={['active', 'inactive']}
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
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {tableData?.data?.length < 1 && <MyNoData />}
        </>
    );
};

export default TableData;
