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
  const [healthState,sethealthState] = useState<any>([]);

  useEffect(()=>{
    localStorage.setItem('prevRoute','./vehicle_health_selection');
    const car = localStorage.getItem('car_no');
    const state = [localStorage.getItem(`wheel_condition_state_${car}`),localStorage.getItem(`tyre_health_state_${car}`),localStorage.getItem(`surface_marks_state_${car}`) , localStorage.getItem(`panel_damage_state_${car}`) , localStorage.getItem(`exterior_wear_tear_state_${car}`) , localStorage.getItem(`glass_health_state_${car}`) , localStorage.getItem(`damaged_absent_fixtures_state_${car}`) , localStorage.getItem(`dashboard_lights_state_${car}`),localStorage.getItem(`technical_state_${car}`),localStorage.getItem(`further_details_state_${car}`)];
    sethealthState(state);
    let count = 0;
    state.map((e)=>{
      e && count++;
    }) 
    console.log(count);
    localStorage.setItem('vehicle_health_complete',String(Math.floor((count/state.length)*100))); 

    // }
    // state();
    // console.log('state',localStorage.getItem('surface_marks_state')=== 'true');
},[])
  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'} w-full min-h-[100vh] pb-10`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
            <Link  href='./vehicle_photos'><IoChevronBack size={35} className='mt-[1px]'/></Link>
            <div>Vehicle health</div>
        </div>
        
        <div className='w-full flex justify-center mb-10'>
        <div className='px-5 pb-5 font-[300] text-[18px] bg-[#D1D9FF] w-[90vw] p-3 text-black rounded-lg'>
        Enjoy a hassle-free process by sharing your car’s condition carefully!        </div>
        </div>

        <div className='space-y-2 px-4'>
          <div className=''>
          <Link href='./advice_wheel_condition'> 
            <Field isComplete={healthState[0]} Content={'Wheel condition'} Progress={0} Next={true}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href={`${healthState[0]=== 'true' ? './advice_tyre_health' : '#'}`}>
          <Field isComplete={healthState[1]} Content={'Tyre health'} Progress={0} Next={healthState[0]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[1]=== 'true' ? './advice_surface_marks' : '#'}`}>
          <Field isComplete={healthState[2] === 'true'} Content={'Surface marks'} Progress={0} Next={healthState[1]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[2]=== 'true' ? './advice_panel_damage' : '#'}`}>
          <Field isComplete={healthState[3] === 'true'} Content={'Panel damage'} Progress={0} Next={healthState[2]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[3]=== 'true' ? './advice_exterior_wear_tear' : '#'}`}>
          <Field isComplete={healthState[4] === 'true'} Content={'Exterior wear & tear'} Progress={0} Next={healthState[3]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[4]=== 'true' ? './advice_glass_health' : '#'}`}>
          <Field isComplete={healthState[5] === 'true'} Content={'Glass health'} Progress={0} Next={healthState[4]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[5]=== 'true' ? './advice_damaged_absent_fixtures' : '#'}`}>
          <Field isComplete={healthState[6] === 'true'} Content={'Damaged/Absent fixtures'} Progress={0} Next={healthState[5]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[6]=== 'true' ? './advice_dashboard_lights' : '#'}`}>
          <Field isComplete={healthState[7] === 'true'} Content={'Dashboard lights'} Progress={0} Next={healthState[6]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[7]=== 'true' ? './technical_health' : '#'}`}>
          <Field isComplete={healthState[8] === 'true'} Content={'Technical Health (electrical and mechanical)'} Progress={0} Next={healthState[7]}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${healthState[8]=== 'true' ? './further_details' : '#'}`}>
          <Field isComplete={healthState[9] === 'true'} Content={'Further details'} Progress={0} Next={healthState[8]}/>
          </Link>
          </div>


        </div>


    </div>
  )
}

export default VehicleHealthSelection