import DeleteButton from '@/components/delete-button';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as inertiaUseForm, usePage } from '@inertiajs/react';
import { Check, ChevronsUpDown, CloudUpload, Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    garage_id: z.any(),
    title: z.string().min(1, 'Title is required').max(255),
    short_description: z.string().max(500).optional(),
});

export default function CreateForm() {
    const { t } = useTranslation();
    const dropZoneConfig = {
        maxFiles: 100,
        maxSize: 1024 * 1024 * 2, // 2MB
        multiple: true,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
        },
    };

    const { post, progress, processing, transform, errors } = inertiaUseForm();
    const { allGarages, editData, readOnly } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            garage_id: editData?.garage_id?.toString() || '',
            title: editData?.title || '',
            short_description: editData?.short_description || '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            transform(() => ({
                ...values,
                images: files || null,
            }));

            if (editData?.id) {
                post(`/admin/garage_posts/${editData?.id}/update`, {
                    preserveScroll: true,
                    onSuccess: (page: any) => {
                        setFiles(null);
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
                            description: 'Failed to update. ' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            } else {
                post('/admin/garage_posts', {
                    preserveScroll: true,
                    onSuccess: (page: any) => {
                        form.reset();
                        setFiles(null);
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
                            description: 'Failed to create. ' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            }
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Failed to submit the form. Please try again.');
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                    <FormField
                        control={form.control}
                        name="garage_id"
                        render={({ field }) => (
                            <FormItem className="flex flex-col" key={field.value}>
                                <FormLabel>{t('Garage')}</FormLabel>
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
                                                          const garage = allGarages?.find((garage: any) => garage.id == field.value);
                                                          return garage ? `${garage.name}` : '';
                                                      })()
                                                    : t('Select')}

                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder={t('Search')} />
                                            <CommandList>
                                                <CommandEmpty>{t('No data')}</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem
                                                        value=""
                                                        onSelect={() => {
                                                            form.setValue('garage_id', '');
                                                        }}
                                                    >
                                                        <Check className={cn('mr-2 h-4 w-4', '' == field.value ? 'opacity-100' : 'opacity-0')} />
                                                        {t('Select garage')}
                                                    </CommandItem>
                                                    {allGarages?.map((garageObject: any) => (
                                                        <CommandItem
                                                            value={garageObject.name}
                                                            key={garageObject.id}
                                                            onSelect={() => {
                                                                form.setValue('garage_id', garageObject.id?.toString());
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    garageObject.id === field.value ? 'opacity-100' : 'opacity-0',
                                                                )}
                                                            />
                                                            {garageObject.logo && (
                                                                <img
                                                                    className="size-6 object-contain"
                                                                    src={`/assets/images/garages/thumb/${garageObject.logo}`}
                                                                />
                                                            )}
                                                            {garageObject.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>{t('Select the garage where this post belongs.')}</FormDescription>
                                <FormMessage>{errors.garage_id && <div>{errors.garage_id as string}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Title')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('Title')} type="text" {...field} />
                                </FormControl>
                                <FormMessage>{errors.title && <div>{errors.title as string}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="short_description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Short Description')}</FormLabel>
                                <FormControl>
                                    <AutosizeTextarea placeholder={t('Short Description')} className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage>{errors.short_description && <div>{errors.short_description as string}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Select Images')}</FormLabel>
                                <FormControl>
                                    <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={dropZoneConfig} className="relative p-1">
                                        <FileInput id="fileInput" className="outline-1 outline-slate-500 outline-dashed">
                                            <div className="flex w-full flex-col items-center justify-center p-8">
                                                <CloudUpload className="h-10 w-10 text-gray-500" />
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">{t('Click to upload')}</span>
                                                    &nbsp; or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        </FileInput>
                                        <FileUploaderContent className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6">
                                            {files?.map((file, i) => (
                                                <FileUploaderItem
                                                    key={i}
                                                    index={i}
                                                    className="bg-background aspect-square h-auto w-full overflow-hidden rounded-md border p-0"
                                                    aria-roledescription={`file ${i + 1} containing ${file.name}`}
                                                >
                                                    <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full object-contain" />
                                                </FileUploaderItem>
                                            ))}
                                        </FileUploaderContent>
                                    </FileUploader>
                                </FormControl>
                                <FormMessage>{errors.images && <div>{errors.images as string}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {editData?.images?.length > 0 && (
                        <div className="mt-4 p-1">
                            <FormDescription className="mb-2">{t('Uploaded Images')}</FormDescription>
                            <div className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6">
                                {editData.images.map((imageObject: any) => (
                                    <span
                                        key={imageObject.id}
                                        className="group bg-background relative aspect-square h-auto w-full overflow-hidden rounded-md border p-0"
                                    >
                                        <img
                                            src={'/assets/images/garage_posts/thumb/' + imageObject.image}
                                            alt={imageObject.name}
                                            className="h-full w-full object-contain"
                                        />
                                        <span className="absolute top-1 right-1 group-hover:opacity-100 lg:opacity-0">
                                            <DeleteButton deletePath="/admin/garage_posts/images/" id={imageObject.id} />
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

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
        </>
    );
}
