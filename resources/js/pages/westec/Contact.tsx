import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactSection } from './components/contact-section';
import Headline from './components/headline';
import WestecLayout from './layout/layout';

const solutionsData = [
    {
        category: 'SECURITY & SAFETY SOLUTIONS',
        items: ['CCTV', 'Access Control System', 'Time Attendance System', 'Fire Alarm', 'Intrusion Alarms'],
    },
    {
        category: 'SMART HOME & OFFICE SOLUTIONS',
        items: ['Smart Solar Energy Systems', 'Smart Home Automation System'],
    },
    {
        category: 'COMMERIAL & RESIDENTIAL EQUIPMENT IT SOLUTIONS',
        items: [
            'Commercial / Home Cinema',
            'Conferencing System',
            'Audio System',
            'LED Displays',
            'PA System',
            'Information Display System (IDS)',
            'POS & Kiosks',
            'Vending Machines',
        ],
    },
    {
        category: 'Support System',
        items: [
            'School Application & Management System (SAMS)',
            'Pickup & Drop-off Logistics Platform',
            'Stock Inventory & Helpdesk Software',
            'Server Installation',
            'Support & Maintenance ICT',
            'Internet Support',
            'Website Design',
            'Networking Installation',
            'Networking Monitoring',
        ],
    },
];

const Contact = () => {
    return (
        <WestecLayout>
            <section>
                <img src="/assets/westec/images/contact-1.png" alt="" />
            </section>
            <section>
                <Headline title="Project Inquiry?" />
                <div className="bg-primary px-4 py-4 text-white lg:px-16">
                    <div className="grid grid-cols-1 gap-4 gap-x-8 md:grid-cols-3">
                        <div className="w-full max-w-full">
                            <Label className='2xl:text-xl' htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                placeholder="Name"
                                className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                            />
                        </div>
                        <div className="w-full max-w-full">
                            <Label className='2xl:text-xl' htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                            />
                        </div>
                        <div className="w-full max-w-full">
                            <Label className='2xl:text-xl' htmlFor="email">Phone number</Label>
                            <Input
                                id="phone"
                                type="phone"
                                placeholder="Phone"
                                className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                            />
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <p className="text-base font-bold 2xl:text-2xl">OUR SOLUTIONS:</p>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {solutionsData.map((solution, index) => (
                                <div key={index} className="mb-4 flex flex-col items-start justify-start rounded p-4">
                                    <div className="mb-4 flex items-center gap-4">
                                        <img src="/assets/icons/image-icon.png" className="size-16" />
                                        <p className="text-sm 2xl:text-lg font-bold">{solution.category}</p>
                                    </div>
                                    <div className="space-y-2">
                                        {solution.items.map((item, subIndex) => (
                                            <div key={subIndex} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`item-${index}-${subIndex}`}
                                                    className="rounded-none bg-white data-[state=checked]:border-black data-[state=checked]:bg-black"
                                                />
                                                <label
                                                    htmlFor={`item-${index}-${subIndex}`}
                                                    className="text-sm leading-none 2xl:text-lg font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    className="rounded-none bg-white data-[state=checked]:border-black data-[state=checked]:bg-black"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm 2xl:text-lg leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Others
                                </label>
                            </div>
                            <div className="2xl:text-xl 2xl:h-10 w-full max-w-full lg:w-lg">
                                <Input
                                    id="other"
                                    type="other"
                                    className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                        </div>
                        <Button variant="secondary" className="h-full 2xl:text-xl rounded-none">
                            Submit
                        </Button>
                    </div>
                </div>
            </section>
            <ContactSection bg="bg-amber-500" showButton={false} />
            <section>
                <h1 className="my-6 inline-block border-[#273892] px-4 text-2xl font-semibold text-[#273892] lg:px-16">Get Support?</h1>
                <div className="bg-primary px-4 py-4 text-white lg:px-16">
                    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                        <div className="grid grid-cols-1 content-start gap-4 gap-x-8 md:grid-cols-1">
                            <div className="w-full max-w-full">
                                <Label className='2xl:text-xl' htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Name"
                                    className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                            <div className="w-full max-w-full">
                                <Label className='2xl:text-xl' htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                            <div className="w-full max-w-full">
                                <Label className='2xl:text-xl' htmlFor="email">Phone number</Label>
                                <Input
                                    id="phone"
                                    type="phone"
                                    placeholder="Phone"
                                    className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 gap-x-8 md:grid-cols-1">
                            <div className="w-full max-w-full">
                                <Label className='2xl:text-xl' htmlFor="name">Subject</Label>
                                <Input
                                    id="subject"
                                    type="subject"
                                    placeholder="Subject"
                                    className="2xl:text-xl 2xl:h-10 w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                            <div className="w-full max-w-full">
                                <Label className='2xl:text-xl' htmlFor="Your inquiry">Your inquiry</Label>
                                <Textarea
                                    id="Your inquiry"
                                    placeholder="Your inquiry"
                                    className="min-h-[115px] 2xl:text-xl w-full max-w-full rounded-none border-none bg-white text-black shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-end gap-4">
                        <Button variant="secondary" className="h-full 2xl:text-xl rounded-none">
                            Submit
                        </Button>
                    </div>
                </div>
            </section>
            {/*End content */}

            <div className="flex items-center justify-center">
                <div className="w-full rounded-none">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5909802997454!2d104.922343!3d11.5355045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950da4db34301%3A0x61232833a62cac36!2sRoyal%20University%20Of%20Law%20And%20Economics!5e0!3m2!1sen!2s!4v1710332324552!5m2!1sen!2s"
                        className="h-[500px] w-full rounded-none"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </WestecLayout>
    );
};

export default Contact;
