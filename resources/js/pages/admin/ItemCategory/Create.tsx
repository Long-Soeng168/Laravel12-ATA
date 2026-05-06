import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn, toSlug } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface TypeGroupForm {
    code?: string;
    parent_id?: string;
    name: string;
    name_kh?: string;
    order_index?: string;
    short_description?: string;
    short_description_kh?: string;
    has_body_type?: boolean | null;
    is_show_loan_calculator?: boolean | null;
    image?: string | null;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    const { parents, filtered_category_id } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<TypeGroupForm>({
        code: editData?.code || '',
        parent_id: editData?.parent_id?.toString() || filtered_category_id?.toString() || '',
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        order_index: editData?.order_index || 10000,
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        image: editData?.image || null,
        has_body_type: editData?.has_body_type || false,
        is_show_loan_calculator: editData?.is_show_loan_calculator || false,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, image: files ? files[0] : null }));

        if (editData?.id) {
            post(`/admin/item-categories/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/item-categories', {
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Items', href: '/admin/items' },
        { title: 'Categories', href: '/admin/item-categories' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    const { t, currentLocale } = useTranslation();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="form">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
                {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />}
                <div className="sticky top-0">
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

                {inputLanguage == 'khmer' ? (
                    <div className="form-field-container md:grid-cols-1">
                        <FormField
                            id="name_kh"
                            name="name_kh"
                            label="Name Khmer"
                            value={data.name_kh}
                            onChange={(val) => setData('name_kh', val)}
                            error={errors.name_kh}
                        />

                        <FormFieldTextArea
                            id="short_description_kh"
                            name="short_description_kh"
                            label="Short Description Khmer"
                            value={data.short_description_kh}
                            onChange={(val) => setData('short_description_kh', val)}
                            error={errors.short_description_kh}
                        />
                    </div>
                ) : (
                    <div className="form-field-container">
                        <FormField
                            id="code"
                            name="code"
                            label="Code"
                            value={data.code}
                            onChange={(val: string) => setData('code', toSlug(val))}
                            error={errors.code}
                            description="Example: my-item-code"
                        />
                        <FormField
                            required
                            type="number"
                            id="order_index"
                            name="order_index"
                            label="Order Index"
                            value={data.order_index}
                            onChange={(val) => setData('order_index', val)}
                            error={errors.order_index}
                            description="Lower number has higher priority."
                        />

                        <FormField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(val) => setData('name', val)}
                            error={errors.name}
                            containerClassName="col-span-2"
                        />

                        <FormFieldTextArea
                            id="short_description"
                            name="short_description"
                            label="Short Description"
                            value={data.short_description}
                            onChange={(val) => setData('short_description', val)}
                            error={errors.short_description}
                            containerClassName="col-span-2"
                        />
                    </div>
                )}
                {inputLanguage == 'default' && (
                    <>
                        <div className="form-field-container">
                            {/* {parents?.length > 0 && (
                                <FormCombobox
                                    name="parent_id"
                                    label="Parent"
                                    options={[
                                        {
                                            value: null,
                                            label: t('NA'),
                                        },
                                        ...parents.map((item: any) => ({
                                            value: item.id.toString(),
                                            label: `(${item.order_index}) ${currentLocale == 'kh' ? item.name_kh || item.name : item.name}`,
                                        })),
                                    ]}
                                    value={data.parent_id || ''}
                                    onChange={(val) => setData('parent_id', val)}
                                    error={errors.parent_id}
                                    description="Select the parent that this category belongs to."
                                />
                            )} */}

                            <div className="bg-accent/5 flex items-center space-x-4 rounded-lg border p-4">
                                <Switch
                                    id="has_body_type"
                                    checked={data.has_body_type ?? false}
                                    onCheckedChange={(val) => setData('has_body_type', val)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="has_body_type" className="text-sm font-bold">
                                        {t('Has Body Type')}
                                    </Label>
                                    <p className="text-muted-foreground text-xs">
                                        {t('Enable this if the category includes body type (e.g., sedan, SUV, etc.).')}
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                {/* New Loan Calculator Switch */}
                                <div className="bg-accent/5 flex items-center space-x-4 rounded-lg border p-4">
                                    <Switch
                                        id="is_show_loan_calculator"
                                        checked={data.is_show_loan_calculator ?? false}
                                        onCheckedChange={(val) => setData('is_show_loan_calculator', val)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="is_show_loan_calculator" className="text-sm font-bold">
                                            {t('Show Loan Calculator')}
                                        </Label>
                                        <p className="text-muted-foreground text-xs">
                                            {t('Enable this to display a monthly payment estimator for items in this category.')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cn('form-field-container', !editData?.image && 'md:grid-cols-1')}>
                            <FormFileUpload
                                key={editData?.image}
                                id="image"
                                label="Image (512 x 512 pixels)"
                                files={files}
                                setFiles={setFiles}
                                error={errors?.image}
                            />
                            {editData?.image && (
                                <UploadedImage
                                    containerClassName="mt-0"
                                    imageContainerClassName="flex-1"
                                    label="Uploaded Image"
                                    images={editData?.image}
                                    basePath="/assets/images/item_categories/thumb/"
                                />
                            )}
                        </div>
                    </>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
