import { MapPin, Star, StoreIcon } from 'lucide-react';
import { SectionHeader } from '../headers/HeaderSection';

// --- Mock Data ---
const MOCK_SHOPS = [
    {
        id: 'shop-1',
        initials: 'PP',
        name: 'Performance Parts Inc.',
        rating: '4.9',
        loc: 'Detroit, MI',
        tags: ['Turbochargers', 'Exhaust', 'Tuning'],
    },
    {
        id: 'shop-2',
        initials: 'OD',
        name: 'OEM Direct Warehouse',
        rating: '4.8',
        loc: 'Dallas, TX',
        tags: ['Factory Replacements', 'Body Panels'],
    },
    {
        id: 'shop-3',
        initials: 'EA',
        name: 'EuroAuto Imports',
        rating: '4.7',
        loc: 'Los Angeles, CA',
        tags: ['BMW', 'Audi', 'Sensors'],
    },
];

export default function ShopSection() {
    return (
        <section className="w-full">
            <SectionHeader
                icon={<StoreIcon className="size-5" />}
                title="Shops"
                action={{
                    label: 'All Shops',
                    href: '/shops',
                }}
            />
            {/* Shops Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {MOCK_SHOPS.map((shop) => (
                    <a
                        href={`/shops/${shop.id}`}
                        key={shop.id}
                        className="group bg-card border-border hover:border-muted-foreground text-foreground block flex flex-col border p-5 transition-colors"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            {/* Shop Avatar / Initials */}
                            <div className="bg-background border-border flex h-12 w-12 items-center justify-center border text-lg font-bold text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-white">
                                {shop.initials}
                            </div>

                            {/* Rating Badge */}
                            <div className="bg-background border-border flex items-center gap-1 border px-2 py-1">
                                <Star className="h-3 w-3 fill-[#FF6D00] text-[#FF6D00]" />
                                <span className="text-xs font-bold">{shop.rating}</span>
                            </div>
                        </div>

                        <h3 className="mb-1 text-lg font-bold">{shop.name}</h3>

                        <p className="text-muted-foreground mb-4 flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" /> {shop.loc}
                        </p>

                        {/* Tags */}
                        <div className="mt-auto flex flex-wrap gap-2">
                            {shop.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-background border-border text-muted-foreground border px-2 py-1 text-[10px] tracking-wider uppercase"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
