import '../../css/ckeditor-custom.css';
// import 'ckeditor5/ckeditor5.css';

import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className={`p-2`}>{children}</div>
            <Toaster />
        </AppLayoutTemplate>
    );
};

export default AppLayout;
