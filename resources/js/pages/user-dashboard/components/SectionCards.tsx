import useRole from '@/hooks/use-role';
import { Link, usePage } from '@inertiajs/react';
import { CarIcon, PackageIcon, StoreIcon, UserIcon } from 'lucide-react';

const SectionCards = () => {
    const { item_counts, garage_post_counts } = usePage().props;
    const features = [
        {
            icon: UserIcon,
            role: 'User',
            title: 'Profile Settings',
            link: '/settings/profile',
        },
        {
            icon: StoreIcon,
            role: 'Shop',
            title: 'Shop Settings',
            link: '/user-shops/update',
            stats: [
                { label: 'Items', value: item_counts, link: '/user-items' },
                // { label: 'Total Views', value: 421 },
            ],
        },
        {
            icon: CarIcon,
            role: 'Garage',
            title: 'Garage Settings',
            link: '/user-garages/update',
            stats: [
                { label: 'Posts', value: garage_post_counts, link: '/user-garage_posts' },
                // { label: 'Total Views', value: 421 },
            ],
        },
        {
            icon: PackageIcon,
            role: 'User',
            title: 'User Plans',
            link: '/user/plans',
        },
    ];

    const hasRole = useRole();

    return (
        <div>
            <div className="mx-auto grid max-w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {features.map((feature) =>
                    hasRole(feature.role) ? (
                        <Link
                            prefetch
                            href={feature.link}
                            key={feature.title}
                            className="border-primary/20 flex flex-row items-center justify-start gap-4 rounded-xl border px-5 py-6 transition-all duration-300 hover:-translate-1.5 hover:rounded hover:shadow-[5px_5px_rgba(104,_96,_255,_0.4),_10px_10px_rgba(104,_96,_255,_0.3),_15px_15px_rgba(104,_96,_255,_0.2),_20px_20px_rgba(104,_96,_255,_0.1),_25px_25px_rgba(104,_96,_255,_0.05)]"
                        >
                            <div className="bg-primary/10 flex aspect-square h-16 items-center justify-center rounded-full">
                                <feature.icon className="stroke-primary aspect-square size-7 object-contain" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-lg font-bold underline-offset-4 hover:underline">{feature.title}</span>

                                {/* Optional stats display */}
                                {feature.stats && (
                                    <div className="mt-1 space-y-1 text-sm text-gray-500">
                                        {feature.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                {stat.link ? (
                                                    <Link href={stat.link} className="text-primary hover:underline hover:underline-offset-4">
                                                        {stat.label}: {stat.value}
                                                    </Link>
                                                ) : (
                                                    <span>
                                                        {stat.label}: {stat.value}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ) : null,
                )}
            </div>
        </div>
    );
};

export default SectionCards;
