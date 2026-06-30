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
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateForm() {
    const { t } = useTranslation();
    const { editData, readOnly } = usePage<any>().props;

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [filesImage, setFilesImage] = useState<File[] | null>(null);

    const { data, setData, post, processing, progress, errors, reset, transform } = useForm({
        code: editData?.code || '',
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        price: editData?.price || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        status: editData?.status || 'active',
        image: null as any,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            image: filesImage ? filesImage[0] : null,
        }));

        const url = editData?.id ? `/admin/video_play_lists/${editData.id}/update` : '/admin/video_play_lists';
        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData?.id) {
                    reset();
                    setFilesImage(null);
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

                <div className="form-field-container md:grid-cols-2">
                    <FormField
                        required
                        id="code"
                        name="code"
                        label={t('Code')}
                        value={data.code}
                        onChange={(val) => setData('code', val)}
                        error={errors.code}
                        placeholder={t('Code')}
                    />

                    <FormField
                        required
                        id="name"
                        name="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        placeholder={t('Name')}
                    />
                    
                    <FormField
                        id="price"
                        name="price"
                        type="number"
                        label={t('Price')}
                        value={data.price}
                        onChange={(val) => setData('price', val)}
                        error={errors.price}
                        placeholder={t('Price')}
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
                </div>

                <div className="form-field-container">
                    <div className="space-y-2 md:col-span-2 lg:col-span-1 max-w-lg">
                        <FormFileUpload error={errors?.image} id="image" label={t('Image')} files={filesImage} setFiles={setFilesImage} />
                        {editData?.image && <UploadedImage label={t('Current Image')} images={editData?.image} basePath="/assets/images/video_play_lists/thumb/" />}
                    </div>
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </>
    );
}
