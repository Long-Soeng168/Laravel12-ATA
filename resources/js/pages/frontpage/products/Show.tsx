import { Head, usePage } from '@inertiajs/react';
import { Layers3Icon } from 'lucide-react';
import { SectionHeader } from '../components/headers/HeaderSection';
import FrontPageLayout from '../layouts/frontpage-layout';
import ProductsSections from '../products/components/ProductsSections';
import ProductDetail from './components/ProductDetail';

const ProductDetailPage = () => {
    // isOwner is now provided directly by your backend controller
    const { itemShow, relatedItems, isOwner } = usePage<any>().props;

    return (
        <FrontPageLayout>
            <Head>
                <title>{itemShow?.name}</title>
                <meta name="description" content={itemShow?.short_description} />
            </Head>

            <main className="pb-20">
                <div>
                    <ProductDetail />
                </div>

                {/* Hide the related items section if isOwner is true */}
                {!isOwner && relatedItems?.length > 0 && (
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
