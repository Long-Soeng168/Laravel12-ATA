import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import MyNoData from '@/components/my-no-data';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const TableData = () => {
    const { t } = useTranslation();
    const hasPermission = usePermission();
    const { tableData } = usePage().props as any;

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{t('No')}</TableHead>
                            <TableHead className="text-left">{t('Action')}</TableHead>
                            <TableHead>{t('Image')}</TableHead>
                            <TableHeadWithSort field="title" label={t('Title')} />
                            <TableHeadWithSort field="title_kh" label={t('Title Khmer')} />
                            <TableHeadWithSort field="price" label={t('Price')} />
                            <TableHeadWithSort field="short_description" label={t('Short Description')} />
                            <TableHeadWithSort field="short_description_kh" label={t('Short Description Khmer')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            <TableHead>{t('Created At')}</TableHead>
                            <TableHead>{t('Updated At')}</TableHead>
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
                                        <EditItemButton url={`/admin/courses/${item.id}/edit`} permission="course update" />
                                        <ViewItemButton url={`/admin/courses/${item.id}`} permission="course view" />
                                        <DeleteItemButton deletePath="/admin/courses/" id={item.id} permission="course delete" />
                                        </div>
                                    </TableCellActions>
                                    <TableCell>
                                        {item.image ? (
                                            <img
                                                src={`/assets/images/courses/thumb/` + item.image}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={`/assets/icons/image-icon.png`}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCellText value={item.title} />
                                    <TableCellText value={item.title_kh} />
                                    <TableCellText value={item.price ? `$${item.price}` : ''} />
                                    <TableCellText value={item.short_description} />
                                    <TableCellText value={item.short_description_kh} />
                                    <TableCell>
                                        {hasPermission('course update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/courses"
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
            {tableData?.data?.length === 0 && <MyNoData />}
        </>
    );
};

export default TableData;
