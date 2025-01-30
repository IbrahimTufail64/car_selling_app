"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car1 from '@/assets/Sub3Car.png'
import car4 from '@/assets/SmartAdvice1.png'
import card1 from '@/assets/advice_damaged_1.png'
import card2 from '@/assets/advice_damaged_2.png'
import car3 from '@/assets/smart_advice_car3.png'
import alert_blue from '@/assets/icons/alert_purple.png'
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


  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full overflow-hidden  ${(prevRoute === './vehicle_health_selection') ? 'pb-[170px]':'pb-[100px]'}`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Damaged/Absent Fixtures</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Check broken or missing parts like handles, buttons, mirrors, or wipers.</div>
                    <div   className='font-[400] text-sm '>Check carefully!</div>
                </div>
                <img src={car1.src} className='object-contain'/>
            </div>
        </div>
        <div className='text-xl pl-[5vw] pb-2'>Examples</div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={card1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Broken parts</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Faulty handles, buttons and switches.</li>
                    <li>Broken handles, buttons, or wipers.</li>
                    <li>Reporting any visible damage helps protect your resale price.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
         <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={card2.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Missing & damaged</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Missing or faulty mirros & wipers.</li>
                    <li>Damaged mirrors, lights, or trims.</li>
                    <li>Water leaks in headlights or seals.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>
        
        

        <div className={`w-full fixed flex justify-center  ${(prevRoute === './vehicle_health_selection') ? 'bottom-20' : 'bottom-0'}`}>
        <div className='p-5 w-full'>
                <Link href='./camera_filter_dynamic/damaged_absent_fixtures-1-damaged_absent_fixtures' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Take Photos</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        </div>
        {(prevRoute === './vehicle_health_selection') && 
            <div className='w-full fixed flex justify-center bottom-0'>
        <div className='p-5 pt-0 w-full'>
        <Link href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`damaged_absent_fixtures_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
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



