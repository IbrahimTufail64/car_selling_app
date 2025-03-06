"use client"
import React from 'react'
import car from '@/assets/Sub3Car.png'
import Link from 'next/link'
import card1 from '@/assets/introSlider_4_1.png'
import card2 from '@/assets/introSlider_4_2.png'
import vector from '@/assets/icons/Vector.png'
import { useAppContext } from '../Context'

const Submission6 = () => {


    const {isVendor} = useAppContext(); 

  return (
    <div className=' w-full'>

         <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
         <div className='w-[85vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-3 pb-2'>
                    <div className='font-[300] text-sm'>Smart advice is here to gently guide you through the process!</div>
                    <Link  href='../advice_IntroSlider/4' onClick={()=>{localStorage.setItem('current_count','0')}} className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>

        <div className='w-full flex justify-center'>
            <div className={`w-[85vw]  mt-6 ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3   rounded-lg flex justify-center`}>
                <div className='max-w-[400px]'>
                <div className='space-y-3 max-w-[400px]'>
                <div className='relative'>
                    <img src={card1.src} className='w-full'/>
                    {/* <img src={cross.src} className='absolute top-[38%] left-[48%]'/> */}
                </div>
                <div className='relative'>
                    <img src={card2.src} className='w-full'/>
                    {/* <img src={tick.src} className='absolute top-[38%] left-[48%]'/> */}
                </div>
            </div>
                </div>
                
            </div>
        </div>     

        <div className='w-full flex justify-center'>
        <div className={`w-[85vw] mt-6 ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3 rounded-lg`} >
        <div className={`w-full flex justify-center font-[400] text-[22px] ${!isVendor ? 'text-[#101044]': 'text-white'} `}>
                    <div className='relative'>
                        Frame it!
                        <img src={vector.src} className='absolute top-[30px] right-[0px] w-20 '/>
                    </div>
               </div>

               <div className='w-full flex justify-center text-center font-[300]  text-[14px] py-4'>
                    <div>
                    <div className='w-[76vw]'>
                    Make sure there's enough room to walk around your vehicle and capture it from all angles. Aim for at least 2.5 – 3.5 meters (8 - 11 feet) of space on each side.
                    </div>
                    <div className='w-[76vw] pt-5'>
                    Opt for a bright, cloudy day for glare-free photos.
                    </div>
                    </div>
               </div>
            </div>
        </div>    
    </div>
  )
}

export default Submission6 

