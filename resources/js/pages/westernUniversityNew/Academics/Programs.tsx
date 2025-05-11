import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyContent from '../components/academic-components/my-content';
import MyNewLayout from '../layout/MyLayout';

const Programs = () => {
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">Programs</p>
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
                                    Academics
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#/history_and_values" className="text-gray-400">
                                    Programs
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyContent />
        </MyNewLayout>
    );
};

export default Programs;
