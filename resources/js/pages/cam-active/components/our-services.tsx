import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react';
import SectionHeader from './section-header';

const OurServices = () => {
    return (
        <>
            <div className="relative h-full w-full bg-[#0f172a] bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]">
                <div className="mx-auto max-w-7xl space-y-10 p-8 py-20">
                    {/* Headline */}
                    <SectionHeader
                        labelColor="text-[#38bdf8]"
                        titleColor="text-[#f1f5f9]"
                        subtitleColor="text-[#cbd5e1]"
                        label="Our Services"
                        title="Expert Support to Foster Academic Success"
                        subtitle=" Nurturing Growth at Every Stage: We offer a holistic spectrum of support tailored for every level of education."
                    />

                    {/* Expertise Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* K-12 */}
                        <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                                <div className="space-y-4">
                                    <BookOpen className="h-10 w-10 text-yellow-600" />
                                    <h2 className="text-xl font-semibold">K-12 Student Support</h2>
                                    <p>
                                        <strong>Cultivating Foundational Success:</strong> We provide personalized tutoring, mentoring programs, and
                                        academic coaching to foster holistic development.
                                    </p>
                                </div>
                                <div className="bg-[#2d2c59] aspect-video w-full rounded-xl" />
                            </CardContent>
                        </Card>

                        {/* Higher Education */}
                        <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                                <div className="space-y-4">
                                    <GraduationCap className="h-10 w-10 text-blue-600" />
                                    <h2 className="text-xl font-semibold">Higher Education Student Support</h2>
                                    <p>
                                        <strong>Empowering Academic and Career Aspirations:</strong> Extensive tutoring, academic support centers, and
                                        personalized advising to illuminate pathways to success.
                                    </p>
                                </div>
                                <div className="bg-[#2d2c59] aspect-video w-full rounded-xl" />
                            </CardContent>
                        </Card>

                        {/* Educators */}
                        <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                                <div className="space-y-4">
                                    <Users className="h-10 w-10 text-purple-600" />
                                    <h2 className="text-xl font-semibold">Educator Support</h2>
                                    <p>
                                        <strong>Inspiring Excellence in Teaching:</strong> Engaging workshops, training programs, and mentoring
                                        initiatives to revolutionize pedagogy and cultivate leadership.
                                    </p>
                                </div>
                                <div className="bg-[#2d2c59] aspect-video w-full rounded-xl" />
                            </CardContent>
                        </Card>

                        {/* Corporate Training */}
                        <Card className="rounded-2xl border-white/50 bg-[#16223e] p-0 text-white transition hover:shadow-lg">
                            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
                                <div className="space-y-4">
                                    <Briefcase className="h-10 w-10 text-orange-600" />
                                    <h2 className="text-xl font-semibold">Corporate Training</h2>
                                    <p>
                                        <strong>Workforce Development:</strong> Blended learning solutions for employee onboarding and skill
                                        development, enhancing workforce capability and productivity.
                                    </p>
                                </div>
                                <div className="bg-[#2d2c59] aspect-video w-full rounded-xl" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurServices;
