import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpenCheck, Briefcase, GraduationCap, Users } from 'lucide-react';
import SectionHeader from './section-header';

const OurIntegratedSolutions = () => {
    return (
        <div className="relative h-full w-full bg-[#0f172a] bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)] py-20 text-white">
            {/* Headline */}
            <SectionHeader
                labelColor="text-[#38bdf8]"
                titleColor="text-[#f1f5f9]"
                subtitleColor="text-[#cbd5e1]"
                label="Our Integrated Solutions"
                title="Holistic Solutions for Optimal Educational Impact"
                subtitle="Tailored for Your Success: We recognize that a one-size-fits-all approach falls short in the dynamic world of education. That’s why we
                offer integrated solutions, thoughtfully designed to meet the unique needs of our diverse clientele."
            />

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-7xl mx-auto my-8">
                {/* Schools & Universities */}
                <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <GraduationCap className="h-10 w-10 text-blue-600" />
                        <h2 className="text-2xl font-semibold">For Schools & Universities</h2>
                        <p>
                            We are your strategic partner, offering comprehensive packages that seamlessly blend academic support services with the
                            efficient procurement of study materials and office supplies.
                        </p>
                        <Button variant="secondary">Learn More</Button>
                    </CardContent>
                </Card>

                {/* Individual Students */}
                <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <BookOpenCheck className="h-10 w-10 text-green-600" />
                        <h2 className="text-2xl font-semibold">For Individual Students & Learners</h2>
                        <p>
                            Your educational journey is personal, and so are our solutions. We offer personalized learning plans that artfully combine
                            guidance, materials, and tailored support.
                        </p>
                        <Button variant="secondary">Explore Options</Button>
                    </CardContent>
                </Card>

                {/* Educators */}
                <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <Users className="h-10 w-10 text-purple-600" />
                        <h2 className="text-2xl font-semibold">For Educators</h2>
                        <p>
                            We champion your growth and effectiveness. Our customized professional development programs are enriched with
                            comprehensive resource materials, mentoring, and best practice sharing.
                        </p>
                        <Button variant="secondary">See Programs</Button>
                    </CardContent>
                </Card>

                {/* Corporate Training */}
                <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <Briefcase className="h-10 w-10 text-orange-600" />
                        <h2 className="text-2xl font-semibold">For Corporate Training Departments</h2>
                        <p>
                            We understand the importance of a skilled and engaged workforce. Our blended learning solutions for employee onboarding
                            and skill development help businesses thrive.
                        </p>
                        <Button variant="secondary">Discover More</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 text-center">
                <h2 className="text-2xl font-semibold">Need a Custom Solution?</h2>
                <p>Contact us today to create a tailored plan that aligns perfectly with your needs.</p>
                <Button>Contact Us</Button>
            </div>
        </div>
    );
};

export default OurIntegratedSolutions;
