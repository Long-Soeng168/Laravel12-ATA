import React from 'react'


const MyTopSection = () => {
  return (
    <div className="bg-[#0B2A5B] text-white/80 w-full text-sm py-4">
    <div className="max-w-screen-2xl px-4 sm:px-10 md:px-20 mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <img src='assets/demo-images/icons8-call-80.png' className='w-5'/>
                <span>+855 96 8000 111</span>
            </div>
            <div className="flex items-center space-x-2">
            <img src='assets/demo-images/icons8-location-80.png' className='w-5'/>
                <span>No 145, St.608 Corner St.313, Sangkat Boeng Kork II, Khan Toul Kork, Phnom Penh, Cambodia</span>
            </div>
        </div>

        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
            <img src='assets/demo-images/icons8-mail-80.png' className='w-5'/>
                <span>info_wu@westernuniversity.edu.kh</span>
            </div>
            <div className="flex items-center space-x-2">
            <img src='assets/demo-images/icons8-login-80.png' className='w-5'/>
                <a href="#" className="hover:text-white">Login/Register</a>
            </div>

        </div>
    </div>
</div>
  )
}

export default MyTopSection
