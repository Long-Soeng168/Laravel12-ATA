import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyNewLayout from '../layout/MyLayout';
import MyHeroEvent from '../components/news-components/my-hero-event';
import MyBlogImage from '../components/news-components/my-blog-image';

const ActivitiesAndEvents = () => {
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">Activities And Events</p>
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
                                    School Life
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#/history_and_values" className="text-gray-400">
                                    Activities And Events
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyHeroEvent/>
            <MyBlogImage/>
        </MyNewLayout>
    );
};

export default ActivitiesAndEvents;
