import MyImageGallery from '@/components/my-image-gallery';
import MyNoData from '@/components/my-no-data';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useTranslation from '@/hooks/use-translation';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, ScanEyeIcon } from 'lucide-react';
import { useState } from 'react';

const ViewCountMyTableData = () => {
    const { t, currentLocale } = useTranslation();

    const { tableData } = usePage().props as any;
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
            <ScrollArea className="w-full rounded-md">
                <MyImageGallery
                    imagePath="/assets/images/videos/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{currentLocale === 'kh' ? 'លេខសម្គាល់វីដេអូ' : 'Video ID'}</TableHead>
                            <TableHead className="text-left">{currentLocale === 'kh' ? 'សកម្មភាព' : 'Action'}</TableHead>
                            <TableHead className="text-left">{currentLocale === 'kh' ? 'វីដេអូ' : 'Video'}</TableHead>
                            <TableHead onClick={() => handleSort('total_views')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {currentLocale === 'kh' ? 'ចំនួនអ្នកមើលសរុប' : 'Total Views'}
                                </span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow key={item.video_id}>
                                <TableCell className="font-medium">
                                    {item.video?.id}
                                </TableCell>
                                <TableCell>
                                    <span className="flex h-full items-center justify-start">
                                        <Link href={`/admin/videos/${item.video_id}`}>
                                            <MyTooltipButton title={currentLocale === 'kh' ? 'បង្ហាញវីដេអូ' : 'Show Video'} side="bottom" variant="ghost">
                                                <ScanEyeIcon />
                                            </MyTooltipButton>
                                        </Link>
                                    </span>
                                </TableCell>
                                <TableCell>{currentLocale === 'kh' ? (item.video?.title_kh || item.video?.title || '---') : (item.video?.title || '---')}</TableCell>
                                <TableCell>
                                    <div className="font-bold text-primary bg-primary/10 inline-block px-2 py-1 rounded-md">
                                        {item.total_views ? parseInt(item.total_views).toLocaleString() : '---'}
                                    </div>
                                </TableCell>
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

export default ViewCountMyTableData;
