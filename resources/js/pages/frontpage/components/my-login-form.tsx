import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const { t, currentLocale } = useTranslation(); // en, kh

    // Using Inertia's useForm instead of standard React useState
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Inertia handles the POST request, validation errors, and server-side redirects automatically
        post(route('login'), {
            onFinish: () => reset('password'), // Clear the password field on a failed attempt
        });
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">{currentLocale === 'kh' ? 'អ៊ីមែល' : 'Email'}</Label>
                        <Input
                            className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">{currentLocale === 'kh' ? 'ពាក្យសម្ងាត់' : 'Password'}</Label>
                        </div>
                        <Input
                            className="bg-background h-11 rounded-xs dark:border-white/10 dark:bg-white/5"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className="h-11 w-full rounded-xs" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {currentLocale === 'kh' ? 'ចូលគណនី' : 'Login'}
                    </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                    {currentLocale === 'kh' ? 'មិនទាន់មានគណនីមែនទេ?' : "Don't have an account?"}{' '}
                    <Link href="/register" className="underline underline-offset-4">
                        {currentLocale === 'kh' ? 'បង្កើតគណនី' : 'Sign up'}
                    </Link>
                </div>
            </form>
        </div>
    );
}
