import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

interface ComboboxSelectProps {
    options: { value: string; label: string; image?: string | null }[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    disable?: boolean;
}

export function ComboboxSelect({
    options,
    value,
    onChange,
    placeholder = 'Select...',
    searchPlaceholder = 'Search...',
    className,
    disable = false,
}: ComboboxSelectProps) {
    const [open, setOpen] = React.useState(false);

    const selectedOption = options.find((opt) => opt.value === value);
    const selectedLabel = selectedOption?.label;
    const selectedImage = selectedOption?.image;

    const { t } = useTranslation();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disable}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('flex w-full max-w-full justify-between overflow-hidden rounded-none dark:border-white/20', className)}
                >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden text-start">
                        {selectedImage && <img src={selectedImage} alt={selectedLabel || 'icon'} className="h-5 w-5 object-contain" />}
                        <span className="truncate">{selectedLabel ? t(selectedLabel) : t(placeholder)}</span>
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="dark:border-foreground/50 w-full max-w-[350px] min-w-[250px] rounded-none border p-0">
                <Command>
                    <CommandInput placeholder={t(searchPlaceholder)} className="h-9 rounded-none" />
                    <CommandList>
                        <CommandEmpty>{t('No results found.')}</CommandEmpty>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    className="rounded-none font-mono"
                                    key={opt.value}
                                    value={opt.value + opt.label}
                                    onSelect={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        {opt.image && <img src={opt.image} alt={opt.label} className="h-5 w-5 object-contain" />}
                                        <span>{opt.label}</span>
                                    </div>
                                    <Check className={cn('ml-auto', value === opt.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
