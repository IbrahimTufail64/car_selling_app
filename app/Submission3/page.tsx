"use client"
import React from 'react'
import car from '@/assets/Sub3Car.png'
import Link from 'next/link'

// import tick from '@/assets/icons/tick.png'
// import cross from '@/assets/icons/cross.png'
import card1 from '@/assets/introSlider_1_1.png'
import card2 from '@/assets/introSlider_1_2.png'
import card3 from '@/assets/introSlider_1_3.png'
import card4 from '@/assets/introSlider_1_4.png'
import vector from '@/assets/icons/Vector.png'
import { useAppContext } from '../Context'

const Submission3 = () => {
    const {isVendor} = useAppContext();

  return (
    <div className=' w-full'>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[85vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-3 pb-2'>
                    <div className='font-[300] text-sm'>Smart advice is here to gently guide you through the process!</div>
                    <Link  href='../advice_IntroSlider/1' onClick={()=>{localStorage.setItem('current_count','0')}} className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-cover'/>
            </div>
        </div>

        <div className='w-full flex justify-center mt-7'>
            <div className={`w-[85vw] flex justify-center  ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3   rounded-lg`}>
                <div className='gap-2  grid grid-cols-2 max-w-[400px]'>
                <div className='relative'>
                    <img src={card1.src} className='w-full'/>
                    {/* <img src={cross.src} className='absolute top-[38%] left-[48%]'/> */}
                </div>
                <div className='relative'>
                    <img src={card2.src} className='w-full'/>
                    {/* <img src={tick.src} className='absolute top-[38%] left-[48%]'/> */}
                </div>
                <div className='relative'>
                    <img src={card3.src} className='w-full'/>
                </div>
                <div className='relative'>
                    <img src={card4.src} className='w-full'/>
                </div>
                </div>
            </div>
        </div>     

        <div className='w-full flex justify-center'>
            <div className={`w-[85vw] mt-6 ${isVendor ? 'bg-secondaryDark': 'bg-[#FFFFFF]'} p-3 rounded-lg`}>
               <div className={`w-full flex justify-center font-[400] text-[22px] ${!isVendor ? 'text-[#101044]': 'text-white'} `}>
                    <div>
                        Maximize your listing,
                        <img src={vector.src} className=''/>
                    </div>
               </div>

               <div className='w-full flex justify-center text-center font-[300]  text-[14px] py-4'>
                    <div className='w-[76vw]'>
                        Capturing top-notch, well-framed photos boosts your chances of securing the best price from the carsmart
                        community. Showcase your vehicle effectively to list your car faster and draw in more potential buyers!
                    </div>
               </div>
            </div>
        </div>    
    </div>
  )
}

export default Submission3

