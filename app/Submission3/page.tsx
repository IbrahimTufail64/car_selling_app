"use client"
import React from 'react'
import car from '@/assets/Sub3Car.png'
import Link from 'next/link'
import card1 from '@/assets/Sub3CarD1.png'
import tick from '@/assets/icons/tick.png'
import cross from '@/assets/icons/cross.png'
import card4 from '@/assets/Sub3CarD4.png'
import vector from '@/assets/icons/Vector.png'

const Submission3 = () => {
  return (
    <div className='bg-secondary w-full'>
        <div className='w-full flex justify-center'>
            <div className='w-[85vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link href='#' className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='w-full flex justify-center'>
            <div className='w-[85vw] gap-2 mt-6 grid grid-cols-2 bg-[#FFFFFF] p-3   rounded-lg'>
                <div className='relative'>
                    <img src={card1.src}/>
                    <img src={cross.src} className='absolute top-[38%] left-[48%]'/>
                </div>
                <div className='relative'>
                    <img src={card1.src}/>
                    <img src={tick.src} className='absolute top-[38%] left-[48%]'/>
                </div>
                <div className='relative'>
                    <img src={card1.src}/>
                </div>
                <div className='relative'>
                    <img src={card4.src}/>
                </div>
            </div>
        </div>     

        <div className='w-full flex justify-center'>
            <div className='w-[85vw] mt-6 bg-[#FFFFFF] p-3 rounded-lg'>
               <div className='w-full flex justify-center font-[400] text-[22px] text-[#101044]'>
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

