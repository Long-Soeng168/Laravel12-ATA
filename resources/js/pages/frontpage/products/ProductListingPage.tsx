import NoDataDisplay from '@/components/NoDataDisplay';
import PaginationTabs2 from '@/components/Pagination/PaginationTabs2';
import { usePage } from '@inertiajs/react';
import FrontPageLayout from '../layouts/frontpage-layout';
import ProductCard from './components/ProductCard';
import ProductListingHeader from './components/ProductListingHeader';

export default function ProductListingPage() {
    const { tableData } = usePage<any>().props;
    const products = tableData?.data || [];

    return (
        <FrontPageLayout>
            <>
                <div className="bg-accent pt-2 pb-2 dark:bg-white/5">
                    <ProductListingHeader />
                </div>

                <div className="section-container mt-6 mb-14">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((item: any) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                    {products.length == 0 && <NoDataDisplay />}
                    <PaginationTabs2 />
                </div>
            </>
        </FrontPageLayout>
    );
}
