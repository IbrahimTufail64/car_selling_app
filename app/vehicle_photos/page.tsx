"use client"
import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';

const VehiclePhotos = () => {
  return (
    <div className='bg-secondary w-full h-[100vh]'>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./Submission7'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle Photos</div>
        </div>
        <div className='px-5 pb-5 font-[400] text-md'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        </div>
        <div className='space-y-4 px-4'>
          <div className='mb-4'>
          <Link href='./vehicle_exterior'>
            <Field isComplete={false} Content={'Vehicle exterior'}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href='./vehicle_exterior'>
          <Field isComplete={false} Content={'Vehicle interior'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_exterior'>
          <Field isComplete={false} Content={'Your wheels & typres'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_exterior'>
          <Field isComplete={false} Content={'Vehicle health'}/>
          </Link>
          </div>

        </div>

        <div className='bg-[#FBFBFF] border-1 border border-[#D3D4FD] border-dashed rounded-lg p-5 mt-7 m-5 space-y-4'>
            <div className='w-full flex justify-center'>
              <img src={alert.src}/>
            </div>
            <div className='w-full flex justify-center text-center font-[400] text-[12px]'>
              Avoid including keys with defects, particularly those with remote unlocking failures.
            </div>
        </div>

    </div>
  )
}

export default VehiclePhotos