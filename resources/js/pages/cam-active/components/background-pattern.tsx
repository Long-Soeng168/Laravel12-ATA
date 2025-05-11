import DotPattern from '@/components/ui/dot-pattern';
import Particles from '@/components/ui/particles';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export const BackgroundPattern = () => {
    const { appearance, updateAppearance } = useAppearance();

    const isDark = appearance === 'dark';

    return (
        <>
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn('[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]', 'dark:fill-slate-700')}
            />
            <Particles className="absolute inset-0" quantity={100} ease={80} color={'#6860ff'} refresh />
        </>
    );
};
