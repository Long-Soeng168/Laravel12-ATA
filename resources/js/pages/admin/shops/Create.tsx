import SubmitButton from '@/components/Button/SubmitButton';
import CheckboxCardOption from '@/components/Card/CheckboxCardOption';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormLabel } from '@/components/Input/FormLabel';
import LocationPicker from '@/components/LocationPicker';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Switch } from '@/components/ui/switch';
import { shopStatusData } from '@/data/status-data';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlertTriangle, CalendarIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Create({
    editData,
    readOnly,
    setIsOpen,
}: {
    editData?: any;
    readOnly?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { t } = useTranslation();
    const { all_users } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);
    const [filesBanner, setFilesBanner] = useState<File[] | null>(null);

    const { data, setData, post, processing, progress, errors, reset, transform } = useForm({
        owner_user_id: editData?.owner_user_id || '',
        name: editData?.name || '',
        phone: editData?.phone || '',
        other_phones: editData?.other_phones || [],
        address: editData?.address || '',
        status: editData?.status || 'approved',
        order_index: editData?.order_index?.toString() || '10000',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        logo: null as any,
        banner: null as any,
        expired_at: editData?.expired_at ? new Date(editData?.expired_at) : new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
        location: editData?.location || '',
        latitude: editData?.latitude ?? null,
        longitude: editData?.longitude ?? null,
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
        transform((data) => ({
            ...data,
            logo: files ? files[0] : null,
            banner: filesBanner ? filesBanner[0] : null,
        }));

        const url = editData?.id ? `/admin/shops/${editData.id}/update` : '/admin/shops';
        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData?.id) {
                    reset();
                    setFiles(null);
                    setFilesBanner(null);
                }
                if (page.props.flash?.success) {
                    toast.success(t('Success'), { description: page.props.flash.success });
                }
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Shops'), href: '/admin/shops' },
        { title: readOnly ? t('Show') : editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="space-y-8 p-4">
                {/* Expired Date */}
                <div className="flex flex-col space-y-2">
                    <FormLabel id="expired_at" label={t('Expired Date')} />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal md:w-[280px]', !data.expired_at && 'text-muted-foreground')}
                            >
                                {data.expired_at ? format(data.expired_at, 'PPP') : <span>{t('Pick a date')}</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                fromYear={1960}
                                toYear={2030}
                                captionLayout="dropdown-buttons"
                                mode="single"
                                selected={data.expired_at}
                                onSelect={(date) => setData('expired_at', date as any)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormErrorLabel error={errors.expired_at} />
                </div>

                <div className="form-field-container md:grid-cols-2">
                    <div>
                        <FormCombobox
                            name="owner_user_id"
                            label={t('Owner')}
                            options={[
                                { value: null, label: t(`NA`) },
                                ...all_users.map((item: any) => ({
                                    value: item.id,
                                    label: `ID: ${item?.id} - ${item?.name} ${item?.phone ? '(' + item?.phone + ')' : ''}`,
                                })),
                            ]}
                            value={data.owner_user_id || ''}
                            onChange={(val) => setData('owner_user_id', val)}
                            error={errors.owner_user_id}
                        />
                        {editData?.owner_user_id && editData?.owner_user_id != data.owner_user_id && (
                            <div className="mt-2 flex items-start gap-3 rounded border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-500">
                                <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-500" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-yellow-900 dark:text-yellow-400">{t('Ownership Change Notice')}</span>
                                    <span>
                                        {t('Warning: You are about to change the shop owner. This action may restrict the previous owner’s access.')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <FormField
                        required
                        id="name"
                        name="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        placeholder={t('Name')}
                        containerClassName="md:col-span-2"
                    />
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
                                                    <p className="text-destructive mt-1 text-sm font-medium transition-all">
                                                        Phone format is invalid.
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {!readOnly && (
                                <div className="space-y-2">
                                    <FormLabel className="invisible" label="For Space" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addOtherPhone}
                                        className="h-[41px] rounded border-dashed"
                                    >
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        {t('Add Phones')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <FormField
                        id="order_index"
                        name="order_index"
                        label={t('Order Index')}
                        value={data.order_index}
                        onChange={(val) => setData('order_index', val)}
                        error={errors.order_index}
                        placeholder="ex: 1"
                        description={t('Lower number is priority')}
                    />
                    <div className="md:col-span-2">
                        <FormLabel id="short_description" label={t('Short Description')} />
                        <AutosizeTextarea
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            placeholder={t('Short Description')}
                            className={cn(errors.short_description && 'border-destructive focus-visible:ring-destructive/20')}
                        />
                        <FormErrorLabel error={errors.short_description} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
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
                    {/* Account Status / Verified Toggle */}
                    <div className="space-y-2">
                        <FormLabel id="account_status" label={t('Account Status')} />
                        <div className="bg-accent/5 flex max-w-md items-center space-x-4 rounded-lg border border-blue-200/50 p-4 dark:border-blue-900/30">
                            <Switch id="is_verified" checked={data.is_verified} onCheckedChange={(val) => setData('is_verified', val)} />
                            <div className="grid gap-1 leading-none">
                                <Label htmlFor="is_verified" className="flex items-center gap-2 text-sm font-bold">
                                    {t('Verified Shop')}
                                    {data.is_verified && (
                                        <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] tracking-wider text-white uppercase">
                                            {t('Verified')}
                                        </span>
                                    )}
                                </Label>
                                <p className="text-muted-foreground text-[11px]">{t('Enable this to show a verified badge on this shop.')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                    <LocationPicker
                        key={'loc_' + data.location}
                        value={
                            data.latitude
                                ? {
                                      coordinates: { lat: Number(data.latitude), lng: Number(data.longitude) },
                                      formatted_address: data.location,
                                  }
                                : null
                        }
                        onChange={(loc: any) => {
                            setData((prev) => ({
                                ...prev,
                                latitude: loc?.coordinates?.lat ?? null,
                                longitude: loc?.coordinates?.lng ?? null,
                                location: loc?.formatted_address ?? '',
                            }));
                        }}
                        height="300px"
                    />
                    <FormErrorLabel error={errors.location} />

                    <FormField
                        id="address"
                        name="address"
                        label={t('Address')}
                        value={data.address}
                        onChange={(val) => setData('address', val)}
                        error={errors.address}
                        placeholder={t('Address')}
                    />
                </div>

                {/* Media Upload */}
                <div className="form-field-container md:grid-cols-2">
                    <div className="space-y-2">
                        <FormFileUpload error={errors?.logo} key={editData?.logo} id="logo" label={t('Logo')} files={files} setFiles={setFiles} />
                        {editData?.logo && <UploadedImage label={t('Current Logo')} images={editData?.logo} basePath="/assets/images/shops/thumb/" />}
                    </div>
                    <div className="space-y-2">
                        <FormFileUpload error={errors?.banner} id="banner" label={t('Banner')} files={filesBanner} setFiles={setFilesBanner} />
                        {editData?.banner && <UploadedImage label={t('Current Banner')} images={editData?.banner} basePath="/assets/images/shops/" />}
                    </div>
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
