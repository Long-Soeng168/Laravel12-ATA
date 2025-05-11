import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaperclipIcon, Shapes } from 'lucide-react';
import SectionHeader from './section-header';

const CareerList = () => {
    return (
        <div className="mx-auto mb-8 max-w-7xl bg-white mt-28">
            <SectionHeader
                label="Careers"
                title="Join Our Team: Shape the Future of Education"
                subtitle="At CamActive, we are passionate about making a difference in the world of education. We are always looking for talented and dedicated individuals to join our growing team. If you are driven by a desire to empower learners and educators globally, we encourage you to explore career opportunities with us."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-12">
                {BlogCard()}
                {BlogCard()}
                {BlogCard()}
            </div>
        </div>
    );

    function BlogCard() {
        return (
            <div>
                <Card className="shadow-none">
                    <CardHeader className="flex-row items-center gap-3 font-semibold">
                        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                            <Shapes className="h-5 w-5" />
                        </div>
                        Be Our next ELV Design Engineer!
                    </CardHeader>
                    <CardContent className="text-muted-foreground px-5 text-[15px]">
                        <p>Engineering the Future - Join Our Team!</p>
                        <div className="bg-muted mt-5 aspect-video w-full rounded-xl" />
                    </CardContent>
                    <CardFooter>
                        <Dialog>
                            <DialogTrigger>
                                <Button>More Details</Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={true} className="bg-primary min-w-[95%] gap-0 rounded-none p-0 text-white sm:min-w-[95%]">
                                <DialogHeader>
                                    <DialogTitle className="hidden"></DialogTitle>
                                    <DialogDescription className="hidden"></DialogDescription>
                                </DialogHeader>
                                <div>
                                    <div>
                                        <h1 className="p-4 pb-0 text-xl font-bold">
                                            Position: <span className="text-yellow-400">ELV Design Engineer</span>
                                        </h1>
                                    </div>
                                    <div className="flex flex-col gap-4 p-2 text-white lg:flex-row lg:p-4">
                                        <div className="w-full space-y-1 lg:flex-1">
                                            <div className="bg-black/30 p-2 text-sm">
                                                <p>
                                                    Location: <strong>Phnom Penh, Cambodia</strong>
                                                </p>
                                                <p>
                                                    Industry: <strong>Technology (ELV Systems, Security & AV Solutions)</strong>
                                                </p>
                                                <p>
                                                    Budget: <strong>$0,000.00</strong>
                                                </p>
                                            </div>
                                            <div className="bg-black/30 p-2 text-sm">
                                                <p className="text-lg font-bold">QUALIFICATIONS</p>
                                                <div>
                                                    <strong>Language Proficiency:</strong>
                                                    <p>• Preferably a local candidate with experience in Cambodia's ELV industry.</p>
                                                </div>
                                                <div>
                                                    <strong>Education:</strong>
                                                    <p>
                                                        • Degree in Electrical Engineering or a related field (Computer Engineering, AV, IT, or Sound
                                                        System Design).
                                                    </p>
                                                </div>
                                                <div>
                                                    <strong>Experience:</strong>
                                                    <p>• Minimum 5 years experience in designing one or more ELV systems is an asset.</p>
                                                </div>
                                            </div>
                                            <div className="bg-black/30 p-2 text-sm">
                                                <p className="text-lg font-bold">SKILLS:</p>
                                                <div>
                                                    <strong>Language Proficiency:</strong>
                                                    <ul>
                                                        <li>• Proficiency in AutoCAD for system drawings and design.</li>
                                                        <li>• Strong knowledge of Microsoft Office Suite.</li>
                                                        <li>• Ability to speak, read, and write in English and Khmer.</li>
                                                        <li>• Excellent communication and problem-solving skills.</li>
                                                        <li>• Quick learner with a strong work ethic and integrity.</li>
                                                        <li>• Willingness to work overtime or on weekends based on project requirements.</li>
                                                        <li>• Detail-oriented and able to follow company procedures.</li>
                                                        <li>• Passion for continuous learning and upgrading technical skills.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-black/30 p-2 text-sm">
                                                <p className="text-lg font-bold">DUTIES & RESPONSIBILITIES:</p>
                                                <div>
                                                    <strong>Language Proficiency:</strong>
                                                    <ol>
                                                        <li>
                                                            1. System Design & Documentation
                                                            <ul>
                                                                <li>• Design and prepare BOQ and technical drawings for ELV systems.</li>
                                                                <li>
                                                                    • Ensure ELV system designs meet industry standards, safety regulations, and
                                                                    project specifications.
                                                                </li>
                                                                <li>
                                                                    • Maintain accurate documentation and ensure proper filing of all design records.
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            2. Project Coordination & Technical Support
                                                            <ul>
                                                                <li>
                                                                    • Collaborate with the purchasing team to source necessary components for ELV
                                                                    installations.
                                                                </li>
                                                                <li>
                                                                    • Provide technical guidance to sales, marketing, and installation teams when
                                                                    needed.
                                                                </li>
                                                                <li>
                                                                    • Conduct site inspections to verify that installations align with design plans.
                                                                </li>
                                                                <li>• Assist in troubleshooting and resolving ELV system issues.</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            3. Knowledge Transfer & Team Training
                                                            <ul>
                                                                <li>• Design and prepare BOQ and technical drawings for ELV systems.</li>
                                                                <li>• Train installation teams on system designs and technical processes.</li>
                                                                <li>
                                                                    • Stay updated on the latest ELV technologies and industry trends to enhance
                                                                    project efficiency.
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full space-y-4 lg:w-md">
                                            <div className="w-full max-w-full">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    type="name"
                                                    placeholder="Name"
                                                    className="w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                                />
                                            </div>
                                            <div className="w-full max-w-full">
                                                <Label htmlFor="email">Position</Label>
                                                <Input
                                                    id="position"
                                                    type="position"
                                                    placeholder="Position"
                                                    disabled
                                                    value="ELV Design Engineer"
                                                    className="w-full max-w-full rounded-none border-none bg-white text-black shadow-none disabled:opacity-80"
                                                />
                                            </div>
                                            <div className="w-full max-w-full">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                                />
                                            </div>
                                            <div className="w-full max-w-full">
                                                <Label htmlFor="email">Phone number</Label>
                                                <Input
                                                    id="phone"
                                                    type="phone"
                                                    placeholder="Phone"
                                                    className="w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                                />
                                            </div>
                                            <div className="flex w-full max-w-full justify-end gap-4">
                                                <Button variant="secondary" className="rounded-none">
                                                    <PaperclipIcon /> Attach CV
                                                </Button>
                                                <Button variant="secondary" className="rounded-none">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
        );
    }
};

export default CareerList;
