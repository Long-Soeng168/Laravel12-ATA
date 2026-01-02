import MyNoData from '@/components/my-no-data';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowUpRightIcon } from 'lucide-react';
const GarageProfileHeader = ({ garage }: { garage: any }) => {
    return (
        <div className="mb-8 w-full px-4 md:mb-28">
            {/* Banner */}
            <div className="relative">
                <img src={`/assets/images/garages/${garage.banner}`} alt={garage.name} className="max-h-[500px] w-full object-cover" />
                {/* Logo */}
                <div className="bg-background/80 -bottom-16 left-0 flex max-w-[600px] items-center space-x-4 rounded-none border p-4 shadow-md backdrop-blur md:absolute md:left-6">
                    <img
                        src={`/assets/images/garages/${garage.logo}`}
                        alt="garage Logo"
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{garage.name}</h1>
                        <div>
                            {garage.address && (
                                <p>
                                    <span className="font-semibold">Address:</span> {garage.address}
                                </p>
                            )}
                            {garage.phone && (
                                <p>
                                    <span className="font-semibold">Phone:</span> {garage.phone}
                                </p>
                            )}
                            {garage.latitude && garage.longitude && (
                                <a
                                    href={`https://maps.google.com/?q=${garage.latitude},${garage.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex text-sm text-blue-500 hover:underline"
                                >
                                    View on Google Maps <ArrowUpRightIcon size={20} />
                                </a>
                            )}
                            <div className="absolute right-1 bottom-1">
                                <Dialog>
                                    <DialogTrigger className="text-primary bg-background/50 cursor-pointer rounded-lg p-1 px-2 backdrop-blur-md hover:underline">
                                        About
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{garage.name}</DialogTitle>
                                            <DialogDescription className="whitespace-pre-line">
                                                {garage.short_description || <MyNoData />}
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GarageProfileHeader;
