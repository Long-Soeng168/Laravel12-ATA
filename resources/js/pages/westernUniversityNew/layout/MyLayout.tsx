import { ReactNode } from 'react';
import MyNewFooter from '../components/my-new-footer';
import MyTopSection from '../components/my-top-section';
import NavbarPage from '../components/navbar/navbar';
import { ArrowUpCircle } from 'lucide-react';
interface LayoutProps {
    children: ReactNode;
}

const MyNewLayout = ({ children }: LayoutProps) => {
    return (
        <>
            {/* Header */}
            <MyTopSection />
            <NavbarPage />
            {/* End Header */}
            <main className="font-poppins-regular mx-auto min-h-screen">{children}</main>
            {/* Footer */}
            <MyNewFooter />
            {/* Scroll to Top Button */}
            <a href="#top" className="fixed right-15 md:right-6 bottom-6 rounded-full bg-gray-800 px-4 py-4 text-white shadow-lg hover:bg-blue-900">
                <ArrowUpCircle className='w-7 h-7'/>
            </a>
            {/* End Footer */}
        </>
    );
};

export default MyNewLayout;
