import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { Image as ImageIcon, Truck } from 'lucide-react';
import { useState } from 'react';

// Define the expected shape of your item prop (adjust as needed for your app)
interface ProductCardProps {
    item: any;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { isOwner } = usePage<any>().props;
    const { t, currentLocale } = useTranslation();
    const isKm = currentLocale === 'kh';

    const [hasError, setHasError] = useState(false);

    // --- Price Logic ---
    const originalPrice = parseFloat(item?.price || '0');
    const discountValue = parseFloat(item?.discount || '0');
    const discountType = item?.discount_type || 'percentage';

    let finalPrice = originalPrice;
    if (discountValue > 0) {
        finalPrice = discountType === 'percentage' ? originalPrice - originalPrice * (discountValue / 100) : originalPrice - discountValue;
    }

    // --- Specs Logic ---
    let shortSpecs: string[] = [];
    const rawDisplayAttrs = item?.display_attributes;

    if (rawDisplayAttrs && typeof rawDisplayAttrs === 'object') {
        Object.values(rawDisplayAttrs).forEach((attr: any) => {
            if (attr?.value) {
                shortSpecs.push(isKm ? attr.value_label_kh || attr.value_label_en || attr.value : attr.value_label_en || attr.value);
            }
        });
    }

    if (item?.category) shortSpecs.push(isKm ? item.category.name_kh || item.category.name : item.category.name);
    if (item?.brand) shortSpecs.push(isKm ? item.brand.name_kh || item.brand.name : item.brand.name);

    const specLine = shortSpecs.join(' • ');

    return (
        <Link
            href={isOwner ? `/your-products/${item.id}` : `/products/${item.id}`}
            className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-transparent bg-white shadow-sm ring-[#FF6D00] transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:ring focus:scale-95 dark:border-white/15 dark:bg-gray-900"
        >
            {/* Image Container: flex-1 ensures it expands */}
            <div className="relative flex-1 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {item?.image_url && !hasError ? (
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="border-accent h-full w-full border-b object-cover"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-800">
                        <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
                        <span className="text-[10px] uppercase">No Image</span>
                    </div>
                )}

                {/* Badges */}
                {discountValue > 0 && (
                    <div className="absolute top-0 left-0 rounded-br-lg bg-red-600 px-2 py-1 text-[10px] font-black text-white shadow-sm">
                        {discountType === 'percentage' ? `${Math.floor(discountValue)}% OFF` : `$${Math.floor(discountValue)} OFF`}
                    </div>
                )}
                {item?.is_free_delivery === 1 && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                        <Truck className="h-3 w-3" /> {t('Free Delivery')}
                    </div>
                )}
                {item?.total_images > 1 && (
                    <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                        <ImageIcon className="h-3 w-3" /> {item.total_images}
                    </div>
                )}
            </div>

            {/* Content Container: flex-none ensures consistent size */}
            <div className="flex flex-none flex-col p-2.5">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100" title={item?.name}>
                    {item?.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">{specLine}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-primary text-[15px] font-semibold">${finalPrice.toLocaleString()}</span>
                    {discountValue > 0 && <span className="text-[10px] text-gray-400 line-through">${originalPrice.toLocaleString()}</span>}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
