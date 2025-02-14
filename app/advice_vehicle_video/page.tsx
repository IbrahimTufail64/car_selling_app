"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import car1 from '@/assets/SmartAdvice1.png'
import car2 from '@/assets/smart_advice_car2.png'
import alert_blue from '@/assets/icons/alert_purple.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';


const SurfaceMarks = () => {

    const {isVendor} = useAppContext();
          const [prevRoute,setPrevRoute] = useState<string | null>('');
                
                  useEffect(()=>{
                    setPrevRoute(localStorage.getItem('prevRoute'));
                
                  },[])

// ./Submission7

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[90px] min-h-[100vh]`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Vehicle video</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg pb-2'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Keep videos short, clear, well-lit, and shot in an open space for quick approval.</div>
                    <Link  href='#'  className='font-[400] text-sm mt-5'>Short clip time!</Link>
                </div>
                <img src={car.src} className='object-contain'/>
            </div>
        </div>

        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
         <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[100vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>One take time!</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Ensure bright, natural lighting for clear visuals.</li>
                    <li>Use smooth circular motions: start outside, then interior near driver’s seat.</li>
                    <li>Keep videos concise and follow guidelines to avoid rejection.</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>


        
        


        {/* <div className='p-5'>
                <Link href='./video_capture_ios' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Continue</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div> */}

        <div className={`w-full fixed flex justify-center bottom-0`}>
          <div className='p-5 w-full'>
                <Link href={`${isVendor ? './video_capture' : './video_capture_ios'}`} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                    <div  className="whitespace-nowrap  text-ellipsis">Continue</div>
                    <img src={splash.src}/>
                    </div>
                </Link>
          </div>
        </div>
        

    </div>
  )
}

export default SurfaceMarks



