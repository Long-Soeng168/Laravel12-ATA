import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { EditIcon, Info } from 'lucide-react';
import { useState } from 'react';

const ProfileCard = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const { auth, website_info } = usePage<any>().props;
    const user = auth?.user;
    const { t, currentLocale } = useTranslation(); // kh, en

    // Helper to format Date of Birth to "12 May 2002" format
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const logo = website_info?.logo ? `/assets/images/website_infos/thumb/${website_info.logo}` : '/assets/images/default-logo.png';

    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <div
                className={cn(
                    'relative flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-[#121212] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]',
                    isOpenDialog && 'dark:border-border',
                )}
            >
                {/* Ambient Glow Effects */}
                <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/4 -translate-y-1/3 rounded-full bg-blue-50 blur-3xl transition-transform duration-700 hover:scale-110 dark:bg-indigo-500/50"></div>
                <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-purple-50 blur-3xl dark:bg-purple-500/20"></div>

                {/* Middle: Photo & Identity */}
                <div className="relative my-2 flex flex-1 flex-col justify-center px-6 py-4">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="size-20 shrink-0 overflow-hidden rounded-sm bg-white/20 shadow">
                            {user?.image ? (
                                <img
                                    src={`/assets/images/users/thumb/${user.image}`}
                                    alt={user?.name || 'Student Avatar'}
                                    className="h-full w-full object-cover"
                                />
                            ) : user?.gender === 'female' && user?.student_id ? (
                                <img src="/assets/icons/avatars/student_female.png" alt="Female Avatar" className="h-full w-full object-cover" />
                            ) : user?.gender === 'male' && user?.student_id ? (
                                <img src="/assets/icons/avatars/student_male.png" alt="Male Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center p-4">
                                    <img src="/assets/icons/avatars/user.png" alt="User Avatar" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Typography */}
                        <div className="-mt-1.5 flex flex-col justify-center gap-0.5">
                            <h2 className="mb-0.5 text-[22px] font-bold text-gray-900 dark:text-white">{user?.name_kh || user?.name || 'N/A'}</h2>
                            {user?.phone && (
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                    {user?.phone}{' '}
                                    {user?.email && <span className="text-lg font-normal text-gray-700 dark:text-gray-300">({user?.email})</span>}
                                </h3>
                            )}

                            <div className="flex flex-wrap items-center">
                                <p className="flex text-base font-semibold tracking-wide text-gray-600 capitalize dark:text-gray-400">
                                    {t(user?.gender) || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Improved Detail Button & Dialog Trigger */}
                <DialogTrigger asChild>
                    <button className="text-primary absolute right-0 bottom-0 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors hover:underline">
                        <Info className="h-4 w-4" />
                        <span>{currentLocale === 'kh' ? 'លម្អិត' : 'Detail'}</span>
                    </button>
                </DialogTrigger>
            </div>

            {/* Shadcn Full Information Dialog */}
            <DialogContent className="max-h-[90vh] w-[90vw] max-w-md overflow-y-auto rounded-sm border border-gray-200 p-6 backdrop-blur-xl dark:border-white/20 dark:bg-[#0a0a0a]/95">
                <DialogHeader className="mb-4 border-b border-gray-100 pb-4 dark:border-gray-800">
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentLocale === 'kh' ? 'ព័ត៌មានអ្នកប្រើប្រាស់' : 'User Detail'}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Avatar Display in Dialog */}
                    <div className="flex justify-center pb-2">
                        <div className="size-20 shrink-0 overflow-hidden rounded-sm bg-white/20 shadow">
                            {user?.image ? (
                                <img
                                    src={`/assets/images/users/thumb/${user.image}`}
                                    alt={user?.name || 'Student Avatar'}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center p-4">
                                    <img src="/assets/icons/avatars/user.png" alt="User Avatar" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-start gap-4 border-b border-gray-50 pb-3 dark:border-gray-800/50">
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                            {currentLocale === 'kh' ? 'ឈ្មោះពេញ' : 'Full Name'}
                        </span>
                        <div className="col-span-2 flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{user?.name_kh || user?.name || 'N/A'}</span>
                            {user?.name_kh && <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{user?.name || 'N/A'}</span>}
                        </div>
                    </div>

                    {/* Email Display */}
                    <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-3 dark:border-gray-800/50">
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{currentLocale === 'kh' ? 'អ៊ីមែល' : 'Email'}</span>
                        <span className="col-span-2 text-sm font-bold break-all text-gray-900 dark:text-white">{user?.email || 'N/A'}</span>
                    </div>

                    {/* Phone Display */}
                    <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-3 dark:border-gray-800/50">
                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{currentLocale === 'kh' ? 'លេខទូរស័ព្ទ' : 'Phone'}</span>
                        <span className="col-span-2 text-sm font-bold text-gray-900 dark:text-white">{user?.phone || 'N/A'}</span>
                    </div>

                    {/* Edit Profile Button - Flat & Sharp */}
                    <div className="mt-2">
                        <Link
                            prefetch
                            href="/user-settings/profile"
                            className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#FF6D00] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e66200] focus-visible:outline-none"
                        >
                            <EditIcon className="h-4 w-4" />
                            {currentLocale === 'kh' ? 'កែប្រែប្រវត្តិរូប' : 'Edit Profile'}
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileCard;
