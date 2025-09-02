import Image from 'next/image'
import React from 'react'
import ContactUsForm from './ContactUsForm'
import { ImGithub } from 'react-icons/im'

export default function ContactUsPage() {
  return (
    <div className='max-w-[1300px]  max-md:px-[4%]   mx-auto' >
        <div className='grid  grid-cols-1 md:grid-cols-[55%_40%] gap-4 py-7 ' >
     <div className='px-4'>
           <div>
                <p className='text-[#808080]  text-[16px]' >
                Need to communicate?
            </p>
            <h1 className=' text-[40px] md:text-[52px] font-semibold  text-[#21252C]' >Contact <span className='text-[#88907B] '>
                Us </span></h1>
        </div>
        <p className='text-[#808080]  text-[16px] flex flex-col gap-6  '>
          <span>
              We're here to help! Whether you have a question about our boat rentals, need fishing tips, or want to share your lake experience, we'd love to hear from you. Our team is dedicated to providing excellent customer service and ensuring that your lake adventure is unforgettable.
          </span>
       
<span>
                Feel free to reach out to us with any questions or concerns. We're always happy to provide guidance, offer advice, or simply chat about the lake. We look forward to hearing from you and helping you make the most of your time on the water.
</span>
        </p>
     </div>
     <div className=' flex flex-col gap-4 ' >

        <div className=' p-3 border border-[#DCD5C5] rounded-4xl px-5' >
            <h2 className='text-[#21252C] font-semibold text-[24px]   '>Contact Our Email</h2>
            <p className='text-[#808080] py-3'>
For long context, feedbacks and text consultation
            </p>
            <div className='flex gap-2 w-fit bg-[#88907B] text-white px-4 py-3 rounded-4xl '>
<span>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.75 6.75V17.25C21.75 17.8467 21.5129 18.419 21.091 18.841C20.669 19.2629 20.0967 19.5 19.5 19.5H4.5C3.90326 19.5 3.33097 19.2629 2.90901 18.841C2.48705 18.419 2.25 17.8467 2.25 17.25V6.75M21.75 6.75C21.75 6.15326 21.5129 5.58097 21.091 5.15901C20.669 4.73705 20.0967 4.5 19.5 4.5H4.5C3.90326 4.5 3.33097 4.73705 2.90901 5.15901C2.48705 5.58097 2.25 6.15326 2.25 6.75M21.75 6.75V6.993C21.75 7.37715 21.6517 7.75491 21.4644 8.0903C21.2771 8.42569 21.0071 8.70754 20.68 8.909L13.18 13.524C12.8252 13.7425 12.4167 13.8582 12 13.8582C11.5833 13.8582 11.1748 13.7425 10.82 13.524L3.32 8.91C2.99292 8.70854 2.72287 8.42669 2.53557 8.0913C2.34827 7.75591 2.24996 7.37815 2.25 6.994V6.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>



</span> <span className='text-[white] text-[14px] md:text-[16px]'>
    booking@castaiclakeboatrental.com
</span>
            </div>

        </div>


     <div className=' p-3 border border-[#DCD5C5] rounded-4xl px-5' >
            <h3 className='text-[#21252C] font-medium  text-[20px] md:text-[24px]'>
                Phone Number
            </h3>
    <div>
                <p className='text-[#808080] py-3'>
                Booking & Question
            </p>
            <div className='flex gap-2 w-fit bg-[#88907B] text-white px-4 py-3 rounded-4xl '>
                <span>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.25 6.75C2.25 15.034 8.966 21.75 17.25 21.75H19.5C20.0967 21.75 20.669 21.5129 21.091 21.091C21.5129 20.669 21.75 20.0967 21.75 19.5V18.128C21.75 17.612 21.399 17.162 20.898 17.037L16.475 15.931C16.035 15.821 15.573 15.986 15.302 16.348L14.332 17.641C14.05 18.017 13.563 18.183 13.122 18.021C11.4849 17.4191 9.99815 16.4686 8.76478 15.2352C7.53141 14.0018 6.58087 12.5151 5.979 10.878C5.817 10.437 5.983 9.95 6.359 9.668L7.652 8.698C8.015 8.427 8.179 7.964 8.069 7.525L6.963 3.102C6.90214 2.85869 6.76172 2.6427 6.56405 2.48834C6.36638 2.33397 6.1228 2.25008 5.872 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V6.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


                </span>
                <span className='text-[14px] md:text-[16px]'>
                    +1 (818) 262 0599
                </span>
            </div>
    </div>
       <div>
                     <p className='text-[#808080] py-3'>
              Emergency Number
            </p>
            <div className='flex gap-2 w-fit bg-[#D97230] px-4 py-3 rounded-4xl '>
                <span>
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 5.75C1.25 14.034 7.966 20.75 16.25 20.75H18.5C19.0967 20.75 19.669 20.5129 20.091 20.091C20.5129 19.669 20.75 19.0967 20.75 18.5V17.128C20.75 16.612 20.399 16.162 19.898 16.037L15.475 14.931C15.035 14.821 14.573 14.986 14.302 15.348L13.332 16.641C13.05 17.017 12.563 17.183 12.122 17.021C10.4849 16.4191 8.99815 15.4686 7.76478 14.2352C6.53141 13.0018 5.58087 11.5151 4.979 9.878C4.817 9.437 4.983 8.95 5.359 8.668L6.652 7.698C7.015 7.427 7.179 6.964 7.069 6.525L5.963 2.102C5.90214 1.85869 5.76172 1.6427 5.56405 1.48834C5.36638 1.33397 5.1228 1.25008 4.872 1.25H3.5C2.90326 1.25 2.33097 1.48705 1.90901 1.90901C1.48705 2.33097 1.25 2.90326 1.25 3.5V5.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


                </span>
                <span className='text-white  text-[14px] md:text-[16px]'>
                    +1 (818) 262 0599
                </span>
            </div>
    </div>
         
            
        </div>
           <div className=' p-3 border border-[#DCD5C5] rounded-4xl px-5' >
               <h3 className='text-[#21252C] font-medium  text-[20px] md:text-[24px]'>
                Social Media
            </h3>
          <p className='text-[#808080] py-3'>
            Follow us on social media to stay updated about Stemcells
          </p>
<div className='flex text-white gap-4'>
    
          <button className='flex gap-2 w-fit bg-[#88907B] px-4 py-3 rounded-4xl'>
           <span>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.017 2H7.947C6.37015 2.00185 4.85844 2.62914 3.74353 3.74424C2.62862 4.85933 2.00159 6.37115 2 7.948L2 16.018C2.00185 17.5948 2.62914 19.1066 3.74424 20.2215C4.85933 21.3364 6.37115 21.9634 7.948 21.965H16.018C17.5948 21.9631 19.1066 21.3359 20.2215 20.2208C21.3364 19.1057 21.9634 17.5938 21.965 16.017V7.947C21.9631 6.37015 21.3359 4.85844 20.2208 3.74353C19.1057 2.62862 17.5938 2.00159 16.017 2ZM19.957 16.017C19.957 16.5344 19.8551 17.0467 19.6571 17.5248C19.4591 18.0028 19.1689 18.4371 18.803 18.803C18.4371 19.1689 18.0028 19.4591 17.5248 19.6571C17.0467 19.8551 16.5344 19.957 16.017 19.957H7.947C6.90222 19.9567 5.90032 19.5415 5.16165 18.8026C4.42297 18.0638 4.008 17.0618 4.008 16.017V7.947C4.00826 6.90222 4.42349 5.90032 5.16235 5.16165C5.90122 4.42297 6.90322 4.008 7.948 4.008H16.018C17.0628 4.00826 18.0647 4.42349 18.8034 5.16235C19.542 5.90122 19.957 6.90322 19.957 7.948V16.017Z" fill="white"/>
<path d="M11.9818 6.81934C10.6133 6.82145 9.30136 7.36612 8.33372 8.33394C7.36609 9.30176 6.82168 10.6138 6.81982 11.9823C6.82141 13.3513 7.36585 14.6637 8.33372 15.6317C9.3016 16.5998 10.6139 17.1445 11.9828 17.1463C13.3519 17.1447 14.6645 16.6002 15.6326 15.6321C16.6007 14.664 17.1452 13.3514 17.1468 11.9823C17.1447 10.6134 16.5998 9.30122 15.6315 8.33353C14.6633 7.36584 13.3507 6.82166 11.9818 6.82034V6.81934ZM11.9818 15.1383C11.1451 15.1383 10.3426 14.8059 9.7509 14.2143C9.15922 13.6226 8.82682 12.8201 8.82682 11.9833C8.82682 11.1466 9.15922 10.3441 9.7509 9.75241C10.3426 9.16074 11.1451 8.82834 11.9818 8.82834C12.8186 8.82834 13.6211 9.16074 14.2127 9.75241C14.8044 10.3441 15.1368 11.1466 15.1368 11.9833C15.1368 12.8201 14.8044 13.6226 14.2127 14.2143C13.6211 14.8059 12.8186 15.1383 11.9818 15.1383Z" fill="white"/>
<path d="M17.1559 8.09509C17.8391 8.09509 18.3929 7.54127 18.3929 6.85809C18.3929 6.17492 17.8391 5.62109 17.1559 5.62109C16.4728 5.62109 15.9189 6.17492 15.9189 6.85809C15.9189 7.54127 16.4728 8.09509 17.1559 8.09509Z" fill="white"/>
</svg>



</span>
           <span className='text-[14px] md:text-[16px]' > Instagram</span>

          </button>
                   <button className='flex gap-2 w-fit bg-[#88907B] px-4 py-3 rounded-4xl'>
           <span>
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7 2.875C13.4734 2.875 12.297 3.36228 11.4296 4.22963C10.5623 5.09699 10.075 6.27337 10.075 7.5V10.075H7.6C7.476 10.075 7.375 10.175 7.375 10.3V13.7C7.375 13.824 7.475 13.925 7.6 13.925H10.075V20.9C10.075 21.024 10.175 21.125 10.3 21.125H13.7C13.824 21.125 13.925 21.025 13.925 20.9V13.925H16.422C16.525 13.925 16.615 13.855 16.64 13.755L17.49 10.355C17.4984 10.3218 17.4991 10.2872 17.492 10.2537C17.485 10.2202 17.4704 10.1888 17.4494 10.1618C17.4283 10.1348 17.4014 10.1129 17.3707 10.0979C17.34 10.0829 17.3062 10.075 17.272 10.075H13.925V7.5C13.925 7.39823 13.945 7.29745 13.984 7.20342C14.0229 7.10939 14.08 7.02396 14.152 6.95199C14.224 6.88003 14.3094 6.82294 14.4034 6.78399C14.4974 6.74505 14.5982 6.725 14.7 6.725H17.3C17.424 6.725 17.525 6.625 17.525 6.5V3.1C17.525 2.976 17.425 2.875 17.3 2.875H14.7Z" fill="white"/>
</svg>

</span>
           <span className='text-[14px] md:text-[16px]'> Facebook</span>

          </button>
    </div>
</div>
         
     </div>

        </div>

   <div className="w-full bg-[#A3AE9E] rounded-[2rem] p-6  text-white ">
      
      {/* Heading */}
      <h4 className="text-[28px] md:text-[32px] font-semibold mb-4 flex gap-2 items-center">
        <span>Our</span> 
        <span className="text-[#21252C]">Location</span>
      </h4>

      {/* Map and Info */}
      <div className=" flex flex-col  gap-6 items-center">
        
        {/* Map */}
        <div className="w-full h-auto md:h-[350px] relative rounded-lg overflow-hidden">
          <img
            src="/image/map.jpg" 
            alt="Map"
       
            className="rounded-4xl   h-full w-full "
          />
        </div>

   
      <div className='flex  max-md:flex-col max-md:gap-4 md:justify-between w-full' >
          <div className="space-y-4 flex flex-col w-full ">
          <div>
            <p className="text-lg font-medium">Castaic Lake Boat Rental</p>
            <p>Pickup location: West ramp</p>
            <p>Return location: West ramp</p>
          </div>

     
          <div className="flex flex-wrap gap-3 mt-2 text-[#21252C]">
            {['Free Parking', 'Inclusive Access', 'Public Transportation'].map((tag, i) => (
              <div key={i} className="px-4 py-2 bg-[#F2EFE9] rounded-full text-sm font-medium">
                {tag}
              </div>
            ))}
          </div>
        </div>
<div className='flex items-end' >
            <button className='flex gap-2 text-nowrap bg-[#88907B] w-full  justify-center   px-2 py-2 rounded-4xl items-center '>
            <span className='text-[white]  text-[13px]'> Get Direction</span>
            <span><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.75 0.75L16 7M16 7L9.75 13.25M16 7H1" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</span>
        </button>
</div>
      </div>
      </div>
    </div>
    <ContactUsForm/>
      
    </div>
  )
}
