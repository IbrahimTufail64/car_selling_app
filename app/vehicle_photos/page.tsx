"use client"
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';
import { useAppContext } from '../Context';
import CalculateState from '../Context/State';
import axios from 'axios';

const VehiclePhotos = () => {

  const { isVendor} = useAppContext();
  const [exteriorState,setExteriorState] = useState(false);
  const [interiorState,setInteriorState] = useState(false);
  const [wheelsTyresState,setWheelsTyresState] = useState(false);
  const [healthState,sethealthState] = useState(false);

  useEffect(()=>{
    const state = async()=>{
    const current:any =await CalculateState();
    console.log(current)
    
    const array = current[1];
    console.log(array)
    if(array[0] || array[1] || array[4] || array[5] || array[8]){

    }
    setInteriorState(array[0]);
    setExteriorState(array[1]);
    setWheelsTyresState(array[4] && array[5])
    sethealthState(array[2] && array[3] && array[6] && array[7] && array[8] && array[9])

    }
    state();
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
            <Field isComplete={exteriorState} Content={'Vehicle exterior'}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href='./vehicle_interior'>
          <Field isComplete={interiorState} Content={'Vehicle interior'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_wheels'>
          <Field isComplete={wheelsTyresState} Content={'Your wheels & typres'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./vehicle_health_selection'>
          <Field isComplete={healthState} Content={'Vehicle health'}/>
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