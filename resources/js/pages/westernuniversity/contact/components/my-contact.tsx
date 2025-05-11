import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { MailIcon, MapPinIcon, PhoneIcon, School } from 'lucide-react';

const MyContact = () => (
    <>
   <div className="max-w-screen-xl mx-6 xl:mx-auto mt-16 h-96 rounded-xl overflow-hidden shadow-lg">
  <iframe
    className="w-full h-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.589173355077!2d104.88109657295368!3d11.581281100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519e61e7251b%3A0x308b0c2e593ce8b8!2sWestern%20International%20School%20-%20Stadium%20(Main%20Campus)!5e0!3m2!1sen!2skh!4v1744367161765!5m2!1sen!2skh"
  ></iframe>
 
</div>


    <div className="flex min-h-screen items-center justify-center py-16">
        <div className="mx-auto w-full max-w-screen-xl px-6 xl:px-0">
            <b className="text-muted-foreground">Contact Us</b>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Visit The School</h2>
            <p className="mt-3 text-base sm:text-lg">Western International School Central Office</p>
            <div className="mt-24 grid gap-16 md:gap-10 lg:grid-cols-2">
               

                {/* Form */}
                <Card className="bg-accent shadow-none">
                    <CardContent className="p-6 md:p-10">
                        <form>
                            <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input placeholder="First name" id="firstName" className="mt-1.5 h-11 bg-white shadow-none" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="fmailAddress">Email Address</Label>
                                    <Input placeholder="Email Address" id="fmailAddress" className="mt-1.5 h-11 bg-white shadow-none" />
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input type="email" placeholder="Phone Number" id="phoneNumber" className="mt-1.5 h-11 bg-white shadow-none" />
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Message" className="mt-1.5 bg-white shadow-none" rows={6} />
                                </div>
                            </div>
                            <Button className="mt-6 w-full bg-blue-800" size="lg">
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                    <div>
                        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                            <MapPinIcon className="text-blue-800" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold">Office</h3>

                        <Link className="text-blue-800 font-medium" href="https://map.google.com" target="_blank">
                            No. 20, Street 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia
                        </Link>
                    </div>
                    <div>
                        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                            <MailIcon className="text-blue-800" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold">Email</h3>
                        <Link className="text-blue-800 font-medium" href="mailto:akashmoradiya3444@gmail.com">
                            info@western.edu.kh
                        </Link>
                    </div>

                    <div>
                        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                            <PhoneIcon className="text-blue-800" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold">Number</h3>
                        <Link className="text-blue-800 font-medium" href="tel:akashmoradiya3444@gmail.com">
                            016 699 192 | 078 672 072
                        </Link>
                    </div>
                    <div>
                        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                            <School className="text-blue-800" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold">Office Hours</h3>
                        <Link className="text-blue-800 font-medium" href="#">
                            7:30 AM – 5:30 PM
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);

export default MyContact;
