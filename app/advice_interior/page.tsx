"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car1 from '@/assets/advice_interior_1.png'
import car2 from '@/assets/advice_interior_2.png'
import car3 from '@/assets/advice_interior_3.png'
import car4 from '@/assets/advice_interior_4.png'
import car5 from '@/assets/advice_interior_5.png'
import car6 from '@/assets/advice_interior_6.png'
import car7 from '@/assets/advice_interior_7.png'
import alertPurple from '@/assets/icons/alert_purple.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'
import phoneW from '@/assets/icons/phone.png'
import emailW from '@/assets/icons/email.png'
import phoneD from '@/assets/icons/phoneDark.png'
import emailD from '@/assets/icons/emailDark.png'
import { useRouter } from 'next/navigation';
import { useAppContext } from '../Context';
import splash from '@/assets/icons/Rays-small.png'
import car from '@/assets/Sub3Car.png'

const SmartAdvice = () => {

  const router = useRouter();
        const [prevRoute,setPrevRoute] = useState<string | null>('');
      
        useEffect(()=>{
          setPrevRoute(localStorage.getItem('prevRoute'));
      
        },[])
  const {isVendor} = useAppContext(); 
  const phone = isVendor ? phoneD : phoneW;
  const email = isVendor ? emailD : emailW;
  
  return (
    <div className={`w-full ${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'} pb-20`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle interior</div>
        </div>

        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Smart advice for perfect interior photos of your car!</div>
                    <div   className='font-[400] text-sm '>Picture Perfect!</div>
                </div>
                <img src={car.src} className='object-contain w-[35vw] landscape:w-[20vw]'/>
            </div>
        </div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alertPurple.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Smart front seat shots!</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Even lighting or natural sunlight with doors open</li>
                    <li>Keep the camera steady for crisp, sharp shots</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>
        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <div className='flex space-x-4'>
              <div className='relative w-[50%]'>
                <img src={car2.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={cross.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              <div className='relative w-[50%]'>
                <img src={car3.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={tick.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              </div>
              <div>
                  <div className='pt-7 text-[22px] flex space-x-3'>
                    <img src={alertPurple.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Smart back seat shots!</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Capture the full cabin, engine on, dashboard lit</li>
                    <li>Remove any personal items</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>
        <div className='space-y-4 px-4 mt-7'>
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
                    <img src={alertPurple.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Smart dashboard shots!</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Capture the full cabin, engine on, dashboard lit</li>
                    <li>Remove any personal items</li>
                    
                  </ul>
              </div>
            </div>

         </div>

        </div>
        <div className='space-y-4 px-4 mt-7'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <div className='flex space-x-4'>
              <div className='relative w-[50%]'>
                <img src={car6.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={cross.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              <div className='relative w-[50%]'>
                <img src={car7.src} className='w-[100%] max-h-[200px] object-cover rounded-xl'/>
                <img src={tick.src} className='w-8 left-[43%] -bottom-[15px] absolute'/>
              </div>
              </div>
              <div>
                  <div className='pt-7 text-[22px] flex space-x-3'>
                    <img src={alertPurple.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Smart boot shots!</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Bright lighting reveals space and depth</li>
                    <li>Remove any clutter!</li>
                    
                  </ul>
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
      
        <div className={` fixed bottom-0 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
          <div className='p-5 w-full'>
                <Link href='./camera_filter/dashboard-chain' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Take photos</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
          </div>
        </div>

    </div>
  )
}

export default SmartAdvice