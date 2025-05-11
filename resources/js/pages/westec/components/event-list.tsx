import Headline from './headline';

const EventList = () => {
    return (
        <div className="mx-auto max-w-[4000px] bg-white">
            <Headline title="Events & Promotions" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {EventCard()}
                {EventCard()}
                {EventCard()}
                {EventCard()}
            </div>
        </div>
    );

    function EventCard() {
        return (
            <div className="flex flex-col overflow-hidden border-[0.5px] bg-[#36454f] hover:shadow-lg">
                <a href="#">
                    <img className="aspect-[1/1] w-full object-cover" src="/assets/demo-images/Cover.png" alt="Sunset in the mountains" />
                </a>

                <div className="background p-4">
                    <div className="mb-8">
                        <a href="#" className="mb-2 inline-block text-lg font-bold text-white transition duration-500 ease-in-out 2xl:text-2xl">
                            ONE TEAM ONE VISION Sales Kickoff & Team Building Workshop
                        </a>
                        <p className="text-sm text-gray-300 2xl:text-xl">March 25, 2025</p>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="font-proxima-nova-regular bg-primary px-4 py-1 text-base text-white capitalize transition duration-200 hover:underline 2xl:text-2xl"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};

export default EventList;
