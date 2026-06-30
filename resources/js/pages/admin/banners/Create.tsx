import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import CreateForm from './CreateForm';

export default function Create() {
    const { t } = useTranslation();
    const { editData, types, readOnly, bannerPositions, links } = usePage<any>().props;

    const currentBreadcrumb = readOnly ? t('Show') : editData ? t('Edit') : t('Create');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: '/dashboard',
        },
        {
            title: t('Banners'),
            href: '/admin/banners',
        },
        {
            title: currentBreadcrumb,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm editData={editData} readOnly={readOnly} types={types} bannerPositions={bannerPositions} links={links} />
        </AppLayout>
    );
}
