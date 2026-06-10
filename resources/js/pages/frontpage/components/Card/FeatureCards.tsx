import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { BookOpenIcon, CalendarCheckIcon, HeartIcon, LayoutIcon, SettingsIcon } from 'lucide-react';

const features = [
    {
        title: 'Dashboard',
        title_kh: 'ផ្ទាំងគ្រប់គ្រង',
        description: 'Overview of key system statistics and admin controls.',
        description_kh: 'ទិដ្ឋភាពទូទៅនៃស្ថិតិប្រព័ន្ធសំខាន់ៗ និងការគ្រប់គ្រង។',
        icon: LayoutIcon,
        link: '/dashboard',
        permission: 'dashboard view',
    },
    {
        title: 'Settings',
        title_kh: 'ការកំណត់',
        description: 'Personalize your account.',
        description_kh: 'រៀបចំ និងគ្រប់គ្រងគណនីផ្ទាល់ខ្លួនរបស់អ្នក។',
        icon: SettingsIcon,
        link: '/user-settings',
        permission: '',
    },
    {
        title: 'Recent Reads',
        title_kh: 'ការអានថ្មីៗ',
        description: 'See the books and materials you recently accessed.',
        description_kh: 'មើលសៀវភៅ និងឯកសារដែលអ្នកទើបតែបានចូលអាន។',
        icon: BookOpenIcon,
        permission: '',
    },
    {
        title: 'Favorites',
        title_kh: 'ចំណូលចិត្ត',
        description: 'Easily find and manage your saved.',
        description_kh: 'ស្វែងរក និងគ្រប់គ្រងសៀវភៅ ឬឯកសារដែលអ្នកបានរក្សាទុក។',
        icon: HeartIcon,
        permission: '',
    },
    {
        title: 'Your Attendance',
        title_kh: 'វត្តមានរបស់អ្នក',
        description: 'View your check-in history and track library visits.',
        description_kh: 'មើលប្រវត្តិវត្តមាន និងការចូលអានក្នុងបណ្ណាល័យរបស់អ្នក។',
        icon: CalendarCheckIcon,
        permission: '',
    },
];

export default function FeatureCards() {
    const { currentLocale } = useTranslation(); // 'kh' or 'en'
    const isKh = currentLocale === 'kh';
    const hasPermission = usePermission();

    return (
        <div className="grid gap-3">
            {features.map((feature) => {
                if (feature.permission && !hasPermission(feature.permission)) {
                    return null;
                }

                const Icon = feature.icon;

                return (
                    <Link href={feature.link ?? '#'}>
                        <Card
                            key={feature.title}
                            className="relative flex flex-row items-center gap-5 rounded-sm border border-gray-200 bg-white p-4 shadow-none transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/5"
                        >
                            {/* Icon Container: Sharp edges */}
                            <div className="shrink-0 rounded-sm border border-gray-100 bg-gray-50 p-2.5 dark:border-gray-800 dark:bg-white/10">
                                <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={1.75} />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col p-0">
                                <div className="mb-0.5 flex items-center gap-2">
                                    <CardTitle className="text-[17px] font-bold text-gray-900 dark:text-white">
                                        {isKh ? feature.title_kh : feature.title}
                                    </CardTitle>
                                    {/* Flat-Sharp Coming Soon Badge */}
                                    {!feature?.link && (
                                        <span className="rounded-sm border border-[#FF6D00]/30 bg-[#FF6D00]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#FF6D00] uppercase">
                                            {isKh ? 'ឆាប់ៗនេះ' : 'Coming Soon'}
                                        </span>
                                    )}
                                </div>
                                <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {isKh ? feature.description_kh : feature.description}
                                </CardDescription>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
