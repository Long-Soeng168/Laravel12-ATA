import React from 'react'
import MyLayoutWestern from '../layout/layout'
import { Link, usePage } from '@inertiajs/react'
import { MyNavbar } from '../components-wu/my-navbar'
import MyAdmissionFeature from './components/my-admission-feature'
import MyTable from './components/my-table'
import MyTopMenu from '../components-wu/my-top-menu'

const Index = () => {
  const {admissionBanner} = usePage().props;
  const {admission} = usePage().props;
  const {table} = usePage().props;
  
  
  // console.log(admission);
  return (
    <MyLayoutWestern>
         <div className="font-now-alt-regular">
                <div className="aspect-[21/5] w-full bg-cover bg-center bg-no-repeat lg:aspect-[21/5]" style={{
                    backgroundImage: `url(${encodeURI(`/assets/images/banners/thumb/${admissionBanner?.image}`)})`,
                  }}>
                   <MyTopMenu/>
                   <div className="mx-auto flex h-full w-[55%] flex-col items-center justify-center pb-10 text-center">
                    <p className="text-2xl text-white xl:text-5xl">{admissionBanner?.title}</p>
                    </div>
                </div>
         </div>
         <MyAdmissionFeature admission={admission}/>
         <MyTable table={table}/>
    </MyLayoutWestern>
  )
}

export default Index
