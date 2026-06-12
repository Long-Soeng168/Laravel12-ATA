import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import { FormErrorLabel } from '@/components/Input/FormErrorLabel';
import { FormField } from '@/components/Input/FormField';
import { FormLabel } from '@/components/Input/FormLabel';
import LocationPicker from '@/components/LocationPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, Camera, PlusIcon, Save, Trash2, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function EditProfilePage() {
    const { t, currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    const { auth } = usePage<any>().props;
    const user: any = auth.user || {};

    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({ message: '', type: 'message' });
    const [files, setFiles] = useState<File[] | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, transform } = useForm<any>({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        other_phones: user.other_phones || [],
        gender: user.gender || '',
        address: user.address || '',
        location: user.location || '',
        latitude: user.latitude ?? null,
        longitude: user.longitude ?? null,
        image: null as any,
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFiles([file]);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleClearPreview = () => {
        setFiles(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((formData) => ({
            ...formData,
            image: files ? files[0] : null,
        }));

        post('/user-settings/profile', {
            preserveScroll: true,
            onSuccess: (page: any) => {
                if (page.props.flash?.success) {
                    setFlashMessage({ message: page.props.flash.success, type: 'success' });
                } else {
                    setFlashMessage({ message: isKh ? 'ការកែប្រែជោគជ័យ!' : 'Update Successful!', type: 'success' });
                }
            },
        });
    };

    return (
        <div className="flex min-h-screen items-start justify-center p-3 transition-colors lg:p-8">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <header className="mb-5 flex items-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="group flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-200 ease-out hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-95 dark:border-white/10 dark:bg-[#101010] dark:text-gray-400 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                        aria-label={t('Go back')}
                    >
                        <ArrowLeftIcon className="h-[20px] w-[20px] stroke-[2px] duration-200" />
                    </button>
                    <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 dark:text-white">
                        {isKh ? 'កែប្រែប្រវត្តិរូប' : 'Edit Profile'}
                    </h1>
                </header>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col border border-gray-200 bg-white transition-colors dark:border-white/10 dark:bg-[#101010]">
                        <div className="space-y-8 p-4 sm:p-6">
                            {/* Profile Image Section */}
                            <div className="col-span-full mb-8 flex flex-col gap-6 min-[350px]:flex-row sm:items-center">
                                <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-[#161616]">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                    ) : user?.image ? (
                                        <img src={`/assets/images/users/thumb/${user.image}`} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                                            <User className="h-12 w-12 stroke-[1.5px]" />
                                        </div>
                                    )}

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100"
                                    >
                                        <Camera className="h-6 w-6 text-white" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                        {isKh ? 'រូបថតប្រវត្តិរូប' : 'Profile Photo'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isKh ? 'ណែនាំរូបភាពប្រភេទ JPG ឬ PNG។ ទំហំអតិបរមា 2MB។' : 'Recommended JPG or PNG. Max size 2MB.'}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="h-9 rounded-none border-gray-200 dark:border-white/10"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            {isKh ? 'ប្តូររូបភាព' : 'Upload Photo'}
                                        </Button>

                                        {previewUrl && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleClearPreview}
                                                className="h-9 rounded-none text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                            >
                                                {isKh ? 'បោះបង់' : 'Cancel Selection'}
                                            </Button>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        onChange={handleImageChange}
                                    />
                                    <FormErrorLabel error={errors.image} />
                                </div>
                            </div>

                            {/* Main Info Grid */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    required
                                    id="name"
                                    name="name"
                                    label={t('Name')}
                                    value={data.name}
                                    onChange={(val) => setData('name', val)}
                                    error={errors.name}
                                    placeholder={isKh ? 'ឧ៖ សុខ សាន្ត' : 'e.g., Sok San'}
                                    containerClassName="col-span-full rounded-none"
                                />

                                <div className="space-y-4">
                                    <div className="flex flex-1 items-start gap-4">
                                        <div className="flex-1">
                                            <FormField
                                                required
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                label={t('Phone Number')}
                                                value={data.phone}
                                                onChange={(val) => setData('phone', val)}
                                                error={errors.phone}
                                                placeholder={t('Phone Number')}
                                                containerClassName="flex-1 rounded-none"
                                            />
                                            {data.other_phones.length > 0 && (
                                                <div className="mt-3 flex w-full flex-1 flex-col space-y-3">
                                                    {data.other_phones.map((p: string, i: number) => (
                                                        <div key={i}>
                                                            <div className="flex items-center gap-2">
                                                                <Input
                                                                    id={`other_phone_${i}`}
                                                                    name={`other_phones.${i}`}
                                                                    type="tel"
                                                                    value={p}
                                                                    onChange={(e) => handleOtherPhoneChange(i, e.target.value)}
                                                                    placeholder={t('Other Phone')}
                                                                    className="rounded-none border-gray-200 dark:border-white/10"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => removeOtherPhone(i)}
                                                                    className="text-destructive hover:text-destructive h-10 shrink-0 rounded-none border-gray-200 hover:bg-red-50 dark:border-white/10 dark:hover:bg-red-900/20"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                            {errors[`other_phones.${i}` as keyof typeof errors] && (
                                                                <p className="text-destructive mt-1 text-sm font-medium transition-all">
                                                                    {errors[`other_phones.${i}` as keyof typeof errors]}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <FormLabel className="invisible" label="For Space" />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addOtherPhone}
                                                className="h-[41px] rounded-none border-dashed border-gray-300 dark:border-gray-700"
                                            >
                                                <PlusIcon className="mr-2 h-4 w-4" />
                                                {t('Add Phones')}
                                            </Button>
                                        </div>
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
                                    placeholder="email@example.com"
                                    containerClassName="rounded-none"
                                />

                                <div className="col-span-full space-y-2 md:col-span-1">
                                    <FormLabel id="gender" label={t('Gender')} required={false} />
                                    <RadioGroup
                                        value={data.gender}
                                        onValueChange={(val) => setData('gender', val)}
                                        className="grid grid-cols-3 gap-2"
                                    >
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
                                                        'flex cursor-pointer items-center justify-center border border-gray-200 bg-gray-50 px-3 py-2.5 text-center text-sm font-medium transition-all peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-100 dark:border-white/10 dark:bg-[#161616] dark:peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:bg-blue-500/10 dark:peer-data-[state=checked]:text-blue-400 dark:hover:bg-white/5',
                                                        errors.gender ? 'border-destructive/50' : '',
                                                    )}
                                                >
                                                    {opt.label}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {errors.gender && (
                                        <p className="animate-in fade-in slide-in-from-top-1 text-destructive text-[11px] font-medium">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Location Picker */}
                            <div className="grid gap-6 md:grid-cols-1">
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
                                            setData((prev: any) => ({
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
                                    containerClassName="rounded-none"
                                />
                            </div>
                        </div>

                        {/* Alerts */}
                        <div className="px-6">
                            {flashMessage.message && (
                                <AlertFlashMessage
                                    key={flashMessage.message}
                                    type={flashMessage.type}
                                    flashMessage={flashMessage.message}
                                    setFlashMessage={setFlashMessage}
                                />
                            )}

                            {Object.keys(errors).length > 0 && (
                                <AllErrorsAlert title={isKh ? 'សូមជួសជុលកំហុសខាងក្រោម' : 'Please fix the following errors'} errors={errors} />
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 border-t border-gray-200 p-4 transition-colors sm:p-6 dark:border-white/10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative flex w-full cursor-pointer items-center justify-center border border-blue-600 bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-700 disabled:bg-blue-800 dark:border-blue-700 dark:bg-blue-700 dark:hover:border-blue-600 dark:hover:bg-blue-600 dark:disabled:border-blue-900 dark:disabled:bg-blue-900/50 dark:disabled:text-white/50"
                            >
                                {processing ? (
                                    <>
                                        <div className="mr-3 h-5 w-5 animate-spin rounded-full border border-white border-t-transparent dark:border-white/50 dark:border-t-transparent"></div>
                                        {isKh ? 'កំពុងរក្សាទុក...' : 'Saving...'}
                                    </>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Save className="size-5" />
                                        {isKh ? 'រក្សាទុកការកែប្រែ' : 'Save Changes'}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
