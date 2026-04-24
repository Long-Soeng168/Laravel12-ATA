import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { LoaderCircleIcon, Trash2Icon, TriangleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TooltipButton } from './TooltipButton';

const DeleteItemButton = ({ deletePath = '#', id, permission }: { deletePath?: string; id?: number; permission?: string }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    const hasPermission = usePermission();

    if (permission && !hasPermission(permission)) {
        return null;
    }

    const handleDelete = () => {
        destroy(deletePath + id, {
            preserveScroll: true,
            onSuccess: (page: any) => {
                if (page.props.flash?.success) {
                    toast.success('Success', {
                        description: page.props.flash.success,
                    });
                }
                if (page.props.flash?.error) {
                    toast.error('Error', {
                        description: page.props.flash.error,
                    });
                }
                setIsOpen(false);
            },
            onError: (e) => {
                toast.error('Error', {
                    description: 'Failed to create.' + JSON.stringify(e, null, 2),
                });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipButton tooltip={t('Delete Item')}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            'h-8 w-8 rounded-md transition-all duration-200',
                            // Light mode: Soft red tint
                            'text-destructive hover:bg-destructive/10 hover:text-destructive',
                            // Dark mode: Stronger contrast for visibility
                            'dark:hover:bg-destructive/20 dark:text-red-400 dark:hover:text-red-300',
                            'shadow-none active:scale-95',
                        )}
                    >
                        <Trash2Icon className="h-4 w-4 stroke-[2.1]" />
                    </Button>
                </DialogTrigger>
            </TooltipButton>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-destructive flex items-center gap-2 text-start">
                            <TriangleAlertIcon />
                            {t('Delete Item')} (ID: {id})
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-start">{t('Are you sure you want to delete this item?')}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col">
                    <Button
                        onClick={handleDelete}
                        autoFocus
                        className="ring-destructive/20 dark:bg-destructive dark:ring-destructive/40 focus:ring-4"
                        disabled={processing}
                        variant="destructive"
                    >
                        {processing && (
                            <span className="animate-spin">
                                <LoaderCircleIcon />
                            </span>
                        )}
                        {processing ? t('Deleting') : t('Delete')}
                    </Button>
                    <Button onClick={() => setIsOpen(false)} disabled={processing} variant="outline" className="border-foreground border">
                        {t('Cancel')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteItemButton;
