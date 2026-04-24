import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { toSlug } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Interface updated for Options schema
interface OptionForm {
    item_category_field_id: string;
    option_value: string;
    label_en: string;
    label_kh: string;
    order_index: string | number;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    // 'fields' replaces 'categories' as the parent selector
    const { fields, selected_field_id } = usePage<any>().props;

    const { data, setData, post, processing, progress, errors, reset } = useForm<OptionForm>({
        item_category_field_id: editData?.item_category_field_id?.toString() || selected_field_id?.toString() || '',
        option_value: editData?.option_value || '',
        label_en: editData?.label_en || '',
        label_kh: editData?.label_kh || '',
        order_index: editData?.order_index || 100,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editData?.id) {
            post(`/admin/item-category-field-options/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/item-category-field-options', {
                onSuccess: (page: any) => {
                    reset();
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/admin/item-categories' },
        { title: 'Field Options', href: '/admin/item-category-field-options' },
        { title: editData?.label_en || 'Create Option', href: '#' },
    ];

    const { t } = useTranslation();

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

                <div className="bg-background sticky top-0 z-10 pb-4">
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
                            id="label_kh"
                            name="label_kh"
                            label="Label Khmer"
                            value={data.label_kh}
                            onChange={(val) => setData('label_kh', val)}
                            error={errors.label_kh}
                            description="Example: លេខអូតូ"
                        />
                    </div>
                ) : (
                    <div className="form-field-container">
                        <FormCombobox
                            required
                            name="item_category_field_id"
                            label="Field"
                            options={fields?.map((item: any) => ({
                                value: item.id.toString(),
                                label: `${item.label} (${item.category?.name || 'N/A'})`,
                            }))}
                            value={data.item_category_field_id}
                            onChange={(val) => setData('item_category_field_id', val)}
                            error={errors.item_category_field_id}
                        />

                        <FormField
                            required
                            id="label_en"
                            name="label_en"
                            label="Option Label (EN)"
                            value={data.label_en}
                            onChange={(val) => {
                                setData((prev) => ({
                                    ...prev,
                                    label_en: val,
                                    // Slugify for the value key, e.g., "Automatic" -> "automatic"
                                    option_value: editData?.id ? prev.option_value : toSlug(val).toLowerCase().replace(/-/g, '_'),
                                }));
                            }}
                            error={errors.label_en}
                        />

                        <FormField
                            required
                            id="option_value"
                            name="option_value"
                            label="Option Value (Key)"
                            value={data.option_value}
                            onChange={(val: string) => setData('option_value', val.toLowerCase().replace(/-/g, '_'))}
                            error={errors.option_value}
                            description="The machine value stored in DB (e.g. 'auto')"
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
                        />
                    </div>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
