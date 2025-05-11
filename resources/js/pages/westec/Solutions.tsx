import MySlide from '@/components/my-slide';
import { ContactSection } from './components/contact-section';
import { FeatureSection } from './components/feature-section';
import { HeroSection } from './components/hero-section';
import WestecLayout from './layout/layout';

const Solutions = () => {
    return (
        <WestecLayout>
            <MySlide />

            <FeatureSection defaultDropDown={true} />
            <FeatureSection defaultDropDown={false} />

            <ContactSection />

            <FeatureSection defaultDropDown={false} />
            <FeatureSection defaultDropDown={false} />

            <ContactSection />
        </WestecLayout>
    );
};

export default Solutions;
