"use client"
import Link from 'next/link';
import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import BackDriver from '@/assets/back_driver.png'
import BackPassen  from '@/assets/back_passen.png'
import FrontDriver  from '@/assets/front_driver.png'
import FrontPassen from '@/assets/front_passen.png'
import splash from '@/assets/icons/Rays-small.png'

const VehiclePhotos = () => {
  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <div  ><IoChevronBack size={28} className='mt-[1px]'/></div>
            <div>Vehicle exterior</div>
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-2 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link href='#' className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='space-y-3 pt-7'>
            <PhotoFrame Content='Front Driver Corner' isUploaded={false} photo={FrontDriver}/>
            <PhotoFrame Content='Front Passenger Corner' isUploaded={false} photo={FrontPassen}/>
            <PhotoFrame Content='Back Driver Corner' isUploaded={false} photo={BackDriver}/>
            <PhotoFrame Content='Back Passenger Corner' isUploaded={false} photo={BackPassen}/>
        </div>

        <div className='p-5'>
                <Link href='./Submission2' className=' flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-3 bg-tertiary '>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default VehiclePhotos