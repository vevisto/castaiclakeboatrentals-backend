import Image from 'next/image'
import React from 'react'

export default function AboutUsPage() {
    return (
        <div className='max-w-[1300px] max-md:px-[4%] px-[2%] mx-auto' >



            <div className='grid grid-cols-1  md:grid-cols-[30%_60%] gap-3 py-7 '>
                <div>
                    <h1 className=' text-[40px] font-semibold md:text-[52px] text-[#21252C] ' >
                        About <span className='text-[#88907B] '> Us</span>
                    </h1>
                    <p className='text-[16px] md:text-[20px] text-[#808080]'>Your Premier Source for Lake Life</p>

                </div>
                <div  className='text-[#808080]  '>
                    <p className='flex text-[16px] md:text-[20px] flex-col gap-3'>
                    <span>
                            Welcome to Castaic Lake Boat Rental, your premier destination for unforgettable boating experiences on Castaic Lake. We offer a wide range of top-quality boats for rent, carefully selected to ensure your time on the water is safe, enjoyable, and tailored to your needs.
                    </span>
                    
               <span>
                         From serene fishing trips to exhilarating water sports, our boat rental options cater to all ages and skill levels. Our team is passionate about providing exceptional service, ensuring that every detail is taken care of so you can focus on making memories with family and friends. Whether you're a local or just visiting, we invite you to experience the beauty and adventure of Castaic Lake with us.
               </span>
                    </p>

                </div>

            </div>
            <div className=' flex  h-auto md:h-[350px] my-7 w-full rounded-[30px]  '>
                <img src='/image/aboutus.webp'   alt ='' className='h-full w-full md:object-cover rounded-[30px]' />
            </div>

            <div className='grid grid-cols-1  py-8 md:grid-cols-2' >
                <div className=' flex flex-col' >
                    <h2 className=' text-center  py-4 text-[20px] md:text-[24px] font-semibold text-[#88907B]' >
                        Our Mission
                    </h2>
                    <p className='text-[#808080] text-[16px] md:text-[20px]  '>
                        Our mission is to provide a safe, enjoyable, and hassle-free boating experience for our customers. We strive to build long-lasting relationships with our clients and provide them with the best boats and equipment to suit their needs.

                    </p>

                </div>

          <div className="flex flex-col">
  <h2 className="text-center py-4 font-medium  text-[20px] md:text-[24px] text-[#88907B]">
    Our Values
  </h2>
  <ul className="list-disc pl-6  text-[16px] md:text-[20px] space-y-2 text-[#808080]">
    <li>Wide range of boats to choose from, suitable for all ages and skill levels</li>
    <li>Top-quality boats, well-maintained and regularly inspected for safety</li>
    <li>Competitive pricing and flexible rental options</li>
    <li>Exceptional customer service and support</li>
  </ul>
</div>


            </div>

        </div>
    )
}
