import MyLayoutWestern from '../layout/layout'
import MyProgramsFeature from './components/my-programs-feature'
import MyTopMenu from '../components-wu/my-top-menu'
import { usePage } from '@inertiajs/react'

const Programs = () => {
  const { programBanner } = usePage().props;
  const { programs } = usePage().props;
  // console.log(programBanner);
  return (
    <MyLayoutWestern>
         <div className="font-now-alt-regular">
                <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5] "
                style={{
                  backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${programBanner?.image}`)})`,
                }}>
                    <MyTopMenu/>
                    <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                    <p className="text-2xl text-white xl:text-5xl">{programBanner?.title}</p>
                    </div>
                </div>
         </div>
         <MyProgramsFeature programs={programs}/>
    </MyLayoutWestern>
  )
}

export default Programs
