import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { AlignLeft } from 'lucide-react';
import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const ProvinceFilter = () => {
    const { provinces } = usePage<any>().props;
    const initialQueryParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname;
    function handleSubmit(key: string, value?: string) {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            if (value) {
                queryParams.set(key, value);
            } else {
                queryParams.delete(key);
            }
            queryParams.set('page', '1');
            const queryParamsString = queryParams?.toString();
            router.get(currentPath + '?' + queryParamsString);
        } catch (error) {
            console.error('Form submission error', error);
        }
    }
    const [openProvince, setOpenProvince] = useState(false);
    const [valueProvince, setValueProvince] = useState(initialQueryParams?.get('province_code') || '');

    return (
        <>
            {provinces?.length > 0 && (
                <div>
                    <Popover open={openProvince} onOpenChange={setOpenProvince}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={openProvince} className="h-12 w-full justify-between">
                                {valueProvince
                                    ? (() => {
                                          const selectedProvince = provinces.find((province: any) => province.code === valueProvince);
                                          return selectedProvince ? (
                                              <div className="flex items-center gap-2">
                                                  {selectedProvince.image ? (
                                                      <span className="rounded bg-white p-0.5">
                                                          <img
                                                              src={`/assets/images/provinces/thumb/${selectedProvince.image}`}
                                                              alt={selectedProvince.name}
                                                              className="size-7 object-contain"
                                                          />
                                                      </span>
                                                  ) : (
                                                      <span className="size-0 object-contain" />
                                                  )}
                                                  {selectedProvince.name}
                                              </div>
                                          ) : (
                                              'Select province...'
                                          );
                                      })()
                                    : 'Select province...'}

                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-0">
                            <Command>
                                <CommandInput placeholder="Search province..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No body type found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandItem
                                            value=""
                                            onSelect={() => {
                                                handleSubmit('province_code', '');
                                                setOpenProvince(false);
                                            }}
                                        >
                                            <span className="rounded bg-white p-0.5">
                                                <AlignLeft size={30} className="stroke-true-primary !size-8 stroke-[1.5]" />
                                            </span>
                                            All Provinces
                                            <Check className={cn('ml-auto', valueProvince === '' ? 'opacity-100' : 'opacity-0')} />
                                        </CommandItem>
                                        {provinces?.map((province: any) => (
                                            <CommandItem
                                                key={province.code}
                                                value={province.code}
                                                onSelect={(currentValue) => {
                                                    setValueProvince(currentValue === valueProvince ? '' : currentValue);
                                                    handleSubmit('province_code', currentValue);
                                                    setOpenProvince(false);
                                                }}
                                            >
                                                <span className="rounded bg-white p-0.5">
                                                    {province?.image ? (
                                                        <img
                                                            className="size-8 object-contain"
                                                            src={`/assets/images/provinces/thumb/${province?.image}`}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <span className="size-8 object-contain" />
                                                    )}
                                                </span>
                                                <span className="flex flex-1 items-center justify-between">
                                                    {province?.name} <span className="text-xs">({province?.garages_count})</span>
                                                </span>
                                                <Check className={cn('ml-auto', valueProvince === province.code ? 'opacity-100' : 'opacity-0')} />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        </>
    );
};

export default ProvinceFilter;
