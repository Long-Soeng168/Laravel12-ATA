import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Database, MonitorSmartphone, Wifi } from 'lucide-react';
import SectionHeader from './section-header';

const TechnologyBasedSolutions = () => {
    return (
        <div className="mx-auto my-20 max-w-7xl space-y-12 p-8">
            {/* Headline */}
            <SectionHeader
                label="Technology-Based Solutions"
                title="Leveraging Technology for Seamless and Accessible Education"
                subtitle="CamActive is at the forefront of educational innovation, strategically leveraging the power of technology to enhance the delivery,
                accessibility, and effectiveness of our comprehensive educational services and resources."
            />

            {/* Tech Features Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Online Learning Platforms */}
                <Card className="rounded-2xl shadow transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <MonitorSmartphone className="text-primary h-10 w-10" />
                        <h2 className="text-xl font-semibold">Online Learning Platforms</h2>
                        <p>
                            Seamless access to interactive course materials, recorded lectures, and virtual classrooms designed for learners at every
                            level.
                        </p>
                    </CardContent>
                </Card>

                {/* Cloud-Based Resource Management */}
                <Card className="rounded-2xl shadow transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <Cloud className="text-warning h-10 w-10" />
                        <h2 className="text-xl font-semibold">Cloud-Based Resources</h2>
                        <p>Scalable cloud systems ensuring on-demand access to study materials, institutional data, and academic records.</p>
                    </CardContent>
                </Card>

                {/* High-Speed Connectivity */}
                <Card className="rounded-2xl shadow transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <Wifi className="text-success h-10 w-10" />
                        <h2 className="text-xl font-semibold">High-Speed Connectivity</h2>
                        <p>Reliable, high-performance internet infrastructure enabling real-time learning and global academic collaboration.</p>
                    </CardContent>
                </Card>

                {/* Data-Driven Insights */}
                <Card className="rounded-2xl shadow transition hover:shadow-lg">
                    <CardContent className="space-y-4 p-6">
                        <Database className="text-destructive h-10 w-10" />
                        <h2 className="text-xl font-semibold">Data-Driven Insights</h2>
                        <p>Advanced analytics and reporting tools supporting evidence-based decision-making for institutions and learners alike.</p>
                    </CardContent>
                </Card>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 text-center">
                <h2 className="text-2xl font-semibold">Experience Our Tech-Enabled Solutions</h2>
                <p className="text-muted-foreground">
                    Connect with us to see how CamActive’s technology-based educational services can transform your learning environment.
                </p>
                <Button>Get a Demo</Button>
            </div>
        </div>
    );
};

export default TechnologyBasedSolutions;
