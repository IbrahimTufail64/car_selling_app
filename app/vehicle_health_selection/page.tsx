"use client"
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';
import { useAppContext } from '../Context';
import CalculateState from '../Context/State';
import { db } from '../Local_DB/db';

const VehicleHealthSelection = () => {

  const { isVendor} = useAppContext();
  const [healthState,sethealthState] = useState([false,false,false,false,false,false,false,false]);

  useEffect(()=>{
  //   const retrieve = async (image_to_retrieve:string)=>{ 
  //     try{ 
  //         const image = await db.images.where('name').equals(image_to_retrieve).first();
          
  //         return image;
  //     }
  //     catch(e){
  //         return;
  //     }
  // };
  // console.log(retrieve('technicals'))
    const state = async()=>{
    const current:any =await CalculateState();
    // console.log(current)
    
    const array = current[1];
    // console.log(array)
    sethealthState([array[2] , array[3] , array[6] , array[7] , array[8] , array[9], array[10],array[11]])

    }
    state();
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
            <Field isComplete={true} Content={'Wheel condition'}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href='./tyre_health'>
          <Field isComplete={true} Content={'Tyre health'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./surface_marks'>
          <Field isComplete={healthState[0]} Content={'Surface marks'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./panel_damage'>
          <Field isComplete={healthState[1]} Content={'Panel damage'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./exterior_wear_tear'>
          <Field isComplete={healthState[3]} Content={'Exterior wear & tear'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./glass_health'>
          <Field isComplete={healthState[4]} Content={'Glass health'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./damaged_absent_fixtures'>
          <Field isComplete={healthState[5]} Content={'Damaged/Absent fixtures'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./dashboard_lights'>
          <Field isComplete={healthState[2]} Content={'Dashboard lights'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./technical_health'>
          <Field isComplete={healthState[6]} Content={'Technical Health (electrical and mechanical)'}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href='./further_details'>
          <Field isComplete={healthState[7]} Content={'Further details'}/>
          </Link>
          </div>


        </div>


    </div>
  )
}

export default VehicleHealthSelection