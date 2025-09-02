import Image from 'next/image';
import React from 'react';

const rentSteps = [
  {
    icon: '/svg/rent1.svg',
    title: ['Choose Your Boat Service'],
    title1: ['Choose Your Boat', 'Service'],
    description: 'Browse our selection and pick the perfect boat for your adventure.',
  },
  {
    icon: '/svg/rent2.svg',
    title: ['Customize Your Day with Essentials'],
    title1: ['Customize Your Day with Essentials'],
    description: 'Add fishing gear, snacks, or food to make your day unforgettable.',
  },
  {
    icon: '/svg/rent3.svg',
    title: ['Easy Book and Pay Everywhere'],
    title1: ['Easy Book and Pay', 'Everywhere'],
    description: 'Book and pay seamlessly in one place, all online.',
  },
  {
    icon: '/svg/rent4.svg',
    title: ['Enjoy Your Time on the Water'],
    title1: ['Enjoy Your Time on the', 'Water'],
    description: 'Pick up the boat at the marina and enjoy your time on Lake Tahoe!',
  },
];

export default function HowtoRent() {
  return (
    <div className='max-w-[1300px]   px-[3%] py-[56px]  mx-auto'>
      <div className='flex items-center flex-col text-center'>
        <p className='text-[#808080]  text-[20px] '>How to Rent</p>
        <h2 className='text-[#21252C]   font-semibold leading-tight text-[32px]  md:text-[56px]'>
          From rentals to lake tours, we make every <br className='max-md:hidden' />
          boating service <span className='text-[#88907B]'>simple and enjoyable!</span>
        </h2>
      </div>

      <div className='grid pt-[56px] grid-cols-1 lg:grid-cols-4 gap-2'>
        {rentSteps.map((step, index) => (
          <div key={index} className='flex flex-col  items-center text-center'>
            <div className='flex h-[120px]'>
              <Image
                src={step.icon}
                alt={`Step ${index + 1}`}
                height={500}
                width={500}
                quality={100}
              />
            </div>
            <div className=' rounded-lg p-3'>
              <h3 className='text-[#21252C] md:hidden font-medium text-[20px]   mb-2'>
                {step.title.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== step.title.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
                 <h3 className='text-[#21252C]  hidden md:block font-medium text-[24px]   mb-2'>
                {step.title1.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== step.title1.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <p className=' text-[16px] text-[#808080]'>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
