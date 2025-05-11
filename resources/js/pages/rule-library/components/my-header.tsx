import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlignRight, Moon, Sun, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navbar } from './navbar';

export default () => {
    const [state, setState] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Run this only on the client side after mounting
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: 'Features', path: 'javascript:void(0)' },
        { title: 'Integrations', path: 'javascript:void(0)' },
        { title: 'Customers', path: 'javascript:void(0)' },
        { title: 'Pricing', path: 'javascript:void(0)' },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest('.menu-btn')) setState(false);
        };
    }, []);

    return (
        <nav
            className={`border-b-[0.5px] transition-all duration-500 md:text-sm ${
                state ? 'mx-2 mt-2 rounded-xl border shadow-lg md:mx-2 md:mt-0 md:border-none md:shadow-none' : ''
            }`}
        >
            <div className="mx-auto max-w-screen-xl items-center gap-x-14 px-4 md:px-8 lg:flex">
                <div className="flex items-center justify-between py-4 lg:block">
                    {/* <a href="/">
                        <MyLogo />
                    </a> */}
                    <div className="flex gap-2">
                        <img
                            src="/assets/icons/khmer.png"
                            alt=""
                            className={`aspect-square w-8 object-contain ${true && 'ring-white rounded-sm ring-2 ring-offset-1'}`}
                        />
                        <img
                            src="/assets/icons/english.png"
                            alt=""
                            className={`aspect-square w-8 object-contain ${false && 'ring-white rounded-sm ring-2 ring-offset-1'}`}
                        />
                    </div>
                    <div className="lg:hidden">
                        <Button
                            size="icon"
                            className="menu-btn"
                            onClick={() => {
                                setState(!state);
                                console.log(state);
                            }}
                        >
                            {state ? <XIcon className="text-primary-foreground" /> : <AlignRight className="text-primary-foreground" />}
                        </Button>
                    </div>
                </div>
                <div className={`mt-8 flex-1 items-center md:mt-0 lg:flex ${state ? 'block' : 'hidden'} `}>
                    <div className="hidden w-full flex-1 justify-center lg:flex">
                        <Navbar />
                    </div>
                    {/* <ul className="items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-lg text-foreground hover:text-primary"
                >
                  <a href={item.path} className="block animated-underline">
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul> */}
                    <div className="mt-6 items-center justify-end space-y-6 gap-x-6 py-4 md:mt-0 md:flex md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4 stroke-white" />
                            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                            <Moon className="h-4 w-4 stroke-white" />
                            <Label htmlFor="dark-mode" className="sr-only">
                                Toggle dark mode
                            </Label>
                        </div>
                        <a
                            href="javascript:void(0)"
                            className={`rainbow-button z-40 flex items-center justify-center gap-4 font-semibold whitespace-nowrap`}
                        >
                            {/* <SquareLibraryIcon size={18} /> */}
                            <img src="/assets/rule-library/icons/elibrary.png" alt="elibrary icon" className="aspect-square w-10 object-contain" />
                            E-Library
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
