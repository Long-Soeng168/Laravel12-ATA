import { Link } from '@inertiajs/react';

const GarageCard = ({ garage }: { garage: any }) => {
    return (
        <Link
            href={`/garages/${garage.id}`}
            className="w-full max-w-full overflow-hidden border transition-all duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg"
        >
            {/* Banner */}
            <div>
                <img
                    src={`/assets/images/garages/${garage.banner}`}
                    alt={`${garage.name} Banner`}
                    className="aspect-[21/9] w-full bg-white object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 p-2">
                {/* Logo */}
                <div className="shrink-0">
                    <img
                        src={`/assets/images/garages/${garage.logo}`}
                        alt={`${garage.name} Logo`}
                        className="size-14 rounded-full border-4 border-white bg-white object-cover shadow-md"
                    />
                </div>

                {/* Details */}
                <div>
                    <h2 className="line-clamp-2 text-base font-semibold">{garage.name}</h2>
                    {garage.address && (
                        <p className="text-foreground mt-1 line-clamp-2 text-sm">
                            <span className="font-semibold">Address:</span> {garage.address}
                        </p>
                    )}
                    {garage.phone && (
                        <p className="text-foreground mt-1 text-sm">
                            <span className="font-semibold">Phone:</span> {garage.phone}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default GarageCard;
