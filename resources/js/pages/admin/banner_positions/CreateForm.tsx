import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
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

export default function CreateForm({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();
    const [currentLocale, setCurrentLocale] = useState('Default');

    const [files, setFiles] = useState<File[] | null>(null);
    const [filesBanner, setFilesBanner] = useState<File[] | null>(null);

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string } | null>(null);

    const dropZoneConfig = {
        maxFiles: 100,
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
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        code: editData?.code || '',
        status: editData?.status || 'active',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        image: null as any,
        banner: null as any,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        transform((data) => ({
            ...data,
            image: files ? files[0] : null,
            banner: filesBanner ? filesBanner[0] : null,
        }));

        if (editData?.id) {
            post('/admin/banner_positions/' + editData.id + '/update', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    setFiles(null);
                    setFilesBanner(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: (e: any) => {
                    setFlashMessage({ message: 'Failed to update.', type: 'error' });
                },
            });
        } else {
            post('/admin/banner_positions', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setFilesBanner(null);
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
                    type={flashMessage.type}
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
                        name="name_kh"
                        label={t('Name Khmer')}
                        value={data.name_kh}
                        onChange={(val) => setData('name_kh', val)}
                        error={errors.name_kh}
                        disabled={readOnly}
                    />
                    <div className="hidden">
                        <FormFieldTextArea
                            id="short_description_kh"
                            name="short_description_kh"
                            label={t('Short Description Khmer')}
                            value={data.short_description_kh}
                            onChange={(val) => setData('short_description_kh', val)}
                            error={errors.short_description_kh}
                            disabled={readOnly}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <FormField
                        name="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        disabled={readOnly}
                        required
                    />
                    <div className="hidden">
                        <FormFieldTextArea
                            id="short_description"
                            name="short_description"
                            label={t('Short Description')}
                            value={data.short_description}
                            onChange={(val) => setData('short_description', val)}
                            error={errors.short_description}
                            disabled={readOnly}
                        />
                    </div>
                </div>
            )}

            <div className={currentLocale === 'Khmer' ? 'hidden' : 'grid gap-6 md:grid-cols-2'}>
                <FormField
                    name="code"
                    label={t('Unique Code')}
                    description="ex: TOP_HOMEPAGE"
                    value={data.code}
                    onChange={(val) => setData('code', val)}
                    error={errors.code}
                    disabled={readOnly}
                    required
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

            <div className="hidden">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Image field */}
                    <div className="grid content-start gap-2">
                        <label className="text-sm leading-none font-medium">{t('Image')}</label>
                        <FileUploader
                            value={files}
                            onValueChange={setFiles}
                            dropzoneOptions={dropZoneConfig}
                            className="bg-background relative rounded-lg p-2"
                        >
                            <FileInput id="imageFileInput" className="outline-1 outline-slate-500 outline-dashed">
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
                        {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}

                        {editData?.image && (
                            <div className="mt-4 p-1">
                                <p className="text-[0.8rem] text-muted-foreground mb-2">{t('Uploaded Image')}</p>
                                <div className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-5">
                                    <span className="group bg-background relative aspect-square h-auto w-full overflow-hidden rounded-md border p-0">
                                        <img
                                            src={'/assets/images/banner_positions/thumb/' + editData?.image}
                                            alt={editData?.image}
                                            className="h-full w-full object-contain"
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Banner field */}
                    <div className="grid content-start gap-2">
                        <label className="text-sm leading-none font-medium">{t('Banner')}</label>
                        <FileUploader
                            value={filesBanner}
                            onValueChange={setFilesBanner}
                            dropzoneOptions={dropZoneConfig}
                            className="bg-background relative rounded-lg p-2"
                        >
                            <FileInput id="bannerFileInput" className="outline-1 outline-slate-500 outline-dashed">
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
                                {filesBanner &&
                                    filesBanner.length > 0 &&
                                    filesBanner.map((file, i) => (
                                        <FileUploaderItem key={i} index={i}>
                                            <Paperclip className="h-4 w-4 stroke-current" />
                                            <span>{file.name}</span>
                                        </FileUploaderItem>
                                    ))}
                            </FileUploaderContent>
                        </FileUploader>
                        {errors.banner && <p className="text-destructive text-sm">{errors.banner}</p>}

                        {editData?.banner && (
                            <div className="mt-4 p-1">
                                <p className="text-[0.8rem] text-muted-foreground mb-2">{t('Uploaded Banner')}</p>
                                <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                                    <span className="group bg-background relative aspect-video h-auto w-full overflow-hidden rounded-md border p-0">
                                        <img
                                            src={'/assets/images/banner_positions/thumb/' + editData?.banner}
                                            alt={editData?.banner}
                                            className="h-full w-full object-contain"
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}
            {!readOnly && <SubmitButton processing={processing} />}
        </form>
    );
}
