"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import carS from '@/assets/Sub3Car.png'
import car1 from '@/assets/SmartAdvice1.png'
import car4 from '@/assets/advice_interior_4.png'
import car5 from '@/assets/advice_interior_5.png'
import alert_blue from '@/assets/icons/alert_purple.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';


const SurfaceMarks = () => {
    const [car,setCar] = useState('');
      const [prevRoute,setPrevRoute] = useState<string | null>('');
    
      useEffect(()=>{
        setPrevRoute(localStorage.getItem('prevRoute'));
    
      },[])
  useEffect(()=>{
    const car_local = localStorage.getItem('car_no');
    setCar(String(car_local));
  },[])
    const {isVendor} = useAppContext()


 //./vehicle_health_selection
  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full min-h-[100vh] ${(prevRoute === './vehicle_health_selection') ? 'pb-[170px]':'pb-[90px]'}`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Dashboard and lights</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Ignition on ensures a fully lit dashboard—use natural light and proper exposure for clarity.</div>
                    <div   className='font-[400] text-sm '>Picture Perfect!</div>
                </div>
                <img src={carS.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>
        <div className='text-xl pl-[5vw] pb-2'>Examples</div>

        <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <div className='flex space-x-4'>
              <div className='relative w-[50%]'>
                <img src={car4.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={cross.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              <div className='relative w-[50%]'>
                <img src={car5.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={tick.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              </div>
              <div>
                  <div className='pt-7 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Dashboard & lights on</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Engine on lights up the dashboard</li>
                    <li>Use daylight to reduce glare</li>
                    <li>Adjust angle for clarity</li>
                    
                  </ul>
              </div>
            </div>

         </div>
        
        

        <div className={`w-full fixed flex justify-center  ${(prevRoute === './vehicle_health_selection') ? 'bottom-20' : 'bottom-0'}`}>
        <div className={`p-5 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
                <Link href='./camera_filter_dynamic/dashboard_lights-1-dashboard_lights-dynamic' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Take photos</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        </div>
        {(prevRoute === './vehicle_health_selection') && 
            <div className={`w-full fixed flex justify-center bottom-0 ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <div className='p-5 pt-0 w-full'>
        <Link href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`dashboard_lights_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
            <div className='flex space-x-1 text-xl'>
                <div>No Damage</div>
            </div>
        </Link>
        
        </div>
    </div>
        }
        
        

    </div>
  )
}

export default SurfaceMarks



