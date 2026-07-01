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
import { CloudUpload, ImagesIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function CreateForm({
    editData,
    readOnly,
}: {
    editData?: any;
    readOnly?: boolean;
}) {
    const { t } = useTranslation();

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({ message: '', type: 'message' });

    const [files, setFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, progress, transform, errors, clearErrors, reset } = useForm({
        type: editData?.type || 'hero_slide',
        title_1: editData?.title_1 || '',
        title_1_kh: editData?.title_1_kh || '',
        title_2: editData?.title_2 || '',
        title_2_kh: editData?.title_2_kh || '',
        description: editData?.description || '',
        description_kh: editData?.description_kh || '',
        btn_text: editData?.btn_text || '',
        btn_text_kh: editData?.btn_text_kh || '',
        btn_link: editData?.btn_link || '',
        background_color: editData?.background_color || '#0f172a',
        foreground_color: editData?.foreground_color || '#ffffff',
        order_index: editData?.sort_order?.toString() || '0',
        status: editData?.status || 'active',
        image_file: null as any,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        transform((data) => ({
            ...data,
            sort_order: data.order_index,
            image_file: files ? files[0] : null,
        }));

        if (editData?.id) {
            post(`/admin/website_banners/${editData.id}/update`, {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    setFiles(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
            });
        } else {
            post('/admin/website_banners', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
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

    const typeOptions = [
        { label: t('Hero Slide (Main page top)'), value: 'hero_slide' },
        { label: t('Mini Banner (Promotional)'), value: 'mini_banner' },
    ];

    return (
        <form onSubmit={handleSubmit} className="form space-y-8 p-5">
            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />
            {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

            <div className="grid gap-6 md:grid-cols-2">
                <FormCombobox
                    name="type"
                    label={t('Banner Type')}
                    value={data.type}
                    onChange={(val) => setData('type', val)}
                    error={errors.type}
                    options={typeOptions}
                    disabled={readOnly}
                />
            </div>

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
                        name="title_1_kh"
                        label={t('Title Line 1 Khmer')}
                        value={data.title_1_kh}
                        onChange={(val) => setData('title_1_kh', val)}
                        error={errors.title_1_kh}
                        disabled={readOnly}
                    />
                    {data.type === 'hero_slide' && (
                        <FormField
                            name="title_2_kh"
                            label={t('Title Line 2 Khmer')}
                            value={data.title_2_kh}
                            onChange={(val) => setData('title_2_kh', val)}
                            error={errors.title_2_kh}
                            disabled={readOnly}
                        />
                    )}
                    <FormFieldTextArea
                        id="description_kh"
                        name="description_kh"
                        label={t('Description Khmer')}
                        value={data.description_kh}
                        onChange={(val) => setData('description_kh', val)}
                        error={errors.description_kh}
                        disabled={readOnly}
                    />
                    <FormField
                        name="btn_text_kh"
                        label={t('Button Text Khmer')}
                        value={data.btn_text_kh}
                        onChange={(val) => setData('btn_text_kh', val)}
                        error={errors.btn_text_kh}
                        disabled={readOnly}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <FormField
                        name="title_1"
                        label={t('Title Line 1')}
                        value={data.title_1}
                        onChange={(val) => setData('title_1', val)}
                        error={errors.title_1}
                        disabled={readOnly}
                    />
                    {data.type === 'hero_slide' && (
                        <FormField
                            name="title_2"
                            label={t('Title Line 2')}
                            value={data.title_2}
                            onChange={(val) => setData('title_2', val)}
                            error={errors.title_2}
                            disabled={readOnly}
                        />
                    )}
                    <FormFieldTextArea
                        id="description"
                        name="description"
                        label={t('Description')}
                        value={data.description}
                        onChange={(val) => setData('description', val)}
                        error={errors.description}
                        disabled={readOnly}
                    />
                    <FormField
                        name="btn_text"
                        label={t('Button Text')}
                        value={data.btn_text}
                        onChange={(val) => setData('btn_text', val)}
                        error={errors.btn_text}
                        disabled={readOnly}
                    />
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <FormField
                    name="btn_link"
                    label={t('Button Link')}
                    value={data.btn_link}
                    onChange={(val) => setData('btn_link', val)}
                    error={errors.btn_link}
                    disabled={readOnly}
                    description={t('URL or internal path (e.g. /products)')}
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

                <FormField
                    name="background_color"
                    label={t('Background Color')}
                    type="color"
                    value={data.background_color}
                    onChange={(val) => setData('background_color', val)}
                    error={errors.background_color}
                    disabled={readOnly}
                    className="h-12 w-full p-1"
                />

                <FormField
                    name="foreground_color"
                    label={t('Foreground Color')}
                    type="color"
                    value={data.foreground_color}
                    onChange={(val) => setData('foreground_color', val)}
                    error={errors.foreground_color}
                    disabled={readOnly}
                    className="h-12 w-full p-1"
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

            <div className="grid content-start gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
                    <ImagesIcon size={18} />
                    {t('Select Image')}
                </label>
                <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 2,
                        multiple: false,
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
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, WEBP or GIF</p>
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
                <div className="text-[0.8rem] font-medium text-destructive">{errors.image_file}</div>

                {editData?.image && (
                    <div className="mt-4 p-1">
                        <div className="mb-2 text-sm text-muted-foreground">{t('Uploaded Image')}</div>
                        <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                            <span className="group bg-background relative aspect-video h-auto w-full overflow-hidden rounded-md border p-0">
                                <img
                                    src={editData?.image?.startsWith('/') ? editData.image : '/assets/images/website_banners/thumb/' + editData?.image}
                                    alt={editData?.image}
                                    className="h-full w-full object-contain"
                                    onError={(e: any) => { e.target.src = editData?.image?.startsWith('/') ? editData.image : '/assets/images/website_banners/' + editData?.image; }}
                                />
                                <span className="absolute top-1 right-1 group-hover:opacity-100 lg:opacity-0">
                                    <DeleteButton deletePath="/admin/website_banners/remove_image/" id={editData?.id} />
                                </span>
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
