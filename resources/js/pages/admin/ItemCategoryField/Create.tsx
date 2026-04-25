import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { toSlug } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface TypeGroupForm {
    category_id: string;
    label: string;
    label_kh: string;
    field_key: string;
    field_type: string;
    is_required: boolean; // Updated interface
    order_index: string | number;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    const { categories, fieldTypes, selected_category_id } = usePage<any>().props;
    const { t } = useTranslation();

    const { data, setData, post, processing, progress, errors, reset } = useForm<TypeGroupForm>({
        category_id: editData?.category_id?.toString() || selected_category_id?.toString() || '',
        label: editData?.label || '',
        label_kh: editData?.label_kh || '',
        field_key: editData?.field_key || '',
        field_type: editData?.field_type || 'select',
        is_required: editData?.is_required === 1 || editData?.is_required === true || false, // Initialize boolean
        order_index: editData?.order_index || 100,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editData?.id ? `/admin/item-category-fields/${editData.id}/update` : '/admin/item-category-fields';

        post(url, {
            onSuccess: (page: any) => {
                if (!editData?.id) reset();
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Dashboard'), href: '/dashboard' },
        { title: t('Categories'), href: '/admin/item-categories' },
        { title: t('Fields'), href: '/admin/item-category-fields' },
        { title: editData?.label || t('Create Field'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="form space-y-6 p-4">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
                {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

                <div className="bg-background sticky top-0 z-10 pb-4">
                    <Tabs value={inputLanguage} onValueChange={(val: any) => setInputLanguage(val)}>
                        <TabsList className="bg-border/50 border p-1 dark:border-white/20">
                            <TabsTrigger value="default" className="h-full">
                                {t('Default')}
                            </TabsTrigger>
                            <TabsTrigger value="khmer" className="h-full">
                                {t('Khmer')}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {inputLanguage === 'khmer' ? (
                    <div className="form-field-container md:grid-cols-2">
                        <FormField
                            id="label_kh"
                            name="label_kh"
                            label={t('Label Khmer')}
                            value={data.label_kh}
                            onChange={(val) => setData('label_kh', val)}
                            error={errors.label_kh}
                        />
                    </div>
                ) : (
                    <>
                        <div className="form-field-container">
                            <FormCombobox
                                required
                                name="category_id"
                                label={t('Category')}
                                options={categories?.map((item: any) => ({
                                    value: item.id.toString(),
                                    label: item.name,
                                }))}
                                value={data.category_id}
                                onChange={(val) => setData('category_id', val)}
                                error={errors.category_id}
                            />

                            <FormField
                                required
                                id="label"
                                name="label"
                                label={t('Field Label (EN)')}
                                value={data.label}
                                onChange={(val) => {
                                    setData((prev) => ({
                                        ...prev,
                                        label: val,
                                        field_key: editData?.id ? prev.field_key : toSlug(val).toLowerCase().replace(/-/g, '_'),
                                    }));
                                }}
                                error={errors.label}
                            />

                            <FormField
                                required
                                id="field_key"
                                name="field_key"
                                label={t('Field Key')}
                                value={data.field_key}
                                onChange={(val: string) => setData('field_key', val.toLowerCase().replace(/-/g, '_'))}
                                error={errors.field_key}
                                description={t('Technical key (e.g. engine_type)')}
                            />

                            <FormCombobox
                                required
                                name="field_type"
                                label={t('Field Type')}
                                options={fieldTypes?.map((item: any) => ({
                                    value: item.value,
                                    label: item.label,
                                }))}
                                value={data.field_type}
                                onChange={(val) => setData('field_type', val)}
                                error={errors.field_type}
                            />
                        </div>

                        {/* Requirement Toggle */}
                        <div className="bg-accent/5 flex items-center space-x-4 rounded-lg border p-4">
                            <Switch id="is_required" checked={data.is_required} onCheckedChange={(val) => setData('is_required', val)} />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="is_required" className="text-sm font-bold">
                                    {t('Required Field')}
                                </Label>
                                <p className="text-muted-foreground text-xs">{t('If enabled, users must fill this attribute when posting items.')}</p>
                            </div>
                        </div>
                    </>
                )}

                {inputLanguage === 'default' && (
                    <div className="form-field-container">
                        <FormField
                            required
                            type="number"
                            id="order_index"
                            name="order_index"
                            label={t('Order Index')}
                            value={data.order_index}
                            onChange={(val) => setData('order_index', val)}
                            error={errors.order_index}
                        />
                    </div>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
