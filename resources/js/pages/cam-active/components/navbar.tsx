import ToggleModeSwitch from '@/components/toggle-mode-switch';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn('mx-auto flex max-w-7xl items-center justify-between', className)}>
            <Link href={'/'} prefetch>
                <img src="/assets/cam-active/logo.png" className="h-20 p-2" />
                {/* <img src="/assets/icons/image-icon.png" className="h-20 p-2" /> */}
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className='md:hidden flex'>
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[350px] p-4 sm:w-[450px]">
                    <div className="mt-12 space-y-6 text-base">
                        <Link href="/" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Home
                        </Link>
                        <Link href="/solutions" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Solutions
                        </Link>
                        <Link href="/company" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Company
                        </Link>
                        <Link href="/blogs" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Blogs
                        </Link>
                        <Link href="/career" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Career
                        </Link>
                        <Link href="/contact" className="text-primary hover:text-foreground block text-lg font-semibold">
                            Contact Us
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="hidden items-center justify-end gap-2 md:flex">
                <Menu setActive={setActive}>
                    <Link href={'/'} prefetch>
                        Home
                    </Link>
                    <Link href={'/solutions'} prefetch>
                        <MenuItem setActive={setActive} active={active} item="Solutions">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/solutions" prefetch>
                                    Our Services
                                </HoveredLink>
                                <HoveredLink href="/solutions" prefetch>
                                    Our Resources
                                </HoveredLink>
                                <HoveredLink href="/solutions" prefetch>
                                    Catalog Functionality
                                </HoveredLink>
                                <HoveredLink href="/solutions" prefetch>
                                    Our Integrated Solutions
                                </HoveredLink>
                                <HoveredLink href="/solutions" prefetch>
                                    Technology-Based Solutions
                                </HoveredLink>
                                <HoveredLink href="/solutions" prefetch>
                                    Why Choose Us
                                </HoveredLink>
                            </div>
                        </MenuItem>
                    </Link>

                    <Link href={'/company'} prefetch>
                        <MenuItem setActive={setActive} active={active} item="Company">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/company" prefetch>
                                    Who We Are
                                </HoveredLink>
                                <HoveredLink href="/company" prefetch>
                                    Who We Serve
                                </HoveredLink>
                                <HoveredLink href="/company" prefetch>
                                    Our Global Reach
                                </HoveredLink>
                                <HoveredLink href="/company" prefetch>
                                    Our Partners
                                </HoveredLink>
                                <HoveredLink href="/company" prefetch>
                                    Our Commitment
                                </HoveredLink>
                            </div>
                        </MenuItem>
                    </Link>

                    <Link href={'/blogs'} prefetch>
                        Blogs
                    </Link>
                    <Link href={'/career'} prefetch>
                        Career
                    </Link>
                    <Link href={'/contact'} prefetch>
                        Contact Us
                    </Link>
                </Menu>
                <ToggleModeSwitch />
            </div>
        </div>
    );
}
