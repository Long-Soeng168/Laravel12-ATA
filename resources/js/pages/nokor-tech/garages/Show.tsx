import MyNoData from '@/components/my-no-data';
import { MyPagination } from '@/components/my-pagination';
import { MyRefreshButton } from '@/components/my-refresh-button';
import { MySearchTableData } from '@/components/my-search-table-data';
import { usePage } from '@inertiajs/react';
import SortBy from '../components/sort-by';
import MyGarageBlogCard from '../components/ui/my-garage-blog-card';
import NokorTechLayout from '../layouts/nokor-tech-layout';
import GarageProfileHeader from './components/GarageProfileHeader';

const Show = () => {
    const { tableData, garage } = usePage<any>().props;
    return (
        <NokorTechLayout>
            <div className="mx-auto mb-8 max-w-screen-xl">
                <GarageProfileHeader garage={garage} />

                <div className="flex">
                    {/* start left side */}
                    {/* <div className="hidden w-64 lg:block">
                        <Filters />
                        <div className="mt-8 flex w-full flex-col gap-0.5">
                            {productListBanners?.length > 0 &&
                                productListBanners?.map((banner) => (
                                    <Link href={banner?.link ? banner.link : '#'} prefetch>
                                        <img
                                            className="h-auto w-full transition-all duration-300 hover:scale-95"
                                            src={`/assets/images/banners/thumb/${banner?.image}`}
                                            alt=""
                                            width={600}
                                            height={600}
                                        />
                                    </Link>
                                ))}
                        </div>
                    </div> */}
                    {/* end left side */}

                    {/* start right side */}
                    {/* start fillter products section */}
                    <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center justify-end gap-4 px-4">
                            <div className="w-full md:flex-1">
                                <MySearchTableData className="max-w-full" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:ml-4">
                                <MyRefreshButton />
                                <SortBy />
                            </div>
                        </div>
                        <div className="flex-1 px-4">
                            <div>{tableData?.data?.length == 0 && <MyNoData />}</div>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                {tableData?.data?.map((item: any) => (
                                    <MyGarageBlogCard id={item.id} key={item.id} images={item.images} text={item.short_description} />
                                ))}
                            </div>
                            <div className="my-16 flex justify-center">
                                <MyPagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NokorTechLayout>
    );
};

export default Show;
