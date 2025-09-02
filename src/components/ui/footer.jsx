'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import BoatRentalBooking from './finding';

const navItems = [
  { label: 'Home', href: '/' },

  { label: 'Articles', href: '/articles' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: 'contact-us' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className=' py-3  bg-[#FFF6F4] w-full    flex justify-center' >
        <div className='flex items-center gap-2 ' >
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' max-lg:hidden' >
              <path d="M11.9998 9V12.75M2.69682 16.126C1.83082 17.626 2.91382 19.5 4.64482 19.5H19.3548C21.0848 19.5 22.1678 17.626 21.3028 16.126L13.9488 3.378C13.0828 1.878 10.9168 1.878 10.0508 3.378L2.69682 16.126ZM11.9998 15.75H12.0068V15.758H11.9998V15.75Z" stroke="#D97230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='lg:hidden'>
              <path d="M8.49988 5.99995V8.49995M2.29788 10.7506C1.72055 11.7506 2.44255 13 3.59655 13H13.4032C14.5565 13 15.2785 11.7506 14.7019 10.7506L9.79921 2.25195C9.22188 1.25195 7.77788 1.25195 7.20055 2.25195L2.29788 10.7506ZM8.49988 10.5H8.50455V10.5053H8.49988V10.5Z" stroke="#D97230" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
        <div className="w-full text-[12px] md:text-[16px] text-[#D97230] whitespace-nowrap">
  Need Immediate Assistance? Call:{" "}
  <a href="tel:+16612574050" className="underline hover:text-[#b55d26]">
    +1 (661) 257-4050
  </a>
</div>



        </div>
      </div>

      <div className='bg-[#88907B] text-white'>
        <div className="max-w-[1300px] py-16 px-[2%] mx-auto md:space-y-12">
          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-2">Ready to Set Sail?</h2>
            <p className="text-[16px] md:text-[20px] ">Experience the freedom of Lake Tahoe with our boat rentals</p>
          </div>



          <div>
            {/* <BoatRentalBooking/> */}
          </div>
          <nav className="flex  max-md:flex-col max-md:gap-6 md:justify-between items-center    border-white/20 ">
            <Link href="/" className="flex items-center max-md:mt-[28px]  ">
              <img
                src="/image/loga.png"
                alt="Logo"
        
                className=""
              />
            </Link>
            <ul className="flex max-md:mb-[28px]  max-md:text-center md:flex-row flex-col gap-6 ">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-yellow-400 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>



          <div className="w-full overflow-hidden pb-5  ">
            <svg width="1282" height="14" viewBox="0 0 1282 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1281 1L1247.7 10.1111C1240.79 12.0023 1233.5 12.0023 1226.59 10.1111L1203.85 3.88892C1196.94 1.99774 1189.65 1.99774 1182.74 3.88893L1160 10.1111C1153.09 12.0023 1145.79 12.0023 1138.88 10.1111L1116.14 3.88893C1109.23 1.99775 1101.94 1.99775 1095.03 3.88893L1072.29 10.1111C1065.38 12.0023 1058.09 12.0023 1051.18 10.1111L1028.44 3.88894C1021.53 1.99776 1014.23 1.99776 1007.32 3.88894L984.583 10.1111C977.672 12.0023 970.38 12.0023 963.468 10.1111L940.73 3.88895C933.818 1.99777 926.526 1.99777 919.615 3.88895L896.876 10.1111C889.965 12.0023 882.673 12.0023 875.761 10.1111L853.023 3.88895C846.112 1.99777 838.819 1.99777 831.908 3.88896L809.169 10.1111C802.258 12.0023 794.966 12.0023 788.055 10.1111L765.316 3.88896C758.405 1.99778 751.112 1.99778 744.201 3.88897L721.462 10.1111C714.551 12.0023 707.259 12.0023 700.348 10.1111L677.609 3.88897C670.698 1.99779 663.405 1.99779 656.494 3.88897L633.755 10.1111C626.844 12.0023 619.552 12.0023 612.641 10.1111L589.902 3.88898C582.991 1.9978 575.698 1.9978 568.787 3.88898L546.049 10.1111C539.137 12.0023 531.845 12.0023 524.934 10.1111L502.195 3.88899C495.284 1.99781 487.991 1.99781 481.08 3.88899L458.342 10.1111C451.43 12.0023 444.138 12.0023 437.227 10.1112L414.488 3.88899C407.577 1.99781 400.285 1.99781 393.373 3.88899L370.635 10.1112C363.723 12.0023 356.431 12.0023 349.52 10.1112L328.099 4.24958C320.361 2.13226 312.166 2.39042 304.577 4.99052L294.164 8.5582C285.76 11.4373 276.638 11.4373 268.234 8.5582L259.139 5.44198C250.735 2.56286 241.613 2.56287 233.209 5.44198L224.114 8.5582C215.711 11.4373 206.588 11.4373 198.185 8.5582L189.089 5.44198C180.686 2.56287 171.563 2.56287 163.16 5.44199L154.064 8.55821C145.661 11.4373 136.538 11.4373 128.135 8.55821L119.039 5.44199C110.636 2.56288 101.513 2.56288 93.1099 5.442L84.0145 8.55822C75.6111 11.4373 66.4884 11.4373 58.085 8.55821L48.9896 5.442C40.5862 2.56288 31.4635 2.56289 23.0601 5.442L0.999982 13.0001" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>

          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-3  text-center gap-[24px] text-sm">
            <div className='font-light'>
              <h3 className="font-medium text-lg mb-2">Opening Hours</h3>
              <p>Monday to Sunday: 6:30 AM – 7:30 PM</p>
            </div>
            <div className='font-light'>
              <h3 className="font-medium text-lg mb-2">Address</h3>
              <div className='flex flex-col gap-[8px]'>
                <p>Castaic Lake Boat Rental</p>
                <p>Pickup Location : West Ramp</p>
                <p>Return Location : West Ramp</p>
              </div>
            </div>
            <div className='font-light' >
              <h3 className="font-medium text-lg mb-2">Contact</h3>
              <div className='flex gap-2 justify-center ' ><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_19499_4916)">
                  <path d="M17.167 3.3335H3.83366C2.91699 3.3335 2.17533 4.0835 2.17533 5.00016L2.16699 15.0002C2.16699 15.9168 2.91699 16.6668 3.83366 16.6668H17.167C18.0837 16.6668 18.8337 15.9168 18.8337 15.0002V5.00016C18.8337 4.0835 18.0837 3.3335 17.167 3.3335ZM16.3337 15.0002H4.66699C4.20866 15.0002 3.83366 14.6252 3.83366 14.1668V6.66683L9.61699 10.2835C10.1587 10.6252 10.842 10.6252 11.3837 10.2835L17.167 6.66683V14.1668C17.167 14.6252 16.792 15.0002 16.3337 15.0002ZM10.5003 9.16683L3.83366 5.00016H17.167L10.5003 9.16683Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_19499_4916">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
                <a href="mailto:booking@castaiclakeboatrental.com" className="hover:underline">booking@castaiclakeboatrental.com</a></div>
              <div className='flex gap-2 py-2  justify-center'><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.66673 4.66667H11.3334V6.33333C11.3334 6.79167 11.7084 7.16667 12.1667 7.16667C12.6251 7.16667 13.0001 6.79167 13.0001 6.33333V4.66667H14.6667C15.1251 4.66667 15.5001 4.29167 15.5001 3.83333C15.5001 3.375 15.1251 3 14.6667 3H13.0001V1.33333C13.0001 0.875 12.6251 0.5 12.1667 0.5C11.7084 0.5 11.3334 0.875 11.3334 1.33333V3H9.66673C9.2084 3 8.8334 3.375 8.8334 3.83333C8.8334 4.29167 9.2084 4.66667 9.66673 4.66667ZM14.0084 10.725L11.8917 10.4833C11.3834 10.425 10.8834 10.6 10.5251 10.9583L8.99173 12.4917C6.6334 11.2917 4.70007 9.36667 3.50007 7L5.04173 5.45833C5.40007 5.1 5.57507 4.59167 5.51673 4.09167L5.27507 1.99167C5.1834 1.15 4.46673 0.508333 3.62507 0.508333H2.1834C1.24173 0.508333 0.4584 1.29167 0.516733 2.23333C0.9584 9.35 6.65007 15.0333 13.7584 15.475C14.7001 15.5333 15.4834 14.75 15.4834 13.8083V12.3667C15.4917 11.5333 14.8501 10.8167 14.0084 10.725Z" fill="white" />
              </svg>
                <a href="tel:+18182620599" className="hover:underline">+1 (818) 262 0599</a></div>
            </div>
          </div>




          <div className="text-center  max-md:flex-col  gap-5 flex justify-center text-sm text-white/80">
            <div>   © {currentYear} WaveRent. All Rights Reserved.</div>

            <div className="flex max-md:justify-center gap-5">
              {/* Facebook */}
              <Link href="https://www.facebook.com/people/Castaic-lake-boat-rental/61575704047228/" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6H13.5C12.9477 6 12.5 6.44772 12.5 7V10H16.5C16.6137 9.99748 16.7216 10.0504 16.7892 10.1419C16.8568 10.2334 16.8758 10.352 16.84 10.46L16.1 12.66C16.0318 12.8619 15.8431 12.9984 15.63 13H12.5V20.5C12.5 20.7761 12.2761 21 12 21H9.5C9.22386 21 9 20.7761 9 20.5V13H7.5C7.22386 13 7 12.7761 7 12.5V10.5C7 10.2239 7.22386 10 7.5 10H9V7C9 4.79086 10.7909 3 13 3H16.5C16.7761 3 17 3.22386 17 3.5V5.5C17 5.77614 16.7761 6 16.5 6Z" fill="white" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link href="https://www.instagram.com/castaiclakeboatrentals" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z" fill="white" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
