import NoDataDisplay from '@/components/NoDataDisplay';
import PaginationTabs2 from '@/components/Pagination/PaginationTabs2';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import FrontPageLayout from '../layouts/frontpage-layout';
import ProductCard from './components/ProductCard';
import ProductListingHeader from './components/ProductListingHeader';
import ShopHeader from './components/ShopHeader';

export default function ShowShopPage() {
    const { t, currentLocale } = useTranslation();
    const { props } = usePage<any>();

    const tableData = props.tableData;
    const flash = props.flash;
    const products = tableData?.data || [];

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Automatically open the dialog if there's a flash success message
    useEffect(() => {
        if (flash?.success) {
            setIsDialogOpen(true);
        }
    }, [flash?.success]);

    // Handle closing the dialog and clearing cache to prevent ghost messages
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
        <FrontPageLayout>
            <>
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

                <ShopHeader />
                <div className="bg-accent pt-2 pb-2 dark:bg-white/5">
                    <ProductListingHeader />
                </div>

                <div className="section-container mt-6 mb-14 scroll-mt-[100px]" id="products">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((item: any) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                    {products.length == 0 && <NoDataDisplay />}
                    <PaginationTabs2 />
                </div>
            </>
        </FrontPageLayout>
    );
}
