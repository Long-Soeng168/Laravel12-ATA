import MyNoData from '@/components/my-no-data';
import { SeeMoreProducts } from '@/components/see-more-products';
import { Head, usePage } from '@inertiajs/react';
import MyBlogList from './components/my-blogs-list';
import MyMiddleSlide from './components/my-middle-slide';
import MyProductList from './components/my-product-list';
import MyProductListHeader from './components/my-product-list-header';
import MyShopList from './components/my-shop-list';
import MySlide from './components/my-slide';
import NokorTechLayout from './layouts/nokor-tech-layout';

const Index = () => {
    const { topBanners, middleBanners, posts, newArrivalsProducts, products, shops } = usePage<any>().props;
    return (
        <NokorTechLayout>
            <Head>
                <title>A-Tech Auto - Smart Tools, Courses & Parts for Car Owners & Pros</title>
                <meta
                    name="description"
                    content="Your ultimate automotive companion in Cambodia. Find trusted garages in Cambodia, instantly decode errors, access repair guides, and source top-quality spare parts for your car. Built for local owners, engineers & garages."
                />
            </Head>

            <div className="mx-auto mb-10 max-w-[2000px]">
                {topBanners?.length > 0 && <MySlide slides={topBanners} path="/assets/images/banners/thumb/" />}
            </div>
            <main className="px-2">
                <>
                    <div className="mx-auto mb-10 max-w-screen-xl">
                        {/* end slide */}
                        <div className="mt-10 mb-4 space-y-4">{shops?.length > 0 && <MyShopList items={shops} />}</div>

                        {products?.length > 0 ? (
                            <>
                                <MyProductListHeader title="Recomend Products" link="/products" />
                                <MyProductList items={products} />
                            </>
                        ) : (
                            <MyNoData />
                        )}

                        {middleBanners?.length > 0 && <MyMiddleSlide slides={middleBanners} path="/assets/images/banners/thumb/" />}

                        {newArrivalsProducts?.length > 0 ? (
                            <>
                                <MyProductListHeader title="Latest Products" link="/products" />
                                <MyProductList items={newArrivalsProducts} />
                            </>
                        ) : (
                            <MyNoData />
                        )}

                        <div className="my-10 flex justify-center">
                            <SeeMoreProducts />
                        </div>

                        {posts?.length > 0 && (
                            <>
                                <MyProductListHeader title="Blogs" />
                                <MyBlogList posts={posts} />
                            </>
                        )}

                        <div className="h-20"></div>
                    </div>
                    {/* <MyService /> */}
                </>
            </main>
        </NokorTechLayout>
    );
};

export default Index;
