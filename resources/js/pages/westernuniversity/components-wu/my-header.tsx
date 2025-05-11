import { AlignRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MyNavbar } from './my-navbar';
import MyTopSection from './my-top-section';

const MyHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="flex max-w-screen-2xl mx-auto items-center justify-between px-4 sm:px-10 md:px-20 py-2">
                {/* Logo or Top Section */}
                <MyTopSection />

                {/* Desktop Navbar */}
                <div className="hidden xl:block">
                    <MyNavbar />
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="default"
                                type="button"
                                className="ml-4 inline-flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <AlignRight stroke="black" className="h-6 w-7" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-gradient-to-b from-blue-900 to-blue-600">
                            <h1 className="mt-5 text-center text-xl text-white">Menu</h1>
                            <div className="flex flex-col space-y-8 p-4">
                                <a href="/" className="text-sm font-medium text-white underline underline-offset-4">
                                    Home
                                </a>
                                <a href="#" className="text-sm font-medium text-white hover:underline">
                                    About
                                </a>
                                <a href="#" className="text-sm font-medium text-white hover:underline">
                                    Services
                                </a>
                                <a href="/blog" className="text-sm font-medium text-white hover:underline">
                                    Blogs
                                </a>
                                <a href="/contact" className="text-sm font-medium text-white hover:underline">
                                    Contact
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default MyHeader;
