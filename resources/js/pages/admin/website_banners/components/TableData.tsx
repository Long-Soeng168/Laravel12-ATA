import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import MyImageGallery from '@/components/my-image-gallery';
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
import { useState } from 'react';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();

    const { tableData } = usePage<any>().props;

    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <MyImageGallery
                    imagePath="/assets/images/website_banners/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{t('No')}</TableHead>
                            <TableHead className="text-left">{t('Action')}</TableHead>
                            <TableHead>{t('Image')}</TableHead>
                            <TableHeadWithSort field="type" label={t('Type')} />
                            <TableHeadWithSort field="title_1" label={t('Title 1')} />
                            <TableHeadWithSort field="title_1_kh" label={t('Title 1 Khmer')} />
                            <TableHeadWithSort field="order_index" label={t('Order')} />
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
                                    {tableData?.current_page > 1 ? tableData?.per_page * (tableData?.current_page - 1) + index + 1 : index + 1}
                                </TableCell>
                                <TableCellActions>
                                    <div className="flex items-center gap-2">
                                        <EditItemButton url={`/admin/website_banners/${item.id}/edit`} permission="banner update" />
                                        <ViewItemButton url={`/admin/website_banners/${item.id}`} />
                                        <DeleteItemButton deletePath="/admin/website_banners/" id={item.id} permission="banner delete" />
                                    </div>
                                </TableCellActions>
                                <TableCell>
                                    {item.image && (
                                        <button
                                            onClick={() => {
                                                setSelectedImages([{ image: item.image }]);
                                                setIsOpenViewImages(true);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <img
                                                src={item.image.startsWith('/') ? item.image : `/assets/images/website_banners/thumb/${item.image}`}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                                onError={(e: any) => { e.target.src = item.image.startsWith('/') ? item.image : `/assets/images/website_banners/${item.image}`; }}
                                            />
                                        </button>
                                    )}
                                    {!item.image && (
                                        <img
                                            src={`/assets/icons/image-icon.png`}
                                            width={100}
                                            height={100}
                                            alt=""
                                            className="size-10 object-contain"
                                        />
                                    )}
                                </TableCell>
                                <TableCellText value={item.type === 'hero_slide' ? 'Hero Slide' : 'Mini Banner'} />
                                <TableCellText value={item.title_1} />
                                <TableCellText value={item.title_1_kh} />
                                <TableCellText value={item.sort_order} />
                                <TableCell>
                                    {hasPermission('banner update') ? (
                                        <MyUpdateStatusButton
                                            id={item.id}
                                            pathName="/admin/website_banners"
                                            currentStatus={item.status}
                                            statuses={['active', 'inactive']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.status}</span>
                                    )}
                                </TableCell>
                                <TableCellDate value={item.created_at} />
                                <TableCellText value={item.created_by_user?.name} />
                                <TableCellDate value={item.updated_at} />
                                <TableCellText value={item.updated_by_user?.name} />
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
