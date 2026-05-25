import { Link } from '@inertiajs/react';
import React from 'react';

interface MyProductCardProps {
    product: any;
}

const MyProductCard: React.FC<MyProductCardProps> = ({ product }) => {
    const isInStock = product.stock_status === 'instock';

    return (
        <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:bg-zinc-950/40">
            {/* Subtle inset border for a crisp edge without heavy ringing */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-black/5 transition-colors duration-500 group-hover:border-black/10 dark:border-white/5 dark:group-hover:border-white/10" />

            {/* Image Section - Premium 4/5 aspect ratio */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <Link prefetch href={`/products/${product.id}`} className="block h-full w-full">
                    {product.images?.length > 0 ? (
                        <img
                            width={800}
                            height={1000}
                            src={`/assets/images/items/thumb/${product.images[0]?.image}`}
                            alt={product.name}
                            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                                No Image
                            </span>
                        </div>
                    )}
                </Link>

                {/* Soft gradient overlay on hover to make badge pop */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Floating Action Badge - Glassmorphism */}
                <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 rounded-full bg-white/95 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-black opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:bg-zinc-900/95 dark:text-white">
                    View Details
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5">
                <Link prefetch href={`/products/${product.id}`} className="flex flex-1 flex-col">
                    <div className="mb-4 flex flex-col gap-1.5">
                        {/* High-end minimalist typography for product name */}
                        <h3 className="line-clamp-2 text-base font-medium leading-snug tracking-tight text-zinc-800 transition-colors group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                            {product.name}
                        </h3>
                    </div>

                    {/* Price and Icon - Anchored to bottom with delicate separator */}
                    <div className="mt-auto flex items-center justify-between border-t border-black/[0.04] pt-4 dark:border-white/[0.04]">
                        <div className="flex flex-col">
                            {parseFloat(product.price) > 0 ? (
                                <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                                    ${parseFloat(product.price).toFixed(2)}
                                </span>
                            ) : (
                                <span className="text-[15px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400">
                                    Complimentary
                                </span>
                            )}
                        </div>
                        
                        {/* Minimalist interactive arrow indicator */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-all duration-300 group-hover:bg-black group-hover:text-white dark:bg-zinc-800/50 dark:text-zinc-500 dark:group-hover:bg-white dark:group-hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MyProductCard;
