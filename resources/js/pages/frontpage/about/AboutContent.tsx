import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    CodeXml,
    FileText,
    GraduationCap,
    MapPin,
    Phone,
    PlayCircle,
    SendIcon,
    ShoppingCart,
    Smartphone,
    type LucideIcon,
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) => (
    <div className="bg-card border-border flex flex-col items-center gap-4 border p-8 text-center transition-colors duration-200 hover:border-[#FF6D00]">
        <div className="flex h-16 w-16 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
            <Icon className="h-8 w-8" strokeWidth={2} />
        </div>
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
);

export default function AboutContent() {
    const { t, currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    return (
        <>
            <div className="section-container mt-8 pb-12">
                {/* Hero Section */}
                <section className="mb-20 flex flex-col items-center text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black md:text-5xl lg:text-6xl">
                        {isKh ? 'អំពី' : 'About'} <span className="text-[#FF6D00]">{isKh ? 'អេ ធិច អូតូ' : 'A-Tech Auto'}</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-[650px] text-lg">
                        {t(
                            'A-Tech Auto is the all-in-one automotive platform. Buy & sell cars or spare-parts, locate garages & EV stations, find DTC errors, access repair documents, and learn through our video tutorials and in-person courses.',
                        )}
                    </p>
                </section>

                {/* Core Pillars */}
                <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={ShoppingCart}
                        title={isKh ? 'ទីផ្សារ និងហាង' : 'Marketplace & Shops'}
                        desc={
                            isKh
                                ? 'ទិញនិងលក់រថយន្ត ឬគ្រឿងបន្លាស់ ហើយស្វែងរកបញ្ជីឈ្មោះដ៏ទូលំទូលាយរបស់យើង ដើម្បីស្វែងរកហាងលក់គ្រឿងបន្លាស់ក្នុងស្រុកដែលគួរឱ្យទុកចិត្ត។'
                                : 'Buy and sell cars or spare parts, and browse our comprehensive directory to find trusted local automotive shops.'
                        }
                    />
                    <FeatureCard
                        icon={MapPin}
                        title={isKh ? 'ផែនទីរួមបញ្ចូលផ្ទាល់' : 'Live Integrated Maps'}
                        desc={
                            isKh
                                ? 'ប្រើប្រាស់ការរួមបញ្ចូល Google Maps របស់យើង ដើម្បីស្វែងរកទីតាំងយានដ្ឋានដែលបានបញ្ជាក់ និងស្ថានីយ៍សាកថ្ម EV ដែលនៅជិតអ្នកបានភ្លាមៗ។'
                                : 'Utilize our Google Maps integration to instantly locate auto garages and nearby EV charging stations.'
                        }
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title={isKh ? 'ការអប់រំ និងការបណ្តុះបណ្តាល' : 'Education & Training'}
                        desc={
                            isKh
                                ? 'ចូលមើលបណ្ណាល័យឯកសារ PDF ដ៏សំបូរបែប ក្លាយជាជាងជំនាញតាមរយៈការបង្រៀនជាវីដេអូ ឬចុះឈ្មោះចូលរៀនថ្នាក់ផ្ទាល់ដោយវិជ្ជាជីវៈ។'
                                : 'Access extensive PDF libraries, master mechanics via video tutorials, or enroll in professional in-person classes.'
                        }
                    />
                </section>

                {/* What We Offer */}
                <section className="bg-card border-border mb-20 border p-8 md:p-12">
                    <h2 className="text-foreground mb-12 text-center text-2xl font-semibold">{isKh ? 'អ្វីដែលយើងផ្តល់ជូន' : 'What We Offer'}</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: ShoppingCart,
                                title: 'Parts Marketplace',
                                title_kh: 'ទីផ្សារគ្រឿងបន្លាស់',
                                desc: 'Buy spare parts or list your own products for sale.',
                                desc_kh: 'ទិញគ្រឿងបន្លាស់ ឬដាក់លក់ផលិតផលរបស់អ្នក។',
                            },
                            {
                                icon: MapPin,
                                title: 'Garage & EV Maps',
                                title_kh: 'ផែនទីយានដ្ឋាន & EV',
                                desc: 'Locate nearby auto garages and EV stations on a live map.',
                                desc_kh: 'ស្វែងរកទីតាំងយានដ្ឋាន និងស្ថានីយ៍ EV ដែលនៅជិតនៅលើផែនទីផ្ទាល់។',
                            },
                            {
                                icon: CodeXml,
                                title: 'DTC Decoder',
                                title_kh: 'បកប្រែកូដបញ្ហា (DTC)',
                                desc: 'Search codes to instantly read and understand vehicle errors.',
                                desc_kh: 'ស្វែងរកលេខកូដដើម្បីអាន និងយល់ពីបញ្ហារថយន្តភ្លាមៗ។',
                            },
                            {
                                icon: FileText,
                                title: 'Documents Library',
                                title_kh: 'បណ្ណាល័យឯកសារ',
                                desc: 'Access wiring diagrams, repair manuals, and Khmer specs.',
                                desc_kh: 'ចូលមើលគំនូសតាងប្រព័ន្ធភ្លើង សៀវភៅណែនាំជួសជុល និងលក្ខណៈបច្ចេកទេសជាភាសាខ្មែរ។',
                            },
                            {
                                icon: PlayCircle,
                                title: 'Video Training',
                                title_kh: 'វីដេអូបណ្តុះបណ្តាល',
                                desc: 'Master car maintenance through our online video tutorials.',
                                desc_kh: 'សិក្សាពីការថែទាំរថយន្តតាមរយៈវីដេអូបង្រៀនអនឡាញរបស់យើង។',
                            },
                            {
                                icon: GraduationCap,
                                title: 'In-Person Courses',
                                title_kh: 'វគ្គសិក្សាផ្ទាល់',
                                desc: 'Discover schedules and enroll in offline, hands-on classes.',
                                desc_kh: 'ស្វែងរកកាលវិភាគ និងចុះឈ្មោះក្នុងថ្នាក់រៀនអនុវត្តផ្ទាល់។',
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <item.icon className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-foreground text-base font-semibold">{isKh ? item.title_kh : item.title}</h4>
                                    <p className="text-muted-foreground mt-1 text-sm">{isKh ? item.desc_kh : item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Target Audience */}
                <section className="mb-20">
                    <h2 className="text-foreground mb-10 text-center text-2xl font-semibold">
                        {isKh ? 'បង្កើតឡើងសម្រាប់មនុស្សគ្រប់គ្នា' : 'Built for Everyone'}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: 'Car Owners',
                                title_kh: 'ម្ចាស់រថយន្ត',
                                desc: 'Find nearby garages, EV stations, and buy necessary parts.',
                                desc_kh: 'ស្វែងរកយានដ្ឋាន ស្ថានីយ៍ EV នៅជិតអ្នក និងទិញគ្រឿងបន្លាស់ចាំបាច់។',
                            },
                            {
                                title: 'Mechanics',
                                title_kh: 'ជាងជួសជុល',
                                desc: 'Decode DTC errors instantly and access ECU pinout documents.',
                                desc_kh: 'បកប្រែកូដបញ្ហា DTC ភ្លាមៗ និងចូលមើលឯកសារតំណភ្ជាប់ ECU។',
                            },
                            {
                                title: 'Garage Owners',
                                title_kh: 'ម្ចាស់យានដ្ឋាន',
                                desc: 'List your shop in our directory and sell parts on the marketplace.',
                                desc_kh: 'ដាក់បញ្ចូលហាងរបស់អ្នកនៅក្នុងបញ្ជីរបស់យើង និងលក់គ្រឿងបន្លាស់នៅលើទីផ្សារ។',
                            },
                            {
                                title: 'Enthusiasts',
                                title_kh: 'អ្នកចូលចិត្តយានយន្ត',
                                desc: 'Learn through our video training and hands-on professional courses.',
                                desc_kh: 'រៀនតាមរយៈវីដេអូបណ្តុះបណ្តាល និងវគ្គសិក្សាអនុវត្តផ្ទាល់ប្រកបដោយវិជ្ជាជីវៈរបស់យើង។',
                            },
                        ].map((item, i) => (
                            <div key={i} className="border-border bg-background hover:bg-card border p-6 text-center transition-colors">
                                <h4 className="text-foreground mb-2 font-semibold">{isKh ? item.title_kh : item.title}</h4>
                                <p className="text-muted-foreground text-sm">{isKh ? item.desc_kh : item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Privacy & Contact */}
                <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                    <div className="bg-card border-border flex h-full flex-col border p-8 lg:p-10">
                        <h2 className="text-foreground mb-6 text-xl font-semibold">{isKh ? 'គោលការណ៍ឯកជនភាព' : 'Privacy Policy'}</h2>
                        <p className="text-muted-foreground mb-6 text-sm">
                            {isKh
                                ? 'យើងគោរពឯកជនភាពរបស់អ្នក ហើយប្តេជ្ញាការពារទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក។ យើងមិនចែករំលែក ឬលក់ទិន្នន័យរបស់អ្នកទៅភាគីទីបីឡើយ។ ទំនុកចិត្តរបស់អ្នកគឺជារឿងសំខាន់សម្រាប់យើង ហើយយើងយកចិត្តទុកដាក់ខ្ពស់លើសុវត្ថិភាព។'
                                : 'We respect your privacy and are committed to protecting your personal data. We do not share or sell your data to third parties. Your trust is important to us, and we take security seriously.'}
                        </p>
                        <Link
                            prefetch
                            href="/privacy"
                            className="mt-auto inline-flex w-fit items-center text-sm font-semibold text-[#FF6D00] transition-transform active:scale-[0.97]"
                        >
                            {isKh ? 'ស្វែងយល់បន្ថែមពីឯកជនភាព' : 'More About Privacy'} <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                        </Link>
                    </div>
                    <div className="bg-card border-border flex h-full flex-col border p-8 lg:p-10">
                        <h2 className="text-foreground mb-6 text-xl font-semibold">{isKh ? 'ទំនាក់ទំនងយើង' : 'Get in Touch'}</h2>
                        <div className="text-muted-foreground mb-6 flex-1 space-y-5 text-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10">
                                    <Phone className="h-4 w-4 text-[#FF6D00]" />
                                </div>
                                <span className="font-normal">085 839 881</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10">
                                    <SendIcon className="h-4 w-4 text-[#FF6D00]" />
                                </div>
                                <a
                                    href="https://t.me/atechauto085"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-normal transition-colors hover:text-[#FF6D00]"
                                >
                                    Telegram: @atechauto085
                                </a>
                            </div>
                        </div>
                        <Link
                            prefetch
                            href="/contact"
                            className="mt-auto inline-flex w-fit items-center text-sm font-semibold text-[#FF6D00] transition-transform active:scale-[0.97]"
                        >
                            {isKh ? 'ទំនាក់ទំនងផ្សេងទៀត' : 'Other Contacts'} <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                        </Link>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="flex flex-col items-center justify-between gap-8 border border-[#FF6D00] bg-[#FF6D00] p-8 md:flex-row md:p-12 lg:p-16">
                    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                        <h2 className="mb-3 text-3xl font-semibold text-white lg:text-4xl">
                            {isKh ? 'តើអ្នកត្រៀមខ្លួនរួចរាល់ហើយឬនៅ?' : 'Are you ready?'}
                        </h2>
                        <p className="max-w-md text-base font-normal text-white/90 md:text-lg">
                            {isKh
                                ? 'ទទួលបានមជ្ឈមណ្ឌលយានយន្តដ៏ពេញលេញនៅក្នុងហោប៉ៅរបស់អ្នក។ ការបកប្រែកូដបញ្ហា DTC ផែនទីផ្ទាល់ និងទីផ្សារគ្រឿងបន្លាស់ រួមបញ្ចូលគ្នាក្នុងកម្មវិធីតែមួយ។'
                                : 'Get the ultimate automotive hub in your pocket. DTC decoding, live maps, and parts marketplace—all in one app.'}
                        </p>
                    </div>
                    <div className="flex shrink-0">
                        <a
                            href="/download-app"
                            className="inline-flex h-[60px] items-center justify-center gap-3 border border-black bg-black px-8 text-[15px] font-semibold text-white transition-all duration-150 ease-out hover:border-neutral-800 hover:bg-neutral-800 active:scale-[0.97]"
                        >
                            <Smartphone className="size-6 text-[#FF6D00]" />
                            <span>{isKh ? 'ទាញយកកម្មវិធី' : 'Get The App'}</span>
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}
