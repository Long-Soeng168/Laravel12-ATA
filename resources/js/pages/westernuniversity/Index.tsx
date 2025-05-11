import React from 'react'
import MyLayoutWestern from './layout/layout'
import { MySlideWU } from './components-wu/my-slide'
import MyHeroSection from './components-wu/my-hero-section'
import MyMiddleSection from './components-wu/my-middle-section'
import MyStatistics from './components-wu/my-statistics'
import { MySlideBottom } from './components-wu/my-slide-bottom'
import MyLastestNew from './components-wu/my-lastest-new'

const Index = () => {
  return (
    <MyLayoutWestern>
            <MySlideWU/>
            <MyHeroSection/>
            <MyMiddleSection/>
            <MyStatistics/>
            <MySlideBottom/>
            <MyLastestNew/>
            <div className="relative w-full h-96">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
    style={{ border: "0" }}
    allowFullScreen
    aria-hidden="false"
  ></iframe>
</div>

    </MyLayoutWestern>
  )
}

export default Index

