"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car1 from '@/assets/SmartAdvice1.png'
import car2 from '@/assets/SmartAdvice2.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'
import phone from '@/assets/icons/phone.png'
import email from '@/assets/icons/email.png'
import { useRouter } from 'next/navigation';

const SmartAdvice = ({ params }: { params: { slug: string } }) => {

  const router = useRouter();
  
  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href={`../${params.slug}`}><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>smart advice</div>
        </div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className='bg-white p-3 rounded-lg'>
              <img src={car1.src}/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={cross.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Don't</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Photo is too dark</li>
                    <li>Vehicle sits outside outlines</li>
                    <li>Vehicle is obstructed</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
            <div className='bg-white p-3 rounded-lg'>
              <img src={car2.src}/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={tick.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Do</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Photo is too dark</li>
                    <li>Vehicle sits outside outlines</li>
                    <li>Vehicle is obstructed</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        <div className='overflow-hidden  w-full flex justify-center text-[18px]'>
          <div className='w-[92vw] my-5 bg-white rounded-b-xl' >
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