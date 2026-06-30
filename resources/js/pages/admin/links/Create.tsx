import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';
import { usePage } from '@inertiajs/react';

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();
    const { types } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Links'),
            href: '/admin/links',
        },
        {
            title: editData?.id ? (readOnly ? t('View') : t('Edit')) : t('Create'),
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm editData={editData} readOnly={readOnly} types={types} />
        </AppLayout>
    );
}
