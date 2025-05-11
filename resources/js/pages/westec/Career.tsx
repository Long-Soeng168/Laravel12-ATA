import MySlideCareer from '@/components/my-slide-career';
import CareerList from './components/career-list';
import { ContactSection } from './components/contact-section';
import Headline from './components/headline';
import WestecLayout from './layout/layout';
const Career = () => {
    return (
        <WestecLayout>
            <Headline title="Employee Highlights" />
            <MySlideCareer />

            <ContactSection />
            <CareerList />
        </WestecLayout>
    );
};

export default Career;
