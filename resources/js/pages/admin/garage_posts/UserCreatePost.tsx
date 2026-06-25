import useTranslation from '@/hooks/use-translation';
import ProfileLayout from '@/pages/frontpage/layouts/ProfileLayout';
import { usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import CreateForm from './CreateForm';

export default function UserCreatePost() {
    const { t, currentLocale } = useTranslation();
    const { editData } = usePage<any>().props;

    const isKh = currentLocale === 'kh';

    return (
        <ProfileLayout>
            <div className="bg-background">
                <div className="section-container max-w-2xl px-0">
                    <header className="mb-5 flex items-center gap-3 px-4 pt-6">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="group flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-200 ease-out hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-95 dark:border-white/10 dark:bg-[#101010] dark:text-gray-400 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                            aria-label={t('Go back')}
                        >
                            <ArrowLeftIcon className="h-[20px] w-[20px] stroke-[2px] duration-200" />
                        </button>
                        <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">
                            {editData ? (isKh ? 'កែប្រែយានដ្ឋាន' : 'Edit Garage') : isKh ? 'បង្កើតយានដ្ឋាន' : 'Create Garage'}
                        </h1>
                    </header>
                    <CreateForm />
                </div>
            </div>
        </ProfileLayout>
    );
}
