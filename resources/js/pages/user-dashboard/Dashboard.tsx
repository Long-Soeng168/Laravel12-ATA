import useTranslation from '@/hooks/use-translation';
import { BreadcrumbItem } from '@/types';
import SectionCards from './components/SectionCards'; 
import UserDashboardAppLayout from './layouts/app-layout';

const Index = () => {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('User Dashboard'),
            href: '/admin/user-dashboard',
        },
    ];
    return (
        <UserDashboardAppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <SectionCards />
            </div>
        </UserDashboardAppLayout>
    );
};

export default Index;
