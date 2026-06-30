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
    ArrowUpRight
} from 'lucide-react';

const SectionCards = () => {
    const hasPermission = usePermission();
    const { t, currentLocale } = useTranslation();
    const { featureDatas } = usePage().props;
    
    // Define unique gradients and shadow colors for each card to make them vibrant
    const features = [
        {
            icon: ListTodoIcon,
            title: t('Items'),
            total_records: `${featureDatas?.item_counts}`,
            link: '/admin/items',
            permission: 'item view',
            color: 'from-blue-500/20 to-blue-600/5',
            iconColor: 'text-blue-500',
            borderColor: 'group-hover:border-blue-500/50',
            bgGlow: 'group-hover:bg-blue-500/10',
        },
        {
            icon: FilePenLineIcon,
            title: t('Posts'),
            total_records: `${featureDatas?.post_counts}`,
            link: '/admin/posts',
            permission: 'post view',
            color: 'from-purple-500/20 to-purple-600/5',
            iconColor: 'text-purple-500',
            borderColor: 'group-hover:border-purple-500/50',
            bgGlow: 'group-hover:bg-purple-500/10',
        },
        {
            icon: AppWindowIcon,
            title: t('Pages'),
            total_records: `${featureDatas?.page_counts}`,
            link: '/admin/pages',
            permission: 'page view',
            color: 'from-emerald-500/20 to-emerald-600/5',
            iconColor: 'text-emerald-500',
            borderColor: 'group-hover:border-emerald-500/50',
            bgGlow: 'group-hover:bg-emerald-500/10',
        },
        {
            icon: ProjectorIcon,
            title: t('Projects'),
            total_records: `${featureDatas?.project_counts}`,
            link: '/admin/projects',
            permission: 'project view',
            color: 'from-amber-500/20 to-amber-600/5',
            iconColor: 'text-amber-500',
            borderColor: 'group-hover:border-amber-500/50',
            bgGlow: 'group-hover:bg-amber-500/10',
        },
        {
            icon: LinkIcon,
            title: t('Links'),
            total_records: `${featureDatas?.link_counts}`,
            link: '/admin/links',
            permission: 'link view',
            color: 'from-pink-500/20 to-pink-600/5',
            iconColor: 'text-pink-500',
            borderColor: 'group-hover:border-pink-500/50',
            bgGlow: 'group-hover:bg-pink-500/10',
        },
        {
            icon: GalleryThumbnailsIcon,
            title: t('Banners'),
            total_records: `${featureDatas?.banner_counts}`,
            link: '/admin/banners',
            permission: 'banner view',
            color: 'from-cyan-500/20 to-cyan-600/5',
            iconColor: 'text-cyan-500',
            borderColor: 'group-hover:border-cyan-500/50',
            bgGlow: 'group-hover:bg-cyan-500/10',
        },
        {
            icon: Heading1Icon,
            title: t('Headings'),
            total_records: `${featureDatas?.heading_counts}`,
            link: '/admin/headings',
            permission: 'heading view',
            color: 'from-indigo-500/20 to-indigo-600/5',
            iconColor: 'text-indigo-500',
            borderColor: 'group-hover:border-indigo-500/50',
            bgGlow: 'group-hover:bg-indigo-500/10',
        },
        {
            icon: UsersIcon,
            title: t('Users'),
            total_records: `${featureDatas?.user_counts}`,
            link: '/admin/users',
            permission: 'user view',
            color: 'from-rose-500/20 to-rose-600/5',
            iconColor: 'text-rose-500',
            borderColor: 'group-hover:border-rose-500/50',
            bgGlow: 'group-hover:bg-rose-500/10',
        },
        {
            icon: Waypoints,
            title: t('Roles'),
            total_records: `${featureDatas?.role_counts}`,
            link: '/admin/roles',
            permission: 'role view',
            color: 'from-fuchsia-500/20 to-fuchsia-600/5',
            iconColor: 'text-fuchsia-500',
            borderColor: 'group-hover:border-fuchsia-500/50',
            bgGlow: 'group-hover:bg-fuchsia-500/10',
        },
        {
            icon: ShieldCheckIcon,
            title: t('Permissions'),
            total_records: `${featureDatas?.permission_counts}`,
            link: '/admin/permissions',
            permission: 'permission view',
            color: 'from-teal-500/20 to-teal-600/5',
            iconColor: 'text-teal-500',
            borderColor: 'group-hover:border-teal-500/50',
            bgGlow: 'group-hover:bg-teal-500/10',
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
