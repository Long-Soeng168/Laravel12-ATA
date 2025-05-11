import CatalogFunctionality from './components/catalog-functionality';
import HeroTwo from './components/hero-two';
import OurIntegratedSolutions from './components/our-integrated-solutions';
import OurResources from './components/our-resources';
import OurServices from './components/our-services';
import TechnologyBasedSolutions from './components/technology-based-solutions';
import WhyChooseUs from './components/why-choose-us';
import CamActiveLayout from './layouts/CamActiveLayout';

const Solutions = () => {
    return (
        <CamActiveLayout>
            <HeroTwo />
            <OurServices />
            <OurResources />
            <CatalogFunctionality />
            <OurIntegratedSolutions />
            <TechnologyBasedSolutions />
            <WhyChooseUs />
        </CamActiveLayout>
    );
};

export default Solutions;
