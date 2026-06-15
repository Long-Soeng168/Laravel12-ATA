import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import CreateForm from './CreateForm';

const Create = () => {
    const { t } = useTranslation();
    const { editData } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Items'), href: '/admin/items' },
        { title: editData ? t('Edit') : t('Create'), href: '#' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
};

export default Create;
