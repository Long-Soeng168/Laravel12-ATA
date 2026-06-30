import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import MyCkeditor5 from '@/pages/plugins/ckeditor5/my-ckeditor5';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const CreateForm = () => {
    const { t } = useTranslation();
    const { parentData, types, pagePositions, editData, readOnly, links } = usePage<any>().props;

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    const { data, setData, post, processing, transform, errors, clearErrors, reset } = useForm({
        title: editData?.title || '',
        code: editData?.code || '',
        title_kh: editData?.title_kh || '',
        link: editData?.link || '',
        source: editData?.source?.toString() || '',
        type: editData?.type || 'content',
        order_index: editData?.order_index?.toString() || '',
        status: editData?.status || 'active',
        parent_id: editData?.parent_id?.toString() || '',
        position_code: editData?.position_code?.toString() || pagePositions?.[0]?.code || '',
    });

    const [files, setFiles] = useState<File[] | null>(null);
    const [long_description, setLong_description] = useState(editData?.long_description || '');
    const [long_description_kh, setLong_description_kh] = useState(editData?.long_description_kh || '');
    const [short_description, setShort_description] = useState(editData?.short_description || '');
    const [short_description_kh, setShort_description_kh] = useState(editData?.short_description_kh || '');
    const [editorKey, setEditorKey] = useState(0);
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({ message: '', type: 'message' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        transform((data) => ({
            ...data,
            long_description: long_description,
            long_description_kh: long_description_kh,
            short_description: short_description,
            short_description_kh: short_description_kh,
            images: files || null,
        }));

        if (editData?.id) {
            post(`/admin/pages/${editData.id}/update`, {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    setFiles(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: (err) => {
                    toast.error(t('Error'), { description: t('Failed to update') });
                },
            });
        } else {
            post('/admin/pages', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    setLong_description('');
                    setLong_description_kh('');
                    setShort_description('');
                    setShort_description_kh('');
                    setEditorKey((prev) => prev + 1);
                    setFiles(null);
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: (err) => {
                    toast.error(t('Error'), { description: t('Failed to create') });
                },
            });
        }
    };

    const typeOptions = types?.map((t: any) => ({ label: t.label, value: t.type })) || [];
    const statusOptions = [
        { label: t('Active'), value: 'active' },
        { label: t('Inactive'), value: 'inactive' },
    ];
    const parentOptions = parentData?.map((p: any) => ({
        label: p.order_index ? `${p.order_index} ${p.title}` : p.title,
        value: p.id.toString(),
    })) || [];
    const positionOptions = pagePositions?.map((p: any) => ({
        label: p.name,
        value: p.code,
    })) || [];
    const sourceOptions = links?.map((link: any) => ({
        label: link.title,
        value: link.id.toString(),
        image: link.image ? `/assets/images/links/thumb/${link.image}` : null,
    })) || [];

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
                    <div key={'short_description_kh' + editorKey}>
                        <p className="mb-2 text-sm font-medium">{t('Short Description Khmer')}</p>
                        {readOnly ? (
                            <div dangerouslySetInnerHTML={{ __html: short_description_kh }} className="prose dark:prose-invert max-w-none rounded-md border p-3" />
                        ) : (
                            <MyCkeditor5 data={short_description_kh} setData={setShort_description_kh} />
                        )}
                    </div>
                    <div key={'long_description_kh' + editorKey}>
                        <p className="mb-2 text-sm font-medium">{t('Long Description Khmer')}</p>
                        {readOnly ? (
                            <div dangerouslySetInnerHTML={{ __html: long_description_kh }} className="prose dark:prose-invert max-w-none rounded-md border p-3" />
                        ) : (
                            <MyCkeditor5 data={long_description_kh} setData={setLong_description_kh} />
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <FormField
                                name="code"
                                label={t('Unique Code')}
                                value={data.code}
                                onChange={(val) => setData('code', val)}
                                error={errors.code}
                                disabled={readOnly}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <FormField
                                name="title"
                                label={t('Title')}
                                value={data.title}
                                onChange={(val) => setData('title', val)}
                                error={errors.title}
                                disabled={readOnly}
                            />
                        </div>
                    </div>

                    <div key={'short_description' + editorKey}>
                        <p className="mb-2 text-sm font-medium">{t('Short Description')}</p>
                        {readOnly ? (
                            <div dangerouslySetInnerHTML={{ __html: short_description }} className="prose dark:prose-invert max-w-none rounded-md border p-3" />
                        ) : (
                            <MyCkeditor5 data={short_description} setData={setShort_description} />
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormCombobox
                            name="source"
                            label={t('Source')}
                            value={data.source}
                            onChange={(val) => {
                                setData('source', val);
                                if (!editData?.id && !readOnly) {
                                    setData('link', links?.find((l: any) => l.id.toString() === val)?.link || '');
                                }
                            }}
                            options={sourceOptions}
                            error={errors.source}
                            disabled={readOnly}
                        />

                        <FormField
                            name="link"
                            label={t('Link')}
                            description={t('For external content you can put link here.')}
                            value={data.link}
                            onChange={(val) => setData('link', val)}
                            error={errors.link}
                            disabled={readOnly}
                        />

                        {types && (
                            <FormCombobox
                                name="type"
                                label={t('Type')}
                                description={t('Choose type (Link) for external content and fill Link input.')}
                                value={data.type}
                                onChange={(val) => setData('type', val)}
                                options={typeOptions}
                                error={errors.type}
                                disabled={readOnly}
                            />
                        )}

                        <FormField
                            name="order_index"
                            label={t('Order Index')}
                            type="number"
                            description={t('Lower number is priority')}
                            value={data.order_index}
                            onChange={(val) => setData('order_index', val)}
                            error={errors.order_index}
                            disabled={readOnly}
                        />

                        <FormCombobox
                            name="status"
                            label={t('Status')}
                            value={data.status}
                            onChange={(val) => setData('status', val)}
                            options={statusOptions}
                            error={errors.status}
                            disabled={readOnly}
                        />

                        <FormCombobox
                            name="parent_id"
                            label={t('Parent Page')}
                            description={t('Select the parent page for this page.')}
                            value={data.parent_id}
                            onChange={(val) => setData('parent_id', val)}
                            options={parentOptions}
                            error={errors.parent_id}
                            disabled={readOnly}
                        />

                        <FormCombobox
                            name="position_code"
                            label={t('Position')}
                            description={t('Select the position where this item will show.')}
                            value={data.position_code}
                            onChange={(val) => setData('position_code', val)}
                            options={positionOptions}
                            error={errors.position_code}
                            disabled={readOnly}
                        />
                    </div>

                    <FormFileUpload
                        name="images"
                        label={t('Select Images')}
                        files={files}
                        onFilesChange={setFiles}
                        dropZoneConfig={dropZoneConfig}
                        error={errors.images}
                        existingImages={editData?.images}
                        imageDeletePath="/admin/pages/images/"
                        imageDisplayPath="/assets/images/pages/thumb/"
                        disabled={readOnly}
                    />

                    <div key={'long_description' + editorKey}>
                        <p className="mb-2 text-sm font-medium">{t('Long Description')}</p>
                        {readOnly ? (
                            <div dangerouslySetInnerHTML={{ __html: long_description }} className="prose dark:prose-invert max-w-none rounded-md border p-3" />
                        ) : (
                            <MyCkeditor5 data={long_description} setData={setLong_description} />
                        )}
                    </div>
                </>
            )}

            {!readOnly && (
                <div className="mt-4 flex justify-end">
                    <SubmitButton processing={processing} />
                </div>
            )}
        </form>
    );
};

export default CreateForm;
