"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car1 from '@/assets/advice_wheel_condition_1.png'
import car2 from '@/assets/advice_wheel_condition_2.png'
import alert_blue from '@/assets/icons/alert_purple.png'
import cross from '@/assets/redcross.png'
import tick from '@/assets/greentick.png'
import phoneW from '@/assets/icons/phone.png'
import emailW from '@/assets/icons/email.png'
import phoneD from '@/assets/icons/phoneDark.png'
import emailD from '@/assets/icons/emailDark.png'
import { useRouter } from 'next/navigation';
import { useAppContext } from '../Context';
import splash from '@/assets/icons/Rays-small.png'
import CAR from '@/assets/Sub3Car.png'

const SmartAdvice = () => {
  const [car,setCar] = useState('');
  const [prevRoute,setPrevRoute] = useState<string | null>('');
                  
                    useEffect(()=>{
                      setPrevRoute(localStorage.getItem('prevRoute'));
                  
                    },[])
  useEffect(()=>{
    const car_local = localStorage.getItem('car_no');
    setCar(String(car_local));
  },[])
  const router = useRouter();
  const {isVendor} = useAppContext(); 
  const phone = isVendor ? phoneD : phoneW;
  const email = isVendor ? emailD : emailW;
  
  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full ${(prevRoute === './vehicle_health_selection') ? 'pb-[170px]':'pb-[90px]'}`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href={`${prevRoute}`}><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Wheel condition</div>
        </div>

        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} -mt-[20px] mb-6`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 pb-3'>
                    <div className='font-[300] text-sm'>Easily spot wheel damage, dents, scratches, cracks and warping.</div>
                    <div   className='font-[400] text-sm '>Picture Perfect!</div>
                </div>
                <img src={CAR.src} className='object-contain w-[35vw] landscape:w-[20vw]'/>
            </div>
        </div>

        <div className='space-y-4 px-4'>
         <div className='w-full flex justify-center'>
            <div className={` p-4 rounded-2xl ${isVendor ? 'bg-secondaryDark': 'bg-white'} w-[90vw]`}>
              <img src={car1.src} className='w-[90vw] max-h-[200px] object-cover rounded-xl'/>
              <div>
                  <div className='pt-4 text-[22px] flex space-x-3'>
                    <img src={alert_blue.src} className='w-7 h-7 mt-[2px]'/>
                    <div>Scratches, dents & curbing</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Minor scratches on wheel finish</li>
                    <li>Deep cuts exposing metal</li>
                    <li>Dents on rim edges</li>
                    
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
                    <div>Cracks, warping & buckling</div>
                  </div>
                  <ul className="list-disc pl-7 pt-3 space-y-2">
                    <li>Check rim edges for cracks</li>
                    <li>Spot warping in uneven shapes</li>
                    <li>Feel for vibrations while driving.</li>
                    
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



<div className={`w-full fixed flex justify-center  ${(prevRoute === './vehicle_health_selection') ? 'bottom-20' : 'bottom-0'}  ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <div className={`p-5 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
                <Link href='./wheel_condition' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                    <div  className="whitespace-nowrap  text-ellipsis">Continue</div>
                    <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        </div>
        {(prevRoute === './vehicle_health_selection') && 
            <div className={`w-full fixed flex justify-center bottom-0 ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <div className={`p-5 pt-0 w-full  ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <Link href='./vehicle_health_selection' onClick={()=>{localStorage.setItem(`wheel_condition_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
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

export default SmartAdvice