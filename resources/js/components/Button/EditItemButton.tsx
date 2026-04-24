import usePermission from '@/hooks/use-permission';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { TooltipButton } from './TooltipButton';

const EditItemButton = ({ url, permission }: { url?: string; permission?: string }) => {
    const hasPermission = usePermission();
    if (permission && !hasPermission(permission)) {
        return null;
    }

    return (
        <Link href={url ?? '#'}>
            <TooltipButton tooltip="Edit Item" side="bottom">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'h-8 w-8 rounded-md transition-all duration-200', // Slightly smaller (h-8) is better for action buttons
                        'hover:text-primary hover:bg-primary/10 text-blue-500', // Ghost to soft-tint transition
                        'dark:hover:bg-primary/20 dark:text-blue-400', // Dark mode optimization
                        'shadow-none active:scale-95', // Tactile "press" effect
                    )}
                >
                    <EditIcon className="h-4 w-4 stroke-[2.1]" />
                </Button>
            </TooltipButton>
        </Link>
    );
};

export default EditItemButton;
