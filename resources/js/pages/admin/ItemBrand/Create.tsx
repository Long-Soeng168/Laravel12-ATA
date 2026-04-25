import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormField } from '@/components/Input/FormField';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn, toSlug } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
// Define the shape of your category to safely type the props
interface Category {
    id: number;
    name: string;
}

interface TypeGroupForm {
    code?: string;
    name: string;
    name_kh?: string;
    order_index?: string | number;
    image?: string | null | File;
    category_ids: number[]; // Added this to hold the IDs for submission
}

export default function Create({ editData, readOnly, categories = [] }: { editData?: any; readOnly?: boolean; categories?: Category[] }) {
    const { t, currentLocale } = useTranslation();

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');
    const [files, setFiles] = useState<File[] | null>(null);

    // 1. Format available categories for the MultipleSelector
    const categoryOptions: Option[] = categories.map((cat) => ({
        label: cat.name,
        value: cat.id.toString(),
    }));

    // 2. Format existing selected categories (if editing) for the MultipleSelector
    const initialSelectedCategories: Option[] =
        editData?.categories?.map((cat: any) => ({
            label: cat.name,
            value: cat.id.toString(),
        })) || [];

    const [selectedCategories, setSelectedCategories] = useState<Option[]>(initialSelectedCategories);

    // 3. Initialize the form data
    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<TypeGroupForm>({
        code: editData?.code || '',
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        order_index: editData?.order_index || 10000,
        image: editData?.image || null,
        category_ids: editData?.categories?.map((cat: any) => cat.id) || [], // Extract IDs for initial state
    });

    // 4. Handle changes from MultipleSelector and sync with Inertia form data
    const handleCategoryChange = (selected: Option[]) => {
        setSelectedCategories(selected);
        setData(
            'category_ids',
            selected.map((item) => Number(item.value)),
        );
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, image: files ? files[0] : null }));

        if (editData?.id) {
            post(`/admin/item-brands/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/item-brands', {
                onSuccess: (page: any) => {
                    reset();
                    setSelectedCategories([]); // Clear selector UI on successful create
                    setFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Items', href: '/admin/items' },
        { title: 'Brands', href: '/admin/item-brands' },
        { title: editData?.name || 'Create', href: '#' },
    ];

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

                <div className="bg-background sticky top-0 z-10 pt-4 pb-2">
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
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(val) => setData('name', val)}
                            error={errors.name}
                            containerClassName="col-span-2"
                        />
                    </div>
                )}

                {inputLanguage == 'default' && (
                    <>
                        <div className="form-field-container">
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
                        </div>

                        {/* Categories Selection Field */}
                        {/* Categories Selection Field */}
                        <div className="form-field-container md:grid-cols-1">
                            <div className="col-span-12">
                                {/* Replaced FormLabel with a standard styled label or shadcn Label */}
                                <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {t('Categories')}
                                </label>

                                <MultipleSelector
                                    className="my-2" // Slightly adjusted margin for better spacing
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    defaultOptions={categoryOptions}
                                    placeholder="Select categories..."
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">No results found.</p>
                                    }
                                />

                                {/* Replaced FormMessage with standard conditional rendering */}
                                {errors.category_ids && <p className="text-destructive mt-1 text-[0.8rem] font-medium">{errors.category_ids}</p>}

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Select the categories this brand belongs to.</p>
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
                                    basePath="/assets/images/item_brands/thumb/"
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
