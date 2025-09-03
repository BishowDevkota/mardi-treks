import ContactForm from '@/components/Contact/ContactForm'
import HowToFindUs from '@/components/Contact/HowToFindUs'
import Map from '@/components/Contact/Map'
import SubHero from '@/components/SubHeroComponent'
import React from 'react'

const Contact = () => {
  return (
    <div>
      <SubHero siteTitle='Contact' backgroundImage='/images/slide3.jpg'/>
      <HowToFindUs/>
      <ContactForm/>
      <Map/>
    </div>
  )
}

export default Contact