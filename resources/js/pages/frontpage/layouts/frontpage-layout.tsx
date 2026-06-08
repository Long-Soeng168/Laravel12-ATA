import { type ReactNode } from 'react';
import Footer from './components/Footer'; // <-- Import the new footer
import Header from './components/Header';
import ScrollToTopButton2 from '@/components/ScrollToTopButton2';

interface FrontPageLayoutProps {
    children: ReactNode;
}

const FrontPageLayout = ({ children }: FrontPageLayoutProps) => {
    return (
        <div className="bg-background text-foreground selection:bg-primary/20 flex min-h-screen flex-col font-sans">
            {/* --- Header Section --- */}
            <Header />

            {/* --- Main Page Content --- */}
            <main className="flex-grow">{children}</main>

            {/* --- Footer Section --- */}
            <ScrollToTopButton2 />
            <Footer />
        </div>
    );
};

export default FrontPageLayout;
