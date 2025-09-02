import Image from 'next/image'
import React from 'react'

export default function ExploreCastaicLake() {
  return (
    <div className='max-w-[1300px] max-md:px-[4%] px-[2%] py-[56px]  mx-auto' >
        <div className=' w-full flex  flex-col  items-center' >
            <h4 className='text-[#808080]  text-[20px] ' >
                Explore Cataic Lake
            </h4>

            <h2 className='flex  text-[30px] max-md:text-center  font-semibold md:text-[56px]  leading-tight     flex-col'>
                <span className='text-[#21252C]'>
                    Discover the Beauty and
                </span>
                <span className='text-[#88907B]'>
                    Adventure of Castaic Lake
                </span>
            </h2>

        </div>



<div className='grid  grid-cols-1 md:grid-cols-[55%_40%]   pt-[56px]  ' >
  <div className=' flex   h-[200px] md:h-[400px]  w-full md:w-[624px] rounded-[12x]  '>
                <img src='/image/about.jpg'  alt='' className='h-full w-full rounded-[40px]' />
            </div>

    <div>
        <h3 className=' text-[24px] md:text-[32px] font-semibold py-2 text-[#21252C]' >
            About Castaic Lake
        </h3>
        <p className='text-[#808080]  text-[14px] flex md:text-[16px] flex-col gap-5 '>
      <span>
              Castaic Lake is a stunning reservoir nestled in the Sierra Pelona Mountains of California, offering a tranquil escape from the hustle and bustle of city life. This picturesque lake is a haven for outdoor enthusiasts, providing a serene and peaceful atmosphere perfect for relaxation and adventure. With its crystal-clear waters and scenic surroundings, Castaic Lake is a must-visit destination for anyone looking to connect with nature.
      </span>
        
          <span>
              Whether you're a local or just visiting, Castaic Lake has something for everyone. From boating and fishing to simply taking in the breathtaking views, this lake is a treasure trove of outdoor experiences. So why not come and discover the magic of Castaic Lake for yourself?
          </span>

        </p>
    </div>

</div>


    </div>
  )
}
