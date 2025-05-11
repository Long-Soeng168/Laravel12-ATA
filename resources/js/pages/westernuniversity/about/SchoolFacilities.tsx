import MyLayoutWestern from '../layout/layout';
import MyFacilities from './components/my-facilities';
import MyTopMenu from '../components-wu/my-top-menu';
import { usePage } from '@inertiajs/react';

const SchoolFacilities = () => {
    const { schoolFacilityBanner } = usePage().props;
    const { schoolFacilities } = usePage().props;
    // console.log(schoolFacilities)
    return (
        <MyLayoutWestern>
            <div className="font-now-alt-regular">
                <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5]" 
                 style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${schoolFacilityBanner?.image}`)})`,
                  }}>
                 <MyTopMenu/>
                    <div className="mx-auto flex flex-col h-full w-[55%] items-center justify-center pb-10 text-center">
                    <p className=" text-white text-2xl xl:text-5xl">{schoolFacilityBanner?.title}</p>
                </div>
                </div>
            </div>
            <MyFacilities schoolFacilities={schoolFacilities}/>
        </MyLayoutWestern>
    );
};

export default SchoolFacilities;
