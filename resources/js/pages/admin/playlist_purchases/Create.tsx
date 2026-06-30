import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';
import { usePage } from '@inertiajs/react';

export default function Create() {
    const { t } = useTranslation();
    const { editData, readOnly } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Playlist Purchases'), href: '/admin/playlist_purchases' },
        { title: readOnly ? t('Show') : editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
}
