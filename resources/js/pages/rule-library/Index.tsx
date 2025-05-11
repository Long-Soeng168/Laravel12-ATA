import MyHeader from './components/my-header';
import { MyHero } from './components/my-hero';

const Index = () => {
    return (
        <>
            {/* Start Header */}
            <header>
                <MyHero />
                <div className='bg-true-primary dark:bg-black'>
                    <MyHeader />
                </div>
            </header>

            {/* End Header */}
        </>
    );
};

export default Index;
