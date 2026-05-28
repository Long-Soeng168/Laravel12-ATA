import { usePage } from '@inertiajs/react';
import { ListOrderedIcon, Star } from 'lucide-react';
import SeeAllProductsButton from './components/buttons/SeeAllProductsButton';
import { SectionHeader } from './components/headers/HeaderSection';
import MiniHeroSection from './components/heroes/MiniHeroSection';
import SlideHeroSection from './components/heroes/SlideHeroSection';
import CategorySections from './components/sections/CategorySection';
import ShopSection from './components/sections/ShopSection';
import FrontPageLayout from './layouts/frontpage-layout';
import LatestProductsSections from './shops/components/ProductsSections';

export default function HomePage() {
    const { highlight_products, latest_products } = usePage<any>().props;

    return (
        <FrontPageLayout>
            <div className="section-container flex-grow pb-8 max-md:px-0 md:pt-4">
                {/* Full-Width Background Slideshow Hero Section */}
                <SlideHeroSection />
            </div>
            <div className="section-container flex-grow pb-8">
                <div className="animate-in fade-in space-y-12 duration-300">
                    {/* Browse By Category */}

                    <CategorySections />

                    {/* Highlight Products */}
                    <section>
                        <SectionHeader
                            icon={<Star className="size-5" />}
                            title="Highlight Products"
                            action={{
                                label: 'View All',
                                href: '/products',
                            }}
                        />

                        <LatestProductsSections products={highlight_products} />
                    </section>

                    {/* Dynamic App Exclusive Banners */}
                    <MiniHeroSection />

                    {/* Latest Products */}
                    <section>
                        <SectionHeader
                            icon={<ListOrderedIcon className="size-5" />}
                            title="Latest Products"
                            action={{
                                label: 'View All',
                                href: '/products',
                            }}
                        />

                        <LatestProductsSections products={latest_products} />
                    </section>

                    {/* Shops */}
                    <ShopSection />
                    <SeeAllProductsButton />
                </div>
            </div>
        </FrontPageLayout>
    );
}
