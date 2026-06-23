import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t, currentLocale } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Shops'), href: '/admin/shops' },
        { title: readOnly ? t('Show') : editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
}
