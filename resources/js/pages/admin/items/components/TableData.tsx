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
                    imagePath="/assets/images/items/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader className="table-header bg-accent/30">
                        <TableRow>
                            <TableHeadWithSort label={t('ID')} />
                            <TableHeadWithSort label={t('Action')} />
                            <TableHeadWithSort label={t('Image')} />
                            
                            <TableHeadWithSort field="shop_id" label={t('Shop')} />
                            <TableHeadWithSort field="code" label={t('Code')} />
                            <TableHeadWithSort field="name" label={t('Name')} />
                            <TableHeadWithSort field="price" label={t('Price')} />
                            <TableHeadWithSort field="status" label={t('Status')} />
                            
                            <TableHeadWithSort field="category_code" label={t('Category Code')} />
                            <TableHeadWithSort field="brand_code" label={t('Brand Code')} />
                            <TableHeadWithSort field="model_code" label={t('Model Code')} />
                            <TableHeadWithSort field="body_type_code" label={t('Body Type Code')} />
                            <TableHeadWithSort field="total_view_counts" label={t('Total View')} />
                            
                            <TableHeadWithSort field="created_at" label={t('Created at')} />
                            <TableHeadWithSort label={t('Created by')} />
                            <TableHeadWithSort field="updated_at" label={t('Updated at')} />
                            <TableHeadWithSort label={t('Updated by')} />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCellActions>
                                    <div className="flex items-center gap-2">
                                        <EditItemButton url={`/admin/items/${item.id}/edit`} permission="item update" />
                                        <ViewItemButton url={`/admin/items/${item.id}`} permission="item view" />
                                        <DeleteItemButton deletePath="/admin/items/" id={item.id} permission="item delete" />
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
                                                src={`/assets/images/items/thumb/` + item.images[0]?.image}
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
                                <TableCell>
                                    <Link className="hover:underline" href={`/admin/shops/${item.shop_id}`}>
                                        <Badge variant="outline" className="hover:underline">{item.shop?.name || '---'}</Badge>
                                    </Link>
                                </TableCell>
                                <TableCellText value={item.code} />
                                <TableCellText value={item.name} />
                                <TableCellText value={item.price} />
                                <TableCell>
                                    {hasPermission('item update') ? (
                                        <MyUpdateStatusButton
                                            id={item.id}
                                            pathName="/admin/items"
                                            currentStatus={item.status}
                                            statuses={['active', 'inactive']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.status}</span>
                                    )}
                                </TableCell>
                                <TableCellText value={item.category_code} />
                                <TableCellText value={item.brand_code} />
                                <TableCellText value={item.model_code} />
                                <TableCellText value={item.body_type_code} />
                                <TableCellText value={item.total_view_counts} />
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
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
