import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { LayoutIcon } from 'lucide-react';

export default function DashboardFeatureCard() {
    const { currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';
    const hasPermission = usePermission();

    // Check permission before rendering
    if (!hasPermission('dashboard view')) {
        return null;
    }

    return (
        <div className="grid gap-3">
            <Link href="/dashboard">
                <Card className="relative flex flex-row items-center gap-5 rounded-md border border-gray-200 bg-white p-4 shadow-none transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/5">
                    {/* Icon Container: Sharp edges */}
                    <div className="shrink-0 rounded-sm border border-gray-100 bg-gray-50 p-2.5 dark:border-gray-800 dark:bg-white/10">
                        <LayoutIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={1.75} />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col p-0">
                        <div className="mb-0.5 flex items-center gap-2">
                            <CardTitle className="text-[17px] font-bold text-gray-900 dark:text-white">
                                {isKh ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard'}
                            </CardTitle>
                        </div>
                        <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {isKh ? 'ទិដ្ឋភាពទូទៅនៃស្ថិតិប្រព័ន្ធសំខាន់ៗ និងការគ្រប់គ្រង។' : 'Overview of key system statistics and admin controls.'}
                        </CardDescription>
                    </div>
                </Card>
            </Link>
        </div>
    );
}
