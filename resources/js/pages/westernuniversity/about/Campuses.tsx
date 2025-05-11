import { usePage } from '@inertiajs/react';
import MyTopMenu from '../components-wu/my-top-menu';
import MyLayoutWestern from '../layout/layout';
import MyCampusesCard from './components/my-campuses-card';

const Campuses = () => {
    const { campuseBanner } = usePage().props;
    return (
        <MyLayoutWestern>
            <div>
                <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5] "
                style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${campuseBanner?.image}`)})`,
                  }}
                >
                    <MyTopMenu />
                    <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                        <p className="text-2xl text-white xl:text-5xl">{campuseBanner?.title}</p>
                    </div>
                </div>
            </div>
            <div className="bg-blue-50">
                <MyCampusesCard />
            </div>
        </MyLayoutWestern>
    );
};

export default Campuses;
