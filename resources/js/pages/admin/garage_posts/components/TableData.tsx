import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import MyImageGallery from '@/components/my-image-gallery';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
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
                    imagePath="/assets/images/garage_posts/"
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
                            
                            <TableHeadWithSort field="short_description" label={t('Short Description')} />
                            <TableHeadWithSort field="garage_id" label={t('Garage')} />
                            <TableHeadWithSort field="status" label={t('Status')} />

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
                                            <EditItemButton url={`/admin/garage_posts/${item.id}/edit`} permission="post update" />
                                            <ViewItemButton url={`/admin/garage_posts/${item.id}`} permission="post read" />
                                            <DeleteItemButton deletePath="/admin/garage_posts/" id={item.id} permission="post delete" />
                                        </div>
                                    </TableCellActions>

                                    <TableCell>
                                        {item.images && item.images[0] ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedImages(item.images);
                                                    setIsOpenViewImages(true);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <img
                                                    src={`/assets/images/garage_posts/thumb/` + item.images[0]?.image}
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
                                    
                                    <TableCellText value={item.short_description} />
                                    
                                    <TableCell>
                                        <Link className="hover:underline" href={`/admin/garages/${item.garage_id}`}>
                                            <Badge variant="outline" className="hover:underline">
                                                {item.garage?.name || '---'}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    
                                    <TableCell>
                                        {hasPermission('post update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/garage_posts"
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
