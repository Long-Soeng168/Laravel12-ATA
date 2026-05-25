import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const MyProductListHeader = ({ title, image, link = '#' }: { title: string; image?: string; link?: string }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-6 flex items-end justify-between border-b border-black/10 pb-4 dark:border-white/10 mx-2 sm:mx-0">
            <div className="flex items-center gap-3">
                {image && (
                    <span className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                        <img className="h-full w-full object-contain" src={image} alt="" />
                    </span>
                )}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                        {t(title)}
                    </h2>
                </div>
            </div>
            
            {link !== '#' && (
                <Link href={link} className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-900 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-white">
                    <span className="hidden sm:inline-block uppercase tracking-widest text-[11px]">{t('See More')}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                </Link>
            )}
        </div>
    );
};

export default MyProductListHeader;
