import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormLabel } from '@/components/Input/FormLabel';
import LocationPicker from '@/components/LocationPicker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    const [files, setFiles] = useState<File[] | null>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [isGettingRoles, setIsGettingRoles] = useState(false);

    const { data, setData, post, processing, progress, errors, reset, transform } = useForm({
        name: editData?.name || '',
        email: editData?.email || '',
        phone: editData?.phone || '',
        other_phones: editData?.other_phones || [],
        gender: editData?.gender || '',
        document_access_end_at: editData?.document_access_end_at ? new Date(editData.document_access_end_at) : null,
        password: '',
        password_confirmation: '',
        image: null as any,
        roles: editData?.roles?.map((r: any) => r.name) || [],
        address: editData?.address || '',
        location: editData?.location || '',
        latitude: editData?.latitude ?? null,
        longitude: editData?.longitude ?? null,
        is_verified: editData?.is_verified === 1 || editData?.is_verified === true || false,
    });

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

    useEffect(() => {
        setIsGettingRoles(true);
        axios
            .get('/admin/all_roles')
            .then((response) => {
                setRoles(response.data);
                setIsGettingRoles(false);
            })
            .catch(() => setIsGettingRoles(false));
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            image: files ? files[0] : null,
        }));

        const url = editData?.id ? `/admin/users/${editData.id}/update` : '/admin/users';

        post(url, {
            preserveScroll: false,
            onSuccess: (page: any) => {
                if (!editData?.id) {
                    reset();
                    setFiles(null);
                }
                if (page.props.flash?.success) {
                    toast.success(t('Success'), { description: page.props.flash.success });
                }
            },
            onError: () => {
                toast.error(t('Error'), { description: t('Please check the form for errors.') });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Users'), href: '/admin/users' },
        { title: readOnly ? t('Show') : editData ? t('Edit') : t('Create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="space-y-8 p-5">
                {/* Header Section: Date Picker */}
                <div className="flex flex-col space-y-2">
                    <FormLabel id="document_access_end_at" label={t('Document Access End At')} required={false} />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-full pl-3 text-left font-normal md:w-[280px]',
                                    !data.document_access_end_at && 'text-muted-foreground',
                                )}
                            >
                                {data.document_access_end_at ? format(data.document_access_end_at, 'PPP') : <span>{t('Pick a date')}</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                fromYear={1960}
                                toYear={2030}
                                captionLayout="dropdown-buttons"
                                mode="single"
                                selected={data.document_access_end_at as any}
                                onSelect={(date) => setData('document_access_end_at', date as any)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.document_access_end_at && <p className="text-destructive text-sm">{errors.document_access_end_at}</p>}
                </div>

                {/* Main Info Grid */}
                <div className="form-field-container md:grid-cols-2">
                    <FormField
                        required
                        id="name"
                        name="name"
                        label={t('Name')}
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        error={errors.name}
                        placeholder={t('Name')}
                        containerClassName="col-span-full"
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
                                    <Button type="button" variant="outline" size="sm" onClick={addOtherPhone} className="h-[41px] rounded border-dashed">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        {t('Add Phones')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <FormField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label={t('Email')}
                        value={data.email}
                        onChange={(val) => setData('email', val)}
                        error={errors.email}
                        placeholder={t('Email')}
                    />

                    <div className="space-y-2">
                        <FormLabel id="gender" label={t('Gender')} required={false} />
                        <RadioGroup value={data.gender} onValueChange={(val) => setData('gender', val)} className="grid grid-cols-3 gap-2">
                            {[
                                { value: 'male', label: t('Male') },
                                { value: 'female', label: t('Female') },
                                { value: 'other', label: t('Other') },
                            ].map((opt) => (
                                <div key={opt.value} className="relative">
                                    <RadioGroupItem value={opt.value} id={`gender-${opt.value}`} className="peer sr-only" />
                                    <label
                                        htmlFor={`gender-${opt.value}`}
                                        className={cn(
                                            'bg-background hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary dark:peer-data-[state=checked]:bg-primary/10 flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-medium transition-all',
                                            errors.gender ? 'border-destructive/50' : 'border-input',
                                        )}
                                    >
                                        {opt.label}
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.gender && (
                            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-[11px] font-medium">{errors.gender}</p>
                        )}
                    </div>
                </div>
                <div className="form-field-container md:grid-cols-2">
                    <div className="space-y-2">
                        <FormLabel id="password" label={t('Password')} required={true} />
                        <PasswordInput
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('Password')}
                            className={cn(errors.password && 'border-destructive focus-visible:ring-destructive/20')}
                        />
                        <FormErrorLabel error={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <FormLabel id="confirm_password" label={t('Confirm Password')} required={true} />
                        <PasswordInput
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder={t('Confirm Password')}
                            className={cn(errors.password && 'border-destructive focus-visible:ring-destructive/20')}
                        />
                    </div>
                </div>

                {/* Location Picker */}
                <div className="form-field-container md:grid-cols-1">
                    <div className="space-y-2">
                        <FormLabel id="location" label={t('Location')} required={false} />
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
                    </div>

                    <FormField
                        id="address"
                        name="address"
                        label={t('Detailed Address')}
                        value={data.address}
                        onChange={(val) => setData('address', val)}
                        error={errors.address}
                        placeholder={t('Address')}
                    />
                </div>

                {/* Roles & Verification Row */}
                <div className="grid gap-6 md:grid-cols-2">
                    {roles.length > 0 && (
                        <div className="space-y-2">
                            <FormLabel id="user_roles" label={t('User Roles')} required={false} />
                            <div className="bg-accent/5 flex flex-wrap gap-4 rounded-lg border p-4">
                                {roles.map(({ name }) => (
                                    <div key={name} className="flex items-center gap-2">
                                        <Checkbox
                                            id={name}
                                            checked={data.roles.includes(name)}
                                            onCheckedChange={(checked) => {
                                                const updated = checked ? [...data.roles, name] : data.roles.filter((r: string) => r !== name);
                                                setData('roles', updated);
                                            }}
                                        />
                                        <label htmlFor={name} className="cursor-pointer text-sm font-medium">
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <FormErrorLabel error={errors.roles} />
                        </div>
                    )}

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

                <div className={cn('form-field-container', !editData?.image && 'md:grid-cols-1')}>
                    <FormFileUpload key={editData?.image} id="image" label="Profile Image" files={files} setFiles={setFiles} />
                    {editData?.image && (
                        <UploadedImage
                            containerClassName="mt-0"
                            imageContainerClassName="flex-1"
                            label="Uploaded image"
                            images={editData?.image}
                            basePath="/assets/images/users/thumb/"
                        />
                    )}
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
