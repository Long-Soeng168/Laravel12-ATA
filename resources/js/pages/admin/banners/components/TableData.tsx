import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import MyImageGallery from '@/components/my-image-gallery';
import MyNoData from '@/components/my-no-data';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { FileVideoIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
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
                    imagePath="/assets/images/banners/"
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
                            {/* <TableHead className="text-center">Video</TableHead> */}
                            {/* <TableHead className="text-center">Link</TableHead> */}
                            <TableHeadWithSort field="title" label={t('Title')} />
                            <TableHeadWithSort field="title_kh" label={t('Title Khmer')} />
                            <TableHeadWithSort field="order_index" label={t('Order Index')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            {/* <TableHeadWithSort field="type" label={t('Type')} /> */}
                            <TableHeadWithSort field="position_code" label="Position Code" />
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
                                        <EditItemButton url={`/admin/banners/${item.id}/edit`} permission="banner update" />
                                        <ViewItemButton url={`/admin/banners/${item.id}`} />
                                        <DeleteItemButton deletePath="/admin/banners/" id={item.id} permission="banner delete" />
                                    </div>
                                </TableCellActions>
                                <TableCell>
                                    {item.images[0] && item.type == 'multi_images' && (
                                        <button
                                            onClick={() => {
                                                setSelectedImages(item.images);
                                                setIsOpenViewImages(true);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <img
                                                src={`/assets/images/banners/thumb/` + item.images[0]?.image}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                            />
                                        </button>
                                    )}
                                    {item.image && item.type !== 'multi_images' && (
                                        <button
                                            onClick={() => {
                                                setSelectedImages([{ image: item.image }]);
                                                setIsOpenViewImages(true);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <img
                                                src={`/assets/images/banners/thumb/` + item.image}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                            />
                                        </button>
                                    )}
                                    {!item.images[0] && !item.image && (
                                        <img
                                            src={`/assets/icons/image-icon.png`}
                                            width={100}
                                            height={100}
                                            alt=""
                                            className="size-10 object-contain"
                                        />
                                    )}
                                </TableCell>
                                {/*
                                <TableCell className="text-center">
                                    {item.video ? (
                                        <a href={`/assets/files/banners/videos/${item.video}`} target="_blank">
                                            <MyTooltipButton variant="ghost" title={item.video}>
                                                <FileVideoIcon className="hover:stroke-3" />
                                            </MyTooltipButton>
                                        </a>
                                    ) : (
                                        '---'
                                    )}
                                </TableCell>
                                */}
                                {/*
                                <TableCell className="text-center">
                                    {item.link ? (
                                        <a href={`${item.link}`} target="_blank">
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
                                */}
                                <TableCellText value={item.title} />
                                <TableCellText value={item.title_kh} />
                                <TableCellText value={item.order_index} />
                                <TableCell>
                                    {hasPermission('banner update') ? (
                                        <MyUpdateStatusButton
                                            id={item.id}
                                            pathName="/admin/banners"
                                            currentStatus={item.status}
                                            statuses={['active', 'inactive']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.status}</span>
                                    )}
                                </TableCell>
                                {/* <TableCellText value={item.type} /> */}
                                <TableCellText value={item.position_code} />
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
