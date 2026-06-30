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
import VideoDialog from '@/components/video-dialog';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import MyImageGallery from '@/components/my-image-gallery';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);

    return (
        <>
            <div className="table-data-container">
                <ScrollArea className="w-full">
                    <MyImageGallery
                        imagePath="/assets/images/videos/"
                        selectedImages={selectedImages}
                        isOpenViewImages={isOpenViewImages}
                        setIsOpenViewImages={setIsOpenViewImages}
                    />
                    <Table>
                        <TableHeader className="table-header bg-accent/30">
                            <TableRow>
                                <TableHeadWithSort field="id" label={t('ID')} />
                                <TableHeadWithSort label={t('Action')} />
                                <TableHeadWithSort label={t('Image')} />
                                <TableHeadWithSort label={t('Video')} />
                                <TableHeadWithSort field="title" label={t('Title')} />
                                <TableHeadWithSort field="playlist_code" label={t('Playlist Code')} />
                                <TableHeadWithSort field="short_description" label={t('Short Description')} />
                                <TableHeadWithSort field="is_free" label={t('Status Price')} />
                                <TableHeadWithSort field="status" label={t('Status')} />
                                <TableHeadWithSort field="total_view_counts" label={t('Total View Counts')} />
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
                                            <EditItemButton url={`/admin/videos/${item.id}/edit`} permission="video update" />
                                            <ViewItemButton url={`/admin/videos/${item.id}`} permission="video view" />
                                            <DeleteItemButton deletePath="/admin/videos/" id={item.id} permission="video delete" />
                                        </div>
                                    </TableCellActions>

                                    <TableCell>
                                        <button
                                            onClick={() => {
                                                if (item.image) {
                                                    setSelectedImages([{ image: item.image }]);
                                                    setIsOpenViewImages(true);
                                                }
                                            }}
                                            className="bg-muted/50 size-10 overflow-hidden rounded border transition-transform hover:scale-110"
                                        >
                                            <img
                                                src={item.image ? `/assets/images/videos/thumb/${item.image}` : `/assets/icons/image-icon.png`}
                                                className="h-full w-full object-contain"
                                                alt=""
                                            />
                                        </button>
                                    </TableCell>

                                    <TableCell>
                                        <span className="flex items-center justify-center">
                                            <VideoDialog videoSrc={`${item?.video_url}`} />
                                        </span>
                                    </TableCell>

                                    <TableCellText value={item.title} />
                                    <TableCellText value={item.playlist_code} />
                                    <TableCellText value={item.short_description} className="max-w-[200px] truncate" />

                                    <TableCell>
                                        {hasPermission('video update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/videos_free_status"
                                                currentStatus={item.is_free ? 'free' : 'purchase'}
                                                statuses={['free', 'purchase']}
                                            />
                                        ) : (
                                            <TableCellBadge className="capitalize" value={item.is_free ? 'Free' : 'Subscribe'} />
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {hasPermission('video update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/videos"
                                                currentStatus={item.status}
                                                statuses={['active', 'inactive']}
                                            />
                                        ) : (
                                            <TableCellBadge className="capitalize" value={item.status} />
                                        )}
                                    </TableCell>

                                    <TableCellText value={item.total_view_counts ? `${item.total_view_counts} views` : '---'} />

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
