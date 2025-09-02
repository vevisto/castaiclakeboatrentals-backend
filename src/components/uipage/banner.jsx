import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Banner() {
  return (
    <div className='max-w-[1300px] py-[56px] px-[4%]    mx-auto'>

      <div className='grid  grid-cols-1 lg:grid-cols-[40%_60%] h-auto   justify-center items-center  ' >
        <div className='   h-auto md:h-[300px]   w-full ' >

          <img src='/image/pontoonShuttle.jpg' loading="eager"
            width="800"
            height="600"
            alt='' className='h-full    max-md:rounded-t-4xl  object-cover  md:rounded-l-4xl w-full' />
        </div>
        <div className=' md:border-t-2 max-md:border-l-2 border-t-2 border-b-2 border-r-2 max-md:rounded-b-4xl md:rounded-r-4xl px-4 border-[#8080808e] h-full'>
          <div className=' h-full   max-md:gap-5 flex flex-col  justify-between'>
            <div className='flex flex-col  gap-3   leading-none ' >
              <h3 className='text-[#21252C]  font-medium  text-[15px]  mt-4 md:text-[24px] '>Super Fast Track Day Pass</h3>
              <h2 className='text-[#88907B] font-semibold text-[40px]  md:text-[56px]'>Pontoon Shuttle</h2>
              <p className='text-[#808080]  text-[16px] '>
                Don't miss out! Get your Super Fast Track Day Pass now and enjoy priority access to our shuttle service!
              </p>
            </div>

            <div className='flex flex-col  md:flex-row  md:justify-between   md:py-3    h-full md:items-center  '>
              <div className='text-[#808080]'>
                <h4 className='text-[#21252C]  text-[20px] '>Unlock These Benefits:</h4>
                <p className='text-[#808080] text-[16px] ' >- Priority boarding and drop-off</p>
                <p className='text-[#808080] text-[16px] ' >- Skip the lines and save time</p>
                <p className='text-[#808080] text-[16px] ' >- Hassle-free experience on the water</p>
              </div>

              <div className="  h-full flex flex-col  max-md:py-6  md:py-3  justify-end">
                <div className='flex items-center gap-4' >
                  <div className="flex flex-col leading-none items-center">
                    <span className='text-[14px] text-[#808080] line-through italic' >$49.99</span>
                    <span className="ml-2 text-[32px] font-semibold ">$29.99</span>
                  </div>
                  <button type='button' disabled className='h-full cursor-not-allowed bg-[#8080808f] text-[white] text-[20px] px-4 py-2 rounded-[13px] inline-block  w-full'  >
                    <p
                      // href="/booking/pontoonboats"
                      className=" text-center"
                    >

                      Book Now!
                    </p>
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
