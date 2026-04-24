import usePermission from '@/hooks/use-permission';
import { Link } from '@inertiajs/react';
import { ViewIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { TooltipButton } from './TooltipButton';
import { cn } from '@/lib/utils';

const ViewItemButton = ({ url, permission }: { url?: string; permission?: string }) => {
    const hasPermission = usePermission();
    if (permission && !hasPermission(permission)) {
        return null;
    }
    return (
        <Link href={url || '#'}>
            <TooltipButton tooltip="View Item" side="bottom">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'h-8 w-8 rounded-md transition-all duration-200',
                        // Light mode: Slate to subtle indigo/slate tint
                        'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                        // Dark mode: Refined contrast
                        'dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100',
                        'shadow-none active:scale-95',
                    )}
                >
                    <ViewIcon className="h-4 w-4 stroke-[2.1]" />
                </Button>
            </TooltipButton>
        </Link>
    );
};

export default ViewItemButton;
