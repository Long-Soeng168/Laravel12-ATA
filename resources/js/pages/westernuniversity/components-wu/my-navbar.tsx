import { cn } from '@/lib/utils';
import { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';
import { Link } from '@inertiajs/react';

export function MyNavbar() {
    return (
        <>
            <div className="relative flex px-4  w-full items-center xl:justify-center">
                <Navbar className="top-0" />
            </div>
        </>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <>
            <div className={cn('', className)}>
                <div >
                    <Menu setActive={setActive} >
                        <MenuItem setActive={setActive} active={active} item="About">
                            <div className="flex flex-col space-y-6 text-sm">
                                <HoveredLink href="/hestory_and_values">History and Values</HoveredLink>
                                <HoveredLink href="/school_facilities">School Facilities</HoveredLink>
                                <HoveredLink href="/campuses">Campuses</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Academic">
                            <div className="flex flex-col space-y-6 text-sm">
                                <HoveredLink href="/curriculum">Curriculum</HoveredLink>
                                <HoveredLink href="/programs">Programs</HoveredLink>
                                <HoveredLink href="/schedules_and_subjects">Class Schedules and Subjects </HoveredLink>
                                <HoveredLink href="/branding">School Calendar</HoveredLink>
                            </div>
                        </MenuItem>
                        <Link href="/admissions"><MenuItem setActive={setActive} active={null} item="Admissions"></MenuItem></Link>
                        <MenuItem setActive={setActive} active={active} item="School Life">
                            <div className="flex flex-col space-y-6 text-sm">
                                <HoveredLink href="/activities_and_events">Activities & Events</HoveredLink>
                                <HoveredLink href="/extracurricular_activities">Extracurricular Activities</HoveredLink>
                                <HoveredLink href="/outreach_programs">Outreach Programs</HoveredLink>
                                <HoveredLink href="/student_council">Student Council</HoveredLink>
                                <HoveredLink href="/news_and_blogs">News & Blogs</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Contact Us">
                            <div className="flex flex-col space-y-6 text-sm">
                                <HoveredLink href="/contact">Contact Us</HoveredLink>
                                <HoveredLink href="/careers">Careers</HoveredLink>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    );
}