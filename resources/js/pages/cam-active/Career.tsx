import CareerList from './components/career-list';
import MySlideCareer from './components/my-slide-career';
import CamActiveLayout from './layouts/CamActiveLayout';

const Company = () => {
    return (
        <CamActiveLayout>
            <MySlideCareer />
            <CareerList />
        </CamActiveLayout>
    );
};

export default Company;
