import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormLabel } from '@/components/Input/FormLabel';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Label } from '@/components/ui/label';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Switch } from '@/components/ui/switch';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateForm() {
    const { t } = useTranslation();
    const { editData, readOnly, playlists } = usePage<any>().props;

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [filesImage, setFilesImage] = useState<File[] | null>(null);
    const [filesVideo, setFilesVideo] = useState<File[] | null>(null);

    const { data, setData, post, processing, progress, errors, reset, transform } = useForm({
        title: editData?.title || '',
        title_kh: editData?.title_kh || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        status: editData?.status || 'active',
        is_free: editData?.is_free != null ? Boolean(editData.is_free) : false,
        playlist_code: editData?.playlist_code?.toString() || '',
        order_index: editData?.order_index?.toString() || '',
        image: null as any,
        video_file: null as any,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            image: filesImage ? filesImage[0] : null,
            video_file: filesVideo ? filesVideo[0] : null,
        }));

        const url = editData?.id ? `/admin/videos/${editData.id}/update` : '/admin/videos';
        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData?.id) {
                    reset();
                    setFilesImage(null);
                    setFilesVideo(null);
                }
                if (page.props.flash?.success) {
                    setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    toast.success(t('Success'), { description: page.props.flash.success });
                }
                if (page.props.flash?.error) {
                    setFlashMessage({ message: page.props.flash.error, type: 'error' });
                    toast.error(t('Error'), { description: page.props.flash.error });
                }
            },
        });
    };

    const dropZoneConfigVideoFile = {
        maxFiles: 1,
        maxSize: 1024 * 1024 * 300, // 300MB
        multiple: false,
        accept: {
            'video/mp4': ['.mp4'],
        },
    };

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-8 p-4">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />

                {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />}

                <div className="form-field-container">
                    <FormField
                        required
                        id="title"
                        name="title"
                        label={t('Title')}
                        value={data.title}
                        onChange={(val) => setData('title', val)}
                        error={errors.title}
                        placeholder={t('Title')}
                        containerClassName="md:col-span-2"
                    />

                    <div className="md:col-span-2">
                        <FormLabel id="short_description" label={t('Short Description')} />
                        <AutosizeTextarea
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            placeholder={t('Short Description')}
                            className={cn(errors.short_description && 'border-destructive focus-visible:ring-destructive/20')}
                        />
                        <FormErrorLabel error={errors.short_description} />
                    </div>

                    <FormCombobox
                        name="playlist_code"
                        label={t('Playlist')}
                        options={[
                            { value: '', label: t('Select playlist') },
                            ...(playlists || []).map((playlist: any) => ({
                                value: playlist.code,
                                label: playlist.name + (playlist.name_kh ? ` (${playlist.name_kh})` : ''),
                            }))
                        ]}
                        value={data.playlist_code || ''}
                        onChange={(val) => setData('playlist_code', val)}
                        error={errors.playlist_code}
                    />

                    <FormField
                        id="order_index"
                        name="order_index"
                        type="number"
                        label={t('Order Index')}
                        value={data.order_index}
                        onChange={(val) => setData('order_index', val)}
                        error={errors.order_index}
                        description={t('Video Sequence Order')}
                    />

                    <FormCombobox
                        name="status"
                        label={t('Status')}
                        options={[
                            { value: 'active', label: t('Active') },
                            { value: 'inactive', label: t('Inactive') },
                        ]}
                        value={data.status || 'active'}
                        onChange={(val) => setData('status', val)}
                        error={errors.status}
                    />

                    <div className="space-y-2">
                        <FormLabel id="is_free" label={t('Free Access')} />
                        <div className="bg-accent/5 flex max-w-md items-center space-x-4 rounded-lg border border-blue-200/50 p-4 dark:border-blue-900/30">
                            <Switch id="is_free" checked={data.is_free} onCheckedChange={(val) => setData('is_free', val)} />
                            <div className="grid gap-1 leading-none">
                                <Label htmlFor="is_free" className="flex items-center gap-2 text-sm font-bold">
                                    {t('Free Access')}
                                    {data.is_free && (
                                        <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] tracking-wider text-white uppercase">
                                            {t('Free')}
                                        </span>
                                    )}
                                </Label>
                                <p className="text-muted-foreground text-[11px]">{t('Check if this video is free to access.')}</p>
                            </div>
                        </div>
                        <FormErrorLabel error={errors.is_free} />
                    </div>
                </div>

                <div className="form-field-container md:grid-cols-2">
                    <div className="space-y-2">
                        <FormFileUpload error={errors?.image} id="image" label={t('Image')} files={filesImage} setFiles={setFilesImage} />
                        {editData?.image && <UploadedImage label={t('Current Image')} images={editData?.image} basePath="/assets/images/videos/thumb/" />}
                    </div>

                    <div className="space-y-2">
                        <FormFileUpload 
                            error={errors?.video_file} 
                            id="video_file" 
                            label={t('Video File')} 
                            files={filesVideo} 
                            setFiles={setFilesVideo} 
                            dropzoneOptions={dropZoneConfigVideoFile} 
                        />
                        {editData?.video_file && (
                            <div className="mt-4 p-1">
                                <FormLabel id="current_video" label={t('Uploaded Video')} />
                                <div className="grid w-full grid-cols-1 gap-2 rounded-md lg:grid-cols-2">
                                    <span className="bg-background h-full w-full overflow-hidden rounded-md border p-0">
                                        <div className="relative h-full w-full">
                                            <video className="h-full w-full object-cover" preload="metadata" controls controlsList="nodownload">
                                                <source src={`${editData?.video_url}`} />
                                            </video>
                                        </div>
                                    </span>
                                </div>
                                <p className="mt-2 text-sm">{t('File')}: {editData?.video_file}</p>
                            </div>
                        )}
                    </div>
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </>
    );
}
