import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import FeatureCards from '../components/Card/FeatureCards';
import ProfileCard from '../components/Card/ProfileCard';
import ProfileLayout from '../layouts/ProfileLayout';

const Index = () => {
    const { t, currentLocale } = useTranslation();
    // We use <any> here to bypass TS prop typing issues for the flash object
    const { props } = usePage<any>();
    const flash = props.flash;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Automatically open the dialog if there's a flash success message
    useEffect(() => {
        if (flash?.success) {
            setIsDialogOpen(true);
        }
    }, [flash?.success]);

    // Handle closing the dialog and scrolling to top smoothly
    const handleDialogChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            // 1. Clear the flash message from the current page props directly
            if (props.flash) {
                props.flash.success = null;
            }

            // 2. Clear it from the browser's history cache so it doesn't restore on "Back"
            const state = window.history.state;
            if (state?.page?.props?.flash) {
                state.page.props.flash.success = null;
                window.history.replaceState(state, '', window.location.href);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <ProfileLayout>
            <div className="section-container relative p-3 lg:p-8">
                {/* shadcn Dialog for Success Message */}
                <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                    <DialogContent className="rounded-none border border-t-4 border-gray-200 border-t-green-600 bg-white/95 p-0 shadow-none sm:max-w-sm dark:border-gray-800 dark:border-t-green-500 dark:bg-gray-900/95">
                        <DialogHeader className="space-y-2 p-4 pt-5 text-start">
                            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-500">
                                <CheckCircleIcon className="h-6 w-6" />
                                <span>{currentLocale == 'kh' ? 'ជោគជ័យ!' : 'Success!'}</span>
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-700 dark:text-gray-300">{t(flash?.success)}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-start p-4 pt-0">
                            <Button
                                type="button"
                                variant="default"
                                onClick={() => handleDialogChange(false)}
                                className="rounded-none bg-green-600 px-6 text-white shadow-none hover:bg-green-700 dark:hover:bg-green-600"
                            >
                                {currentLocale == 'kh' ? 'យល់ព្រម' : 'OK'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className="flex flex-col items-center justify-center">
                    <ProfileCard />
                </div>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-1">
                    {/* <Card className="relative overflow-hidden border border-gray-200 p-0 shadow-none transition dark:border-white/10 dark:bg-white/5">
                        <CardHeader className="p-5">
                            <div className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <QrCodeIcon className="size-10 text-primary" />
                                <Link href={`/scan-qr`}>
                                    <Button className="gap-2 rounded-sm" variant="default">
                                        Start Scan
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
                                <CardDescription>Scan QR code to check in</CardDescription>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="group inline-flex translate-y-1 items-center gap-1 text-sm font-medium text-primary hover:underline"
                                >
                                    <InfoIcon className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                    How it works
                                </button>
                            </div>
                        </CardHeader>
                    </Card> */}
                    <FeatureCards />
                </div>
            </div>
        </ProfileLayout>
    );
};

export default Index;
