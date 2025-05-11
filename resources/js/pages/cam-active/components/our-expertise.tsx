import { Card, CardContent } from '@/components/ui/card';
import { BookOpenCheck, Globe2 } from 'lucide-react';
import SectionHeader from './section-header';

const OurExpertise = () => {
    return (
        <div className="relative h-full w-full bg-[#0f172a] bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]">
            
            <div className="mx-auto max-w-7xl space-y-10 p-8 py-20">
                {/* Headline */}
                <SectionHeader
                    labelColor="text-[#38bdf8]"
                    titleColor="text-[#f1f5f9]"
                    subtitleColor="text-[#cbd5e1]"
                    label="Our Expertise"
                    title="Comprehensive Solutions, Tailored to Your Needs"
                    subtitle="We combine academic support services with a global procurement network to empower learners and institutions worldwide."
                />

                {/* Expertise Grid */}
                <div className="z-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Educational Support Services */}
                    <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                        <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                            <div className="space-y-4">
                                <BookOpenCheck className="h-10 w-10 text-blue-600" />
                                <h2 className="text-xl font-semibold">Educational Support Services</h2>
                                <p>
                                    <strong>From personalized tutoring to professional development:</strong> We nurture growth at every stage,
                                    offering comprehensive academic services tailored to students and educators alike.
                                </p>
                            </div>
                            <div className="aspect-video w-full rounded-xl bg-[#2d2c59]" />
                        </CardContent>
                    </Card>

                    {/* Global Resource Procurement */}
                    <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                        <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                            <div className="space-y-4">
                                <Globe2 className="h-10 w-10 text-green-600" />
                                <h2 className="text-xl font-semibold">Global Resource Procurement</h2>
                                <p>
                                    <strong>Access a world of high-quality study materials and office supplies:</strong> Delivered efficiently through
                                    our trusted international logistics network.
                                </p>
                            </div>
                            <div className="aspect-video w-full rounded-xl bg-[#2d2c59]" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OurExpertise;
