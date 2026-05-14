import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import CheckboxCardOption from '@/components/Card/CheckboxCardOption';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormLabel } from '@/components/Input/FormLabel';
import LocationPicker from '@/components/LocationPicker';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { shopStatusData } from '@/data/status-data';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/pages/nokor-tech/components/ui/label';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const { t, currentLocale } = useTranslation();
    const { owners, brands, provinces } = usePage<any>().props;

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [logoFiles, setLogoFiles] = useState<File[] | null>(null);
    const [bannerFiles, setBannerFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm({
        owner_user_id: editData?.owner_user_id?.toString() || '',
        name: editData?.name || '',
        phone: editData?.phone || '',
        other_phones: editData?.other_phones || [],
        address: editData?.address || '',
        status: editData?.status || '',
        order_index: editData?.order_index?.toString() || '10000',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        logo: editData?.logo || null,
        banner: editData?.banner || null,
        brand_code: editData?.brand_code?.toString() || '',
        province_code: editData?.province_code?.toString() || '',
        location: editData?.location || '',
        latitude: editData?.latitude ?? null,
        longitude: editData?.longitude ?? null,
        expired_at: editData?.expired_at || '',
        is_verified: editData?.is_verified === 1 || editData?.is_verified === true || false,
    });

    // Add Other Phones Logic
    const addOtherPhone = () => setData('other_phones', [...data.other_phones, '']);
    const removeOtherPhone = (index: number) => {
        setData(
            'other_phones',
            data.other_phones.filter((_: any, i: number) => i !== index),
        );
    };
    const handleOtherPhoneChange = (index: number, value: string) => {
        const updated = [...data.other_phones];
        updated[index] = value;
        setData('other_phones', updated);
    };
    // End Other Phones Logic

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({
            ...data,
            logo: logoFiles ? logoFiles[0] : null,
            banner: bannerFiles ? bannerFiles[0] : null,
        }));

        if (editData?.id) {
            post(`/admin/garages/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setLogoFiles(null);
                    setBannerFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/garages', {
                onSuccess: (page: any) => {
                    reset();
                    setLogoFiles(null);
                    setBannerFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Garages', href: '/admin/garages' },
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

                {/* --- OWNER + NAME --- */}
                <div className="form-field-container">
                    {owners?.length > 0 && (
                        <FormCombobox
                            name="owner_user_id"
                            label="Owner"
                            options={owners.map((u: any) => ({
                                value: u.id.toString(),
                                label: `${u.name} (${u.phone || 'N/A'})`,
                            }))}
                            value={data.owner_user_id?.toString() || ''}
                            onChange={(val) => setData('owner_user_id', val)}
                            error={errors.owner_user_id}
                        />
                    )}

                    <FormField
                        required
                        id="name"
                        name="name"
                        label="Garage Name"
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        containerClassName="col-span-2"
                    />
                </div>

                {/* PHONE + ADDRESS */}
                <div className="space-y-4">
                    {/* Primary Phone and Add Button Row */}
                    <div className="flex flex-1 items-start gap-4">
                        <div className="flex-1">
                            <FormField
                                required
                                id="phone"
                                name="phone"
                                type="number"
                                label={t('Phone Number')}
                                value={data.phone}
                                onChange={(val) => setData('phone', val)}
                                error={errors.phone}
                                placeholder={t('Phone Number')}
                                containerClassName="flex-1"
                            />
                            {data.other_phones.length > 0 && (
                                <div className="bg-accent/5 mt-2 w-full flex-1 space-y-2">
                                    {data.other_phones.map((p: string, i: number) => (
                                        <div>
                                            <div key={i} className="flex items-center gap-2">
                                                <Input
                                                    id={`other_phone_${i}`}
                                                    name={`other_phones.${i}`}
                                                    type="number"
                                                    value={p}
                                                    // Extract the value from the event target
                                                    onChange={(e) => handleOtherPhoneChange(i, e.target.value)}
                                                    placeholder={t('Other Phone')}
                                                />

                                                {!readOnly && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removeOtherPhone(i)}
                                                        className="text-destructive h-10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            {errors[`other_phones.${i}` as keyof typeof errors] && (
                                                <p className="text-destructive mt-1 text-sm font-medium transition-all">Phone format is invalid.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!readOnly && (
                            <div className="space-y-2">
                                <FormLabel className="invisible" label="For Space" />
                                <Button type="button" variant="outline" size="sm" onClick={addOtherPhone} className="h-[41px] rounded border-dashed">
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    {t('Add Phones')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {/* {brands?.length > 0 && (
                        <FormCombobox
                            name="brand_code"
                            label="Brand Expert"
                            options={brands.map((b: any) => ({
                                value: b.code,
                                label: currentLocale === 'kh' ? b.name_kh || b.name : b.name,
                            }))}
                            value={data.brand_code || ''}
                            onChange={(val) => setData('brand_code', val)}
                            error={errors.brand_code}
                        />
                    )} */}

                <div className="form-field-container md:grid-cols-1">
                    <FormFieldTextArea
                        id="short_description"
                        name="short_description"
                        label="Short Description"
                        value={data.short_description}
                        onChange={(val) => setData('short_description', val)}
                        error={errors.short_description}
                    />
                </div>

                {/* STATUS + ORDER INDEX */}
                <div className="form-field-container md:grid-cols-2">
                    <div className="grid content-start gap-2 md:col-span-2">
                        <FormLabel id="status" label="Garage Status" required />
                        <div className="flex flex-wrap gap-3">
                            {shopStatusData.map(({ label, value, color, description }) => (
                                <CheckboxCardOption
                                    key={value}
                                    className={`max-w-[150px] rounded py-2 border-${color}`}
                                    checkBoxClassName="top-0 right-0"
                                    option={{
                                        value,
                                        label,
                                        icon: () => null,
                                    }}
                                    checked={data.status === value}
                                    onChange={() => setData('status', value)}
                                />
                            ))}
                        </div>
                        <FormErrorLabel error={errors.status} />
                    </div>
                    <div className="space-y-2">
                        <FormLabel id="account_status" label={t('Account Status')} required={false} />
                        <div className="bg-accent/5 flex h-full max-h-[74px] items-center space-x-4 rounded-lg border border-blue-200/50 p-4 dark:border-blue-900/30">
                            <Switch id="is_verified" checked={data.is_verified} onCheckedChange={(val) => setData('is_verified', val)} />
                            <div className="grid gap-1 leading-none">
                                <Label htmlFor="is_verified" className="flex items-center gap-2 text-sm font-bold">
                                    {t('Verified Account')}
                                    {data.is_verified && (
                                        <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] tracking-wider text-white uppercase">
                                            {t('Verified')}
                                        </span>
                                    )}
                                </Label>
                                <p className="text-muted-foreground text-[11px]">{t('Grant a verified badge to this user profile.')}</p>
                            </div>
                        </div>
                        <FormErrorLabel error={errors.is_verified} />
                    </div>
                </div>

                {/* BRAND + PROVINCE */}
                <div className="form-field-container">
                    {provinces?.length > 0 && (
                        <FormCombobox
                            name="province_code"
                            label="Province"
                            options={provinces.map((p: any) => ({
                                value: p.code,
                                label: currentLocale === 'kh' ? p.name_kh : p.name_en || p.name,
                            }))}
                            value={data.province_code || ''}
                            onChange={(val) => setData('province_code', val)}
                            error={errors.province_code}
                        />
                    )}
                    <FormField
                        id="order_index"
                        name="order_index"
                        type="number"
                        label="Order Index"
                        value={data.order_index}
                        onChange={(val) => setData('order_index', val)}
                        error={errors.order_index}
                    />
                </div>

                {/* LOCATION (picker updates lat/lng + location text) */}
                <div className="form-field-container hidden md:grid-cols-1">
                    <FormField
                        id="location"
                        name="location"
                        label="Location Text"
                        value={data.location}
                        onChange={(val) => setData('location', val)}
                        error={errors.location}
                    />
                </div>

                {/* LocationPicker */}
                <div className="form-field-container md:grid-cols-1">
                    <LocationPicker
                        key={'location_picker_key' + (data.location || editData?.location || '')}
                        value={
                            editData?.latitude != null && editData?.longitude != null
                                ? {
                                      coordinates: {
                                          lat: Number(editData.latitude),
                                          lng: Number(editData.longitude),
                                      },
                                      formatted_address: editData?.location || '',
                                  }
                                : data.latitude != null && data.longitude != null
                                  ? {
                                        coordinates: {
                                            lat: Number(data.latitude),
                                            lng: Number(data.longitude),
                                        },
                                        formatted_address: data.location || '',
                                    }
                                  : null
                        }
                        onChange={(loc: any) => {
                            // loc?.coordinates?.lat, loc?.coordinates?.lng, loc?.formatted_address
                            setData('latitude', loc?.coordinates?.lat ?? null);
                            setData('longitude', loc?.coordinates?.lng ?? null);
                            setData('location', loc?.formatted_address ?? '');
                        }}
                        label={t('Pick a location')}
                        height="300px"
                    />

                    <FormFieldTextArea
                        id="address"
                        name="address"
                        label="Address"
                        value={data.address}
                        onChange={(val) => setData('address', val)}
                        error={errors.address}
                    />
                </div>

                {/* EXPIRED AT */}
                {/* <div className="form-field-container md:grid-cols-1">
                    <FormField
                        type="date"
                        id="expired_at"
                        name="expired_at"
                        label="Expired At"
                        value={data.expired_at || ''}
                        onChange={(val) => setData('expired_at', val)}
                        error={errors.expired_at}
                    />
                </div> */}

                {/* LOGO + BANNER */}
                <div className="form-field-container md:grid-cols-2">
                    <div>
                        <FormFileUpload key={editData?.logo} id="logo" label="Logo" files={logoFiles} setFiles={setLogoFiles} error={errors.logo} />

                        {editData?.logo && <UploadedImage label="Current Logo" images={editData.logo} basePath="/assets/images/garages/" />}
                    </div>

                    <div>
                        <FormFileUpload
                            key={editData?.banner}
                            id="banner"
                            label="Banner"
                            files={bannerFiles}
                            setFiles={setBannerFiles}
                            error={errors.banner}
                        />

                        {editData?.banner && <UploadedImage label="Current Banner" images={editData.banner} basePath="/assets/images/garages/" />}
                    </div>
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
