"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import carS from '@/assets/Sub3Car.png'
import car1 from '@/assets/advice_glass_1.png'
import car2 from '@/assets/advice_glass_2.png'
import alert_blue from '@/assets/icons/alert_purple.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';


const SurfaceMarks = () => {
    const [car,setCar] = useState(0);
          const [prevRoute,setPrevRoute] = useState<string | null>('');
        
          useEffect(()=>{
            setPrevRoute(localStorage.getItem('prevRoute'));
        
          },[])
  useEffect(()=>{
    const car_local = Number(localStorage.getItem('car_no'));
    setCar(car_local);
  },[])
    const {isVendor} = useAppContext()



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full ${(prevRoute === './vehicle_health_selection') ? 'pb-[170px]':'pb-[90px]'}`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Glass health</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Get your glass photo right with our expert help.</div>
                    <div   className='font-[400] text-sm '>Check carefully!</div>
                </div>
                <img src={carS.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>
        <div className='text-xl pl-[5vw] pb-2'>Examples</div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Chips & breaks</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Look for small chips on the windscreen</li>
                    <li>Spot breaks or cracks in the glass</li>
                    <li>Inspect edges for deeper damage.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
         <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car2.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Cracks & scratches</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Spot cracks on the windscreen edges.</li>
                    <li>Look for scratches across windows.</li>
                    <li>Check chips around glass corners.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>
        
        

<div className={`w-full fixed flex justify-center  ${(prevRoute === './vehicle_health_selection') ? 'bottom-20' : 'bottom-0'}`}>
        <div className={`p-5 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
                <Link href='./camera_filter_dynamic/glass_health-1-glass_health' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Take Photos</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        </div>
        {(prevRoute === './vehicle_health_selection') && 
            <div className={`w-full fixed flex justify-center bottom-0 ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <div className='p-5 pt-0 w-full'>
        <Link href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`glass_health_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
            <div className='flex space-x-1 text-xl'>
            <div>No marks</div>
            </div>
        </Link>
        
        </div>
    </div>
        }

        

    </div>
  )
}

export default SurfaceMarks



