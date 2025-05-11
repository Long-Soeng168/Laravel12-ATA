import { MyWelcomeSlide } from "./my-welcome-slide";

const MyHeroSection = ({ welcomePage }) => {
    return (
        <section className="font-now-medium flex flex-col items-center justify-between max-w-screen-2xl px-4 lg:px-20 mx-auto gap-8  py-16 lg:flex-row ">
            <div className="text-center lg:w-1/2 lg:text-left">
                <h2 className=" text-4xl text-center whitespace-pre-line leading-11 font-now-alt-bold text-[#d4050d]">
                {welcomePage.short_description}
                </h2>
                {/* <div className="my-4 h-1 w-16 bg-[#2c318a]"></div> */}
                <p className="text-lg leading-relaxed mt-5 text-[#244494] text-start" dangerouslySetInnerHTML={{ __html: welcomePage.long_description }}>
                </p>
            </div>
            <div className="flex-1 lg:w-1/3">
                <MyWelcomeSlide imageSlide={welcomePage}/>
            </div>
            {/* <div className="lg:w-1/3 flex justify-center shadow">
        <img src="assets/demo-images/logo-WU.png" alt="University Logo" className="max-w-xs lg:max-w-sm"/>
    </div> */}
        </section>
    );
};

export default MyHeroSection;
