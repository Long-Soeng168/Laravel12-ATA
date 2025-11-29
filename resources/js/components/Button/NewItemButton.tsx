import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';

const NewItemButton = ({ url, permission }: { url?: string; permission?: string }) => {
    const hasPermission = usePermission();
    if (permission && !hasPermission(permission)) {
        return null;
    }

    const { t } = useTranslation();

    return url ? (
        <Link href={url} prefetch>
            <Button variant="default" size="lg" className="h-11 shadow-none">
                <PlusIcon /> {t('Add New')}
            </Button>
        </Link>
    ) : (
        <Button variant="default" size="lg" className="h-11 shadow-none">
            <PlusIcon /> {t('Add New')}
        </Button>
    );
};

export default NewItemButton;
