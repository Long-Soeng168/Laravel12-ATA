import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import useTranslation from '@/hooks/use-translation';
import useRole from '@/hooks/use-role';
import {
    AppWindowIcon,
    BookmarkCheckIcon,
    CarIcon,
    CircleDollarSignIcon,
    FilePenLineIcon,
    GalleryThumbnailsIcon,
    InfoIcon,
    Layers2Icon,
    LayoutDashboardIcon,
    LinkIcon,
    ListTodoIcon,
    ListVideoIcon,
    MapPinIcon,
    PresentationIcon,
    ReplaceAllIcon,
    ShapesIcon,
    ShieldCheckIcon,
    StoreIcon,
    TagsIcon,
    Tally5Icon,
    TvMinimalPlayIcon,
    UserCogIcon,
    UsersIcon,
    WarehouseIcon,
    ChevronRight,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useTranslation();
    const hasRole = useRole();

    const mainNavItems = [
        {
            title: t('Items'),
            permission: 'item view',
            url: '/admin/items',
            icon: ListTodoIcon,
            description: t('Manage all inventory items'),
        },
        {
            title: t('Item Categories'),
            permission: 'item view',
            icon: Layers2Icon,
            url: '/admin/item-categories',
            description: t('Organize items by categories'),
        },
        {
            title: t('DTC'),
            permission: 'dtc view',
            url: '/admin/dtcs',
            icon: CarIcon,
            description: t('Diagnostic Trouble Codes'),
        },
        {
            title: t('Shops'),
            permission: 'shop view',
            url: '/admin/shops',
            icon: StoreIcon,
            description: t('Manage registered shops'),
        },
        {
            title: t('Garages'),
            permission: 'garage view',
            url: '/admin/garages',
            icon: WarehouseIcon,
            description: t('Manage garages and posts'),
        },
        {
            title: t('Videos'),
            permission: 'video view',
            url: '/admin/videos',
            icon: TvMinimalPlayIcon,
            description: t('Video content and playlists'),
        },
        {
            title: t('Pages'),
            permission: 'page view',
            url: '/admin/pages',
            icon: AppWindowIcon,
            description: t('Manage application pages'),
        },
        {
            title: t('Banners'),
            permission: 'banner view',
            url: '/admin/banners',
            icon: GalleryThumbnailsIcon,
            description: t('In-app promotional banners'),
        },
        {
            title: t('Website Banners'),
            permission: 'banner view',
            url: '/admin/website_banners',
            icon: GalleryThumbnailsIcon,
            description: t('Frontpage website banners'),
        },
        {
            title: t('Users'),
            permission: 'user view',
            url: '/admin/users',
            icon: UsersIcon,
            description: t('Manage users and permissions'),
        },
        {
            title: t('Courses'),
            permission: 'course view',
            url: '/admin/courses',
            icon: PresentationIcon,
            description: t('Training courses setup'),
        },
        {
            title: t('Links'),
            permission: 'link view',
            url: '/admin/links',
            icon: LinkIcon,
            description: t('External and internal links'),
        },
        {
            title: t('Application Info'),
            permission: 'application_info view',
            url: '/admin/application_info',
            icon: InfoIcon,
            description: t('App settings and information'),
        },
        {
            title: t('Provinces'),
            permission: 'garage view',
            url: '/admin/provinces',
            icon: MapPinIcon,
            description: t('Manage province locations'),
        },
    ];

    const allowedItems = mainNavItems.filter((item) => hasRole(item.permission));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{t('Welcome back!')}</h1>
                    <p className="text-muted-foreground mt-1">
                        {t('Here is an overview of your management modules.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {allowedItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.url}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold leading-none tracking-tight">{item.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
