import MyLayoutWestern from '../layout/layout';
import MyCurricullum from './components/my-curriculum';
import { MyCurriculumCard } from './components/my-curriculum-card';
import MyTopMenu from '../components-wu/my-top-menu';
import { usePage } from '@inertiajs/react';

const Curriculum = () => {
    const {curriculumBanner} = usePage().props;
    const {curriculum} = usePage().props;
    return (
        <MyLayoutWestern>
            <div className="font-now-alt-regular">
                <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5] "  style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${curriculumBanner?.image}`)})`,
                  }}>
                   <MyTopMenu/>
                   <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                        <p className="text-2xl text-white xl:text-5xl">{curriculumBanner?.title}</p>
                    </div>
                </div>
            </div>
            <MyCurricullum curriculum={curriculum}/>
            <MyCurriculumCard/>
        </MyLayoutWestern>
    );
};

export default Curriculum;
