"use client"
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import Field from '../components/Field';
import alert from '@/assets/icons/alert.png'
import Link from 'next/link';
import { useAppContext } from '../Context';
import CalculateState from '../Context/State';
import axios from 'axios';
import car from '@/assets/Sub3Car.png'

const VehiclePhotos = () => {

  const { isVendor} = useAppContext();
  const [exteriorState,setExteriorState] = useState(false);
  const [interiorState,setInteriorState] = useState(false);
  const [wheelsTyresState,setWheelsTyresState] = useState(false);
  const [healthState,sethealthState] = useState(false);
  const [progress,setProgress] = useState([0,0,0,0]);
  const [popup,setPopup] = useState(true);

  useEffect(()=>{
    localStorage.setItem('prevRoute','./vehicle_photos');
    const state = async()=>{

      const car = localStorage.getItem('car_no');
      console.log(localStorage.getItem(`vehicle_exterior_complete`));
      const progresst = [
        Number(localStorage.getItem(`vehicle_exterior_complete`)),
        Number(localStorage.getItem(`vehicle_interior_complete`)),
        Number(localStorage.getItem(`vehicle_wheels_complete`)),
        Number(localStorage.getItem(`vehicle_health_complete`)),
      ]
      setProgress(progresst);
      let count = 0 ; 
      progresst.map(e => {e === 100 && count++});
      console.log(String(Math.floor((count/4)*100)),'countttt');
      localStorage.setItem('vehicle_photos_complete',String(Math.floor((count/4)*100)));

    setInteriorState(localStorage.getItem(`vehicle_interior_state_${car}`)=== 'true');
    setExteriorState(localStorage.getItem(`vehicle_exterior_state_${car}`)=== 'true');
    setWheelsTyresState(localStorage.getItem(`vehicle_wheels_state_${car}`)=== 'true');
    sethealthState(localStorage.getItem(`vehicle_health_state_${car}`)=== 'true');
    console.log(car,'car');

    }
    state();
},[])


  
  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'} w-full min-h-[100vh] pb-5`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./Submission7'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle photos</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} mb-5 -mt-5`}>
       <div className='w-[85vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-3 pb-2'>
                    <div className='font-[300] text-sm'>Smart advice is here to gently guide you through the process!</div>
                    <div onClick={()=>{localStorage.setItem('current_count','0')}} className='font-[400] text-sm mt-5'>Protect your price &gt;</div>
                </div>
                <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>
        <div className='space-y-4 px-4'>
          <div className='mb-4'>
          <Link href='./advice_exterior'>
            <Field isComplete={exteriorState} Content={'Vehicle exterior'} Progress={progress[0]} Next={true}/>
          </Link>
          </div>
          
          <div className='mb-4'>
          <Link href={`${exteriorState ? './advice_interior' : '#'}`}>
          <Field isComplete={interiorState} Content={'Vehicle interior'} Progress={progress[1]} Next={exteriorState}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${interiorState ? './advice_vehicle_wheels' : '#'}`}>
          <Field isComplete={wheelsTyresState} Content={'Your wheels & typres'} Progress={progress[2]} Next={interiorState}/>
          </Link>
          </div>

          <div className='mb-4'>
          <Link href={`${wheelsTyresState ? './vehicle_health_selection' : '#'}`} >
          <Field isComplete={healthState} Content={'Vehicle health'} Progress={progress[3]} Next={wheelsTyresState}/>
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