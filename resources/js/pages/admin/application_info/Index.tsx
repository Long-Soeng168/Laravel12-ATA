import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';
import { usePage } from '@inertiajs/react';
import usePermission from '@/hooks/use-permission';

const Index = () => {
    const { t } = useTranslation();
    const { editData } = usePage<any>().props;
    const hasPermission = usePermission();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Application Info'),
            href: '/admin/application_info',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm editData={editData} readOnly={!hasPermission('application_info update')} />
        </AppLayout>
    );
};

export default Index;
