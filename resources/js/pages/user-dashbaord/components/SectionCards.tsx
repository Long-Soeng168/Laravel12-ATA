import { Link } from '@inertiajs/react';
import { CarIcon, PackageIcon, StoreIcon, UserIcon } from 'lucide-react';

const SectionCards = () => {
    const features = [
        {
            icon: UserIcon,
            title: 'Profile Settings',
            link: '/settings/profile',
        },
        {
            icon: StoreIcon,
            title: 'Shop Settings',
            link: '/shop/settings',
        },
        {
            icon: CarIcon,
            title: 'Garage Settings',
            link: '/garage/settings',
        },
        {
            icon: PackageIcon,
            title: 'User Plans',
            link: '/user/plans',
        },
    ];

    return (
        <div>
            <div className="mx-auto grid max-w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {features.map((feature) => (
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
                            <span className="text-lg font-bold">{feature.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SectionCards;
