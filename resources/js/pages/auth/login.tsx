import useTranslation from '@/hooks/use-translation';
import { Head, usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { LoginForm } from '../frontpage/components/my-login-form';
import ProfileLayout from '../frontpage/layouts/ProfileLayout';
interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t, currentLocale } = useTranslation();
    const { url } = usePage();
    return (
        <ProfileLayout>
            <Head title="Log in" />

            <section className="section-container p-3 lg:p-8">
                <div className="mx-auto flex w-full max-w-lg">
                    <header className="mb-5 flex items-center gap-3 pt-2">
                        <button
                            onClick={() => window.history.back()}
                            className="group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gray-100/80 text-gray-500 transition-all duration-200 ease-out hover:bg-gray-200 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-95 dark:bg-white/[0.04] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-offset-[#101010]"
                            aria-label={t('Go back')}
                        >
                            <ArrowLeftIcon className="h-[20px] w-[20px] stroke-[2px] duration-200" />
                        </button>
                        <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">{t('Login')}</h1>
                    </header>
                </div>

                <div className="relative mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#121212] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    {/* Ambient Glow Effects */}
                    <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/4 -translate-y-1/3 rounded-full bg-blue-50 blur-3xl transition-transform duration-700 hover:scale-110 dark:bg-indigo-500/10"></div>
                    <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-purple-50 blur-3xl dark:bg-purple-500/10"></div>

                    <div className="z-20">
                        <LoginForm />
                    </div>
                </div>
            </section>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </ProfileLayout>
    );
}
