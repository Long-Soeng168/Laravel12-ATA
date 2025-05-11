import { Link } from '@inertiajs/react';
import { AlignRight } from 'lucide-react';
import { Button } from '../components-wu/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components-wu/ui/sheet';
import { MyNavbar } from './my-navbar';

const MyTopMenu = () => {
    return (
        <header className="flex flex-wrap items-center px-4 py-6 lg:px-16">
            <div className="flex flex-1 items-center text-white">
                <Link href="/" className="flex items-center gap-2 md:gap-4">
                    <img src="/assets/demo-images/Homepage/01_Logo_WIS.png" className="w-15 md:w-20" />
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-moul-regular text-base md:text-2xl">សាលាវេស្ទើនអន្តរជាតិ</p>
                        <p className="font-now-alt-bold text-[5px] tracking-[2px] md:mt-1 md:text-[10px]">WESTERN INTERNATIONAL SCHOOL</p>
                    </div>
                </Link>
            </div>
            <div className="pointer-cursor block xl:hidden">
                <Sheet>
                    <SheetTrigger asChild className="ml-4 flex items-center xl:hidden">
                        <Button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-blue-900 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none focus:ring-inset"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <AlignRight stroke="white" className="h-7 w-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-blue-900">
                        <h1 className="mt-5 text-center text-xl text-white">Menu</h1>
                        <MyNavbar />
                    </SheetContent>
                </Sheet>
            </div>
            {/* <input className="hidden" type="checkbox" id="menu-toggle" /> */}

            <div className="hidden w-full xl:flex xl:w-auto xl:items-center" id="menu">
                <MyNavbar />
            </div>
        </header>
    );
};

export default MyTopMenu;
