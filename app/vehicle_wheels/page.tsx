"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import splash from '@/assets/icons/Rays-small.png'
import { db, db2 } from '../Local_DB/db';
import { useAppContext } from '../Context';

import BackDriverWheel from '@/assets/back_driver_wheel.png'
import BackDriverTyre from '@/assets/back_driver_tyre.png'
import BackPassengerWheel from '@/assets/back_passenger_wheel.png'
import BackPassengerTyre from '@/assets/back_passenger_tyre.png'

import FrontDriverWheel from '@/assets/front_driver_wheel.png'
import FrontDriverTyre from '@/assets/front_driver_tyre.png'
import FrontPassengerWheel from '@/assets/front_passenger_wheel.png'
import FrontPassengerTyre from '@/assets/front_passenger_tyre.png'


const VehicleExterior = () => {
    const [back_driver_wheel_img, setback_driver_wheel_img]  = useState<any>(null);
    const [back_driver_tyre_img, setback_driver_tyre_img]  = useState<any>(null);

    const [back_passenger_wheel_img, setback_passenger_wheel_img]  = useState<any>(null);
    const [back_passenger_tyre_img, setback_passenger_tyre_img]  = useState<any>(null);

    const [front_driver_wheel_img, setfront_driver_wheel_img]  = useState<any>(null);
    const [front_driver_tyre_img, setfront_driver_tyre_img]  = useState<any>(null);

    const [front_passenger_wheel_img, setfront_passenger_wheel_img]  = useState<any>(null);
    const [front_passenger_tyre_img, setfront_passenger_tyre_img]  = useState<any>(null);

    const {setVehicle_Wheels} = useAppContext();

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
        retrieve('back_driver_tyre',setback_driver_tyre_img);
        retrieve('back_passenger_wheel',setback_passenger_wheel_img);
        retrieve('back_passenger_tyre',setback_passenger_tyre_img);

        retrieve('front_driver_wheel',setfront_driver_wheel_img);
        retrieve('front_driver_tyre',setfront_driver_tyre_img);
        retrieve('front_passenger_wheel',setfront_passenger_wheel_img);
        retrieve('front_passenger_tyre',setfront_passenger_tyre_img);

        // window.location.reload();
        
    },[])


    useEffect(()=>{


        if(back_driver_wheel_img && back_driver_tyre_img && back_passenger_wheel_img && back_passenger_tyre_img && front_driver_wheel_img && front_driver_tyre_img && front_passenger_wheel_img && front_passenger_tyre_img){
            setVehicle_Wheels(true);

        }
        else{
            setVehicle_Wheels(false);
        }

    },[back_driver_wheel_img,back_driver_tyre_img,back_passenger_wheel_img,back_passenger_tyre_img, front_driver_wheel_img,front_driver_tyre_img,front_passenger_wheel_img,front_passenger_tyre_img])

  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Your wheels & tyres</div>
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-2 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link href='./smart_advice/vehicle_exterior' className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='space-y-3 pt-7'>
            <PhotoFrame Content='Back Driver Wheel' isUploaded={back_driver_wheel_img !== undefined} photo={ back_driver_wheel_img ? back_driver_wheel_img : BackDriverWheel}  link ='back_driver_wheel'/>
            <PhotoFrame Content='Back Driver Tyre' isUploaded={back_driver_tyre_img !== undefined} photo={back_driver_tyre_img ? back_driver_tyre_img : BackDriverTyre} link ='back_driver_tyre'/>
            <PhotoFrame Content='Back Passenger Wheel' isUploaded={back_passenger_wheel_img !== undefined} photo={back_passenger_wheel_img ? back_passenger_wheel_img :  BackPassengerWheel} link ='back_passenger_wheel'/>
            <PhotoFrame Content='Back Passenger Tyre' isUploaded={back_passenger_tyre_img !== undefined} photo={back_passenger_tyre_img ? back_passenger_tyre_img : BackPassengerTyre} link ='back_passenger_tyre'/>

            <PhotoFrame Content='front Driver Wheel' isUploaded={front_driver_wheel_img !== undefined} photo={ front_driver_wheel_img ? front_driver_wheel_img : FrontDriverWheel}  link ='front_driver_wheel'/>
            <PhotoFrame Content='front Driver Tyre' isUploaded={front_driver_tyre_img !== undefined} photo={front_driver_tyre_img ? front_driver_tyre_img : FrontDriverTyre} link ='front_driver_tyre'/>
            <PhotoFrame Content='front Passenger Wheel' isUploaded={front_passenger_wheel_img !== undefined} photo={front_passenger_wheel_img ? front_passenger_wheel_img :  FrontPassengerWheel} link ='front_passenger_wheel'/>
            <PhotoFrame Content='front Passenger Tyre' isUploaded={front_passenger_tyre_img !== undefined} photo={front_passenger_tyre_img ? front_passenger_tyre_img : FrontPassengerTyre} link ='front_passenger_tyre'/>
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

export default VehicleExterior