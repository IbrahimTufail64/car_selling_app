"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car1 from '@/assets/SmartAdvice1.png'
import car2 from '@/assets/SmartAdvice2.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'
import phoneW from '@/assets/icons/phone.png'
import emailW from '@/assets/icons/email.png'
import phoneD from '@/assets/icons/phoneDark.png'
import emailD from '@/assets/icons/emailDark.png'
import { useRouter } from 'next/navigation';
import { useAppContext } from '../Context';

const SmartAdvice = () => {

  const router = useRouter();
  const {isVendor} = useAppContext(); 
  const phone = isVendor ? phoneD : phoneW;
  const email = isVendor ? emailD : emailW;
  
  return (
    <div className={`w-full ${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'}`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href={`./tyre_health`}><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>smart advice</div>
        </div>

        <div className='space-y-4 px-4 mt-5'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <div>New Tyres</div>
                  </div>
                  <div className=" pt-3 space-y-2">
                  Tread depth is 7 mm or more freshly fitted tyres with fdivl tread depth, offering maximum grip and performance.
                  </div>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-10'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <div>Good Tyres</div>
                  </div>
                  <div className=" pt-3 space-y-2">
                  Tread depth is 5 mm to 7 mm.  Tyres with a healthy amount of tread remaining, providing good traction and safety.
                  </div>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-10'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <div>Average</div>
                  </div>
                  <div className=" pt-3 space-y-2">
                  Tread Depth is 3 mm to 5 mm.  Tyres showing moderate wear; still legal but may require replacement soon to ensure optimal safety and performance.
                  </div>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-10'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <div>Worn</div>
                  </div>
                  <div className=" pt-3 space-y-2">
                  Tread Depth is 1.6 mm to 3 mm.  Near the legal minimum tread depth; tyres are worn and should be monitored closely or replaced soon.
                  </div>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-10'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <div>New Tyres Needed</div>
                  </div>
                  <div className=" pt-3 space-y-2">
                  Less than 1.6 mm.  Below the legal minimum tread depth; tyres are significantly worn and must be replaced immediately to ensure safety and legal compliance.
                  </div>
              </div>
            </div>

         </div>

        </div>

        <div className='overflow-hidden  w-full flex justify-center text-[18px]'>
          <div className={`w-[90vw] my-5 rounded-2xl  ${isVendor ? 'bg-secondaryDark': 'bg-white'}`} >
            <div className='p-5 py-3  bg-fourth text-white rounded-t-xl'>
            Need help? Contact our team
            </div>

            <div className='space-y-2 py-5  overflow-hidden'>
             <div className='flex space-x-4 px-5'>
                <img src={phone.src} className='w-10 h-10'/>
                <div className='pt-1'>98243 35462</div>
             </div>

             <div className='flex space-x-4 px-5'>
                <img src={email.src} className='w-10 h-10'/>
                <div className='pt-1'>help@carsmart.com</div>
             </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default SmartAdvice