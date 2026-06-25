import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import CreateForm from './CreateForm';

export default function Create() {
    const { editData } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Garages', href: '/admin/garages' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateForm />
        </AppLayout>
    );
}
