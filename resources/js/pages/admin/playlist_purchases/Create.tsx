import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as inertiaUseForm, usePage } from '@inertiajs/react';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    status: z.string().optional(),
    playlist_id: z.string().optional(),
    user_id: z.string().optional(),
});

export default function Create() {
    // ==== Start Our Code ====
    const { t } = useTranslation();

    const { post, progress, processing, transform, errors } = inertiaUseForm();
    const { playlists, users, editData, readOnly } = usePage<any>().props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            playlist_id: editData?.playlist_id?.toString() || '',
            user_id: editData?.user_id?.toString() || '',
            status: editData?.status?.toString() || 'completed',
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // console.log(values);
            // toast(
            //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            //     </pre>,
            // );
            // return;
            transform(() => ({
                ...values,
            }));

            if (editData?.id) {
                post(`/admin/playlist_purchases/${editData?.id}/update`, {
                    preserveScroll: true,
                    onSuccess: (page: any) => {
                        if (page.props.flash?.success) {
                            toast.success('Success', {
                                description: page.props.flash.success,
                            });
                        }
                        if (page.props.flash?.error) {
                            toast.error('Error', {
                                description: page.props.flash.error,
                            });
                        }
                    },
                    onError: (e) => {
                        toast.error('Error', {
                            description: 'Failed to create.' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            } else {
                post('/admin/playlist_purchases', {
                    preserveScroll: true,
                    onSuccess: (page: any) => {
                        form.reset();
                        if (page.props.flash?.success) {
                            toast.success('Success', {
                                description: page.props.flash.success,
                            });
                        }
                        if (page.props.flash?.error) {
                            toast.error('Error', {
                                description: page.props.flash.error,
                            });
                        }
                    },
                    onError: (e) => {
                        toast.error('Error', {
                            description: 'Failed to create.' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            }
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Failed to submit the form. Please try again.' + error);
        }
    }

    const currentBreadcrumb = readOnly ? t('Show') : editData ? t('Edit') : t('Create');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Playlist Purchases'),
            href: '/admin/playlist_purchases',
        },
        {
            title: currentBreadcrumb,
            href: '#',
        },
    ];
    // ==== End Our Code ====
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="playlist_id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col" key={field.value}>
                                        <FormLabel>{t('Playlist')}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                                                    >
                                                        {field.value
                                                            ? (() => {
                                                                  const playlist = playlists?.find((playlist: any) => playlist.id == field.value);
                                                                  return playlist ? `${playlist.name}` : '';
                                                              })()
                                                            : t('Select playlist')}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search playlist..." />
                                                    <CommandList>
                                                        <CommandEmpty>{t('No data')}</CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandItem
                                                                value=""
                                                                onSelect={() => {
                                                                    form.setValue('playlist_id', '');
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn('mr-2 h-4 w-4', '' == field.value ? 'opacity-100' : 'opacity-0')}
                                                                />
                                                                {t('Select playlist')}
                                                            </CommandItem>
                                                            {playlists?.map((playlist: any) => (
                                                                <CommandItem
                                                                    value={playlist.name}
                                                                    key={playlist.id}
                                                                    onSelect={() => {
                                                                        form.setValue('playlist_id', playlist.id.toString());
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            playlist.id == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {playlist.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {/* <FormDescription>{t('Select the playlist where this post will show.')}</FormDescription> */}
                                        <FormMessage>{errors.playlist_id && <div>{errors.playlist_id}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="user_id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col" key={field.value}>
                                        <FormLabel>{t('User Buyer')}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                                                    >
                                                        {field.value
                                                            ? (() => {
                                                                  const user = users?.find((user: any) => user.id == field.value);
                                                                  return user ? `${user.name}` : '';
                                                              })()
                                                            : t('Select user')}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-full">
                                                <Command>
                                                    <CommandInput placeholder="Search user..." />
                                                    <CommandList>
                                                        <CommandEmpty>{t('No data')}</CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandItem
                                                                value=""
                                                                onSelect={() => {
                                                                    form.setValue('user_id', '');
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn('mr-2 h-4 w-4', '' == field.value ? 'opacity-100' : 'opacity-0')}
                                                                />
                                                                {t('Select user')}
                                                            </CommandItem>
                                                            {users?.map((user: any) => (
                                                                <CommandItem
                                                                    value={user.name + user.email}
                                                                    key={user.id}
                                                                    onSelect={() => {
                                                                        form.setValue('user_id', user.id.toString());
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            user.id == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {user.name} ({user.email})
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {/* <FormDescription>{t('Select the playlist where this post will show.')}</FormDescription> */}
                                        <FormMessage>{errors.user_id && <div>{errors.user_id}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem key={field.value}>
                                        <FormLabel>{t('Status')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pending">{t('Pending')}</SelectItem>
                                                <SelectItem value="completed">{t('Completed')}</SelectItem>
                                                <SelectItem value="cancelled">{t('Cancelled')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{errors.status && <div>{errors.status}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* End Long Description */}
                    {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                    {!readOnly && (
                        <Button disabled={processing} type="submit">
                            {processing && (
                                <span className="size-6 animate-spin">
                                    <Loader />
                                </span>
                            )}
                            {processing ? t('Submitting') : t('Submit')}
                        </Button>
                    )}
                </form>
            </Form>
        </AppLayout>
    );
}
