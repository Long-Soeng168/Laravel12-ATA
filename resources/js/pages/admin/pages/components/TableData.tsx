import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import MyImageGallery from '@/components/my-image-gallery';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import { useState } from 'react';

const TableData = () => {
    const { t } = useTranslation();
    const hasPermission = usePermission();
    const { tableData } = usePage<any>().props;

    const [selectedImages, setSelectedImages] = useState([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <MyImageGallery
                    imagePath="/assets/images/pages/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader className="table-header bg-accent/30">
                        <TableRow>
                            <TableHeadWithSort label={t('No')} />
                            <TableHeadWithSort label={t('Action')} />

                            <TableHeadWithSort label={t('Image')} />
                            <TableHeadWithSort label={t('Link')} />
                            <TableHeadWithSort label={t('Code')} />
                            
                            <TableHeadWithSort field="title" label={t('Title')} />
                            <TableHeadWithSort field="title_kh" label={t('Title Khmer')} />
                            
                            <TableHeadWithSort field="order_index" label={t('Order Index')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            <TableHeadWithSort field="parent_id" label={t('Parent')} />
                            <TableHeadWithSort field="type" label={t('Type')} />
                            <TableHeadWithSort field="position_code" label={t('Position Code')} />

                            <TableHeadWithSort field="created_at" label={t('Created at')} />
                            <TableHeadWithSort field="created_by" label={t('Created by')} />
                            <TableHeadWithSort field="updated_at" label={t('Updated at')} />
                            <TableHeadWithSort field="updated_by" label={t('Updated by')} />
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
                                            <EditItemButton url={`/admin/pages/${item.id}/edit`} permission="page update" />
                                            <ViewItemButton url={`/admin/pages/${item.id}`} />
                                            <DeleteItemButton deletePath="/admin/pages/" id={item.id} permission="page delete" />
                                        </div>
                                    </TableCellActions>

                                    <TableCell>
                                        {item.images && item.images[0] ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedImages(item.images);
                                                    setIsOpenViewImages(true);
                                                }}
                                                className="cursor-pointer hover:bg-border overflow-hidden"
                                            >
                                                <img
                                                    src={`/assets/images/pages/thumb/` + item.images[0]?.image}
                                                    width={100}
                                                    height={100}
                                                    alt=""
                                                    className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                                />
                                            </button>
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
                                    
                                    <TableCell className="text-center">
                                        {item.link ? (
                                            <a href={`${item.link}`} target="_blank" rel="noreferrer">
                                                <MyTooltipButton variant="ghost" title={item.link} className="p-0 hover:bg-transparent">
                                                    {item.source_detail ? (
                                                        <span>
                                                            <img
                                                                src={`/assets/images/links/thumb/${item?.source_detail?.image}`}
                                                                className="aspect-square h-10 object-contain"
                                                                alt=""
                                                            />
                                                        </span>
                                                    ) : (
                                                        <SquareArrowOutUpRightIcon className="hover:stroke-3" />
                                                    )}
                                                </MyTooltipButton>
                                            </a>
                                        ) : (
                                            '---'
                                        )}
                                    </TableCell>

                                    <TableCellText value={item.code} />
                                    <TableCellText value={item.title} />
                                    <TableCellText value={item.title_kh} />
                                    <TableCellText value={item.order_index} />

                                    <TableCell>
                                        {hasPermission('page update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/pages"
                                                currentStatus={item.status}
                                                statuses={['active', 'inactive']}
                                            />
                                        ) : (
                                            <span className="capitalize">{item.status}</span>
                                        )}
                                    </TableCell>

                                    <TableCellText value={item.parent?.title} />
                                    <TableCellText value={item.type} />
                                    <TableCellText value={item.position_code} />

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
