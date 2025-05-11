import { useState } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from './ui/navbar-menu';
import { Link } from '@inertiajs/react';

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div>
            <Menu setActive={setActive}>
                <Link href={'/'} className='text-white text-lg'>ទំព័រដើម</Link>
                <MenuItem setActive={setActive} active={active} item="ធនធានឯកសារបណ្ណាល័យ">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">សៀវភៅអេឡិចត្រូនិច</HoveredLink>
                        <HoveredLink href="/interface-design">របាយការណ៍</HoveredLink>
                        <HoveredLink href="/seo">សៀវភៅទ្រឹស្តី</HoveredLink>
                        <HoveredLink href="/branding">សារណា</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="សេវាកម្ម">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">ការខ្ចីសង</HoveredLink>
                        <HoveredLink href="/interface-design">បន្ទប់ពិគ្រោះយោបល់</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="បណ្ណាល័យអេឡិចត្រូនិច">
                    <div className="grid grid-cols-2 gap-10 p-4 text-sm">
                        <ProductItem
                            title="សារណា"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="ឯកសារអេឡិចត្រូនិច"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="សំឡេង"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="វីដេអូ"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="អំពីបណ្ណល័យ">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">ការវិវឌ្ឍន៍របស់បណ្ណាល័យ</HoveredLink>
                        <HoveredLink href="/individual">រចនាសម្ព័ន្ធ</HoveredLink>
                        <HoveredLink href="/team">ប្រវត្តិ និងការរៀបចំ</HoveredLink>
                        <HoveredLink href="/enterprise">បទបញ្ជាផ្ទៃក្នុង</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
