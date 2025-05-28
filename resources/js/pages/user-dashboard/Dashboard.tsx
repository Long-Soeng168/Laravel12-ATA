import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import SectionCards from './components/SectionCards';

const Index = () => {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('User Dashboard'),
            href: '/admin/user-dashboard',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <SectionCards />
            </div>
        </AppLayout>
    );
};

export default Index;
