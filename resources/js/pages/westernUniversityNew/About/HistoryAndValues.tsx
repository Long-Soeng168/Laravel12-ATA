import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyBlogImage from '../components/about-components/my-blog-image';
import MyHeroBottomHistory from '../components/about-components/my-hero-bottom-history';
import MyHeroHistory from '../components/about-components/my-hero-history';
import MyNewLayout from '../layout/MyLayout';

const HistoryAndValues = () => {
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">History And Values</p>
                <div className="mt-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-white">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-white">
                                    About
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#/history_and_values" className="text-gray-400">
                                    History And Values
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyHeroHistory />
            <MyBlogImage />
            <MyHeroBottomHistory />
        </MyNewLayout>
    );
};

export default HistoryAndValues;
