import useTranslation from '@/hooks/use-translation';
import { Head, Link } from '@inertiajs/react';
import { ArrowRightIcon, UserPlusIcon } from 'lucide-react';
import ProfileLayout from '../layouts/ProfileLayout';

export default function ShowLoginAndRegisterPage() {
    const { currentLocale } = useTranslation();

    return (
        <ProfileLayout>
            <div className="relative flex min-h-[80vh] items-center justify-center p-4 transition-colors sm:p-6">
                <Head title={currentLocale === 'kh' ? 'ចូលគណនី' : 'Account Access'} />

                {/* Ambient Background Glows (Modern Touch) */}
                <div className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px] dark:bg-[#ffd002]/10" />

                {/* Main Glass Card - Shadows removed */}
                <div className="bg-background/60 relative w-full max-w-lg overflow-hidden rounded-xl border p-8 dark:border-white/15 dark:bg-white/5">
                    {/* Header Section */}
                    <div className="mb-10 text-center">
                        <div className="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-lg dark:bg-[#ffd002]/10">
                            <span className="fill-primary size-8 dark:fill-[#ffd002]">
                                <svg id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                                    <path d="m23.33 17.5c-.891 1.542-2.551 2.5-4.33 2.5h-6v2h4c.553 0 1 .448 1 1s-.447 1-1 1h-10c-.553 0-1-.448-1-1s.447-1 1-1h4v-2h-6c-2.757 0-5-2.243-5-5v-8c0-2.757 2.243-5 5-5h7c.553 0 1 .448 1 1s-.447 1-1 1h-7c-1.654 0-3 1.346-3 3v8c0 1.654 1.346 3 3 3h14c1.068 0 2.064-.575 2.6-1.5.275-.479.886-.644 1.366-.365.478.276.642.888.364 1.366zm-19.261-2.699c-.109.541.24 1.069.781 1.179.544.111 1.069-.241 1.18-.781.141-.694.759-1.199 1.47-1.199s1.329.504 1.47 1.199c.108.545.651.892 1.18.781.541-.11.891-.638.781-1.179-.33-1.623-1.772-2.801-3.431-2.801s-3.101 1.178-3.431 2.801zm5.431-5.801c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm14.5-1.5v3c0 1.93-1.57 3.5-3.5 3.5h-4c-1.93 0-3.5-1.57-3.5-3.5v-3c0-1.391.822-2.585 2-3.149v-.851c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v.851c1.178.564 2 1.758 2 3.149zm-7-4v.5h3v-.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5zm5 4c0-.827-.673-1.5-1.5-1.5h-4c-.827 0-1.5.673-1.5 1.5v3c0 .827.673 1.5 1.5 1.5h4c.827 0 1.5-.673 1.5-1.5zm-3.5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                                </svg>
                            </span>
                        </div>
                        <h1 className="text-foreground mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                            {currentLocale === 'kh' ? 'សូមស្វាគមន៍!' : 'Welcome!'}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {currentLocale === 'kh'
                                ? 'ចូលគណនីដើម្បីចូលមើលប្រវត្តិរូបរបស់អ្នក និងការកំណត់ផ្ទាល់ខ្លួន។'
                                : 'Login to access your account profile, and personalized settings.'}
                        </p>
                    </div>

                    {/* Actions / Buttons */}
                    <div className="flex flex-col gap-4">
                        {/* Primary Login Button */}
                        <Link
                            href="/login"
                            className="group bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary dark:focus:ring-offset-background flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:bg-[#ffd002] dark:text-black dark:hover:bg-[#e5ba00] dark:focus:ring-[#ffd002]"
                        >
                            <span>{currentLocale === 'kh' ? 'ចូលគណនី' : 'Login'}</span>
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        {/* Divider */}
                        <div className="relative flex items-center py-2">
                            <div className="border-border/50 flex-grow border-t dark:border-white/10"></div>
                            <span className="text-muted-foreground mx-4 shrink-0 text-xs">
                                {currentLocale === 'kh' ? 'ឬជាអ្នកប្រើប្រាស់ថ្មី?' : 'or new here?'}
                            </span>
                            <div className="border-border/50 flex-grow border-t dark:border-white/10"></div>
                        </div>

                        {/* Secondary Register Button - Now with a tinted background to stand out more */}
                        <Link
                            href="/register"
                            className="group border-primary text-primary hover:bg-primary/10 focus:ring-primary flex w-full items-center justify-center gap-2 rounded-sm border px-4 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-[#ffd002] dark:text-[#ffd002] dark:hover:bg-[#ffd002]/10"
                        >
                            <UserPlusIcon className="h-4 w-4 transition-colors duration-300" />
                            <span>{currentLocale === 'kh' ? 'បង្កើតគណនី' : 'Create an Account'}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
