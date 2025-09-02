import React from 'react'

import ExploreCastaicLake from '@/components/uipage/ExploreCastaicLake'
import OurServices from '@/components/uipage/ourServices'
import Faq from '@/components/uipage/Faq'
import HowtoRent from '@/components/uipage/HowtoRent'
import OfferBooking from '@/components/uipage/OfferBooking'
import LocationDirection from '@/components/uipage/LocationDirection'
import WeatherForecast from '@/components/uipage/WeatherForecast'
import LandingPage from '@/components/uipage/LangingPageSection'
import Banner from '@/components/uipage/banner'
import BoatRentalBooking from '@/components/ui/finding'


export default function Home() {
  return (
    <div className='  '>
      <LandingPage/>
      <HowtoRent/>
      <Banner/>
      <OurServices/>
      <OfferBooking/>
      <ExploreCastaicLake/>
      <LocationDirection/>
      <WeatherForecast/>
   
      <Faq/>
    </div>
  )
}
