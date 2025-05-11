import MyEvent from './components/my-event';
import MyGoogleMap from './components/my-google-map';
import MyLastestNew from './components/my-lastest-new';
import MyMultipleSlides from './components/my-multiple-slide';
import MyNewHero from './components/my-new-hero';
import MyNewMiddleSection from './components/my-new-middle-section';
import { MyNewSlideBottom } from './components/my-new-slide-bottom';
import { MyNewSlide } from './components/my-slide';
import MyStatistics from './components/my-statistics';
import MyNewLayout from './layout/MyLayout';

const Home = () => {
    return (
        <MyNewLayout>
            <MyNewSlide />
            <MyNewHero />
            <MyNewMiddleSection />
            <MyStatistics />
            <MyEvent/>
            <MyNewSlideBottom />
            <MyLastestNew />
            <MyMultipleSlides />
           <MyGoogleMap/>
        </MyNewLayout>
    );
};

export default Home;
