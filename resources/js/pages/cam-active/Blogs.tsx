import BlogPosts from './components/blogs';
import OurCommitment from './components/our-commitment';
import OurGlobalReach from './components/our-global-reach';
import OurPartners from './components/our-partners';
import WhoWeAre from './components/who-we-are';
import WhoWeServe from './components/who-we-serve';
import CamActiveLayout from './layouts/CamActiveLayout';

const Company = () => {
    return (
        <CamActiveLayout>
            <BlogPosts />
        </CamActiveLayout>
    );
};

export default Company;
