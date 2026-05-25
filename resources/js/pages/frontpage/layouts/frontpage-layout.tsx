import { Toaster } from '@/components/ui/sonner';
import useTranslation from '@/hooks/use-translation';
import { type ReactNode } from 'react';
import MyFooter from '../components/my-footer';
import MyHeader from '../components/my-header';

interface FrontPageLayoutProps {
    children: ReactNode;
}

const FrontPageLayout = ({ children }: FrontPageLayoutProps) => {
    const { currentLocale } = useTranslation();
    return (
        <>
            <MyHeader />
            <div className={`min-h-[50vh]`}>{children}</div>
            <Toaster />
            <MyFooter />
        </>
    );
};

export default FrontPageLayout;
