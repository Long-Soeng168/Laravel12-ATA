import { Check } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function ResourceSortBySelect() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    // Define sorting options
    const sortOptions = [
        { value: 'latest', label: 'Latest Published' },
        { value: 'oldest', label: 'Oldest Published' },
        { value: 'title-asc', label: 'Title A → Z' },
        { value: 'title-desc', label: 'Title Z → A' },
        { value: 'most-read', label: 'Most Read' },
    ];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-11 rounded-md bg-muted text-foreground hover:bg-primary hover:text-white">
                    {sortOptions.find((o) => o.value === value)?.label || 'Sort By'}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {sortOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <Check className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
