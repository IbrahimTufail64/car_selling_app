"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import carS from '@/assets/Sub3Car.png'
import car4 from '@/assets/SmartAdvice1.png'
import car2 from '@/assets/smart_advice_car2.png'
import car3 from '@/assets/smart_advice_car3.png'

import alert from '@/assets/icons/alert.png'
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

    const car1 = isVendor ? car4 : car3;

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Panel damage</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='#'  className='font-[400] text-sm mt-5'>see below for smart advice</Link>
                </div>
                <img src={carS.src}/>
            </div>
        </div>

        <div className='flex justify-center pt-10'>
            <div className='w-[90vw] text-[18px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
            </div>
        
        </div>

        <div className='flex justify-center w-full'>
            <div className='w-[98vw] mt-7'>
                <div className='text-2xl pl-7 pb-3'>Examples</div>

                <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-full space-y-5`}>
              <img src={car2.src} className='w-full max-h-[200px] object-cover rounded-lg'/>
              <img src={car1.src} className='w-full max-h-[200px] object-cover rounded-lg'/>
            </div>

         </div>

        </div>
            </div>
        </div>

        <div className='flex justify-center w-full'>
             <div className=' w-[90vw]'>
                  <div className='pt-4 text-[24px] px-2 flex space-x-3'>
                    <div>Heading</div>
                  </div>
                  <ul className="list-disc pl-10 pt-3 space-y-2">
                    <li>Photo is too dark</li>
                    <li>Vehicle sits outside outlines</li>
                    <li>Vehicle is obstructed</li>
                    
                  </ul>
              </div>
        </div>

        <div className={`${!isVendor ? 'bg-[#FBFBFF] border-[#D3D4FD]' :'bg-[#3D3D6A] border-[#646488]'} border-2 border  border-dashed rounded-lg p-5 mt-7 m-5 space-y-4`}>
            <div className='w-full flex justify-center'>
              <img src={alert.src}/>
            </div>
            <div className='w-full flex justify-center text-center font-[400] text-[12px]'>
              Avoid including keys with defects, particularly those with remote unlocking failures.
            </div>
        </div>
        
        

        <div className='p-5'>
                <Link href='./camera_filter_dynamic/panel_damage-1-panel_damage-dynamic' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Take Photos</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        {prevRoute === './vehicle_health_selection' && 
        
        <div className='p-5 pt-0'>
                <Link  href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`panel_damage_state_${car}`,'true');}}  className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>No Panel Damage</div>
                    </div>
                </Link>
        </div>
        }

        

    </div>
  )
}

export default SurfaceMarks



