import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import {
    AppWindowIcon,
    FilePenLineIcon,
    GalleryThumbnailsIcon,
    Heading1Icon,
    LinkIcon,
    ListTodoIcon,
    ProjectorIcon,
    ShieldCheckIcon,
    UsersIcon,
    Waypoints,
    ArrowUpRight,
    Layers2Icon,
    CarIcon,
    StoreIcon,
    WarehouseIcon,
    TvMinimalPlayIcon,
    PresentationIcon,
    InfoIcon,
    MapPinIcon
} from 'lucide-react';

const SectionCards = () => {
    const hasPermission = usePermission();
    const { t, currentLocale } = useTranslation();
    const { featureDatas } = usePage().props;
    
    const features = [
        {
            icon: ListTodoIcon,
            title: t('Items'),
            total_records: `${featureDatas?.item_counts || 0}`,
            link: '/admin/items',
            permission: 'item view',
            color: 'from-blue-500/20 to-blue-600/5',
            iconColor: 'text-blue-500',
            borderColor: 'group-hover:border-blue-500/50',
            bgGlow: 'group-hover:bg-blue-500/10',
        },
        {
            icon: Layers2Icon,
            title: t('Item Categories'),
            total_records: `${featureDatas?.item_category_counts || 0}`,
            link: '/admin/item-categories',
            permission: 'item view',
            color: 'from-indigo-500/20 to-indigo-600/5',
            iconColor: 'text-indigo-500',
            borderColor: 'group-hover:border-indigo-500/50',
            bgGlow: 'group-hover:bg-indigo-500/10',
        },
        {
            icon: CarIcon,
            title: t('DTC'),
            total_records: `${featureDatas?.dtc_counts || 0}`,
            link: '/admin/dtcs',
            permission: 'dtc view',
            color: 'from-rose-500/20 to-rose-600/5',
            iconColor: 'text-rose-500',
            borderColor: 'group-hover:border-rose-500/50',
            bgGlow: 'group-hover:bg-rose-500/10',
        },
        {
            icon: StoreIcon,
            title: t('Shops'),
            total_records: `${featureDatas?.shop_counts || 0}`,
            link: '/admin/shops',
            permission: 'shop view',
            color: 'from-amber-500/20 to-amber-600/5',
            iconColor: 'text-amber-500',
            borderColor: 'group-hover:border-amber-500/50',
            bgGlow: 'group-hover:bg-amber-500/10',
        },
        {
            icon: WarehouseIcon,
            title: t('Garages'),
            total_records: `${featureDatas?.garage_counts || 0}`,
            link: '/admin/garages',
            permission: 'garage view',
            color: 'from-orange-500/20 to-orange-600/5',
            iconColor: 'text-orange-500',
            borderColor: 'group-hover:border-orange-500/50',
            bgGlow: 'group-hover:bg-orange-500/10',
        },
        {
            icon: TvMinimalPlayIcon,
            title: t('Videos'),
            total_records: `${featureDatas?.video_counts || 0}`,
            link: '/admin/videos',
            permission: 'video view',
            color: 'from-red-500/20 to-red-600/5',
            iconColor: 'text-red-500',
            borderColor: 'group-hover:border-red-500/50',
            bgGlow: 'group-hover:bg-red-500/10',
        },

        {
            icon: GalleryThumbnailsIcon,
            title: t('Banners'),
            total_records: `${featureDatas?.banner_counts || 0}`,
            link: '/admin/banners',
            permission: 'banner view',
            color: 'from-cyan-500/20 to-cyan-600/5',
            iconColor: 'text-cyan-500',
            borderColor: 'group-hover:border-cyan-500/50',
            bgGlow: 'group-hover:bg-cyan-500/10',
        },
        {
            icon: GalleryThumbnailsIcon,
            title: t('Website Banners'),
            total_records: `${featureDatas?.website_banner_counts || 0}`,
            link: '/admin/website_banners',
            permission: 'banner view',
            color: 'from-sky-500/20 to-sky-600/5',
            iconColor: 'text-sky-500',
            borderColor: 'group-hover:border-sky-500/50',
            bgGlow: 'group-hover:bg-sky-500/10',
        },
        {
            icon: UsersIcon,
            title: t('Users'),
            total_records: `${featureDatas?.user_counts || 0}`,
            link: '/admin/users',
            permission: 'user view',
            color: 'from-violet-500/20 to-violet-600/5',
            iconColor: 'text-violet-500',
            borderColor: 'group-hover:border-violet-500/50',
            bgGlow: 'group-hover:bg-violet-500/10',
        },
        {
            icon: PresentationIcon,
            title: t('Courses'),
            total_records: `${featureDatas?.course_counts || 0}`,
            link: '/admin/courses',
            permission: 'course view',
            color: 'from-yellow-500/20 to-yellow-600/5',
            iconColor: 'text-yellow-500',
            borderColor: 'group-hover:border-yellow-500/50',
            bgGlow: 'group-hover:bg-yellow-500/10',
        },
        {
            icon: LinkIcon,
            title: t('Links'),
            total_records: `${featureDatas?.link_counts || 0}`,
            link: '/admin/links',
            permission: 'link view',
            color: 'from-pink-500/20 to-pink-600/5',
            iconColor: 'text-pink-500',
            borderColor: 'group-hover:border-pink-500/50',
            bgGlow: 'group-hover:bg-pink-500/10',
        },

        {
            icon: MapPinIcon,
            title: t('Provinces'),
            total_records: `${featureDatas?.province_counts || 0}`,
            link: '/admin/provinces',
            permission: 'garage view',
            color: 'from-green-500/20 to-green-600/5',
            iconColor: 'text-green-500',
            borderColor: 'group-hover:border-green-500/50',
            bgGlow: 'group-hover:bg-green-500/10',
        },
        // Original ones that were not explicitly in the sidebar items requested but existed before:

        {
            icon: ProjectorIcon,
            title: t('Projects'),
            total_records: `${featureDatas?.project_counts || 0}`,
            link: '/admin/projects',
            permission: 'project view',
            color: 'from-amber-500/20 to-amber-600/5',
            iconColor: 'text-amber-500',
            borderColor: 'group-hover:border-amber-500/50',
            bgGlow: 'group-hover:bg-amber-500/10',
        },
        {
            icon: Heading1Icon,
            title: t('Headings'),
            total_records: `${featureDatas?.heading_counts || 0}`,
            link: '/admin/headings',
            permission: 'heading view',
            color: 'from-indigo-500/20 to-indigo-600/5',
            iconColor: 'text-indigo-500',
            borderColor: 'group-hover:border-indigo-500/50',
            bgGlow: 'group-hover:bg-indigo-500/10',
        },

    ];

    // Filter available features first to animate them properly
    const availableFeatures = features.filter(f => hasPermission(f.permission));

    return (
        <div className="grid max-w-full gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
            {availableFeatures.map((feature, index) => (
                <Link
                    prefetch
                    href={feature.link}
                    key={feature.title + feature.link}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 dark:border-white/10 bg-card dark:bg-card/40 backdrop-blur-md p-5 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-card/60 ${feature.borderColor} animate-in fade-in zoom-in-95 fill-mode-both`}
                >
                    {/* Background gradient blob that expands on hover */}
                    <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${feature.color} opacity-50 dark:opacity-30 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 dark:group-hover:opacity-80`} />
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 dark:bg-secondary/20 backdrop-blur-sm transition-colors duration-300 ${feature.bgGlow}`}>
                            <feature.icon className={`h-6 w-6 ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/30 dark:bg-secondary/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-secondary/80 dark:group-hover:bg-secondary/30">
                            <ArrowUpRight className={`h-4 w-4 ${feature.iconColor}`} />
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-6 flex flex-col">
                        <span className="text-3xl font-bold tracking-tight text-foreground transition-colors duration-300">
                            {feature.total_records}
                        </span>
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">
                                {t('Total')} {feature.title}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SectionCards;
