import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyNewLayout from './layout/MyLayout';
import MyContact from './components/my-contact';
import MyGoogleMap from './components/my-google-map';

const Contact = () => {
    return (
        <MyNewLayout>
            <div className='relative text-white bg-red-900 flex flex-col items-center justify-center w-full h-full  p-10 md:p-20'>
                <p className='text-3xl md:text-6xl font-noto-san-extra-light'>Contacts</p>
                <div className='mt-10'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className='text-gray-400'/>
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#/contact" className='text-gray-400'>Contact</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyContact/>
            <MyGoogleMap/>
        </MyNewLayout>
    );
};

export default Contact;
