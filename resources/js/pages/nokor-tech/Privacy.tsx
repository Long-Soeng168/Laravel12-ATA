import { Separator } from '@/components/ui/separator';
import useTranslation from '@/hooks/use-translation';
import { Head, usePage } from '@inertiajs/react';
import NokorTechLayout from './layouts/nokor-tech-layout';

const Privacy = () => {
    const { currentLocale } = useTranslation();
    const { privacies } = usePage().props;
    return (
        <NokorTechLayout>
            <Head>
                <title>Privacy Policy | Your Data Protection Commitment</title>
                <meta
                    name="description"
                    content="Understand how ATech Auto protects your personal data. We are committed to securing your information and never share or sell it to third parties. Your trust is our priority."
                />
            </Head>
            <div className="mx-auto max-w-4xl space-y-8 p-8">
                {/* Header */}
                <header className="space-y-2 text-center">
                    <h1 className="text-foreground text-4xl font-bold">{currentLocale == 'kh' ? privacies?.title_kh : privacies?.title}</h1>
                    <p
                        className="text-muted-foreground text-lg"
                        dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? privacies?.short_description_kh : privacies?.short_description }}
                    ></p>
                </header>

                <Separator className="my-6" />

                <div className='prose max-w-none'>
                    <p
                        className="text-muted-foreground text-lg"
                        dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? privacies?.long_description_kh : privacies?.long_description }}
                    ></p>
                </div>

                {/* {privacies.children.length && (
                    <main className="space-y-6">
                        {privacies.children?.map((privacy) => (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-foreground text-2xl font-semibold">
                                        {currentLocale == 'kh' ? privacy.title_kh : privacy.title}
                                    </h2>
                                </CardHeader>
                                <CardContent className="text-muted-foreground leading-relaxed">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: currentLocale == 'kh' ? privacy.short_description_kh : privacy.short_description,
                                        }}
                                    ></div>
                                </CardContent>
                            </Card>
                        ))}
                    </main>
                )} */}
            </div>
        </NokorTechLayout>
    );
};

export default Privacy;
