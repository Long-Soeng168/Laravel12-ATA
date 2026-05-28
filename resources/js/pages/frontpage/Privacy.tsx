import useTranslation from '@/hooks/use-translation';
import { Head, usePage } from '@inertiajs/react';
import FrontPageLayout from './layouts/frontpage-layout';

const Privacy = () => {
    const { currentLocale } = useTranslation();
    const { privacies } = usePage<any>().props;

    // Helper to wrap the last word of the title in the brand orange color
    const renderTitle = (title: string) => {
        if (!title) return null;
        const words = title.split(' ');
        if (words.length === 1) return <span className="text-[#FF6D00]">{title}</span>;

        const lastWord = words.pop();
        return (
            <>
                {words.join(' ')} <span className="text-[#FF6D00]">{lastWord}</span>
            </>
        );
    };

    const displayTitle = currentLocale === 'kh' ? privacies?.title_kh : privacies?.title;

    return (
        <FrontPageLayout>
            <Head>
                <title>Privacy Policy | Your Data Protection Commitment</title>
                <meta
                    name="description"
                    content="Understand how A-Tech Auto protects your personal data. We are committed to securing your information and never share or sell it to third parties. Your trust is our priority."
                />
            </Head>

            <div className="section-container mx-auto mt-6 max-w-4xl pb-12">
                {/* Header Section */}
                <section className="mb-16 flex flex-col items-center text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black tracking-tighter uppercase md:text-5xl lg:text-6xl">
                        {renderTitle(displayTitle)}
                    </h1>
                    <div
                        className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: currentLocale === 'kh' ? privacies?.short_description_kh : privacies?.short_description,
                        }}
                    />
                </section>

                {/* Thematic Separator */}
                <div className="bg-border relative mx-auto h-px w-full max-w-md md:mb-12">
                    <div className="absolute top-1/2 left-1/2 h-1 w-12 -translate-x-1/2 -translate-y-1/2 bg-[#FF6D00]" />
                </div>

                {/* Main Content */}
                <section className="bg-card mb-16 p-0 pt-0 md:border md:p-12 md:pt-0 md:pb-4">
                    <div
                        className="text-muted-foreground prose prose-neutral dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-a:text-[#FF6D00] hover:prose-a:text-[#FF6D00]/80 max-w-none text-base leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: currentLocale === 'kh' ? privacies?.long_description_kh : privacies?.long_description,
                        }}
                    />
                </section>

                {/* Children Privacies Sub-sections */}
                {/* {privacies?.children?.length > 0 && (
                    <section className="space-y-6">
                        {privacies.children.map((privacy: any, index: number) => (
                            <div
                                key={index}
                                className="bg-card border-border flex flex-col border p-8 transition-colors duration-200 hover:border-[#FF6D00] lg:p-10"
                            >
                                <h2 className="text-foreground mb-4 text-xl font-black tracking-tight uppercase">
                                    {currentLocale === 'kh' ? privacy.title_kh : privacy.title}
                                </h2>
                                <div
                                    className="text-muted-foreground text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: currentLocale === 'kh' ? privacy.short_description_kh : privacy.short_description,
                                    }}
                                />
                            </div>
                        ))}
                    </section>
                )} */}
            </div>
        </FrontPageLayout>
    );
};

export default Privacy;
