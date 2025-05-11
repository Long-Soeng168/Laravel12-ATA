import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { AlignLeftIcon, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { HoveredLink, Menu, MenuItem } from '../ui/navbar-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { MySearchProducts } from '../my-search-products';

export function MyNavMenu({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <>
            <div className={cn('mx-auto w-full', className)}>
                <div className="bg-background flex h-full items-center justify-end ">
                    <div className="hidden xl:block">
                        <div className='flex items-center gap-2'>
                        <Menu setActive={setActive}>
                            <Link href={`/`} >
                                <p className='text-base px-6 py-0.5 font-noto-san-extra-light font-black cursor-pointer text-black hover:opacity-[0.9] dark:text-white flex gap-0.5 items-center hover:text-red-800'>Home</p>
                            </Link>
                            <Link href={`#`}>
                                <MenuItem setActive={setActive} active={active} item="About" >
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/history_and_values" to={'/history_and_values'}>History and Values</HoveredLink>
                                        <HoveredLink href="/school_facilities">School Facilities</HoveredLink>
                                        <HoveredLink href="/campuses">Campuses</HoveredLink>
                                    </div>
                                </MenuItem> 
                            </Link>
                            <Link href={`/#`}>
                                <MenuItem setActive={setActive} active={active} item="Academics">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/curriculum">Curriculum</HoveredLink>
                                        <HoveredLink href="/programs">Programs</HoveredLink>
                                        <HoveredLink href="/class_schedules_and_subjects">Class Schedules and Subjects </HoveredLink>
                                        <HoveredLink href="/school_calendar">School Calendar</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>

                            <Link href={`/Admissions`}>
                                <MenuItem setActive={setActive} active={active} item="Admissions">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/admissions">Admissions</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>

                            <Link href={`/#`}>
                                <MenuItem setActive={setActive} active={active} item="School Life">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/activities_and_events">Activities And Events</HoveredLink>
                                        <HoveredLink href="/extracurricular_activities">Extracurricular Activities</HoveredLink>
                                        <HoveredLink href="/outreach_programs">Outreach Programs</HoveredLink>
                                        <HoveredLink href="/student_council">Student Council</HoveredLink>
                                        <HoveredLink href="/news">News And Blogs</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>
                            <Link href={`/contact`} className='text-base px-6 py-0.5 font-noto-san-extra-light font-black cursor-pointer text-black hover:opacity-[0.9] dark:text-white flex gap-0.5 items-center hover:text-red-800'>
                                Contact
                            </Link>
                            
                        </Menu>
                        <div>
                         <Sheet>
                                <div className="flex items-center gap-2">
                                    <SheetTrigger asChild>
                                        <Button size="icon" variant="ghost" className="text-blue-950">
                                            <Search className="text-blue-950 size-6" />
                                        </Button>
                                    </SheetTrigger>
                                </div>
                                <SheetContent side="top" className="w-full p-6 shadow-md">
                                    <SheetHeader>
                                        <SheetTitle>Search</SheetTitle>
                                    </SheetHeader>
                                    <MySearchProducts className='max-w-full mx-auto border-primary' />
                                </SheetContent>
                            </Sheet>
                         </div>
                         </div>
                    </div>
                </div>
            </div>
        </>
    );
}
