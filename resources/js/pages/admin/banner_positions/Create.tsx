import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Positions'),
            href: '/admin/banner_positions',
        },
        {
            title: editData?.id ? (readOnly ? t('View') : t('Edit')) : t('Create'),
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm editData={editData} readOnly={readOnly} />
        </AppLayout>
    );
}
