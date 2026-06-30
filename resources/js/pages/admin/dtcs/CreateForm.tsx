import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateForm() {
    const { t } = useTranslation();
    const { editData, readOnly } = usePage<any>().props;

    const [flashMessage, setFlashMessage] = useState({ message: '', type: 'message' });

    const { data, setData, post, processing, progress, errors, reset } = useForm({
        code: editData?.code || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editData?.id ? `/admin/dtcs/${editData.id}/update` : '/admin/dtcs';

        post(url, {
            preserveScroll: true,
            onSuccess: (page: any) => {
                if (!editData) reset();
                setFlashMessage({ message: page.props.flash?.success, type: 'success' });
            },
        });
    };

    return (
        <form onSubmit={onSubmit} className="form space-y-8 p-5">
            <AlertFlashMessage
                key={flashMessage.message}
                type={flashMessage.type}
                flashMessage={flashMessage.message}
                setFlashMessage={setFlashMessage}
            />

            {Object.keys(errors).length > 0 && <AllErrorsAlert title={t('Please fix the following errors')} errors={errors} />}

            <div className="form-field-container">
                <FormField
                    id="code"
                    label={t('Code')}
                    value={data.code}
                    onChange={(val) => setData('code', val)}
                    error={errors.code}
                    disabled={readOnly}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <FormFieldTextArea
                    id="short_description"
                    label={t('Short Description')}
                    value={data.short_description}
                    onChange={(val) => setData('short_description', val)}
                    error={errors.short_description}
                    disabled={readOnly}
                />

                <FormFieldTextArea
                    id="short_description_kh"
                    label={t('Short Description Khmer')}
                    value={data.short_description_kh}
                    onChange={(val) => setData('short_description_kh', val)}
                    error={errors.short_description_kh}
                    disabled={readOnly}
                />
            </div>

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}

            {!readOnly && <SubmitButton processing={processing} />}
        </form>
    );
}
