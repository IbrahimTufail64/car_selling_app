"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import carS from '@/assets/Sub3Car.png'
import car1 from '@/assets/advice_surface_1.png'
import car2 from '@/assets/advice_surface_2.png'
import car3 from '@/assets/advice_surface_3.png'
import phoneW from '@/assets/icons/phone.png'
import emailW from '@/assets/icons/email.png'
import phoneD from '@/assets/icons/phoneDark.png'
import emailD from '@/assets/icons/emailDark.png'
import cross from '@/assets/redcross.png'
import Alert from '@/assets/icons/alert.png'

import alert_blue from '@/assets/icons/alert_purple.png'


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
    const phone = isVendor ? phoneD : phoneW;
    const email = isVendor ? emailD : emailW;



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full ${(prevRoute === './vehicle_health_selection') ? 'pb-[170px]':'pb-[90px]'}`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Surface marks</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Spot scratches, dents, or chips easily under natural light or even lighting.</div>
                    <div   className='font-[400] text-sm '>Picture Perfect!</div>
                </div>
                <img src={carS.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Scratches, scrapes & marks</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Scratches are thin lines that can be light or deep</li>
                    <li>Scrapes cover wider areas and often remove paint</li>
                    <li>Marks are smudges or stains that are usually removable</li>
                    <li>Scratches are longer, scrapes are broader, and marks are superficial</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
         <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw] `}>
              <div className='flex space-x-2'>
              <img src={car2.src} className='w-[50%] max-h-[200px] object-cover rounded-xl'/>
              <img src={car3.src} className='w-[50%] max-h-[200px] object-cover rounded-xl'/>
              </div>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Grazes, scuffs & flaws</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Grazes are shallow marks from light contact.</li>
                    <li>Scuffs are surface marks or paint transfers.</li>
                    <li>Surface flaws are small dents or imperfections.</li>
                    <li>Grazes are light, scuffs are transfers, flaws are minor defects.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>

        
        <div className={`${!isVendor ? 'bg-[#FBFBFF] border-[#D3D4FD]' :'bg-[#3D3D6A] border-[#646488]'} border-2 border  border-dashed rounded-lg p-5 mt-7 m-5 space-y-4`}>
            <div className='w-full flex justify-center'>
              <img src={Alert.src}/>
            </div>
            <div className='w-full flex justify-center text-center font-[400] text-[12px]'>
            If damage spans several panels, please report it for each panel individually
            </div>
        </div>
        



  <div className={`w-full fixed flex justify-center  ${(prevRoute === './vehicle_health_selection') ? 'bottom-20' : 'bottom-0'}`}>
        <div className={`p-5 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
                <Link href='./camera_filter_dynamic/surface_marks-1-surface_marks-dynamic' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
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
        <Link href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`surface_marks_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
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



