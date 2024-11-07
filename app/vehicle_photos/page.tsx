"use client"
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';
import { useAppContext } from '../Context';

const VehiclePhotos = () => {

  const {vehicle_exterior, vehicle_interior, vehicle_wheels, isVendor} = useAppContext();

  useEffect(()=>{

      // const getContext = async (query: string, setter_function: React.Dispatch<React.SetStateAction<Boolean>>) =>{
      //   const exterior =  await db2.context.where('name').equals(query).first();
      //   if(exterior){
      //     setter_function(exterior?.state)
      //   }
      // }

      // getContext('vehicle_exterior',setVehicleExterior);
      // getContext('vehicle_interior',setVehicleInterior);

  },[])
  
  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'} w-full h-[100vh]`}>
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
            <Field isComplete={vehicle_exterior} Content={'Vehicle exterior'}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href='./vehicle_interior'>
          <Field isComplete={vehicle_interior} Content={'Vehicle interior'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_wheels'>
          <Field isComplete={vehicle_wheels} Content={'Your wheels & typres'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_health_selection'>
          <Field isComplete={false} Content={'Vehicle health'}/>
          </Link>
          </div>

        </div>

        <div className={`${!isVendor ? 'bg-[#FBFBFF] border-[#D3D4FD]' :'bg-[#0A0A37] border-[#3B3B5F]'} border-1 border  border-dashed rounded-lg p-5 mt-7 m-5 space-y-4`}>
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