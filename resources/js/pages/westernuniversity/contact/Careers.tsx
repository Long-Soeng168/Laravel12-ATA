import React from 'react'
import MyLayoutWestern from '../layout/layout'
import { Link } from '@inertiajs/react'
import { MyNavbar } from '../components-wu/my-navbar'
import MyCareersCardList from './components/my-careers'
import MyTopMenu from '../components-wu/my-top-menu'

const Careers = () => {
  return (
    <MyLayoutWestern>
        <div className="font-now-alt-regular">
        <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5] bg-[url('/assets/demo-images/02TopBackground/11OutreachPrograms.jpg')] ">
        <MyTopMenu/>
                   <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                    <p className="text-2xl text-white xl:text-5xl">Job Opportunities</p>
                    </div>
                </div>
         </div>
         <MyCareersCardList/>
    </MyLayoutWestern>
  )
}

export default Careers
