const MyHeroEvent = () => {
    return (
        <div id="about" className="relative mt-0 lg:mt-12 overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                    <svg
                        className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100"></polygon>
                    </svg>

                    <div className="pt-1"></div>

                    <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h2 className="my-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl font-noto-san-extra-light">Activities And Events</h2>

                            <p>
                            At Western International School, we provide our students with different experiences and opportunities to help improve and advance their intellectual skills and abilities. We acknowledge and appreciate their hard work and make sure that we reward them in our Award Ceremonies.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:h-full lg:w-full"
                    src="https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
            </div>
        </div>
    );
};

export default MyHeroEvent;
