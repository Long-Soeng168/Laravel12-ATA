import useTranslation from '@/hooks/use-translation';
import { BatteryCharging, CarFront, CodeXmlIcon, FileText, GraduationCap, MapPin, PlayCircle, ShoppingCart, Store } from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

export default function DownloadAppPage() {
    const { t, currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    // Enhanced UX states: Active scale for click and refined border for hover
    const storeBadgeStyle =
        'flex h-[52px] w-full items-center justify-center gap-2 bg-black px-2 sm:px-4 text-white transition-all duration-150 ease-out border border-black hover:bg-neutral-800 hover:border-neutral-700 active:scale-[0.97] active:bg-black rounded-none cursor-pointer';

    return (
        <FrontPageLayout>
            <div className="section-container mt-0 pb-12">
                {/* Hero Section - Stacks flush on mobile/tablet, boxes out on desktop (lg) */}
                <section className="lg:bg-card mb-12 flex flex-col lg:flex-row lg:border lg:border-t-0">
                    {/* Left Column: Copy & Actions */}
                    <div className="flex flex-1 flex-col justify-center py-6 md:py-10 lg:border-r lg:p-10 xl:p-12">
                        <h1 className="text-foreground text-4xl font-bold md:text-5xl xl:text-6xl">
                            {isKh ? 'អេ ធិច អូតូ' : 'A-Tech Auto'} <br />{' '}
                            <span className="text-[#FF6D00]">{isKh ? 'នៅក្នុងដៃអ្នក' : 'In Your Pocket'}</span>
                        </h1>

                        <p className="text-muted-foreground mt-4 max-w-lg text-lg">
                            {t(
                                'A-Tech Auto is the all-in-one automotive platform. Buy & sell cars or spare-parts, locate garages & EV stations, find DTC errors, access repair documents, and learn through our video tutorials and in-person courses.',
                            )}
                        </p>
                    </div>

                    {/* Right Column: Download & QR Grid */}
                    <div className="lg:bg-background flex w-full flex-col items-center justify-center py-0 pb-10 lg:w-[480px] lg:p-6 xl:w-[560px]">
                        <h2 className="text-foreground text-2xl font-bold">{isKh ? 'ទាញយកកម្មវិធី' : 'Get The App'}</h2>

                        <div className="my-4 flex w-full items-center gap-4">
                            <div className="h-[1px] flex-1 bg-[#FF6D00]/40"></div>
                            <span className="text-muted-foreground text-sm font-medium">{isKh ? 'ចុច ឬ ស្កេន' : 'Click or Scan'}</span>
                            <div className="h-[1px] flex-1 bg-[#FF6D00]/40"></div>
                        </div>

                        {/* 2-Column Strict Grid */}
                        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
                            {/* iOS Column */}
                            <div className="flex flex-col items-center gap-4 leading-[1]">
                                <a
                                    href="https://apps.apple.com/us/app/atech-auto/id6744029644"
                                    className={`transition-all duration-300 focus:scale-95 ${storeBadgeStyle}`}
                                >
                                    <img src="/assets/icons/app-store.png" className="h-7 w-7 object-contain" alt="App Store" />
                                    <div className="flex flex-col items-start">
                                        <span className="mb-1 text-[9px] font-normal opacity-90 sm:text-[10px]">Download on the</span>
                                        <span className="text-[14px] font-medium sm:text-[16px]">App Store</span>
                                    </div>
                                </a>
                                <a
                                    href="https://apps.apple.com/us/app/atech-auto/id6744029644"
                                    className={`transition-all duration-300 focus:scale-95`}
                                >
                                    <div className="bg-card flex aspect-square w-full items-center justify-center border p-3 transition-colors duration-200 hover:border-[#FF6D00] sm:p-4">
                                        <img
                                            src="/assets/images/qr/app-store.png"
                                            className="h-full w-full bg-white object-contain"
                                            alt="App Store QR"
                                        />
                                    </div>
                                </a>

                                <span className="text-muted-foreground text-sm font-medium">{isKh ? 'សម្រាប់ iOS' : 'For iOS'}</span>
                            </div>

                            {/* Android Column */}
                            <div className="flex flex-col items-center gap-4 leading-[1]">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ata.ata_new_app"
                                    className={`transition-all duration-300 focus:scale-95 ${storeBadgeStyle}`}
                                >
                                    <img src="/assets/icons/play-store.png" className="h-7 w-7 object-contain" alt="Google Play" />
                                    <div className="flex flex-col items-start">
                                        <span className="mb-1 text-[9px] font-normal opacity-90 sm:text-[10px]">GET IT ON</span>
                                        <span className="text-[14px] font-medium sm:text-[16px]">Google Play</span>
                                    </div>
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ata.ata_new_app"
                                    className={`transition-all duration-300 focus:scale-95`}
                                >
                                    <div className="bg-card flex aspect-square w-full items-center justify-center border p-3 transition-colors duration-200 hover:border-[#FF6D00] sm:p-4">
                                        <img
                                            src="/assets/images/qr/play-store.png"
                                            className="h-full w-full bg-white object-contain"
                                            alt="Play Store QR"
                                        />
                                    </div>
                                </a>
                                <span className="text-muted-foreground text-sm font-medium">{isKh ? 'សម្រាប់ Android' : 'For Android'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Expanded to 3x3 for the full ecosystem */}
                <section className="mb-12">
                    <h2 className="text-foreground mb-8 text-center text-2xl font-bold">
                        {isKh ? 'ហេតុអ្វីត្រូវប្រើកម្មវិធីរបស់យើង?' : 'Why use our app?'}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: ShoppingCart,
                                title: 'Parts Marketplace',
                                title_kh: 'ទីផ្សារគ្រឿងបន្លាស់',
                                desc: 'Buy cars and spare parts, or register to list your own automotive products for sale.',
                                desc_kh: 'ទិញរថយន្ត និងគ្រឿងបន្លាស់ ឬចុះឈ្មោះដើម្បីដាក់លក់ផលិតផលយានយន្តរបស់អ្នក។',
                            },
                            {
                                icon: Store,
                                title: 'Shops Directory',
                                title_kh: 'បញ្ជីឈ្មោះហាង',
                                desc: 'Browse our comprehensive directory to find trusted automotive shops and local experts.',
                                desc_kh: 'ស្វែងរកបញ្ជីឈ្មោះដ៏ទូលំទូលាយរបស់យើង ដើម្បីស្វែងរកហាងយានយន្ត និងអ្នកជំនាញក្នុងស្រុកដែលគួរឱ្យទុកចិត្ត។',
                            },
                            {
                                icon: PlayCircle,
                                title: 'Video Training',
                                title_kh: 'វីដេអូបណ្តុះបណ្តាល',
                                desc: 'Master mechanics and car maintenance through our comprehensive online video tutorials.',
                                desc_kh: 'ក្លាយជាជាងជំនាញ និងចេះថែទាំរថយន្តតាមរយៈវីដេអូបង្រៀនអនឡាញរបស់យើង។',
                            },
                            {
                                icon: MapPin,
                                title: 'Garage Maps',
                                title_kh: 'ផែនទីយានដ្ឋាន',
                                desc: 'Google Maps integration helps you instantly locate verified auto garages near your current location.',
                                desc_kh: 'ការរួមបញ្ចូល Google Maps ជួយអ្នកស្វែងរកទីតាំងយានដ្ឋានដែលបានបញ្ជាក់នៅជិតអ្នកបានភ្លាមៗ។',
                            },
                            {
                                icon: BatteryCharging,
                                title: 'EV Station Map',
                                title_kh: 'ផែនទីស្ថានីយ៍ EV',
                                desc: 'Find nearby Electric Vehicle (EV) charging stations directly on our integrated live map.',
                                desc_kh: 'ស្វែងរកស្ថានីយ៍សាករថយន្តអគ្គិសនី (EV) ដែលនៅជិតដោយផ្ទាល់នៅលើផែនទីផ្ទាល់របស់យើង។',
                            },
                            {
                                icon: FileText,
                                title: 'Documents Library',
                                title_kh: 'បណ្ណាល័យឯកសារ',
                                desc: 'Access extensive PDFs including wiring diagrams, repair manuals, ECU pinouts, and Khmer specs.',
                                desc_kh:
                                    'ចូលមើលឯកសារ PDF ជាច្រើនរួមមាន គំនូសតាងប្រព័ន្ធភ្លើង សៀវភៅជួសជុល តំណភ្ជាប់ ECU និងលក្ខណៈបច្ចេកទេសជាភាសាខ្មែរ។',
                            },
                            {
                                icon: GraduationCap,
                                title: 'In-Person Courses',
                                title_kh: 'វគ្គសិក្សាផ្ទាល់',
                                desc: 'Discover schedules and enroll in offline, hands-on professional automotive classes.',
                                desc_kh: 'ស្វែងរកកាលវិភាគ និងចុះឈ្មោះក្នុងថ្នាក់រៀនអនុវត្តយានយន្តផ្ទាល់។',
                            },
                            {
                                icon: CodeXmlIcon,
                                title: 'DTC Decoder',
                                title_kh: 'បកប្រែកូដបញ្ហា (DTC)',
                                desc: 'Search Diagnostic Trouble Codes (DTC) to instantly read and understand vehicle errors.',
                                desc_kh: 'ស្វែងរកកូដបញ្ហា (DTC) ដើម្បីអាន និងយល់ពីបញ្ហារថយន្តភ្លាមៗ។',
                            },
                            {
                                icon: CarFront,
                                title: 'The Ultimate Hub',
                                title_kh: 'មជ្ឈមណ្ឌលដ៏ពេញលេញ',
                                desc: 'An all-in-one platform built entirely to cover every aspect of the automotive industry.',
                                desc_kh: 'កម្មវិធីដ៏ពេញលេញមួយដែលត្រូវបានបង្កើតឡើងសម្រាប់គ្រប់ផ្នែកទាំងអស់នៃវិស័យយានយន្ត។',
                            },
                        ].map((feat, i) => (
                            <div key={i} className="bg-card flex flex-col items-center border p-6 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <feat.icon className="h-6 w-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-foreground mb-2 text-lg font-semibold">{isKh ? feat.title_kh : feat.title}</h3>
                                <p className="text-muted-foreground text-sm">{isKh ? feat.desc_kh : feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </FrontPageLayout>
    );
}
