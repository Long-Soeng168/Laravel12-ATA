import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from "@/components/ui/separator";
import { CalendarClockIcon, Mail, MapPin, Phone } from 'lucide-react';
import { MySocial } from './my-social';

const MyContact = () => (
    <div className="flex items-center justify-center my-12 ">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="grid grid-cols-2 gap-12 lg:grid-cols-12">
        {/* Left - Form & Intro */}
        <div className="col-span-2 lg:col-span-9">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Visit The School</h2>
          <div className="my-6 w-20 border-[1.5px] border-black" />
          <p className="text-base text-gray-600 sm:text-lg">
            Western International School Central Office
          </p>

          {/* Contact Form */}
          <Card className="mt-8 border-0 overflow-hidden">
            <CardContent className="p-0 overflow-hidden">
              <form className='overflow-hidden'>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      placeholder="First name"
                      id="firstName"
                      className="mt-1.5 h-11 bg-white shadow-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      placeholder="Last name"
                      id="lastName"
                      className="mt-1.5 h-11 bg-white shadow-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="mt-1.5 h-11 bg-white shadow-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      id="phone"
                      className="mt-1.5 h-11 bg-white shadow-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      className="mt-1.5 h-40 bg-white shadow-none"
                      rows={6}
                    />
                  </div>
                </div>
                <Button
                  className="mt-6 bg-red-800 font-black hover:bg-blue-900"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right - Contact Info */}
        <div className="col-span-2 lg:col-span-3 flex flex-col gap-10">
          {/* Socials */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Socials</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex gap-3">
              {/* {["facebook", "telegram", "youtube"].map((platform) => (
                <img
                  key={platform}
                  src={`/assets/demo-images/${platform}.png`}
                  alt={platform}
                  className="h-10 w-10 rounded-full"
                />
              ))} */}
              <MySocial/>
            </div>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Phone</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <Phone className="w-5 text-blue-900" fill="#1c398e" /> 016 699 192
            </div>
            <div className="mt-3 flex items-center gap-2 text-gray-600 text-base">
              <Phone className="w-5 text-blue-900" fill="#1c398e" /> 078 672 072
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Email</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-red-800 text-base">
              <Mail className="w-5 text-blue-900" /> info@western.edu.kh
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Address</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-start gap-2 text-gray-600 text-base">
              <MapPin className="w-12 text-blue-900 " />
              <span>No. 20, Street 598C, Phnom Penh Thmey, Sen Sok, Phnom Penh, Cambodia</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Opening Hours</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <CalendarClockIcon className="w-5 text-blue-900" />
              <span>7:30 AM – 5:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MyContact;
