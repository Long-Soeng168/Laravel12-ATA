import { Card, CardContent } from '@/components/ui/card';
import { Book, Package } from 'lucide-react';
import SectionHeader from './section-header';

const OurResources = () => {
    return (
        <div className="mx-auto my-20 max-w-7xl space-y-12 p-8">
            {/* Headline */}
            <SectionHeader
                label="Our Resources"
                title="A World of Resources at Your Fingertips"
                subtitle="Connecting You to a World of Resources: Our import and export division acts as your gateway to a vast and meticulously curated
                collection of essential educational and office materials."
            />

            {/* Resources Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Study Materials */}
                <Card className="rounded-2xl p-0 shadow transition hover:shadow-lg">
                    <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                        <div className="space-y-4">
                            <Book className="h-10 w-10 text-green-600" />
                            <h2 className="text-xl font-semibold">Study Materials</h2>
                            <p className="text-muted-foreground">
                                <strong>From foundational textbooks and engaging workbooks to:</strong> comprehensive reference books, hands-on
                                learning aids, cutting-edge digital resources, art supplies, and effective assessment materials — everything you need
                                for a complete learning experience.
                            </p>
                        </div>
                        <div className="bg-muted aspect-video w-full rounded-xl" />
                    </CardContent>
                </Card>

                {/* Office Supplies */}
                <Card className="rounded-2xl p-0 shadow transition hover:shadow-lg">
                    <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                        <div className="space-y-4">
                            <Package className="h-10 w-10 text-pink-600" />
                            <h2 className="text-xl font-semibold">Office Supplies</h2>
                            <p className="text-muted-foreground">
                                <strong>A complete spectrum of essential supplies:</strong> from writing and correction tools to filing solutions,
                                classroom boards, storage, desk accessories, and technology add-ons — all to keep your learning and working
                                environments organized and efficient.
                            </p>
                        </div>
                        <div className="bg-muted aspect-video w-full rounded-xl" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OurResources;
