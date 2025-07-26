import { Link, usePage } from '@inertiajs/react';

export default function MyFooter() {
    const { application_info, links } = usePage().props;
    return (
        <footer className="bg-true-primary dark:bg-black dark relative border-t text-white">
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
                {/* Background Banner */}
                <div className="absolute right-0 bottom-0 z-0 h-auto w-full max-w-[2000px]">
                    <img
                        src="/assets/backgrounds/footer_banner_for_light.png"
                        alt=""
                        className="z-0 w-[100%] max-w-7xl object-contain opacity-[8%] dark:hidden"
                    />
                    <img
                        src="/assets/backgrounds/footer_banner_for_dark.png"
                        alt=""
                        className="z-0 hidden w-[100%] max-w-7xl object-contain opacity-[15%] dark:block"
                    />
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="justify-self-center">
                        {application_info?.image && (
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    width={65}
                                    height={65}
                                    src={`/assets/images/application_info/thumb/${application_info?.image}`}
                                    alt={`${application_info?.name}'s logo`}
                                    className="rounded-full hover:cursor-pointer"
                                />
                                <p className="mt-2 text-2xl font-bold">{application_info?.name}</p>
                            </div>
                        )}
                    </div>
                    {/* Company Info */}
                    <div className="lg:justify-self-center">
                        <h2 className="mb-4 text-xl font-bold">Information</h2>
                        <ul className="flex flex-col gap-1">
                            <li className="flex">
                                <span>{application_info?.address}</span>
                            </li>
                            <li className="flex">
                                <span className="mr-2 font-semibold">Phone:</span>
                                <a className="hover:underline" href={`tel:${application_info?.phone}`}>
                                    {application_info?.phone}
                                </a>
                            </li>
                            <li className="flex">
                                <span className="mr-2 font-semibold">Email:</span>
                                <a className="hover:underline" href={`mailto:${application_info?.email}`}>
                                    {application_info?.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:justify-self-center">
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link prefetch href="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link prefetch href="/products" className="hover:underline">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link prefetch href="/privacy" className="hover:underline">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link prefetch href="/contact-us" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link prefetch href="/about-us" className="hover:underline">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:justify-self-center">
                        <h3 className="mb-4 text-lg font-semibold">Social Media</h3>
                        <ul className="space-y-3">
                            {links?.map((item) => (
                                <li key={item?.id}>
                                    <Link prefetch href="/" className="flex items-center gap-2 hover:underline">
                                        <img
                                            width={28}
                                            height={28}
                                            src={`/assets/images/links/thumb/${item?.image}`}
                                            alt=""
                                            className="transition-all duration-300 hover:scale-125 hover:cursor-pointer"
                                        />
                                        {item?.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Footer Bottom */}
                <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
                    <p className="text-sm">{application_info?.copyright}</p>
                    <a className="text-sm" href="https://kampu.solutions">
                        Developed by : <strong>Kampu Solutions</strong>
                    </a>
                </div>
            </div>
        </footer>
    );
}
