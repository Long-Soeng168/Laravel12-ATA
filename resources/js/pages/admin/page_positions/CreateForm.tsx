import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function CreateForm({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t } = useTranslation();

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({ message: '', type: 'message' });

    const { data, setData, post, processing, transform, errors, clearErrors, reset } = useForm({
        name: editData?.name || '',
        name_kh: editData?.name_kh || '',
        code: editData?.code || '',
        status: editData?.status || 'active',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        if (editData?.id) {
            post(`/admin/page_positions/${editData.id}/update`, {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: () => {
                    toast.error(t('Error'), { description: t('Failed to update') });
                },
            });
        } else {
            post('/admin/page_positions', {
                preserveScroll: false,
                onSuccess: (page: any) => {
                    reset();
                    if (page.props.flash?.success) {
                        setFlashMessage({ message: page.props.flash.success, type: 'success' });
                    }
                },
                onError: () => {
                    toast.error(t('Error'), { description: t('Failed to create') });
                },
            });
        }
    };

    const statusOptions = [
        { label: t('Active'), value: 'active' },
        { label: t('Inactive'), value: 'inactive' },
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
                        name="name_kh"
                        label={t('Name Khmer')}
                        value={data.name_kh}
                        onChange={(val) => setData('name_kh', val)}
                        error={errors.name_kh}
                        disabled={readOnly}
                    />

                    <FormFieldTextArea
                        name="short_description_kh"
                        label={t('Short Description Khmer')}
                        value={data.short_description_kh}
                        onChange={(val) => setData('short_description_kh', val)}
                        error={errors.short_description_kh}
                        disabled={readOnly}
                    />
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <FormField
                                name="name"
                                label={t('Name')}
                                value={data.name}
                                onChange={(val) => setData('name', val)}
                                error={errors.name}
                                disabled={readOnly}
                            />
                        </div>

                        <FormField
                            name="code"
                            label={t('Unique Code')}
                            value={data.code}
                            onChange={(val) => setData('code', val)}
                            error={errors.code}
                            disabled={readOnly}
                            description={t('ex: TOPNAV')}
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
                    </div>

                    <FormFieldTextArea
                        name="short_description"
                        label={t('Short Description')}
                        value={data.short_description}
                        onChange={(val) => setData('short_description', val)}
                        error={errors.short_description}
                        disabled={readOnly}
                    />
                </>
            )}

            {!readOnly && (
                <div className="mt-4 flex justify-end">
                    <SubmitButton processing={processing} />
                </div>
            )}
        </form>
    );
}
