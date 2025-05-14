"use client"
import React from 'react'
import car from '@/assets/Sub3Car.png'
import Link from 'next/link'
import tick from '@/assets/icons/tick.png'
import cross from '@/assets/icons/cross.png'
import card1 from '@/assets/introSlider_3_1.png'
import card2 from '@/assets/introSlider_3_2.png'
import vector from '@/assets/icons/Vector.png'
import { useAppContext } from '../Context'

const Submission5 = () => {

    const {isVendor} = useAppContext(); 

  return (
    <div className=' w-full'>
       <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
       <div className='w-[85vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-3 pb-2'>
                    <div className='font-[300] text-sm'>Smart advice is here to gently guide you through the process!</div>
                    <Link  href='../advice_IntroSlider/3' onClick={()=>{localStorage.setItem('current_count','0')}} className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] landscape:w-[20vw]'/>
            </div>
        </div>

        <div className='w-full flex justify-center mt-7'>
        <div className={`w-[85vw] flex justify-center ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3   rounded-lg`}>
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

        <div className='w-full flex justify-center'>
        <div className={`w-[85vw] mt-6 ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3 rounded-lg`} >
        <div className={`w-full flex justify-center font-[400] text-[22px] ${!isVendor ? 'text-[#101044]': 'text-white'} `}>
                    <div className='relative text-center'>
                        Don’t leave buyers in the 
                        <div className='flex w-full justify-center'>
                        <span className='pl-2 w-20 flex flex-col'>
                            dark
                            <img src={vector.src} className=' w-20 '/>
                        </span>
                        </div>
                        {/* <img src={vector.src} className='absolute top-[30px] right-[0px] w-20 '/> */}
                    </div>
               </div>

               <div className='w-full flex justify-center text-center font-[300]  text-[14px] py-4'>
                    <div>
                    <div className='w-[76vw]'>
                    Opt for a brightly lit location for your car, steering clear of dim spots such as car parks or garages. Aim to snap pictures in daylight, preferably before sunset.
                    </div>
                    <div className='w-[76vw] pt-5'>
                    Pick a bright, overcast day for ideal photo conditions.
                    </div>
                    </div>
               </div>
            </div>
        </div>    
    </div>
  )
}

export default Submission5 

