"use client"
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';
import { useAppContext } from '../Context';

const VehicleHealthSelection = () => {

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
    <div className={`${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'} w-full min-h-[100vh] pb-10`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
            <Link  href='./Submission7'><IoChevronBack size={35} className='mt-[1px]'/></Link>
            <div>Vehicle Photos</div>
        </div>
        
        <div className='w-full flex justify-center mb-10'>
        <div className='px-5 pb-5 font-[300] text-[18px] bg-[#D1D9FF] w-[90vw] p-3 text-black rounded-lg'>
            For a hassle-free experience, tell us about the condition of your vehicle and any damage it has.Check each category below carefully.
        </div>
        </div>

        <div className='space-y-2 px-4'>
          <div className=''>
          <Link href='./wheel_condition'> 
            <Field isComplete={vehicle_exterior} Content={'Wheel condition'}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href='./tyre_health'>
          <Field isComplete={vehicle_interior} Content={'Tyre health'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./surface_marks'>
          <Field isComplete={vehicle_wheels} Content={'Surface marks'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./panel_damage'>
          <Field isComplete={false} Content={'Panel damage'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./exterior_wear_tear'>
          <Field isComplete={true} Content={'Exterior wear & tear'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./glass_health'>
          <Field isComplete={false} Content={'Glass health'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./damaged_absent_fixtures'>
          <Field isComplete={false} Content={'Damaged/Absent fixtures'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./dashboard_lights'>
          <Field isComplete={false} Content={'Dashboard lights'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./technical_health'>
          <Field isComplete={false} Content={'Technical Health (electrical and mechanical)'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./further_details'>
          <Field isComplete={false} Content={'Further details'}/>
          </Link>
          </div>


        </div>


    </div>
  )
}

export default VehicleHealthSelection