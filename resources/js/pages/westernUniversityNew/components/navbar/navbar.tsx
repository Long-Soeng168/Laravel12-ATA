import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { MySearchProducts } from '../my-search-products';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Logo } from './logo';
import { MyNavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';

const NavbarPage = () => {
    return (
        <div>
            <nav className="bg-background h-28 border-b">
                <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6 xl:px-16">
                    <Logo />
                    {/* Desktop Menu */}
                    <MyNavMenu className="hidden md:block" />
                    {/* Mobile Menu */}
                    <div className="xl:hidden flex items-center gap-4">
                        <div>
                            <Sheet>
                                <div className="flex items-center gap-2">
                                    <SheetTrigger asChild>
                                        <Button className=" border border-blue-900" variant="outline" size="icon">
                                            <Search className="size-6 text-blue-950" />
                                        </Button>
                                    </SheetTrigger>
                                </div>
                                <SheetContent side="top" className="w-full p-6 shadow-md">
                                    <SheetHeader>
                                        <SheetTitle>Search</SheetTitle>
                                    </SheetHeader>
                                    <MySearchProducts className="border-primary mx-auto max-w-full" />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div> <NavigationSheet /></div>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarPage;
