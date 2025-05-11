import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from 'lucide-react';
import SectionHeader from './components/section-header';
import CamActiveLayout from './layouts/CamActiveLayout';

const ContactCamActivePage = () => (
    <CamActiveLayout>
        <div className="flex min-h-screen items-center justify-center py-16">
            <div className="mx-auto w-full max-w-screen-xl px-6 xl:px-0">
                <SectionHeader
                    label="Contact Us"
                    title="Let's Connect: Partner with CamActive Today"
                    subtitle=" We are eager to embark on a journey of educational transformation with you. Contact us today to discover how CamActive can empower
                    your learners, support your educators, and elevate your institution to new heights."
                />

                <div className="mt-24 grid gap-16 md:gap-10 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                        <div>
                            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <MailIcon />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Email</h3>
                            <p className="text-muted-foreground my-2.5">Our team is here to help.</p>
                            <Link className="text-primary font-medium" href="mailto:info@camactive.net">
                                info@camactive.net
                            </Link>
                        </div>

                        <div>
                            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <MessageCircle />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Website</h3>
                            <p className="text-muted-foreground my-2.5">Learn more about our services.</p>
                            <Link className="text-primary font-medium" href="https://www.camactive.net" target="_blank">
                                www.camactive.net
                            </Link>
                        </div>

                        <div>
                            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <MapPinIcon />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Office</h3>
                            <p className="text-muted-foreground my-2.5">Visit us at our headquarters.</p>
                            <Link
                                className="text-primary font-medium"
                                href="https://www.google.com/maps?q=19Eo+Phsar+Depou+3+(St+118),+Tuol+Kouk,+Phnom+Penh,+Cambodia"
                                target="_blank"
                            >
                                19Eo Phsar Depou 3 (St 118),
                                <br />
                                Tuol Kouk, Phnom Penh, Cambodia
                            </Link>
                        </div>

                        <div>
                            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <PhoneIcon />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Phone</h3>
                            <p className="text-muted-foreground my-2.5">Mon-Fri from 8am to 5pm.</p>
                            <Link className="text-primary font-medium" href="tel:+85523882405">
                                +855 23 882 405
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="bg-accent shadow-none">
                        <CardContent className="p-6 md:p-10">
                            <form>
                                <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input placeholder="First name" id="firstName" className="mt-1.5 h-11 bg-white shadow-none" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input placeholder="Last name" id="lastName" className="mt-1.5 h-11 bg-white shadow-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" placeholder="Email" id="email" className="mt-1.5 h-11 bg-white shadow-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Write your message here"
                                            className="mt-1.5 bg-white shadow-none"
                                            rows={6}
                                        />
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Checkbox id="acceptTerms" />
                                        <Label htmlFor="acceptTerms">
                                            I agree to the{' '}
                                            <Link href="#" className="underline">
                                                terms and conditions
                                            </Link>
                                            .
                                        </Label>
                                    </div>
                                </div>
                                <Button className="mt-6 w-full" size="lg">
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </CamActiveLayout>
);

export default ContactCamActivePage;
