import { usePage } from '@inertiajs/react';
import MyTopMenu from '../components-wu/my-top-menu';
import MyLayoutWestern from '../layout/layout';
import MyHero from './components/my-hero';
import { MyMainSlide } from './components/my-main-slide';
import MyTimeLine from './components/my-time-line';
import MyWiscare from './components/my-wiscare';

const HestoryAndValues = () => {
    const { ourHistory } = usePage().props;
    const { timeLine } = usePage().props;
    const { ourVision } = usePage().props;
    const { ourMission } = usePage().props;
    const { valuesWiscare } = usePage().props;
    const { ourHistoryBanner } = usePage().props;
    // console.log(ourHistoryBanner);

    return (
        <MyLayoutWestern>
            <div>
                <div
                    className={'aspect-[21/9] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/9]'}
                    style={{
                        backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${ourHistoryBanner?.image}`)})`,
                      }}
                >
                    <MyTopMenu />
                    <div className="py-20">
                        <p className="text-center text-5xl text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{ourHistory?.title}</p>
                        <div className="flex items-center justify-center">
                            <div className="mx-auto grid w-full max-w-screen-2xl gap-12 px-4 py-12 sm:px-10 md:px-20 lg:grid-cols-2">
                                <div className="bg-accent aspect-video h-full w-full rounded-2xl">
                                    <MyMainSlide images={ourHistory?.images} route="/assets/images/pages/thumb/" />
                                </div>
                                <div className="rounded-2xl bg-[#3d5536]/50 p-4 text-white">
                                    <p className="mt-6 max-w-[60ch] text-xl whitespace-pre-line">{ourHistory?.short_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MyTimeLine timelineData={timeLine} />
            <MyHero ourMission={ourMission} ourVision={ourVision} />
            <MyWiscare valuesWiscare={valuesWiscare} />
        </MyLayoutWestern>
    );
};

export default HestoryAndValues;
