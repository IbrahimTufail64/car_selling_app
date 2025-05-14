import React from 'react'
import logo from '@/assets/Logo.png'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/CamCarFront.png'

const Swipe = () => {
  return (
    <div className='bg-[#282828] w-full   text-white pt-6 text-[20px]'>
        <div className='flex justify-center w-full h-[100vh]'>
            <div>
            <div className=' '>
            <img src={logo.src} className=''/>
            </div>

            <div className='pt-5 '>
                ... And scroll down
            </div>
            <div className='flex justify-center w-full pt-5 '>
                <div className='space-y-[-20px]'>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            </div>
        </div>
        <div className='flex justify-center w-full'>
            <img src={car.src} className='w-[65vw]'/>
          </div>
          <div className='flex justify-center w-full py-5'>
          Take your camera level
          </div>
    </div>
  )
}

export default Swipe