import React from 'react'

export default function OfferBooking() {
  return (
    <div className='max-w-[1300px] w-full px-[2%] py-[56px] mx-auto max-md:px-[3%]'>
      <div className='flex flex-col items-center leading-none'>
        <h2 className="text-[30px] text-[#21252C] font-[600] md:text-[56px] text-center mb-4">
          Book 5 Times + <span className='text-[#88907B]'>Get The 6th for Free</span>
        </h2>
        <p className="text-[#808080] text-[16px] md:text-[20px] text-center">
          Get Rewarded With a Free 6th Rental When You Book The Same Boat Service 5 Times
        </p>
      </div>

      {/* SVG display */}
      <div className='pt-[56px]'>
        {/* Desktop SVG */}
        <div className='hidden md:block'>
          <img src='/svg/offer1.svg' alt='Offer Booking Desktop' className="w-full h-auto" />
        </div>

        {/* Mobile SVG */}
        <div className='md:hidden'>
          <img src='/svg/offer2.svg' alt='Offer Booking Mobile' className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
