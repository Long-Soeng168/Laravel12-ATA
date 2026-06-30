import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import DeleteButton from '@/components/delete-button';
import FormFileUpload from '@/components/Form/FormFileUpload';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateForm() {
    const { t } = useTranslation();
    const { allGarages, editData, readOnly } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);
    const [flashMessage, setFlashMessage] = useState({ message: '', type: 'message' });

    const { data, setData, post, processing, progress, errors, transform, reset } = useForm({
        garage_id: editData?.garage_id?.toString() || '',
        title: editData?.title || '',
        short_description: editData?.short_description || '',
        images: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            images: files || null,
        }));

        const url = editData?.id ? `/admin/garage_posts/${editData.id}/update` : '/admin/garage_posts';

        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData) reset();
                setFiles(null);
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
            },
        });
    };

    return (
        <form onSubmit={onSubmit} className="form space-y-8 p-5">
            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />

            {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

            {allGarages != null && (
                <FormCombobox
                    className="md:col-span-2"
                    name="garage_id"
                    label={t('Garage')}
                    options={allGarages?.map((garage: any) => ({
                        value: garage.id.toString(),
                        label: garage.name,
                        image: garage.logo ? `/assets/images/garages/thumb/${garage.logo}` : undefined,
                    }))}
                    value={data.garage_id}
                    onChange={(val) => setData('garage_id', val)}
                    error={errors.garage_id}
                    disabled={readOnly}
                />
            )}
            <FormField
                className="md:col-span-2"
                id="title"
                label={t('Title')}
                value={data.title}
                onChange={(val) => setData('title', val)}
                error={errors.title}
                disabled={readOnly}
            />

            <FormFieldTextArea
                id="short_description"
                label={t('Short Description')}
                value={data.short_description}
                onChange={(val) => setData('short_description', val)}
                error={errors.short_description}
                disabled={readOnly}
            />

            <div className="space-y-4">
                <div className="form-field-container md:grid-cols-1">
                    <FormFileUpload
                        key={editData?.images?.map((img: any) => img.image || img).join('-')}
                        id="images"
                        label={t('Select Images (Max 20)')}
                        files={files}
                        setFiles={setFiles}
                        className="rounded-none md:col-span-2"
                        error={errors.images}
                        disabled={readOnly}
                        dropzoneOptions={{
                            maxFiles: 20,
                            maxSize: 1024 * 1024 * 4,
                            multiple: true,
                            accept: {
                                'image/jpeg': ['.jpeg', '.jpg'],
                                'image/png': ['.png'],
                                'image/gif': ['.gif'],
                                'image/webp': ['.webp'],
                            },
                        }}
                    />
                </div>
            </div>

            {editData?.images?.length > 0 && (
                <div className="mt-4 space-y-4">
                    <p className="text-muted-foreground text-sm font-medium">{t('Uploaded Images')}</p>
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                        {editData.images.map((img: any) => (
                            <div key={img.id} className="group relative aspect-square overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src={`/assets/images/garage_posts/thumb/${img.image}`} className="h-full w-full object-cover" />
                                {!readOnly && editData.images?.length > 1 && (
                                    <div className="absolute top-1 right-1 rounded-md bg-white/30">
                                        <DeleteButton deletePath="/admin/garage_posts/images/" id={img.id} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}

            {!readOnly && <SubmitButton processing={processing} />}
        </form>
    );
}
