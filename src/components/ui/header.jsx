import React from 'react'

export default function Header() {
  return (
    <div className=' h-auto lg:h-[3.5rem]  mb-[10px]  bg-[#C5C5C5]   justify-between items-center      flex w-full  px-[3%]  ' >
      <div className='max-w-[1250px]  flex max-lg:py-2 lg:gap-5 h-full flex-col md:flex-row   items-center justify-between w-full mx-auto' >
        <div className=' flex  border border-[#DCD5C5] bg-[#F2EFE9] w-full items-center gap-5 rounded-4xl ' >
          <div className='bg-[#88907B] flex gap-2 items-center   w-fit py-2 px-3.5 lg:px-7  rounded-r-4xl rounded-l-4xl text-white ' >
            <span className=' flex items-center'>
              <svg width="12" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="#FFFFFF" className='lg:hidden ' />
            </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='lg:block hidden ' >
              <circle cx="8" cy="8" r="8" fill="#FFFFFF" />
            </svg>
            </span>

            <span className='max-md:text-[10px] text-nowrap'>What's New?</span> </div>
          <div className='flex gap-2'>
            <span className='text-[#808080] max-md:text-[10px] flex ' >
              Summer Discount for Family! Limited <span className='md:hidden ' > ..</span> <span className='hidden md:block' > coupons, use now!</span>
            </span>
            <div><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='lg:hidden' >
<path d="M8 1L13 6M13 6L8 11M13 6H1" stroke="#21252C" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='hidden lg:block ' >
<path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#21252C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</div>
            <span>

            </span>

          </div>
        </div>
        <div className=' gap-4 items-center py-1 flex' >
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' max-lg:hidden' >
            <path d="M11.9998 9V12.75M2.69682 16.126C1.83082 17.626 2.91382 19.5 4.64482 19.5H19.3548C21.0848 19.5 22.1678 17.626 21.3028 16.126L13.9488 3.378C13.0828 1.878 10.9168 1.878 10.0508 3.378L2.69682 16.126ZM11.9998 15.75H12.0068V15.758H11.9998V15.75Z" stroke="#21252C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='lg:hidden'>
<path d="M8.49988 5.99995V8.49995M2.29788 10.7506C1.72055 11.7506 2.44255 13 3.59655 13H13.4032C14.5565 13 15.2785 11.7506 14.7019 10.7506L9.79921 2.25195C9.22188 1.25195 7.77788 1.25195 7.20055 2.25195L2.29788 10.7506ZM8.49988 10.5H8.50455V10.5053H8.49988V10.5Z" stroke="#21252C" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          </div>


     <div className='w-full text-[10px] md:text-[16px] text-[#21252C] text-nowrap'>
  Need Immediate Assistance? Call: <a href="tel:+16612574050" className="underline">+1 (661)257-4050</a>
</div>

        </div>
      </div>
    </div>
  )
}
