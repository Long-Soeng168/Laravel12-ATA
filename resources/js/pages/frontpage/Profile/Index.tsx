import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { CheckCircleIcon, ChevronRight, LayoutGrid, PackagePlus, PlusCircle, Store, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardFeatureCard from '../components/Card/DashboardFeatureCard';
import ProfileCard from '../components/Card/ProfileCard';
import ProfileLayout from '../layouts/ProfileLayout';
import SettingsPage from './SettingsPage';

const Index = () => {
    const { t, currentLocale } = useTranslation();
    // We use <any> here to bypass TS prop typing issues for the flash object
    const { props } = usePage<any>();

    const flash = props.flash;
    const auth = props.auth; // Added to access auth.user.id
    const userShop = props.userShop;
    const userGarage = props.userGarage;

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

                {/* --- Action Buttons Section --- */}
                <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3">
                    <DashboardFeatureCard />
                </div>
                <div className="mx-auto mt-6 mb-6 flex max-w-lg flex-col gap-3">
                    {/* 1. Create Product (Industrial & Translucent) */}
                    <Link
                        href="/create-product"
                        className="group flex w-full items-center justify-between rounded-md border border-blue-600 p-4 transition-all hover:bg-blue-600 dark:border-blue-500 dark:bg-blue-500/10 dark:hover:bg-blue-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-600 text-white transition-colors dark:bg-blue-500">
                                <PackagePlus className="h-6 w-6 stroke-[1.5px]" />
                            </div>
                            <div className="flex flex-col items-start justify-center transition-colors">
                                <span className="text-[15px] font-semibold text-blue-900 transition-colors group-hover:text-white dark:text-blue-50">
                                    {currentLocale === 'kh' ? 'បង្កើតផលិតផល' : 'Create Product'}
                                </span>
                                <span className="mt-0.5 text-[13px] text-blue-700 transition-colors group-hover:text-blue-100 dark:text-blue-300">
                                    {currentLocale === 'kh' ? 'ដាក់លក់ផលិតផលថ្មីរបស់អ្នក' : 'List a new item for sale'}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:text-white dark:text-blue-400" />
                    </Link>

                    {/* 2. All Your Products Action */}
                    <Link
                        href={userShop ? `/shop-profile/${userShop?.id}` : `/user-profile/${auth?.user?.id}`}
                        className="group flex w-full items-center justify-between rounded-md border border-gray-200 bg-white p-4 transition-all hover:bg-gray-50 focus-visible:bg-gray-50 dark:border-white/10 dark:bg-[#101010] dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                {/* Make sure { LayoutGrid } is imported from 'lucide-react' */}
                                <LayoutGrid className="h-6 w-6 stroke-[1.5px]" />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
                                    {currentLocale === 'kh' ? 'ផលិតផលទាំងអស់របស់អ្នក' : 'All Your Products'}
                                </span>
                                <span className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                                    {userShop
                                        ? currentLocale === 'kh'
                                            ? 'មើលផលិតផលទាំងអស់នៅក្នុងហាងរបស់អ្នក'
                                            : 'View all products listed in your shop'
                                        : currentLocale === 'kh'
                                          ? 'មើលផលិតផលទាំងអស់ដែលអ្នកបានដាក់លក់'
                                          : 'View all products you have listed for sale'}
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                    </Link>

                    <div className="overflow-hidden rounded-md border">
                        {/* 3. Shop Action (Create or View) */}
                        <Link
                            href={userShop ? `/shop-profile/${userShop?.id}` : `/create-shop`}
                            className="group flex w-full items-center justify-between bg-white p-4 transition-all hover:bg-gray-50 focus-visible:bg-gray-50 dark:border-white/10 dark:bg-[#101010] dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    {userShop ? <Store className="h-6 w-6 stroke-[1.5px]" /> : <PlusCircle className="h-6 w-6 stroke-[1.5px]" />}
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
                                        {userShop
                                            ? currentLocale === 'kh'
                                                ? 'ហាងរបស់ខ្ញុំ'
                                                : 'My Shop'
                                            : currentLocale === 'kh'
                                              ? 'បង្កើតហាង'
                                              : 'Create Shop'}
                                    </span>
                                    <span className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                                        {userShop
                                            ? currentLocale === 'kh'
                                                ? 'គ្រប់គ្រងហាងរបស់អ្នក'
                                                : 'Manage your business profile'
                                            : currentLocale === 'kh'
                                              ? 'ចុះឈ្មោះហាងរបស់អ្នកនៅលើប្រព័ន្ធ'
                                              : 'Register your business on the platform'}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                        </Link>

                        {/* 4. Garage Action (Create or View) */}
                        <Link
                            href={userGarage ? `/my-garage` : `/create-garage`}
                            className="group flex w-full items-center justify-between bg-white p-4 transition-all hover:bg-gray-50 focus-visible:bg-gray-50 dark:border-white/10 dark:bg-[#101010] dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                    {userGarage ? <Wrench className="h-6 w-6 stroke-[1.5px]" /> : <PlusCircle className="h-6 w-6 stroke-[1.5px]" />}
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
                                        {userGarage
                                            ? currentLocale === 'kh'
                                                ? 'យានដ្ឋានរបស់ខ្ញុំ'
                                                : 'My Garage'
                                            : currentLocale === 'kh'
                                              ? 'បង្កើតយានដ្ឋាន'
                                              : 'Create Garage'}
                                    </span>
                                    <span className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">
                                        {userGarage
                                            ? currentLocale === 'kh'
                                                ? 'គ្រប់គ្រងយានដ្ឋានរបស់អ្នក'
                                                : 'Manage your garage profile'
                                            : currentLocale === 'kh'
                                              ? 'ចុះឈ្មោះយានដ្ឋានរបស់អ្នកនៅលើប្រព័ន្ធ'
                                              : 'Register your garage on the platform'}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                        </Link>
                    </div>
                </div>
                {/* --- End Action Buttons Section --- */}

                <SettingsPage />
            </div>
        </ProfileLayout>
    );
};

export default Index;
