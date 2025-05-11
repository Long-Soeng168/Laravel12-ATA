import React from 'react'
import MyLayoutWestern from '../layout/layout'
import { MyNavbar } from '../components-wu/my-navbar'
import { Link, usePage } from '@inertiajs/react'
import { MyContentWithSlideExtracurricular } from './components/my-content-with-image-slide-extracurricular'
import MyTopMenu from '../components-wu/my-top-menu'

const ExtracurricularActivities = () => {
  const { banner } = usePage().props;
    const { topData } = usePage().props;
    const { dataPage } = usePage().props;
    const { bottomData } = usePage().props;
  return (
   <MyLayoutWestern>
        <div className="font-now-alt-regular">
        <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5]  "style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${banner?.image}`)})`,
                  }}>
                    <MyTopMenu/>
                   <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                    <p className="text-2xl text-white xl:text-5xl">{banner?.title}</p>
                    </div>
                </div>
         </div>
         <MyContentWithSlideExtracurricular banner={banner} bottomData={bottomData} dataPage={dataPage} topData={topData}/>
   </MyLayoutWestern>
  )
}

export default ExtracurricularActivities
