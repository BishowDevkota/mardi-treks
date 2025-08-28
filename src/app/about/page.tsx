import AboutUs from '@/components/About-page/AboutCompany'
import OurMission from '@/components/About-page/OurMission'
import OurTeam from '@/components/About-page/OurTeam'
import Testimonials from '@/components/About-page/Testimonials'
import SubHero from '@/components/SubHeroComponent'
import React from 'react'

const About = () => {
  return (<>
  <SubHero siteTitle="About" backgroundImage='/images/slide3.jpg' />
    <AboutUs />
    <OurTeam />
    <OurMission/>
    <Testimonials/>
  </>
    
  )
}

export default About