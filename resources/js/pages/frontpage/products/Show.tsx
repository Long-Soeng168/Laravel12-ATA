import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { Layers3Icon, PhoneIcon } from 'lucide-react';
import CarouselWithThumbs from '../components/CarouselWithThumbs';
import { SectionHeader } from '../components/headers/HeaderSection';
import FrontPageLayout from '../layouts/frontpage-layout';
import ProductsSections from '../products/components/ProductsSections';
import ProductDetail from './components/ProductDetail';
const ProductDetailPage = () => {
    const { itemShow, relatedItems } = usePage<any>().props;
    return (
        <FrontPageLayout>
            <Head>
                <title>{itemShow?.name}</title>
                <meta name="description" content={itemShow?.short_description} />
            </Head>

            <main className="pb-20">
                <div>
                    <ProductDetail />
                    <div className="flex hidden flex-col pb-10 md:flex-row">
                        {/* Product Image */}
                        {itemShow?.images?.length > 0 && (
                            <div className="flex flex-col items-center p-4 md:w-[40%]">
                                <CarouselWithThumbs images={itemShow?.images || []} />
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="p-6 md:w-1/2">
                            <h1 className="text-foreground text-2xl font-bold md:text-3xl">{itemShow?.name}</h1>
                            {itemShow?.brand?.name && (
                                <p className="text-foreground mt-2 text-base">
                                    Brand:{' '}
                                    <Link className="text-primary hover:underline" href={`/products?brand_code=${itemShow?.brand?.code}`}>
                                        {itemShow?.brand?.name}
                                    </Link>
                                </p>
                            )}
                            {itemShow?.category?.name && (
                                <p className="text-foreground mt-2 text-base">
                                    Category:{' '}
                                    <Link className="text-primary hover:underline" href={`/products?category_code=${itemShow?.category?.code}`}>
                                        {itemShow?.category?.name}
                                    </Link>
                                </p>
                            )}
                            {itemShow?.code && <p className="text-foreground mt-2 text-base">Product Code: {itemShow?.code}</p>}

                            <div className="mt-6 mb-4">
                                <p className="text-2xl font-bold text-red-600">${itemShow?.price}</p>
                            </div>
                            <a href={`tel:${itemShow.shop?.phone}`}>
                                <Button size="lg" className="mt-2 mb-4">
                                    <PhoneIcon /> Call Now
                                </Button>
                            </a>

                            <Link href={`/shops/${itemShow.shop?.id}`} className="hover:bg-muted block cursor-pointer rounded-md p-2">
                                <figcaption className="flex items-center space-x-4">
                                    <img
                                        src={`/assets/images/shops/thumb/${itemShow.shop?.logo}`}
                                        alt=""
                                        className="h-14 w-14 flex-none rounded-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="flex-auto">
                                        <div className="text-base font-semibold text-slate-900 dark:text-slate-200">{itemShow.shop?.name}</div>
                                        <div className="mt-0.5 dark:text-slate-300">{itemShow.shop?.address}</div>
                                        <div className="mt-0.5 dark:text-slate-300">{itemShow.shop?.phone}</div>
                                    </div>
                                </figcaption>
                            </Link>

                            {/* <AddToCart item={itemShow} /> */}
                            {itemShow?.short_description && (
                                <div>
                                    <hr className="my-8" />
                                    <p className="text-foreground mb-2 text-lg font-semibold">Description:</p>
                                    <div className="whitespace-pre-line">{itemShow?.short_description}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {relatedItems?.length > 0 && (
                    <div className="section-container mt-10">
                        <SectionHeader
                            icon={<Layers3Icon className="size-5" />}
                            title="Related"
                            action={{
                                label: 'See More',
                                href: `/products?category_code=${itemShow?.category_code}`,
                            }}
                        />
                        <ProductsSections products={relatedItems} />
                    </div>
                )}
            </main>
        </FrontPageLayout>
    );
};

export default ProductDetailPage;
