const MyHero = ({ ourVision, ourMission, images, route }: { images?: any; route?: string }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#2e63d9] to-[#0f172a] px-6 lg:px-20 py-20 text-white">
                <div className="animate-fade-in-up max-w-4xl text-center">
                    <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl">
                        {ourVision.title}
                    </h1>
                    <p className="text-lg font-light text-white/90 md:text-2xl">{ourVision.short_description}</p>
                </div>

                <div className="mt-12 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    {/* {ourVision?.images?.map((item, index) => (
                        <img
                            key={item.id}
                            src={`/assets/images/pages/thumb/${item.image}`}
                            alt={`Our Vision Image ${index + 1}`}
                            className="aspect-[21/9] h-full w-full object-cover"
                        />
                    ))} */}

                    <img
                        className="aspect-[21/9] h-full w-full object-cover"
                        src={`/assets/images/pages/thumb/${ourVision.images[0].image}`}
                        alt="Our Vision"
                    />
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-gray-100 px-6 lg:px-20 py-20">
                <div className="mx-auto">
                    <h2 className="mb-16 text-center text-4xl font-bold text-gray-800 sm:text-5xl md:text-6xl">{ourMission.title}</h2>

                    <div className="flex flex-col items-stretch gap-10 md:flex-row md:gap-16">
                        {/* Mission Left */}
                        <div className="flex-1 space-y-6 rounded-2xl border border-gray-200 bg-white p-8 text-lg whitespace-pre-line text-[#d4050d] shadow-xl md:text-xl">
                            {ourMission.short_description}
                        </div>
                        {/* Mission Right */}
                        <div
                            className="flex-1 space-y-6 rounded-2xl border border-gray-200 bg-white p-8 text-lg text-[#244494] shadow-xl md:text-xl"
                            dangerouslySetInnerHTML={{ __html: ourMission.long_description }}
                        ></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyHero;
