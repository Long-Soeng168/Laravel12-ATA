import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import CreateForm from './CreateForm';

const Create = () => {
    const { t } = useTranslation();
    const { editData, readOnly } = usePage<any>().props;
    const currentBreadcrumb = readOnly ? t('Show') : editData ? t('Edit') : t('Create');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Garage Posts'),
            href: '/admin/garage_posts',
        },
        {
            title: currentBreadcrumb,
            href: '#',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
};

export default Create;
