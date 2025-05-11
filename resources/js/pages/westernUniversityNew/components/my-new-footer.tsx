import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone} from 'lucide-react';
import { MySocial } from './my-social';

const Footer03Page = () => {
    return (
        <div className="flex flex-col border-t border-gray-200">
            <div className="bg-muted grow" />
            <footer>
                <div className="mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-6 py-12 xl:grid-cols-3 xl:px-0">
                        <Link href={'http://western.kimsoreya.site/'} className="col-span-full w-32 text-center xl:col-span-1">
                            {/* Logo */}
                            <img src="/assets/demo-images/Homepage/01_Logo_WIS.png" />
                        </Link>

                        <div>
                            <h6 className="font-noto-san-extra-light text-xl font-semibold">Contact</h6>
                            <div className="relative mt-2 mb-4 h-[1px] w-full bg-gray-200">
                                <div className="absolute top-0 left-0 h-full bg-red-700" style={{ width: '20%' }} />
                            </div>

                            <ul className="mt-4 space-y-4">
                                <li className="flex items-center gap-2">
                                    <Phone className="mr-2 inline-block h-5 w-5 text-blue-900" fill="#1c398e" />
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        016 699 192
                                    </Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin className="mr-2 inline-block h-5 w-5 text-blue-900" />
                                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                                        #20, St. 598C,Phnom Penh Thmey,Sen Sok, Cambodia
                                    </Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="mr-2 inline-block h-5 w-5 text-blue-900" />
                                    <Link href="#" className=" text-red-800 hover:text-foreground">
                                        info@western.edu.kh
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Subscribe Newsletter */}
                        <div>
                            <h6 className="font-noto-san-extra-light text-xl font-semibold">Social Media</h6>
                            <div className="relative mt-2 mb-4 h-[1px] w-full bg-gray-200">
                                <div className="absolute top-0 left-0 h-full bg-red-700" style={{ width: '20%' }} />
                            </div>
                            <p className="text-muted-foreground hover:text-foreground mt-4">
                                Enter your email address to get the latest University news, special events and student activities delivered right to
                                your inbox.
                            </p>
                            <div className="mt-4 flex items-center gap-5">
                                <MySocial/>
                            </div>
                           
                        </div>
                    </div>
                    <Separator />
                </div>
            </footer>
            <div className="mx-auto max-w-screen-2xl"></div>
            <div className="flex flex-col-reverse items-center justify-between bg-blue-950 px-6 py-2 sm:flex-row lg:px-16">
                {/* Copyright */}
                <span className="text-white">
                    &copy; {new Date().getFullYear()}{' '}
                    <Link href="/" target="_blank">
                    Western International School
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </div>
    );
};

export default Footer03Page;
