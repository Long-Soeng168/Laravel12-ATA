import FeaturedSolutions from './components/featured-solutions';
import HeroOne from './components/hero-one';
import OurExpertise from './components/our-expertise';
import Testimonials from './components/testimonials';
import WhyChooseUs from './components/why-choose-us';
import CamActiveLayout from './layouts/CamActiveLayout';

const Index = () => {
    return (
        <CamActiveLayout>
            <HeroOne />
            <OurExpertise />
            <FeaturedSolutions />
            <WhyChooseUs />
            <Testimonials />
        </CamActiveLayout>
    );
};

export default Index;
