"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import splash from '@/assets/icons/Rays-small.png'
import { db} from '../Local_DB/db';
import { useAppContext } from '../Context';
import WheelFrame from '../components/WheelFrame';
import { useRouter } from 'next/navigation';
import BackDriverWheel from '@/assets/back_driver_wheel.png'
import BackPassengerWheel from '@/assets/back_passenger_wheel.png'
import FrontDriverWheel from '@/assets/front_driver_wheel.png'
import FrontPassengerWheel from '@/assets/front_passenger_wheel.png'
import axios from 'axios';

const WheelCondition = () => {
    const [back_driver_wheel_img, setback_driver_wheel_img]  = useState<any>(null);
    const [back_passenger_wheel_img, setback_passenger_wheel_img]  = useState<any>(null);
    const [front_driver_wheel_img, setfront_driver_wheel_img]  = useState<any>(null);
    const [front_passenger_wheel_img, setfront_passenger_wheel_img]  = useState<any>(null);

    const [back_driver_wheel_state, setback_driver_wheel_state]  = useState(false);
    const [back_passenger_wheel_state, setback_passenger_wheel_state]  = useState(false);
    const [front_driver_wheel_state, setfront_driver_wheel_state]  = useState(false);
    const [front_passenger_wheel_state, setfront_passenger_wheel_state]  = useState(false);

    const Router = useRouter();
    const {isVendor} = useAppContext();

    const handleWheelUpload = async(isGood:boolean)=>{

        try{
            const car = Number(localStorage.getItem('car_no'));
            let wheel_state: unknown;
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            const token = localStorage.getItem('token');
            if(!isGood){
                wheel_state = await db.wheel_condition.put({
                    id: 1,
                    front_driver: front_driver_wheel_state,
                    back_driver: back_driver_wheel_state,
                    front_passenger: front_passenger_wheel_state,
                    back_passenger: back_passenger_wheel_state,
                    
                });

                const response = await axios.post(`${url}/pwa/wheel_condition`,  
                    {
                     back_driver_wheel_state,
                     back_passenger_wheel_state,
                     front_driver_wheel_state,
                     front_passenger_wheel_state,
                     car_no: car 
                    }, {
                         headers: {
                             'Content-Type': 'multipart/form-data',
                             Authorization: `Bearer ${token}`
                           }
                   });
                   console.log(response.status,response.data);  
            }
            else {
                wheel_state = await db.wheel_condition.put({ 
                    id: 1,
                    front_driver: false,
                    back_driver: false,
                    front_passenger: false,
                    back_passenger: false,
                    
                });
                const response = await axios.post(`${url}/pwa/wheel_condition`,  
                    {
                     back_driver_wheel_state: false,
                     back_passenger_wheel_state: false,
                     front_driver_wheel_state: false,
                     front_passenger_wheel_state: false,
                     car_no: car 
                    }, {
                         headers: {
                             'Content-Type': 'multipart/form-data',
                             Authorization: `Bearer ${token}`
                           }
                   });
                   console.log(response.status,response.data);  
            }
            // handleSubmit(isGood);
            console.log(wheel_state);
            
           
          localStorage.setItem(`wheel_condition_state_${car}`,'true');
          Router.push('./vehicle_health_selection')
        }
        catch(e){
            
        }
    }


    // Search for images in the db: 
    useEffect(()=>{

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve('back_driver_wheel',setback_driver_wheel_img);
        retrieve('back_passenger_wheel',setback_passenger_wheel_img);

        retrieve('front_driver_wheel',setfront_driver_wheel_img);
        retrieve('front_passenger_wheel',setfront_passenger_wheel_img);
        // window.location.reload();
        
    },[])



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary' } w-full `}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
            <Link  href='./vehicle_health_selection'><IoChevronBack size={35} className='mt-[1px]'/></Link>
            <div>Wheel condition</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_wheel_condition'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='w-full flex justify-center text-[18px] pt-10'>
        <div className=' w-[90%]'>
        Wheel condition refers to any damage to the metal rim or structure, including dents, scratches, fractures, warping or buckling.
        </div>
        </div>

        <div className='space-y-3 pt-7'>
        <WheelFrame Content='Back Driver Wheel' setisSelected={setback_driver_wheel_state} photo={ back_driver_wheel_img ? back_driver_wheel_img : BackDriverWheel.src}  link ='back_driver_wheel'/>
            
            <WheelFrame Content='Back Passenger Wheel' setisSelected={setback_passenger_wheel_state} photo={back_passenger_wheel_img ? back_passenger_wheel_img :  BackPassengerWheel.src} link ='back_passenger_wheel'/>
           

            <WheelFrame Content='front Driver Wheel' setisSelected={setfront_driver_wheel_state} photo={ front_driver_wheel_img ? front_driver_wheel_img : FrontDriverWheel.src}  link ='front_driver_wheel'/>
          
            <WheelFrame Content='front Passenger Wheel' setisSelected={setfront_passenger_wheel_state} photo={front_passenger_wheel_img ? front_passenger_wheel_img :  FrontPassengerWheel.src} link ='front_passenger_wheel'/>
           
        </div>
        

        <div className='p-5'>
                <button onClick={()=>{handleWheelUpload(false)}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </button>
        </div>
        <div className='p-5 pt-0'>
                <button onClick={()=>{handleWheelUpload(true)}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>All Wheel Good</div>
                    </div>
                </button>
        </div>
        

    </div>
  )
}

export default WheelCondition