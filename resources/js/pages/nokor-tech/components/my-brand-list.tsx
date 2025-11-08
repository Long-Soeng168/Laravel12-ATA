import { Label } from '@/components/ui/label';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import React from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface MyBrandListProps {
    items: any[];
}

const MyBrandList: React.FC<MyBrandListProps> = ({ items }) => {
    const { t, currentLocale } = useTranslation();

    return (
        <>
            <Label>{t('Brands')}</Label>
            <ScrollArea>
                <div className="flex w-max gap-3 pb-4">
                    {items.map((item) => (
                        <Link
                            prefetch
                            href={`/products?brand_code=${item?.code}`}
                            key={item?.id}
                            className="group hover:border-primary flex h-full min-w-[110px] shrink-0 flex-col items-center justify-start gap-2 rounded-xl border bg-white px-2 py-2 transition-all duration-300 hover:shadow-sm sm:min-w-[130px] md:min-w-[150px] lg:min-w-[160px]"
                        >
                            {item?.image && (
                                <img
                                    src={`/assets/images/item_brands/thumb/${item?.image}`}
                                    alt={`Brand ${item?.name}`}
                                    className="h-12 max-w-[80px] object-contain transition-transform duration-300 group-hover:scale-110 md:h-13 md:max-w-[110px]"
                                />
                            )}
                            {/* <p className="group-hover:text-primary line-clamp-1 text-center text-xs font-medium text-black sm:text-sm">{item?.name}</p> */}
                        </Link>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    );
};

export default MyBrandList;
