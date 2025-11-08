import { Label } from '@/components/ui/label';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import React from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface MyBodyTypeListProps {
    items: any;
}

const MyBodyTypeList: React.FC<MyBodyTypeListProps> = ({ items }) => {
    const { currentLocale, t } = useTranslation();
    return (
        <>
            <Label>{t('Body Types')}</Label>
            <ScrollArea>
                <div className="mt-2 flex w-max gap-3 pb-4">
                    {items.map((item: any) => (
                        <Link
                            prefetch
                            href={`/products?body_type_code=${item?.code}`}
                            key={item?.id}
                            className="group bg-background hover:border-primary flex h-full min-w-[110px] shrink-0 flex-col items-center justify-start gap-2 rounded-xl border px-2 py-2 transition-all duration-300 hover:shadow-sm sm:min-w-[130px] md:min-w-[150px] lg:min-w-[160px]"
                        >
                            {item?.image && (
                                <img
                                    src={`/assets/images/item_body_types/thumb/${item?.image}`}
                                    alt={`Category ${item?.name}`}
                                    className="size-12 object-contain transition-transform duration-300 group-hover:scale-110 md:size-13"
                                />
                            )}
                            <p className="text-muted-foreground group-hover:text-primary line-clamp-2 text-center text-xs font-medium sm:text-sm dark:text-white">
                                {currentLocale === 'kh' ? item?.name_kh : item?.name}
                            </p>
                        </Link>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
};

export default MyBodyTypeList;
