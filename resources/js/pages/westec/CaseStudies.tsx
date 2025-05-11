import MySlide from '@/components/my-slide';
import { ContactSection } from './components/contact-section';
import WestecLayout from './layout/layout';
import { CaseStudySection } from './components/case-study-section';

const Solutions = () => {
    return (
        <WestecLayout>
            <MySlide />

            <CaseStudySection defaultDropDown={true} />
            <CaseStudySection defaultDropDown={false} />

            <ContactSection />

            <CaseStudySection defaultDropDown={false} />
            <CaseStudySection defaultDropDown={false} />

            <ContactSection />

            <CaseStudySection defaultDropDown={false} />
            <CaseStudySection defaultDropDown={false} />
        </WestecLayout>
    );
};

export default Solutions;
