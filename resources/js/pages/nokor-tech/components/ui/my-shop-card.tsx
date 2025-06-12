import { Link } from '@inertiajs/react';

const ShopCard = ({ shop }) => {
    return (
        <Link
            href={`/shops/${shop.id}`}
            className="w-full max-w-full overflow-hidden bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg"
        >
            {/* Banner */}
            <div>
                <img src={`/assets/images/shops/${shop.banner}`} alt={`${shop.name} Banner`} className="aspect-[21/9] w-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 p-2">
                {/* Logo */}
                <div className="shrink-0">
                    <img
                        src={`/assets/images/shops/${shop.logo}`}
                        alt={`${shop.name} Logo`}
                        className="size-14 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>

                {/* Details */}
                <div>
                    <h2 className="text-base font-semibold line-clamp-2">{shop.name}</h2>
                    {shop.address && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                            <span className="font-semibold">Address:</span> {shop.address}
                        </p>
                    )}
                    {shop.phone && (
                        <p className="mt-1 text-sm text-gray-800">
                            <span className="font-semibold">Phone:</span> {shop.phone}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ShopCard;
