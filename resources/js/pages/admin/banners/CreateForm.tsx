import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import DeleteButton from '@/components/delete-button';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import { useForm } from '@inertiajs/react';
import { CloudUpload, FileVideoIcon, ImagesIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function CreateForm({
    editData,
    readOnly,
    types,
    bannerPositions,
    links,
}: {
    editData?: any;
    readOnly?: boolean;
    types?: any[];
    bannerPositions?: any[];
    links?: any[];
}) {
    const { t } = useTranslation();

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({ message: '', type: 'message' });

    const [files, setFiles] = useState<File[] | null>(null);
    const [fileVideos, setFileVideos] = useState<File[] | null>(null);

    const { data, setData, post, processing, progress, transform, errors, clearErrors, reset } = useForm({
        title: editData?.title || '',
        title_kh: editData?.title_kh || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        link: editData?.link || '',
        source: editData?.source?.toString() || '',
        type: editData?.type || 'image',
        order_index: editData?.order_index?.toString() || '',
        status: editData?.status || 'active',
        position_code: editData?.position_code?.toString() || '',
        images: null as any,
        video: null as any,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        transform((data) => ({
            ...data,
            images: files || null,
            video: fileVideos ? fileVideos[0] : null,
        }));

        if (editData?.id) {
            post(`/admin/banners/${editData.id}/update`, {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    setFiles(null);
                    setFileVideos(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
            });
        } else {
            post('/admin/banners', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setFileVideos(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
            });
        }
    };

    const statusOptions = [
        { label: t('Active'), value: 'active' },
        { label: t('Inactive'), value: 'inactive' },
    ];

    const typeOptions = types?.map((t: any) => ({ label: t.label, value: t.type })) || [];

    const linkOptions = links?.map((link: any) => ({
        ...link,
        id: link.id?.toString(),
    })) || [];

    return (
        <form onSubmit={handleSubmit} className="form space-y-8 p-5">
            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />
            {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

            <div className="mb-4">
                <Tabs value={inputLanguage} onValueChange={(val: any) => setInputLanguage(val)}>
                    <TabsList className="bg-border/50 border p-1 dark:border-white/20">
                        <TabsTrigger value="default" className="h-full dark:data-[state=active]:bg-white/20">
                            {t('Default')}
                        </TabsTrigger>
                        <TabsTrigger value="khmer" className="h-full dark:data-[state=active]:bg-white/20">
                            {t('Khmer')}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {inputLanguage === 'khmer' ? (
                <div className="flex flex-col gap-6">
                    <FormField
                        name="title_kh"
                        label={t('Title Khmer')}
                        value={data.title_kh}
                        onChange={(val) => setData('title_kh', val)}
                        error={errors.title_kh}
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
                        name="title"
                        label={t('Title')}
                        value={data.title}
                        onChange={(val) => setData('title', val)}
                        error={errors.title}
                        disabled={readOnly}
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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="hidden">
                    <FormCombobox
                        name="source"
                        label={t('Source')}
                        value={data.source}
                        onChange={(val) => {
                            setData('source', val);
                            if (!editData?.id) {
                                setData('link', linkOptions?.find((link: any) => link.id == val)?.link || data.link);
                            }
                        }}
                        error={errors.source}
                        options={linkOptions?.map((link: any) => ({ value: link.id, label: link.title })) || []}
                        disabled={readOnly}
                    />
                </div>
                <div className="hidden">
                    <FormField
                        name="link"
                        label={t('Link')}
                        value={data.link}
                        onChange={(val) => setData('link', val)}
                        error={errors.link}
                        disabled={readOnly}
                    />
                </div>
                <FormCombobox
                    name="position_code"
                    label={t('Position')}
                    value={data.position_code}
                    onChange={(val) => setData('position_code', val)}
                    error={errors.position_code}
                    options={bannerPositions?.map(pos => ({ value: pos.code, label: pos.name })) || []}
                    disabled={readOnly}
                    description={t('Select the position where this item will show.')}
                />
                <FormField
                    name="order_index"
                    label={t('Order Index')}
                    type="number"
                    value={data.order_index}
                    onChange={(val) => setData('order_index', val)}
                    error={errors.order_index}
                    disabled={readOnly}
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
                <div className="hidden">
                    <FormCombobox
                        name="type"
                        label={t('Type')}
                        value={data.type}
                        onChange={(val) => setData('type', val)}
                        error={errors.type}
                        options={typeOptions}
                        disabled={readOnly}
                    />
                </div>
            </div>

            <div className="grid content-start gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
                    <ImagesIcon size={18} />
                    {t('Select Images')}
                </label>
                <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={{
                        maxFiles: 100,
                        maxSize: 1024 * 1024 * 2,
                        multiple: data.type === 'multi_images',
                        accept: {
                            'image/jpeg': ['.jpeg', '.jpg'],
                            'image/png': ['.png'],
                            'image/gif': ['.gif'],
                            'image/webp': ['.webp'],
                        },
                    }}
                    className="relative p-1"
                >
                    <FileInput id="fileInput" className="outline-1 outline-slate-500 outline-dashed">
                        <div className="flex w-full flex-col items-center justify-center p-8">
                            <CloudUpload className="h-10 w-10 text-gray-500" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">{t('Click to upload')}</span>
                                &nbsp; {t('or drag and drop')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6 mt-4">
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
                <div className="text-[0.8rem] font-medium text-destructive">{errors.images}</div>

                {editData?.image && (
                    <div className="mt-4 p-1">
                        <div className="mb-2 text-sm text-muted-foreground">{t('Uploaded Image')}</div>
                        <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                            <span className="group bg-background relative aspect-video h-auto w-full overflow-hidden rounded-md border p-0">
                                <img
                                    src={'/assets/images/banners/thumb/' + editData?.image}
                                    alt={editData?.image}
                                    className="h-full w-full object-contain"
                                />
                                <span className="absolute top-1 right-1 group-hover:opacity-100 lg:opacity-0">
                                    <DeleteButton deletePath="/admin/banners/remove_image/" id={editData?.id} />
                                </span>
                            </span>
                        </div>
                    </div>
                )}
                {editData?.images?.length > 0 && (
                    <div className="mt-4 p-1">
                        <div className="mb-2 text-sm text-muted-foreground">{t('Uploaded Images')}</div>
                        <div className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6">
                            {editData.images.map((imageObject: any) => (
                                <span
                                    key={imageObject.id}
                                    className="group bg-background relative aspect-square h-auto w-full overflow-hidden rounded-md border p-0"
                                >
                                    <img
                                        src={'/assets/images/banners/thumb/' + imageObject.image}
                                        alt={imageObject.name}
                                        className="h-full w-full object-contain"
                                    />
                                    <span className="absolute top-1 right-1 group-hover:opacity-100 lg:opacity-0">
                                        <DeleteButton deletePath="/admin/banners/images/" id={imageObject.id} />
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {data.type === 'video' && (
                <div className="grid content-start gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
                        <FileVideoIcon size={18} /> {t('Select Video Files')}
                    </label>
                    <FileUploader
                        value={fileVideos}
                        onValueChange={setFileVideos}
                        dropzoneOptions={{
                            maxFiles: 5,
                            maxSize: 1024 * 1024 * 200,
                            multiple: true,
                            accept: {
                                'video/mp4': ['.mp4'],
                            },
                        }}
                        className="relative p-1"
                    >
                        <FileInput id="videoFileInput" className="outline-1 outline-slate-500 outline-dashed">
                            <div className="flex w-full flex-col items-center justify-center p-8">
                                <CloudUpload className="h-10 w-10 text-gray-500" />
                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">{t('Click to upload videos')}</span>
                                    &nbsp; {t('or drag and drop')}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">MP4 (max 50MB)</p>
                            </div>
                        </FileInput>
                        <FileUploaderContent className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3 mt-4">
                            {fileVideos?.map((file, i) => (
                                <FileUploaderItem
                                    key={i}
                                    index={i}
                                    className="bg-background h-full w-full overflow-hidden rounded-md border p-0"
                                    aria-roledescription={`video file ${i + 1} containing ${file.name}`}
                                >
                                    <div className="relative h-full w-full">
                                        <video className="h-full w-full object-cover" preload="metadata">
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                        </video>
                                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 bg-black p-1 text-xs text-white">
                                            {file.name}
                                        </div>
                                    </div>
                                </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                    </FileUploader>
                    <div className="text-[0.8rem] font-medium text-destructive">{errors.video}</div>

                    {editData?.video && (
                        <div className="mt-4 p-1">
                            <div className="mb-2 text-sm text-muted-foreground">{t('Uploaded Video')}</div>
                            <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                                <span className="bg-background h-full w-full overflow-hidden rounded-md border p-0">
                                    <div className="relative h-full w-full">
                                        <video className="h-full w-full object-cover" preload="metadata" controls>
                                            <source src={`/assets/files/banners/videos/${editData?.video}`} />
                                        </video>
                                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 bg-black p-1 text-xs text-white">
                                            {editData?.video}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}
            {!readOnly && <SubmitButton processing={processing} />}
        </form>
    );
}
