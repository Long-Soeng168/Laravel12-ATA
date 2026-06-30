import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import DeleteButton from '@/components/delete-button';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import { useForm as inertiaUseForm } from '@inertiajs/react';
import { CloudUpload, Paperclip } from 'lucide-react';
import { FormEvent, useState } from 'react';

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

export default function CreateForm({ editData, readOnly, types }: { editData?: any; readOnly?: boolean; types?: any[] }) {
    const { t } = useTranslation();
    const [currentLocale, setCurrentLocale] = useState('Default');
    const [files, setFiles] = useState<File[] | null>(null);
    const [flashMessage, setFlashMessage] = useState<any>(null);

    const typeOptions = types?.map((type: any) => ({ label: type.label, value: type.type })) || [];

    const dropZoneConfig = {
        maxFiles: 1,
        maxSize: 1024 * 1024 * 4,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
        },
    };

    const { post, data, setData, progress, processing, transform, errors, clearErrors, reset } = inertiaUseForm({
        title: editData?.title || '',
        title_kh: editData?.title_kh || '',
        link: editData?.link || '',
        type: editData?.type || '',
        order_index: editData?.order_index?.toString() || '',
        status: editData?.status || 'active',
        image: null as any,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        transform((data) => ({
            ...data,
            image: files ? files[0] : null,
        }));

        if (editData?.id) {
            post('/admin/links/' + editData.id + '/update', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    setFiles(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: (e: any) => {
                    setFlashMessage({ message: 'Failed to update.', type: 'error' });
                },
            });
        } else {
            post('/admin/links', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: (e: any) => {
                    setFlashMessage({ message: 'Failed to create.', type: 'error' });
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form space-y-8 p-5">
            {flashMessage && (
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type as any}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
            )}
            {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

            <div className="mb-4">
                <Tabs defaultValue={currentLocale} onValueChange={setCurrentLocale} className="w-full">
                    <TabsList className="bg-border/50 border p-1 dark:border-white/20">
                        <TabsTrigger value="Default" className="h-full dark:data-[state=active]:bg-white/20">{t('Default')}</TabsTrigger>
                        <TabsTrigger value="Khmer" className="h-full dark:data-[state=active]:bg-white/20">{t('Khmer')}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {currentLocale === 'Khmer' ? (
                <div className="flex flex-col gap-6">
                    <FormField
                        name="title_kh"
                        label={t('Title Khmer')}
                        value={data.title_kh}
                        onChange={(val) => setData('title_kh', val)}
                        error={errors.title_kh}
                        disabled={readOnly}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <FormField
                        name="title"
                        label={t('Title')}
                        value={data.title}
                        onChange={(val) => setData('title', val)}
                        error={errors.title}
                        disabled={readOnly}
                        required
                    />
                </div>
            )}

            <div className={currentLocale === 'Khmer' ? 'hidden' : 'grid gap-6 md:grid-cols-2'}>
                <FormField
                    name="link"
                    label={t('Link')}
                    value={data.link}
                    onChange={(val) => setData('link', val)}
                    error={errors.link}
                    disabled={readOnly}
                />
                <FormCombobox
                    name="type"
                    label={t('Type')}
                    value={data.type}
                    onChange={(val) => setData('type', val)}
                    error={errors.type}
                    options={typeOptions}
                    disabled={readOnly}
                />
                <FormField
                    name="order_index"
                    label={t('Order Index')}
                    value={data.order_index}
                    onChange={(val) => setData('order_index', val)}
                    error={errors.order_index}
                    disabled={readOnly}
                    type="number"
                    description={t('Lower number is priority')}
                />
                <FormCombobox
                    name="status"
                    label={t('Status')}
                    value={data.status}
                    onChange={(val) => setData('status', val)}
                    error={errors.status}
                    options={statusOptions}
                    disabled={readOnly}
                />
            </div>

            <div className={currentLocale === 'Khmer' ? 'hidden' : 'grid content-start gap-2'}>
                <label className="text-sm font-medium leading-none">{t('Image')}</label>
                <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="bg-background relative rounded-lg p-2"
                >
                    <FileInput id="imageFileInput" className="outline-1 outline-dashed outline-slate-500">
                        <div className="flex w-full flex-col items-center justify-center p-8">
                            <CloudUpload className="h-10 w-10 text-gray-500" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">{t('Click to upload')}</span>
                                &nbsp; {t('or drag and drop')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                    </FileInput>
                    <FileUploaderContent>
                        {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                                <FileUploaderItem key={i} index={i}>
                                    <Paperclip className="h-4 w-4 stroke-current" />
                                    <span>{file.name}</span>
                                </FileUploaderItem>
                            ))}
                    </FileUploaderContent>
                </FileUploader>
                {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}

                {editData?.image && (
                    <div className="mt-4 p-1">
                        <p className="text-[0.8rem] text-muted-foreground mb-2">{t('Uploaded Image')}</p>
                        <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                            <span className="group bg-background relative aspect-video h-auto w-full overflow-hidden rounded-md border p-0">
                                <img
                                    src={'/assets/images/links/thumb/' + editData?.image}
                                    alt={editData?.image}
                                    className="h-full w-full object-contain"
                                />
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}
            {!readOnly && <SubmitButton processing={processing} />}
        </form>
    );
}
