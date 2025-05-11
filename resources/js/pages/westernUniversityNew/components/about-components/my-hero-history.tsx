import React from 'react'

const MyHeroHistory = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid md:flex gap-10 md:gap-12 px-6 mt-12">
        <div>
          <h1 className="font-noto-san-extra-light max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
          Our Hestory
          </h1>
          <div className="my-10 border-[1.5px] border-black w-15 "/>
          <p className="mt-6 max-w-[70ch] text-base text-gray-600">
          Western International School (WIS) first opened its doors on September 1, 2003, and has experienced exponential growth every year. In 2003, we recruited 262 students from kindergarten to grade 11 with only 1 campus. For the Academic Year 2019-2020, nearly 7,561 students enrolled from Nursery to Grade 12 and we have 16 Campuses in Phnom Penh Takhmao and Sihanouk Branch.
          </p>
          
        </div>
        <div className="w-full md:flex-1 overflow-hidden " >
            <img src="/assets/demo-images/Homepage/03_welcome_to_western_1.jpg" className="rounded-sm w-full h-[65%] object-cover aspect-square"/>
            <p className='mt-4 text-red-600 text-lg font-bold font-noto-san-extra-light'>Western International School (WIS)</p>
            <p className='text-gray-600 mt-5 text-base'>we recruited 262 students from kindergarten to grade 11 with only 1 campus. For the Academic Year 2019-2020</p>
        </div>
      </div>
    </div>
  )
}

export default MyHeroHistory;
