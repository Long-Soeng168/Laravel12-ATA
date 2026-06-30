import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import { useForm as inertiaUseForm } from '@inertiajs/react';
import { CloudUpload, Paperclip } from 'lucide-react';
import { FormEvent, useState } from 'react';

const documentStatusOptions = [
    { value: 'need_purchase', label: 'Need Purchase' },
    { value: 'free_all_with_login', label: 'Free all with login' },
    { value: 'free_all_no_login', label: 'Free all no login' },
];

export default function CreateForm({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();
    const [currentLocale, setCurrentLocale] = useState('Default');
    const [files, setFiles] = useState<File[] | null>(null);
    const [flashMessage, setFlashMessage] = useState<any>(null);

    const dropZoneConfig = {
        maxFiles: 1,
        maxSize: 1024 * 1024 * 2, // 2MB
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
        address: editData?.address || '',
        address_kh: editData?.address_kh || '',
        phone: editData?.phone || '',
        landline_phone: editData?.landline_phone || '',
        working_hours: editData?.working_hours || '',
        working_hours_kh: editData?.working_hours_kh || '',
        working_days: editData?.working_days || '',
        working_days_kh: editData?.working_days_kh || '',
        email: editData?.email || '',
        google_map: editData?.google_map || '',
        copyright: editData?.copyright || '',
        copyright_kh: editData?.copyright_kh || '',
        document_status: editData?.document_status || 'free_all_no_login',
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
            post('/admin/application_info/' + editData.id + '/update', {
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
            post('/admin/application_info', {
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
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        name="name_kh"
                        label={t('Name Khmer')}
                        value={data.name_kh}
                        onChange={(val) => setData('name_kh', val)}
                        error={errors.name_kh}
                        disabled={readOnly}
                    />
                    <FormField
                        name="address_kh"
                        label={t('Address Khmer')}
                        value={data.address_kh}
                        onChange={(val) => setData('address_kh', val)}
                        error={errors.address_kh}
                        disabled={readOnly}
                        type="textarea"
                    />
                    <FormField
                        name="working_hours_kh"
                        label={t('Working Hours Khmer')}
                        value={data.working_hours_kh}
                        onChange={(val) => setData('working_hours_kh', val)}
                        error={errors.working_hours_kh}
                        disabled={readOnly}
                    />
                    <FormField
                        name="working_days_kh"
                        label={t('Working Days Khmer')}
                        value={data.working_days_kh}
                        onChange={(val) => setData('working_days_kh', val)}
                        error={errors.working_days_kh}
                        disabled={readOnly}
                    />
                    <FormField
                        name="copyright_kh"
                        label={t('Copyright Khmer')}
                        value={data.copyright_kh}
                        onChange={(val) => setData('copyright_kh', val)}
                        error={errors.copyright_kh}
                        disabled={readOnly}
                    />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        name="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        disabled={readOnly}
                        required
                    />
                    <FormField
                        name="address"
                        label={t('Address')}
                        value={data.address}
                        onChange={(val) => setData('address', val)}
                        error={errors.address}
                        disabled={readOnly}
                        type="textarea"
                    />
                    <FormField
                        name="working_hours"
                        label={t('Working Hours')}
                        value={data.working_hours}
                        onChange={(val) => setData('working_hours', val)}
                        error={errors.working_hours}
                        disabled={readOnly}
                    />
                    <FormField
                        name="working_days"
                        label={t('Working Days')}
                        value={data.working_days}
                        onChange={(val) => setData('working_days', val)}
                        error={errors.working_days}
                        disabled={readOnly}
                    />
                    <FormField
                        name="copyright"
                        label={t('Copyright')}
                        value={data.copyright}
                        onChange={(val) => setData('copyright', val)}
                        error={errors.copyright}
                        disabled={readOnly}
                    />
                </div>
            )}

            <div className={currentLocale === 'Khmer' ? 'hidden' : 'grid gap-6 md:grid-cols-2'}>
                <FormField
                    name="phone"
                    label={t('Phone Number')}
                    value={data.phone}
                    onChange={(val) => setData('phone', val)}
                    error={errors.phone}
                    disabled={readOnly}
                />
                <FormField
                    name="landline_phone"
                    label={t('Landline Phone')}
                    value={data.landline_phone}
                    onChange={(val) => setData('landline_phone', val)}
                    error={errors.landline_phone}
                    disabled={readOnly}
                />
                <FormField
                    name="email"
                    label={t('Email')}
                    value={data.email}
                    onChange={(val) => setData('email', val)}
                    error={errors.email}
                    disabled={readOnly}
                />
                <FormField
                    name="google_map"
                    label={t('Google Map Embed')}
                    value={data.google_map}
                    onChange={(val) => setData('google_map', val)}
                    error={errors.google_map}
                    disabled={readOnly}
                />
                <FormCombobox
                    name="document_status"
                    label={t('Document Status')}
                    value={data.document_status}
                    onChange={(val) => setData('document_status', val)}
                    error={errors.document_status}
                    options={documentStatusOptions}
                    disabled={readOnly}
                />
            </div>

            <div className={currentLocale === 'Khmer' ? 'hidden' : 'grid content-start gap-2'}>
                <label className="text-sm font-medium leading-none">{t('Select Logo')}</label>
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
                        <p className="text-[0.8rem] text-muted-foreground mb-2">{t('Uploaded Logo')}</p>
                        <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:grid-cols-3">
                            <span className="group bg-background relative aspect-video h-auto w-full overflow-hidden rounded-md border p-0">
                                <img
                                    src={'/assets/images/application_info/thumb/' + editData?.image}
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
