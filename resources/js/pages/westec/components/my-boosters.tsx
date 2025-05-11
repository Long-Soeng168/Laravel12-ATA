import Headline from './headline';

const MyBoosters = () => {
    return (
        <>
            <div className="max-w-screen-[4000px] bg-white">
                <Headline title="Solution Boosters" />
                <div className="grid grid-cols-1 px-4 md:grid-cols-3 lg:px-16">
                    {section()}
                    {section()}
                    {section()}
                </div>
            </div>
        </>
    );

    function section() {
        return (
            <div className="border-l-true-primary w-full border-l-1 p-2 pt-0 lg:p-8 lg:pt-0">
                <div className="flex flex-col gap-6">
                    {/* Section Header */}
                    <div>
                        <h2 className="font-proxima-nova-regular bg-primary mb-6 inline px-4 py-2 text-center text-lg text-white 2xl:text-xl">
                            Pre-Installation
                        </h2>
                    </div>

                    {/* First Item */}
                    <div className="flex items-center gap-6">
                        <div className="aspect-square w-44 2xl:w-52">
                            <img src="assets/demo-images/photo1.png" className="h-full w-full object-contain" alt="Site Evaluation" />
                        </div>
                        <div className="text-start">
                            <h3 className="font-proxima-nova-bold text-sm text-[#333] 2xl:text-xl">FREE Site Evaluation:</h3>
                            <p className="font-proxima-nova-regular text-[12px] text-[#555] 2xl:text-lg">
                                Weeze’s engineers conduct on-site visits to evaluate the location, assess security or system requirements, and provide
                                accurate recommendations.
                            </p>
                        </div>
                    </div>
                    {/* Second Item */}
                    <div className="mt-6 flex items-center gap-6">
                        <div className="aspect-square w-44 2xl:w-48">
                            <img src="assets/demo-images/photo2.png" className="h-full w-full object-contain" alt="Customized Solutions" />
                        </div>
                        <div className="text-start">
                            <h3 className="font-proxima-nova-bold text-sm text-[#333] 2xl:text-xl">FREE Customized Solutions & Quotation:</h3>
                            <p className="font-proxima-nova-regular text-[12px] text-[#555] 2xl:text-lg">
                                After assessing the site, Weeze offers tailored design solutions with a detailed quotation, ensuring the best
                                cost-effective options for the project.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyBoosters;
