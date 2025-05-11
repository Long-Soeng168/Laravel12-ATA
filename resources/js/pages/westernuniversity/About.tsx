import { Link, usePage } from '@inertiajs/react';
import { MyContentWithSlide } from './components-wu/my-content-with-image-slide';
import MyEnroll from './components-wu/my-enroll';
import MyHeroBottom from './components-wu/my-hero-bottom';
import MyHeroSection from './components-wu/my-hero-section';
import MyStats from './components-wu/my-stats';

import MyTopMenu from './components-wu/my-top-menu';
import MyVideo from './components-wu/my-video';
import MyLayoutWestern from './layout/layout';

const About = () => {
    const { homePageBanner } = usePage().props;
    const { welcomePage } = usePage().props;
    const { statistic } = usePage().props;
    const { video } = usePage().props;
    const { news } = usePage().props;
    const { enrollYourChild } = usePage().props;
    const { footerACADEMICS } = usePage().props;
    
    

    // console.log(news);
    return (
        <MyLayoutWestern footerACADEMICS={footerACADEMICS}>
            {/* Header */}
            <div className="font-now-alt-medium">
                <div className="aspect-[21/8] w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${homePageBanner?.image}`)})`,
                  }}>
                    <MyTopMenu />
                    <div className="mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-10 text-center md:w-4/5 lg:w-3/5">
                        <p className="font-now-black text-3xl text-white uppercase sm:text-5xl md:text-7xl xl:text-8xl">{homePageBanner?.title}</p>
                        <Link
                            href={homePageBanner?.link}
                            className="mt-2 rounded-full bg-white px-5 py-1 text-base font-bold text-[#272766] transition-transform duration-300 hover:-translate-y-1 sm:px-16 sm:py-3 sm:text-xl md:mt-8 md:text-lg"
                        >
                            {homePageBanner?.short_description}
                        </Link>
                    </div>
                </div>
            </div>
            {/*End Header */}
            <MyHeroSection welcomePage={welcomePage} />
            <MyStats statistic={statistic} />
            <MyVideo videos={video} />
            <MyContentWithSlide news={news} />
            <MyHeroBottom />
            <MyEnroll enrollYourChild={enrollYourChild} />
        </MyLayoutWestern>
    );
};

export default About;
