import React from 'react'
import BoatRentalBooking from '../ui/finding'



export default function LandingPage() {
  return (
<div className=' flex flex-col overflow-hidden'>
      <div className=' h-auto md:h-[600px]   justify-center max-w-[1300px]  mx-auto  relative flex w-full  max-md:px-[1rem]  ' >
      <section
        className="relative  w-full     h-[550px] md:h-[560px]  max-w-[1300px]  mx-auto  rounded-[40px]  lg:rounded-[80px]  flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/image/bg.webp)`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0    rounded-[40px] lg:rounded-[80px] z-0"></div>

           <div className="absolute zindex   w-full  rounded-[12px]  lg:rounded-[24px]  h-auto  -bottom-1 md:bottom-0  z-50 flex flex-col items-center gap-2">
       <div className=' relative justify-between flex h-[px] md:h-[350px]   w-full'>
        
<div className='md:-ml-[175px] -ml-[125px]  -rotate-10 md:max-w-[350px] max-w-[250px] w-full '>
  <img src='/image/landing2.webp'  alt='image' className='h-full w-full' />
</div>
<div className='md:-mr-[175px] -mr-[125px] rotate-10 md:max-w-[350px]  max-w-[250px] flex w-full '>
  <img src='/image/landing1.webp'  alt='image' className='h-full  w-full' />
</div>
       </div>


        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-[#FFFFFF]  -mt-14   w-full  px-4 max-w-[1300px]">
          <div className=" flex justify-center  gap-2 text-[15px] text-[#21252C] poppins-semibold   font-medium mb-1"><div className=' px-3 rounded-4xl py-2 md:text-[14px] text-[10px] text-nowrap text-[#FFFFFF]   bg-[#88907B]' >
            15+ Boats Collection </div>
            <div className=' px-3 rounded-4xl py-2 text-nowrap md:text-[14px] text-[10px] text-[#FFFFFF]  bg-[#88907B]' >
              Expert Captains & Crew </div>
          </div>
          <h1 className=" text-[40px] w-full lg:text-nowrap lg:text-[80px]  poppins-semibold  leading-none tracking-wider">
            Experience the Freedom <br className='hidden md:block ' />
            of <br className=' md:hidden' /> {""}
            <span className="relative  poppins-semibold  inline-block">
              Castaic Lake
              <span className="absolute -bottom-1 left-0 w-full   overflow-hidden rounded-full -z-10">


                <svg width="600" height="17" viewBox="0 0 492 17" fill="none" xmlns="http://www.w3.org/2000/svg" className=' w-full'>
                  <path d="M489 12.8649L481.193 7.6595C473.296 2.39436 463.038 2.27768 455.023 7.36182L453.537 8.30422C445.69 13.2825 435.673 13.2825 427.825 8.30423L426.014 7.15523C418.166 2.17699 408.15 2.17698 400.302 7.15522L398.491 8.30422C390.643 13.2825 380.627 13.2825 372.779 8.30421L370.968 7.15525C363.12 2.17699 353.103 2.17699 345.256 7.15525L343.444 8.30422C335.597 13.2825 325.58 13.2825 317.732 8.30423L315.921 7.15524C308.073 2.17699 298.057 2.17699 290.209 7.15525L288.398 8.30422C280.55 13.2825 270.534 13.2825 262.686 8.30423L261.574 7.59882C253.37 2.39467 242.838 2.64981 234.896 8.2451L234.523 8.50771C226.405 14.2266 215.604 14.3558 207.352 8.83289L205.658 7.69901C197.757 2.4115 187.481 2.28557 179.453 7.37791L177.993 8.30421C170.145 13.2825 160.128 13.2825 152.281 8.30423L150.469 7.15524C142.622 2.17699 132.605 2.17699 124.757 7.15524L122.946 8.30422C115.098 13.2825 105.082 13.2825 97.2342 8.30421L95.4229 7.15524C87.5751 2.17699 77.5587 2.17699 69.7109 7.15525L67.8996 8.30422C60.0519 13.2825 50.0354 13.2825 42.1876 8.30421L40.1009 6.98046C32.3958 2.09273 22.5856 1.99704 14.7866 6.73355L3 13.8919" stroke="#88907B" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          <p className="mt-9 poppins-regular text-[#F2EFE9]    text-[16px] lg:text-[20px]  md:text-lg">
            Rent your dream boat and explore the ocean's vast possibilities <br className='hidden md:block ' /> with unparalleled freedom and adventure.
          </p>
        </div>
 

        {/* Button at bottom center */}
        <div className="  max-lg:hidden absolute zindex    rounded-[13px]  lg:rounded-[24px]  h-auto  -bottom-[30px]  z-50 flex flex-col items-center gap-2">
          <h3 className='text-white text-[16px] font-bold ' >Fill Form to Find Boat </h3>
          <BoatRentalBooking />

        </div>
      </section>
   
    </div>
               <div className="   lg:hidden  my-7     rounded-[12px]   h-auto    z-50 flex  flex-col items-center gap-2">
          <h3 className='text-[gray] font-semibold' >Fill Form to Find Boat </h3>
          <BoatRentalBooking />

        </div>
</div>
  )
}
