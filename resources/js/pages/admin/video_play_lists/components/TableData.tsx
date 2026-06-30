import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import MyImageGallery from '@/components/my-image-gallery';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const TableData = () => {
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <MyImageGallery
                    imagePath="/assets/images/video_play_lists/"
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

                            <TableHeadWithSort field="code" label={t('Code')} />
                            <TableHeadWithSort field="name" label={t('Name')} />
                            <TableHeadWithSort field="price" label={t('Price')} />
                            <TableHeadWithSort field="short_description" label={t('Short Description')} />
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
                                            <EditItemButton url={`/admin/video_play_lists/${item.id}/edit`} permission="video update" />
                                            <ViewItemButton url={`/admin/video_play_lists/${item.id}`} permission="video view" />
                                            <DeleteItemButton deletePath="/admin/video_play_lists/" id={item.id} permission="video delete" />
                                        </div>
                                    </TableCellActions>
                                    <TableCell>
                                        {item.image ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedImages([{ image: item.image }]);
                                                    setIsOpenViewImages(true);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <img
                                                    src={`/assets/images/video_play_lists/thumb/` + item.image}
                                                    alt=""
                                                    className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                                />
                                            </button>
                                        ) : (
                                            <img
                                                src={`/assets/icons/image-icon.png`}
                                                alt=""
                                                className="size-10 object-contain"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCellText value={item.code} />
                                    <TableCellText value={item.name} />
                                    <TableCellText value={item.price ? `$${item.price}` : '---'} />
                                    <TableCellText value={item.short_description} />
                                    <TableCellBadge
                                        value={item.status}
                                        statusMap={{
                                            active: { label: 'Active', color: 'green' },
                                            inactive: { label: 'Inactive', color: 'red' },
                                        }}
                                        id={item.id}
                                        pathName="/admin/video_play_lists"
                                        permission="video update"
                                    />
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
