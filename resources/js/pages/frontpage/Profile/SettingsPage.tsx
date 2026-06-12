import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Appearance, useAppearance } from '@/hooks/use-appearance';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Check, ChevronRight, Globe, Lock, Monitor, Moon, Sun, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

// --- Form & UI Imports for Password ---
import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
    const { t, currentLocale } = useTranslation();
    const { auth } = usePage<any>().props;

    const currentLanguageDisplay = currentLocale === 'kh' ? t('Khmer') : t('English');

    const { appearance, updateAppearance } = useAppearance();
    const appearanceLabel = appearance === 'light' ? t('Light') : appearance === 'dark' ? t('Dark') : t('System');
    const AppearanceIcon = appearance === 'light' ? Sun : appearance === 'dark' ? Moon : Monitor;

    const goToProfile = () => {
        router.clearHistory();
        router.visit('/profile');
    };

    return (
        <>
            <div className="section-container relative p-3 lg:p-8">
                <div className="mx-auto max-w-lg">
                    <div className="mb-6">
                        {/* Modern Card Container */}
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all dark:border-white/10 dark:bg-white/5">
                            {/* 1. Edit Profile */}
                            <Link
                                href="/user-settings/profile"
                                prefetch
                                className="group flex w-full items-center justify-between px-5 py-4 transition-colors outline-none hover:bg-gray-50/80 focus-visible:bg-gray-50 dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.03]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-hover:scale-105 dark:bg-blue-500/10 dark:text-blue-400">
                                        <User className="h-[18px] w-[18px] stroke-[2px]" />
                                    </div>
                                    <span className="text-[15px] font-medium text-gray-800 dark:text-gray-200">
                                        {currentLocale === 'kh' ? 'កែប្រែប្រវត្តិរូប' : 'Edit Profile'}
                                    </span>
                                </div>
                                <ChevronRight className="h-[18px] w-[18px] text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                            </Link>

                            <div className="ml-[74px] h-[1px] bg-gray-100 dark:bg-white/5" />

                            {/* 2. Change Password */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="group flex w-full items-center justify-between px-5 py-4 transition-colors outline-none hover:bg-gray-50/80 focus-visible:bg-gray-50 dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.03]">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-transform group-hover:scale-105 dark:bg-orange-500/10 dark:text-orange-400">
                                                <Lock className="h-[18px] w-[18px] stroke-[2px]" />
                                            </div>
                                            <span className="text-[15px] font-medium text-gray-800 dark:text-gray-200">{t('Change Password')}</span>
                                        </div>
                                        <ChevronRight className="h-[18px] w-[18px] text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                                    </button>
                                </DialogTrigger>
                                <PasswordDialogContent />
                            </Dialog>

                            <div className="ml-[74px] h-[1px] bg-gray-100 dark:bg-white/5" />

                            {/* 3. Appearance */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="group flex w-full items-center justify-between px-5 py-4 transition-colors outline-none hover:bg-gray-50/80 focus-visible:bg-gray-50 dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.03]">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-transform group-hover:scale-105 dark:bg-purple-500/10 dark:text-purple-400">
                                                {/* Use the dynamic icon here */}
                                                <AppearanceIcon className="h-[18px] w-[18px] stroke-[2px]" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <span className="text-[15px] font-medium text-gray-800 dark:text-gray-200">{t('Appearance')}</span>
                                                <span className="mt-0.5 text-[13px] text-gray-400 dark:text-gray-500">{appearanceLabel}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-[18px] w-[18px] text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                                    </button>
                                </DialogTrigger>
                                {/* Pass the state and updater down as props */}
                                <AppearanceDialogContent appearance={appearance} updateAppearance={updateAppearance} />
                            </Dialog>

                            <div className="ml-[74px] h-[1px] bg-gray-100 dark:bg-white/5" />

                            {/* 4. Language */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="group flex w-full items-center justify-between px-5 py-4 transition-colors outline-none hover:bg-gray-50/80 focus-visible:bg-gray-50 dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.03]">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                <Globe className="h-[18px] w-[18px] stroke-[2px]" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <span className="text-[15px] font-medium text-gray-800 dark:text-gray-200">{t('Language')}</span>
                                                <span className="mt-0.5 text-[13px] text-gray-400 dark:text-gray-500">{currentLanguageDisplay}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-[18px] w-[18px] text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                                    </button>
                                </DialogTrigger>
                                <LanguageDialogContent />
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- Dialog Contents ---

function PasswordDialogContent() {
    const { t } = useTranslation();
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    // 1. Initialize Inertia's useForm
    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // 2. Handle the form submission
    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFlashMessage({ message: t('Password update successfully!'), type: 'success' });
            },
            onError: (errors: any) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[92vw] max-w-md rounded-2xl border border-gray-200/80 bg-white p-7 dark:border-white/10 dark:bg-[#101010]"
        >
            <DialogHeader className="border-b border-gray-100 pb-5 text-start dark:border-white/5">
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">{t('Update password')}</DialogTitle>
                <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                    {t('Ensure your account is using a long, random password to stay secure')}
                </p>
            </DialogHeader>

            {/* 3. Use standard HTML form with onSubmit */}
            <form onSubmit={updatePassword} className="mt-2 space-y-5">
                {recentlySuccessful && flashMessage.message && (
                    <AlertFlashMessage type="success" flashMessage={flashMessage.message} setFlashMessage={setFlashMessage} showProgress={false} />
                )}

                <div className="grid gap-2">
                    <Label htmlFor="current_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('Current password')}
                    </Label>
                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="h-12 rounded-xs border-gray-200 bg-gray-50/50 shadow-none transition-colors focus-visible:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 dark:border-white/10 dark:bg-[#161616]"
                        autoComplete="current-password"
                        placeholder={t('Current password')}
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('New password')}
                    </Label>
                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="h-12 rounded-xs border-gray-200 bg-gray-50/50 shadow-none transition-colors focus-visible:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 dark:border-white/10 dark:bg-[#161616]"
                        autoComplete="new-password"
                        placeholder={t('New password')}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('Confirm password')}
                    </Label>
                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="h-12 rounded-xs border-gray-200 bg-gray-50/50 shadow-none transition-colors focus-visible:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500 dark:border-white/10 dark:bg-[#161616]"
                        autoComplete="new-password"
                        placeholder={t('Confirm password')}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="mt-8 flex justify-end pt-2">
                    <Button
                        disabled={processing}
                        className="h-12 w-full rounded-sm bg-[#FF6D00] font-medium text-white hover:bg-[#e66200] sm:w-auto sm:px-6 dark:bg-[#FF6D00] dark:text-white dark:hover:bg-[#e66200]"
                    >
                        {t('Save password')}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}

function AppearanceDialogContent({ appearance, updateAppearance }: { appearance: Appearance; updateAppearance: (val: Appearance) => void }) {
    const { t, currentLocale } = useTranslation();

    const themes: { value: Appearance; icon: React.ElementType; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[90vw] max-w-[340px] rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-white/10 dark:bg-[#101010]"
        >
            <DialogHeader className="gap-0 text-start">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">{t('Appearance')}</DialogTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {currentLocale === 'kh' ? 'កំណត់រូបរាងកម្មវិធីនៅលើឧបករណ៍របស់អ្នក។' : 'Customize how the app looks on your device.'}
                </p>
            </DialogHeader>

            <div className="flex flex-col gap-2.5">
                {themes.map(({ value, icon: Icon, label }) => (
                    <SelectionButton
                        key={value}
                        label={t(label)}
                        icon={<Icon className="h-5 w-5 opacity-70" />}
                        isActive={appearance === value}
                        onClick={() => updateAppearance(value)}
                    />
                ))}
            </div>
        </DialogContent>
    );
}

function LanguageDialogContent() {
    const { t, currentLocale } = useTranslation();
    const [loadingLocale, setLoadingLocale] = useState<string | null>(null);

    const languages = [
        { value: 'kh', iconSrc: '/assets/icons/khmer.png', label: t('Khmer') },
        { value: 'en', iconSrc: '/assets/icons/english.png', label: t('English') },
    ];

    return (
        <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[90vw] max-w-[340px] rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-white/10 dark:bg-[#101010]"
        >
            <DialogHeader className="gap-0 text-start">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">{t('Language')}</DialogTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {currentLocale === 'kh' ? 'ជ្រើសរើសភាសាដែលអ្នកពេញចិត្ត។' : 'Select your preferred language.'}
                </p>
            </DialogHeader>

            <div className="flex flex-col gap-2.5">
                {languages.map(({ value, iconSrc, label }) => {
                    const isLoading = loadingLocale === value;
                    const displayLabel = isLoading ? (currentLocale === 'kh' ? 'កំពុងផ្ទុក...' : 'Loading...') : label;

                    return (
                        <a
                            key={value}
                            href={`/lang/${value}`}
                            onClick={() => setLoadingLocale(value)}
                            // Dim the button and prevent clicking again while loading
                            className={isLoading ? 'pointer-events-none opacity-70 transition-opacity' : 'transition-opacity'}
                        >
                            <SelectionButton
                                label={displayLabel}
                                icon={<img src={iconSrc} alt={`${label} flag`} className="h-5 w-auto shrink-0 object-contain" />}
                                isActive={currentLocale === value}
                            />
                        </a>
                    );
                })}
            </div>
        </DialogContent>
    );
}

// --- Reusable Button Component ---

function SelectionButton({ label, isActive, icon, onClick }: { label: string; isActive: boolean; icon?: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'group flex w-full cursor-pointer items-center justify-between rounded-sm px-4 py-3.5 transition-all duration-200 outline-none',
                isActive
                    ? 'bg-[#FF6D00]/10 text-[#FF6D00] dark:bg-[#FF6D00]/15'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-50/2 dark:text-gray-300 dark:hover:bg-white/5',
            )}
        >
            <div className="flex items-center gap-3.5">
                {icon}
                <span className="text-[15px] font-medium">{label}</span>
            </div>
            {/* The Check icon slides in subtly on active */}
            <div className={cn('transition-all duration-300', isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0')}>
                {isActive && <Check className="h-5 w-5 stroke-[2.5px]" />}
            </div>
        </button>
    );
}
