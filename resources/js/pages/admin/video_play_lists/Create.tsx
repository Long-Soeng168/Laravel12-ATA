import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CreateForm from './CreateForm';

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Video Play Lists'), href: '/admin/video_play_lists' },
        { title: readOnly ? t('Show') : editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
}
