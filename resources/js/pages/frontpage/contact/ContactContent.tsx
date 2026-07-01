import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { Mail, MapPin } from 'lucide-react';

export default function ContactContent() {
    const { t, currentLocale } = useTranslation();
    const { application_info, links } = usePage<any>().props;

    return (
        <>
            <div className="section-container mt-8 pb-12">
                {/* Header Section */}
                <section className="mb-16 flex flex-col items-center text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black uppercase md:text-5xl lg:text-6xl">
                        {t('Get in')} <span className="text-[#FF6D00]">{t('Touch')}</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-[600px] text-lg leading-relaxed">
                        {t(
                            'Have questions about our products, services, or how A-Tech Auto can support your automotive journey? Reach out to our team directly through any of the channels below.',
                        )}
                    </p>
                </section>

                {/* Contact Channels Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* 4. Dynamic Social Links (Telegram, Facebook, etc.) */}
                    {links?.map((item: any) => {
                        const displayTitle = currentLocale === 'kh' ? item?.title_kh || item?.title : item?.title;
                        const url = item?.url || item?.link || '#';

                        // Extracting username/handle from the URL to display as subtext (e.g. "@atechauto086")
                        const handle = url !== '#' ? url.replace(/^https?:\/\/(www\.)?(t\.me\/|facebook\.com\/|youtube\.com\/@?)/, '') : t('Connect');

                        return (
                            <a
                                key={item?.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-card border-border group flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00] active:scale-[0.97]"
                            >
                                <img
                                    src={`/assets/images/links/thumb/${item?.image}`}
                                    alt={displayTitle}
                                    className="mb-3 size-10 object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                                <h2 className="text-foreground mb-2 text-lg font-bold">{displayTitle}</h2>
                                <p className="text-muted-foreground group-hover:text-foreground line-clamp-1 text-sm font-medium break-all transition-colors">
                                    {handle}
                                </p>
                            </a>
                        );
                    })}
                    {/* 2. Dynamic Email */}
                    {application_info?.email && (
                        <a
                            href={`mailto:${application_info.email}`}
                            className="bg-card border-border group flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00] active:scale-[0.97]"
                        >
                            <Mail className="text-primary mb-3 size-10" />
                            <h2 className="text-foreground mb-2 text-lg font-bold">{t('Email')}</h2>
                            <p className="text-muted-foreground group-hover:text-foreground text-sm font-medium break-all transition-colors">
                                {application_info.email}
                            </p>
                        </a>
                    )}

                    {/* 3. Dynamic Location */}
                    {application_info?.address && (
                        <div className="bg-card border-border flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00]">
                            <MapPin className="text-primary mb-3 size-10" />
                            <h2 className="text-foreground mb-2 text-lg font-bold">{t('Our Office')}</h2>
                            <p className="text-muted-foreground text-[13px] leading-relaxed">{application_info.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
