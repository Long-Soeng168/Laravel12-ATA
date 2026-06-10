import { Head, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTranslation from '@/hooks/use-translation';
import ProfileLayout from '../frontpage/layouts/ProfileLayout';

type RegisterForm = {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const { t, currentLocale } = useTranslation(); //en, kh

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
                        <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">{t('Register')}</h1>
                    </header>
                </div>

                <div className="relative mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#121212] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    {/* Ambient Glow Effects */}
                    <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/4 -translate-y-1/3 rounded-full bg-blue-50 blur-3xl transition-transform duration-700 hover:scale-110 dark:bg-indigo-500/10"></div>
                    <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-purple-50 blur-3xl dark:bg-purple-500/10"></div>

                    <div className="z-20">
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">{t('Name')}</Label>
                                    <Input
                                        className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder={t('Full Name')}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">{t('Email')}</Label>
                                    <Input
                                        className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder={t('email@example.com')}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">{t('Phone')}</Label>
                                    <Input
                                        className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                                        id="phone"
                                        type="number"
                                        required
                                        tabIndex={3}
                                        autoComplete="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        disabled={processing}
                                        placeholder={t('Phone Number')}
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">{t('Password')}</Label>
                                    <Input
                                        className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder={t('Password')}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">{t('Confirm Password')}</Label>
                                    <Input
                                        className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={5}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder={t('Confirm Password')}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="mt-2 h-11 w-full rounded-xs" tabIndex={6} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {currentLocale == 'kh' ? 'បង្កើតគណនី' : 'Create account'}
                                </Button>
                            </div>
                            <div className="text-muted-foreground text-center text-sm">
                                {currentLocale === 'kh' ? 'មានគណនីរួចហើយមែនទេ?' : 'Already have an account?'}{' '}
                                <TextLink href={route('login')} tabIndex={7}>
                                    {currentLocale === 'kh' ? 'ចូលគណនី' : 'Log in'}
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </ProfileLayout>
    );
}
