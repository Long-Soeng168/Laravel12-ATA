import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import SectionCards from './components/section-cards';

export default function Page() {
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Admin Dashboard'),
            href: '/dashboard',
        },
    ];

    const { auth } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-1 flex-col pb-10">
                <div className="@container/main flex flex-1 flex-col gap-8 p-6 md:p-8">
                    <SectionCards />
                </div>
            </div>
        </AppLayout>
    );
}
