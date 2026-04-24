import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import DeleteButton from '@/components/delete-button';
import FormFileUpload from '@/components/Form/FormFileUpload';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormLabel } from '@/components/Input/FormLabel';
import FormToggle from '@/components/Input/FormToggle';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Create() {
    const { t, currentLocale } = useTranslation();
    const { itemCategories, itemBrands, itemModels, itemBodyTypes, editData, shops, readOnly } = usePage<any>().props;

    const isInitialMount = useRef(true); // 1. Add this ref at the top of your component
    const [files, setFiles] = useState<File[] | null>(null);
    const [dynamicFieldErrors, setDynamicFieldErrors] = useState<Record<string, string>>({});
    const [dynamicFields, setDynamicFields] = useState<any[]>([]);
    const [flashMessage, setFlashMessage] = useState({ message: '', type: 'message' });

    // 1. Initialize Inertia Form
    const { data, setData, post, processing, progress, errors, transform, reset } = useForm({
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        code: editData?.code || '',
        price: editData?.price?.toString() || '',
        short_description: editData?.short_description || '',
        long_description: editData?.long_description || '',
        link: editData?.link || '',
        status: editData?.status || 'active',
        category_code: editData?.category_code?.toString() || '',
        shop_id: editData?.shop_id?.toString() || '',
        brand_code: editData?.brand_code?.toString() || '',
        model_code: editData?.model_code?.toString() || '',
        body_type_code: editData?.body_type_code?.toString() || '',
        attributes: editData?.attributes || {}, // JSON dynamic data
        images: '',
    });

    // 2. Handle Dynamic Field Switching
    useEffect(() => {
        if (data.category_code) {
            const category = itemCategories.find((c: any) => c.code === data.category_code);

            if (category && category.fields) {
                setDynamicFields(category.fields);

                const newAttrs: Record<string, any> = {};

                category.fields.forEach((field: any) => {
                    // 2. Only preserve data from 'data.attributes' if it's the very first time
                    // the component loads (e.g., when opening the Edit page).
                    if (isInitialMount.current) {
                        newAttrs[field.field_key] = data.attributes[field.field_key] || '';
                    } else {
                        // 3. Otherwise, if the user is changing categories manually,
                        // force every field to be empty/default.
                        newAttrs[field.field_key] = '';
                    }
                });

                setData('attributes', newAttrs);

                // 4. After the first load logic runs once, set mount to false
                isInitialMount.current = false;
            }
        } else {
            setDynamicFields([]);
            setData('attributes', {});
        }
    }, [data.category_code]);

    // 3. Form Submission
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Reset dynamic errors at the start of submission
        setDynamicFieldErrors({});

        // 2. Manual check for required fields
        const newErrors: Record<string, string> = {};

        dynamicFields.forEach((field) => {
            const isRequired = field.is_required === 1 || field.is_required === true;
            const value = data.attributes[field.field_key];

            // FIX: Check for null, undefined, or empty string.
            // Boolean 'false' is allowed to pass.
            const isEmpty = value === null || value === undefined || value === '';

            if (isRequired && isEmpty) {
                newErrors[field.field_key] = t('This field is required');
            }
        });

        // 3. If there are errors, stop and show them
        if (Object.keys(newErrors).length > 0) {
            setDynamicFieldErrors(newErrors);
            toast.error(t('Please check required specifications'));
            return;
        }

        transform((data) => ({
            ...data,
            images: files || null,
        }));

        const url = editData?.id ? `/admin/items/${editData.id}/update` : '/admin/items';

        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData) {
                    reset();
                }
                setFiles(null);
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Items'), href: '/admin/items' },
        { title: editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="form space-y-8 p-5">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />

                {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

                <div className="form-field-container">
                    <FormCombobox
                        name="shop_id"
                        label={t('Shop')}
                        options={shops?.map((shop: any) => ({
                            value: shop.id.toString(),
                            label: shop.name,
                        }))}
                        value={data.shop_id}
                        onChange={(val) => setData('shop_id', val)}
                        error={errors.shop_id}
                    />

                    <FormField
                        required
                        id="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        containerClassName="md:col-span-2"
                    />

                    <FormField
                        required
                        type="number"
                        id="price"
                        label={t('Price ($)')}
                        value={data.price}
                        onChange={(val) => setData('price', val)}
                        error={errors.price}
                    />

                    <FormField
                        id="code"
                        label={t('Code')}
                        value={data.code}
                        onChange={(val) => setData('code', val)}
                        error={errors.code}
                        description={t('Can use product Barcode.')}
                    />

                    <div className="w-full md:col-span-full">
                        <FormCombobox
                            name="category_code"
                            label={t('Category')}
                            options={itemCategories?.map((cat: any) => ({
                                value: cat.code,
                                label: cat.name,
                            }))}
                            value={data.category_code}
                            onChange={(val) => setData('category_code', val)}
                            error={errors.category_code}
                        />
                    </div>
                </div>

                {/* DYNAMIC FIELDS SECTION */}
                {true && (
                    <div className="col-span-12 grid grid-cols-1 gap-6 rounded-xl border bg-slate-50/50 p-6 md:grid-cols-2 dark:bg-white/5">
                        <div className="col-span-full mb-2 flex items-center gap-2">
                            <div className="h-4 w-1 rounded-full bg-blue-500" />
                            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase">{t('Specifications')}</h3>
                        </div>
                        <div className="form-field-container w-full md:col-span-full">
                            <FormCombobox
                                name="brand_code"
                                label={t('Brand')}
                                options={itemBrands?.map((brand: any) => ({
                                    value: brand.code,
                                    label: brand.name,
                                }))}
                                value={data.brand_code}
                                onChange={(val) => {
                                    setData((prev) => ({ ...prev, brand_code: val, model_code: '' }));
                                }}
                                error={errors.brand_code}
                            />

                            <FormCombobox
                                name="model_code"
                                label={t('Model')}
                                options={itemModels
                                    ?.filter((m: any) => m.brand_code === data.brand_code)
                                    ?.map((model: any) => ({
                                        value: model.code,
                                        label: model.name,
                                    }))}
                                value={data.model_code}
                                onChange={(val) => setData('model_code', val)}
                                error={errors.model_code}
                            />

                            <FormCombobox
                                name="body_type_code"
                                label={t('Body Type')}
                                options={itemBodyTypes?.map((bt: any) => ({
                                    value: bt.code,
                                    label: bt.name,
                                }))}
                                value={data.body_type_code}
                                onChange={(val) => setData('body_type_code', val)}
                                error={errors.body_type_code}
                            />
                        </div>

                        {dynamicFields.map((field) => (
                            <div key={field.id} className="group space-y-2">
                                {/* 1. HEADER / LABEL SECTION */}
                                <FormLabel
                                    id={field.field_key}
                                    label={currentLocale === 'kh' ? field.label_kh : field.label}
                                    required={field.is_required === 1 || field.is_required === true}
                                    error={!!dynamicFieldErrors[field.field_key]}
                                />

                                {/* 2. INPUT TYPES */}
                                <div className="relative">
                                    {/* SELECT */}
                                    {field.field_type === 'select' && (
                                        <Select
                                            value={data.attributes[field.field_key] || ''}
                                            onValueChange={(val) => setData('attributes', { ...data.attributes, [field.field_key]: val })}
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'bg-background transition-all duration-200',
                                                    dynamicFieldErrors[field.field_key]
                                                        ? 'border-destructive ring-destructive/20 ring-1'
                                                        : 'focus:ring-primary/20 focus:ring-2',
                                                )}
                                            >
                                                <SelectValue placeholder={t('Select')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map((opt: any) => (
                                                    <SelectItem key={opt.id} value={opt.option_value}>
                                                        {currentLocale === 'kh' ? opt.label_kh : opt.label_en}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {/* RADIO PILLS */}
                                    {field.field_type === 'radio' && (
                                        <RadioGroup
                                            value={data.attributes[field.field_key] || ''}
                                            onValueChange={(val) => setData('attributes', { ...data.attributes, [field.field_key]: val })}
                                            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
                                        >
                                            {field.options?.map((opt: any) => (
                                                <div key={opt.id} className="relative">
                                                    <RadioGroupItem
                                                        value={opt.option_value}
                                                        id={`${field.field_key}-${opt.id}`}
                                                        className="peer sr-only"
                                                    />
                                                    <label
                                                        htmlFor={`${field.field_key}-${opt.id}`}
                                                        className={cn(
                                                            'bg-background hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary dark:peer-data-[state=checked]:bg-primary/10 flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all',
                                                            dynamicFieldErrors[field.field_key] ? 'border-destructive/50' : 'border-input',
                                                        )}
                                                    >
                                                        {currentLocale === 'kh' ? opt.label_kh : opt.label_en}
                                                    </label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}

                                    {/* CHECKBOX BOX */}
                                    {/* 3. CHECKBOX (Now using FormToggle) */}
                                    {field.field_type === 'checkbox' && (
                                        <FormToggle
                                            id={field.field_key}
                                            label={currentLocale === 'kh' ? field.label_kh : field.label}
                                            value={data.attributes[field.field_key]}
                                            onChange={(checked) => setData('attributes', { ...data.attributes, [field.field_key]: checked })}
                                            error={!!dynamicFieldErrors[field.field_key]}
                                            statusOn={t('On')}
                                            statusOff={t('Off')}
                                        />
                                    )}

                                    {/* TEXTAREA & INPUT */}
                                    {(field.field_type === 'textarea' || field.field_type === 'text' || field.field_type === 'number') &&
                                        (field.field_type === 'textarea' ? (
                                            <AutosizeTextarea
                                                className={cn(
                                                    'bg-background min-h-[100px]',
                                                    dynamicFieldErrors[field.field_key] && 'border-destructive focus-visible:ring-destructive/20',
                                                )}
                                                value={data.attributes[field.field_key] || ''}
                                                onChange={(e) => setData('attributes', { ...data.attributes, [field.field_key]: e.target.value })}
                                                placeholder={t('Enter details...')}
                                            />
                                        ) : (
                                            <Input
                                                className={cn(
                                                    'bg-background',
                                                    dynamicFieldErrors[field.field_key] && 'border-destructive focus-visible:ring-destructive/20',
                                                )}
                                                type={field.field_type}
                                                value={data.attributes[field.field_key] || ''}
                                                onChange={(e) => setData('attributes', { ...data.attributes, [field.field_key]: e.target.value })}
                                            />
                                        ))}
                                </div>

                                {/* 3. ERROR MESSAGE */}
                                {dynamicFieldErrors[field.field_key] && (
                                    <p className="animate-in fade-in slide-in-from-top-1 text-destructive px-1 text-[11px] font-medium">
                                        {dynamicFieldErrors[field.field_key]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <FormFieldTextArea
                    id="short_description"
                    label={t('Description')}
                    value={data.short_description}
                    onChange={(val) => setData('short_description', val)}
                    error={errors.short_description}
                />

                <div className="space-y-4">
                    {/* Use your standard FormFileUpload component */}
                    <div className={cn('form-field-container md:grid-cols-1')}>
                        <FormFileUpload
                            key={editData?.images?.map((img: any) => img.image || img).join('-')}
                            id="images"
                            label={t('Select Images (Max 20)')}
                            files={files}
                            setFiles={setFiles}
                            className="md:col-span-2"
                            error={errors.images}
                            dropzoneOptions={{
                                maxFiles: 20, // Updated to 20 to match your label
                                maxSize: 1024 * 1024 * 4,
                                multiple: true, // Set to true for multiple images
                                accept: {
                                    'image/jpeg': ['.jpeg', '.jpg'],
                                    'image/png': ['.png'],
                                    'image/gif': ['.gif'],
                                    'image/webp': ['.webp'],
                                    'image/svg+xml': ['.svg'],
                                },
                            }}
                        />
                    </div>
                </div>

                {editData?.images?.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-sm font-medium">{t('Uploaded Images')}</p>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                            {editData.images.map((img: any) => (
                                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border">
                                    <img src={`/assets/images/items/thumb/${img.image}`} className="h-full w-full object-cover" />
                                    <div className="absolute top-1 right-1 rounded bg-white/30">
                                        <DeleteButton deletePath="/admin/items/images/" id={img.id} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
