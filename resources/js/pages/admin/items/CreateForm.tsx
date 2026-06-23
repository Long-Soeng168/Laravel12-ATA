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
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function CreateForm() {
    const { t, currentLocale } = useTranslation();
    const { itemCategories, itemBrands, itemModels, itemBodyTypes, editData, shops, provinces, readOnly } = usePage<any>().props;

    const isInitialMount = useRef(true);
    const [files, setFiles] = useState<File[] | null>(null);
    const [dynamicFieldErrors, setDynamicFieldErrors] = useState<Record<string, string>>({});
    const [dynamicFields, setDynamicFields] = useState<any[]>([]);
    const [flashMessage, setFlashMessage] = useState({ message: '', type: 'message' });

    const { data, setData, post, processing, progress, errors, transform, reset } = useForm({
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        code: editData?.code || '',
        price: editData?.price?.toString() || '',
        discount: editData?.discount?.toString() || '',
        discount_type: editData?.discount_type || 'percentage',
        is_free_delivery: editData?.is_free_delivery ?? false,
        province_code: editData?.province_code?.toString() || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        long_description: editData?.long_description || '',
        long_description_kh: editData?.long_description_kh || '',
        link: editData?.link || '',
        status: editData?.status || 'active',
        category_code: editData?.category_code?.toString() || '',
        shop_id: editData?.shop_id?.toString() || '',
        brand_code: editData?.brand_code?.toString() || '',
        model_code: editData?.model_code?.toString() || '',
        body_type_code: editData?.body_type_code?.toString() || '',
        attributes: editData?.attributes || {},
        images: '',
    });

    useEffect(() => {
        if (data.category_code) {
            const category = itemCategories.find((c: any) => c.code === data.category_code);

            if (category) {
                if (!isInitialMount.current) {
                    setData((prev) => ({
                        ...prev,
                        brand_code: '',
                        model_code: '',
                        body_type_code: '',
                    }));
                }

                if (category.fields) {
                    setDynamicFields(category.fields);
                    const newAttrs: Record<string, any> = {};

                    category.fields.forEach((field: any) => {
                        if (isInitialMount.current) {
                            newAttrs[field.field_key] = data.attributes[field.field_key] || '';
                        } else {
                            newAttrs[field.field_key] = field.field_type === 'checkbox' ? false : '';
                        }
                    });
                    setData('attributes', newAttrs);
                }

                isInitialMount.current = false;
            }
        } else {
            setDynamicFields([]);
            setData((prev) => ({
                ...prev,
                brand_code: '',
                model_code: '',
                body_type_code: '',
                attributes: {},
            }));
        }
    }, [data.category_code]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDynamicFieldErrors({});

        const newErrors: Record<string, string> = {};

        dynamicFields.forEach((field) => {
            const isRequired = field.is_required === 1 || field.is_required === true;
            const value = data.attributes[field.field_key];
            const isEmpty = value === null || value === undefined || value === '';

            if (isRequired && isEmpty) {
                newErrors[field.field_key] = t('This field is required');
            }
        });

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
                if (!editData) reset();
                setFiles(null);
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
            },
        });
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form space-y-8 p-5">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />

                {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

                <div className="form-field-container">
                    {shops != null && (
                        <FormCombobox
                            name="shop_id"
                            label={t('Shop')}
                            options={shops?.map((shop: any) => ({
                                value: shop.id.toString(),
                                label: currentLocale === 'kh' && shop.name_kh ? shop.name_kh : shop.name,
                            }))}
                            value={data.shop_id}
                            onChange={(val) => setData('shop_id', val)}
                            error={errors.shop_id}
                        />
                    )}

                    <FormField required id="name" label={t('Name')} value={data.name} onChange={(val) => setData('name', val)} error={errors.name} />

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
                        type="number"
                        id="discount"
                        label={t('Discount')}
                        value={data.discount}
                        onChange={(val) => setData('discount', val)}
                        error={errors.discount}
                    />

                    <FormCombobox
                        name="discount_type"
                        label={t('Discount Type')}
                        options={[
                            { value: 'percentage', label: t('Percentage (%)') },
                            { value: 'amount', label: t('Fixed Amount ($)') },
                        ]}
                        value={data.discount_type}
                        onChange={(val) => setData('discount_type', val)}
                        error={errors.discount_type}
                    />

                    <FormField
                        id="code"
                        label={t('Code')}
                        value={data.code}
                        onChange={(val) => setData('code', val)}
                        error={errors.code}
                        description={t('Can use product Barcode.')}
                    />

                    {/* <FormCombobox
                        name="status"
                        label={t('Status')}
                        options={[
                            { value: 'active', label: t('Active') },
                            { value: 'inactive', label: t('Inactive') },
                        ]}
                        value={data.status}
                        onChange={(val) => setData('status', val)}
                        error={errors.status}
                    /> */}

                    {provinces != null && (
                        <FormCombobox
                            name="province_code"
                            label={t('Province')}
                            options={provinces?.map((prov: any) => ({
                                value: prov.code,
                                label: currentLocale === 'kh' && prov.name_kh ? prov.name_kh : prov.name,
                            }))}
                            value={data.province_code}
                            onChange={(val) => setData('province_code', val)}
                            error={errors.province_code}
                        />
                    )}

                    <div className="flex items-center pt-2 md:pt-7">
                        <FormToggle
                            id="is_free_delivery"
                            label={t('Free Delivery')}
                            value={data.is_free_delivery}
                            onChange={(checked) => setData('is_free_delivery', checked)}
                            error={!!errors.is_free_delivery}
                            statusOn="(Yes)"
                            statusOff="(No)"
                        />
                    </div>

                    <div className="w-full md:col-span-full">
                        <FormCombobox
                            name="category_code"
                            label={t('Category')}
                            options={itemCategories?.map((cat: any) => ({
                                value: cat.code,
                                label: currentLocale === 'kh' && cat.name_kh ? cat.name_kh : cat.name,
                                image: cat.image_url,
                            }))}
                            value={data.category_code}
                            onChange={(val) => setData('category_code', val)}
                            error={errors.category_code}
                        />
                    </div>
                </div>

                {data.category_code &&
                    (() => {
                        const activeCategory = itemCategories.find((c: any) => c.code === data.category_code);
                        const allowedBrandIds = activeCategory?.brand_ids || [];
                        const hasBodyType = activeCategory?.has_body_type === 1 || activeCategory?.has_body_type === true;

                        const filteredBrands = itemBrands?.filter((brand: any) => allowedBrandIds.includes(brand.id)) || [];

                        if (filteredBrands.length === 0 && !hasBodyType && dynamicFields.length === 0) return null;

                        return (
                            <div className="col-span-12 grid grid-cols-1 gap-6 rounded-none border border-slate-200 bg-slate-50/50 p-6 md:grid-cols-2 dark:border-slate-800 dark:bg-white/5">
                                <div className="col-span-full mb-2 flex items-center gap-2">
                                    <div className="h-4 w-1 bg-blue-500" />
                                    <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase">{t('Specifications')}</h3>
                                </div>

                                <div className="form-field-container w-full md:col-span-full">
                                    {filteredBrands.length > 0 && (
                                        <FormCombobox
                                            name="brand_code"
                                            label={t('Brand')}
                                            options={filteredBrands.map((brand: any) => ({
                                                value: brand.code,
                                                label: currentLocale === 'kh' && brand.name_kh ? brand.name_kh : brand.name,
                                                image: brand.image_url,
                                            }))}
                                            value={data.brand_code}
                                            onChange={(val) => {
                                                setData((prev) => ({ ...prev, brand_code: val, model_code: '' }));
                                            }}
                                            error={errors.brand_code}
                                        />
                                    )}

                                    <div className={cn('transition-opacity duration-200', !data.brand_code && 'pointer-events-none opacity-50')}>
                                        <FormCombobox
                                            name="model_code"
                                            label={t('Model')}
                                            options={itemModels
                                                ?.filter((m: any) => m.brand_code === data.brand_code)
                                                ?.map((model: any) => ({
                                                    value: model.code,
                                                    label: currentLocale === 'kh' && model.name_kh ? model.name_kh : model.name,
                                                    image: model.image_url,
                                                }))}
                                            value={data.model_code}
                                            onChange={(val) => {
                                                if (data.brand_code) setData('model_code', val);
                                            }}
                                            error={errors.model_code}
                                        />
                                    </div>

                                    {hasBodyType && (
                                        <FormCombobox
                                            name="body_type_code"
                                            label={t('Body Type')}
                                            options={itemBodyTypes?.map((bt: any) => ({
                                                value: bt.code,
                                                label: currentLocale === 'kh' && bt.name_kh ? bt.name_kh : bt.name,
                                                image: bt.image_url,
                                            }))}
                                            value={data.body_type_code}
                                            onChange={(val) => setData('body_type_code', val)}
                                            error={errors.body_type_code}
                                        />
                                    )}
                                </div>

                                {dynamicFields.map((field) => (
                                    <div key={field.id} className="group space-y-2">
                                        <FormLabel
                                            id={field.field_key}
                                            label={currentLocale === 'kh' && field.label_kh ? field.label_kh : field.label}
                                            required={field.is_required === 1 || field.is_required === true}
                                            error={!!dynamicFieldErrors[field.field_key]}
                                        />

                                        <div className="relative">
                                            {field.field_type === 'select' && (
                                                <Select
                                                    value={data.attributes[field.field_key] || ''}
                                                    onValueChange={(val) => setData('attributes', { ...data.attributes, [field.field_key]: val })}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            'bg-background rounded-none transition-all duration-200',
                                                            dynamicFieldErrors[field.field_key]
                                                                ? 'border-destructive ring-destructive/20 ring-1'
                                                                : 'focus:ring-primary/20 focus:ring-2',
                                                        )}
                                                    >
                                                        <SelectValue
                                                            placeholder={currentLocale === 'kh' && field.label_kh ? field.label_kh : field.label}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-none">
                                                        {field.options?.map((opt: any) => (
                                                            <SelectItem key={opt.id} value={opt.option_value}>
                                                                {currentLocale === 'kh' && opt.label_kh ? opt.label_kh : opt.label_en}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}

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
                                                                    'bg-background hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary dark:peer-data-[state=checked]:bg-primary/10 flex cursor-pointer items-center justify-center rounded-none border px-3 py-2.5 text-center text-sm font-medium transition-all',
                                                                    dynamicFieldErrors[field.field_key] ? 'border-destructive/50' : 'border-input',
                                                                )}
                                                            >
                                                                {currentLocale === 'kh' && opt.label_kh ? opt.label_kh : opt.label_en}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            )}

                                            {field.field_type === 'checkbox' && (
                                                <FormToggle
                                                    id={field.field_key}
                                                    label={currentLocale === 'kh' && field.label_kh ? field.label_kh : field.label}
                                                    value={data.attributes[field.field_key]}
                                                    onChange={(checked) => setData('attributes', { ...data.attributes, [field.field_key]: checked })}
                                                    error={!!dynamicFieldErrors[field.field_key]}
                                                    statusOn={t('On')}
                                                    statusOff={t('Off')}
                                                />
                                            )}

                                            {(field.field_type === 'textarea' || field.field_type === 'text' || field.field_type === 'number') &&
                                                (field.field_type === 'textarea' ? (
                                                    <AutosizeTextarea
                                                        className={cn(
                                                            'bg-background min-h-[100px] rounded-none',
                                                            dynamicFieldErrors[field.field_key] &&
                                                                'border-destructive focus-visible:ring-destructive/20',
                                                        )}
                                                        value={data.attributes[field.field_key] || ''}
                                                        onChange={(e) =>
                                                            setData('attributes', { ...data.attributes, [field.field_key]: e.target.value })
                                                        }
                                                        placeholder={currentLocale === 'kh' && field.label_kh ? field.label_kh : field.label}
                                                    />
                                                ) : (
                                                    <Input
                                                        className={cn(
                                                            'bg-background rounded-none',
                                                            dynamicFieldErrors[field.field_key] &&
                                                                'border-destructive focus-visible:ring-destructive/20',
                                                        )}
                                                        type={field.field_type}
                                                        value={data.attributes[field.field_key] || ''}
                                                        onChange={(e) =>
                                                            setData('attributes', { ...data.attributes, [field.field_key]: e.target.value })
                                                        }
                                                        placeholder={currentLocale === 'kh' && field.label_kh ? field.label_kh : field.label}
                                                    />
                                                ))}
                                        </div>

                                        {dynamicFieldErrors[field.field_key] && (
                                            <p className="animate-in fade-in slide-in-from-top-1 text-destructive px-1 text-[11px] font-medium">
                                                {dynamicFieldErrors[field.field_key]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}

                <FormFieldTextArea
                    id="short_description"
                    label={t('Description')}
                    value={data.short_description}
                    onChange={(val) => setData('short_description', val)}
                    error={errors.short_description}
                />

                <div className="space-y-4">
                    <div className={cn('form-field-container md:grid-cols-1')}>
                        <FormFileUpload
                            key={editData?.images?.map((img: any) => img.image || img).join('-')}
                            id="images"
                            label={t('Select Images (Max 20)')}
                            files={files}
                            setFiles={setFiles}
                            className="rounded-none md:col-span-2"
                            error={errors.images}
                            dropzoneOptions={{
                                maxFiles: 20,
                                maxSize: 1024 * 1024 * 4,
                                multiple: true,
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
                                <div
                                    key={img.id}
                                    className="group relative aspect-square overflow-hidden border border-slate-200 dark:border-slate-800"
                                >
                                    <img src={`/assets/images/items/thumb/${img.image}`} className="h-full w-full object-cover" />
                                    {editData.images?.length > 1 && (
                                        <div className="absolute top-1 right-1 bg-white/30">
                                            <DeleteButton deletePath="/admin/items/images/" id={img.id} />
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
        </>
    );
}
