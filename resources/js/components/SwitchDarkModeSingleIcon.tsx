import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

type Props = {
    className?: string;
};

export const SwitchDarkModeSingleIcon = ({ className }: Props) => {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';

    const toggleTheme = () => {
        updateAppearance(isDark ? 'light' : 'dark');
    };

    return (
        <button onClick={toggleTheme} className="hover:text-foreground flex cursor-pointer items-center justify-center p-2 transition-colors">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
    );
};
