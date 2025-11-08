import DeleteButton from '@/components/delete-button';
import MyImageGallery from '@/components/my-image-gallery';
import MyNoData from '@/components/my-no-data';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, EditIcon } from 'lucide-react';
import { useState } from 'react';
import ViewButton from './view-button';

const MyTableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage().props;

    const queryParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname; // Get dynamic path

    const handleSort = (fieldName: string) => {
        if (fieldName === queryParams.get('sortBy')) {
            if (queryParams.get('sortDirection') === 'asc') {
                queryParams.set('sortDirection', 'desc');
            } else {
                queryParams.set('sortDirection', 'asc');
            }
        } else {
            queryParams.set('sortBy', fieldName);
            queryParams.set('sortDirection', 'asc');
        }
        router.get(currentPath + '?' + queryParams?.toString());
    };

    const [selectedImages, setSelectedImages] = useState([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);
    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <MyImageGallery
                    imagePath="/assets/images/playlist_purchases/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{t('No')}</TableHead>
                            <TableHead className="text-left">{t('Action')}</TableHead>

                            <TableHead onClick={() => handleSort('playlist_id')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Playlist')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('user_id')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Buyer')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('status')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Status')}
                                </span>
                            </TableHead>
                            <TableHead>{t('Created at')}</TableHead>
                            <TableHead>{t('Created by')}</TableHead>
                            <TableHead>{t('Updated at')}</TableHead>
                            <TableHead>{t('Updated by')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any, index: number) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {tableData?.current_page > 1 ? tableData?.per_page * (tableData?.current_page - 1) + index + 1 : index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <span className="flex h-full items-center justify-start">
                                            <ViewButton item={item} />
                                            {hasPermission('video delete') && <DeleteButton deletePath="/admin/playlist_purchases/" id={item.id} />}
                                            {hasPermission('video update') && (
                                                <Link href={`/admin/playlist_purchases/${item.id}/edit`}>
                                                    <MyTooltipButton title={t('Edit')} side="bottom" variant="ghost">
                                                        <EditIcon />
                                                    </MyTooltipButton>
                                                </Link>
                                            )}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.playlist?.name || '---'}</TableCell>
                                    <TableCell>{`${item.buyer?.name} (${item.buyer?.email})` || '---'}</TableCell>
                                    <TableCell>
                                        {hasPermission('video update') ? (
                                            <MyUpdateStatusButton
                                                id={item.id}
                                                pathName="/admin/playlist_purchases"
                                                currentStatus={item.status}
                                                statuses={['pending', 'completed', 'cancelled']}
                                            />
                                        ) : (
                                            <span className="capitalize">{item.status}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.created_at
                                            ? new Date(item.created_at).toLocaleDateString('en-UK', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : '---'}
                                    </TableCell>
                                    <TableCell>{`${item.created_by?.name}` || '---'}</TableCell>

                                    <TableCell>
                                        {item.updated_at
                                            ? new Date(item.updated_at).toLocaleDateString('en-UK', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : '---'}
                                    </TableCell>
                                    <TableCell>{`${item.updated_by?.name}` || '---'}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {tableData?.data?.length < 1 && <MyNoData />}
        </>
    );
};

export default MyTableData;
