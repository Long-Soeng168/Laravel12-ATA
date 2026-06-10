import MyNoData from '@/components/my-no-data';
import { SeeMoreProducts } from '@/components/see-more-products';
import { Head, usePage } from '@inertiajs/react';
import MyBlogList from './components/my-blogs-list';
import MyMiddleSlide from './components/my-middle-slide';
import MyProductList from './components/my-product-list';
import MyProductListHeader from './components/my-product-list-header';
import MyShopList from './components/my-shop-list';
import MySlide from './components/my-slide';
import FrontPageLayout from './layouts/frontpage-layout';

const Index = () => {
    const { topBanners, middleBanners, posts, newArrivalsProducts, products, shops } = usePage<any>().props;
    const { website_info, app_url } = usePage<any>().props;
    const image = `${app_url}/assets/images/website_infos/${website_info.logo}`;
    return (
        <FrontPageLayout>
            <Head>
                {/* Basic Meta */}
                <title>A-Tech Auto - Smart Tools, Courses & Spare Parts for Car Owners</title>
                <meta
                    name="description"
                    content="Your ultimate automotive companion in Cambodia. Find trusted garages in Cambodia, instantly decode errors, access repair guides, and source top-quality spare parts for your car. Built for local owners, engineers & garages."
                />
                <meta
                    name="keywords"
                    content="auto repair Cambodia, car spare parts, automotive courses, decode car errors, find garages Cambodia, A-Tech Auto"
                />

                {/* Canonical URL */}
                {/* Update this to your actual production URL */}
                <link rel="canonical" href="http://atech-auto.com" />

                {/* Open Graph */}
                <meta property="og:title" content="A-Tech Auto - Smart Tools, Courses & Spare Parts for Car Owners" />
                <meta
                    property="og:description"
                    content="Your ultimate automotive companion in Cambodia. Find trusted garages in Cambodia, instantly decode errors, access repair guides, and source top-quality spare parts for your car. Built for local owners, engineers & garages."
                />
                {/* Update this path to where your actual Open Graph image lives */}
                <meta property="og:image" content={image} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://atech-auto.com" />
                <meta property="og:site_name" content="A-Tech Auto" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                {/* Update with your actual Twitter/X handle if you have one */}
                <meta name="twitter:title" content="A-Tech Auto - Smart Tools, Courses & Spare Parts for Car Owners" />
                <meta
                    name="twitter:description"
                    content="Your ultimate automotive companion in Cambodia. Find trusted garages in Cambodia, instantly decode errors, access repair guides, and source top-quality spare parts for your car. Built for local owners, engineers & garages."
                />
                {/* Usually the same as your og:image */}
                <meta name="twitter:image" content={image} />
            </Head>

            {/* Edge-to-edge top banner container for high-end immersion */}
            <div className="mx-auto w-full max-w-[2000px] bg-zinc-50 dark:bg-zinc-950">
                {topBanners?.length > 0 && <MySlide slides={topBanners} path="/assets/images/banners/thumb/" />}
            </div>

            <main className="flex flex-col gap-16 pt-8 pb-24 sm:gap-24 sm:pt-16">
                {/* Shops Section */}
                <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {shops?.length > 0 && (
                        <div className="flex flex-col">
                            <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">Trusted Partners</h2>
                            <MyShopList items={shops} />
                        </div>
                    )}
                </section>

                {/* Recommended Products */}
                <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {products?.length > 0 ? (
                        <div className="flex flex-col">
                            <MyProductListHeader title="Recommended" link="/products" />
                            <MyProductList items={products} />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <MyProductListHeader title="Recommended" link="/products" />
                            <MyNoData />
                        </div>
                    )}
                </section>

                {/* Middle Slide Banner - Constrained to 7xl for editorial feel */}
                {middleBanners?.length > 0 && (
                    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/5">
                            <MyMiddleSlide slides={middleBanners} path="/assets/images/banners/thumb/" />
                        </div>
                    </section>
                )}

                {/* Latest Products */}
                <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {newArrivalsProducts?.length > 0 ? (
                        <div className="flex flex-col">
                            <MyProductListHeader title="New Arrivals" link="/products" />
                            <MyProductList items={newArrivalsProducts} />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <MyProductListHeader title="New Arrivals" link="/products" />
                            <MyNoData />
                        </div>
                    )}

                    <div className="mt-12 flex justify-center">
                        <SeeMoreProducts />
                    </div>
                </section>

                {/* Blog Section */}
                {posts?.length > 0 && (
                    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <MyProductListHeader title="Latest from Journal" link="/blogs" />
                            <MyBlogList posts={posts} />
                        </div>
                    </section>
                )}
            </main>
        </FrontPageLayout>
    );
};

export default Index;
