import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyNewLayout from '../layout/MyLayout';
import MyNewPost from '../components/news-components/my-news-post';

const News = () => {
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">News & Blogs</p>
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
                                    News & Blogs
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyNewPost/>
        </MyNewLayout>
    );
};

export default News;
