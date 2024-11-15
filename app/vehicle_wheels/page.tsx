"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import { useRouter } from 'next/navigation';
import BackDriverWheelC from '@/assets/back_driver_wheel.png'
import BackDriverTyreC from '@/assets/back_driver_tyre.png'
import BackPassengerWheelC from '@/assets/back_passenger_wheel.png'
import BackPassengerTyreC from '@/assets/back_passenger_tyre.png'

import FrontDriverWheelC from '@/assets/front_driver_wheel.png'
import FrontDriverTyreC from '@/assets/front_driver_tyre.png'
import FrontPassengerWheelC from '@/assets/front_passenger_wheel.png'
import FrontPassengerTyreC from '@/assets/front_passenger_tyre.png'

// Vendor pics 

import BackDriverWheelV from '@/assets/BackDriverWheelVendor.png'
import BackDriverTyreV from '@/assets/BackDriverTyreVendor.png'
import BackPassengerWheelV from '@/assets/BackPassengerWheelVendor.png'
import BackPassengerTyreV from '@/assets/BackPassengerTyreVendor.png'

import FrontDriverWheelV from '@/assets/FrontDriverWheelVendor.png'
import FrontDriverTyreV from '@/assets/FrontDriverTyreVendor.png'
import FrontPassengerWheelV from '@/assets/FrontPassengerWheelVendor.png'
import FrontPassengerTyreV from '@/assets/FrontPassengerTyre.png'
import axios from 'axios';


const VehicleWheels = () => {
    const [back_driver_wheel_img, setback_driver_wheel_img]  = useState<any>(null);
    const [back_driver_tyre_img, setback_driver_tyre_img]  = useState<any>(null);

    const [back_passenger_wheel_img, setback_passenger_wheel_img]  = useState<any>(null);
    const [back_passenger_tyre_img, setback_passenger_tyre_img]  = useState<any>(null);

    const [front_driver_wheel_img, setfront_driver_wheel_img]  = useState<any>(null);
    const [front_driver_tyre_img, setfront_driver_tyre_img]  = useState<any>(null);

    const [front_passenger_wheel_img, setfront_passenger_wheel_img]  = useState<any>(null);
    const [front_passenger_tyre_img, setfront_passenger_tyre_img]  = useState<any>(null);

    const {setVehicle_Wheels,isVendor} = useAppContext();

    const BackDriverWheel = isVendor ? BackDriverWheelV : BackDriverWheelC;
    const BackDriverTyre = isVendor ? BackDriverTyreV : BackDriverTyreC;
    const BackPassengerWheel = isVendor ? BackPassengerWheelV : BackPassengerWheelC;
    const BackPassengerTyre = isVendor ? BackPassengerTyreV : BackPassengerTyreC;

    const FrontDriverWheel = isVendor ? FrontDriverWheelV : FrontDriverWheelC;
    const FrontDriverTyre = isVendor ? FrontDriverTyreV : FrontDriverTyreC;
    const FrontPassengerWheel = isVendor ? FrontPassengerWheelV : FrontPassengerWheelC;
    const FrontPassengerTyre = isVendor ? FrontPassengerTyreV : FrontPassengerTyreC;

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

    const Router = useRouter();
        // request handler
const handleSubmit = async (event:any) => { 
    event.preventDefault(); 

    const formData = new FormData();

    formData.append('back_driver_wheel',back_driver_wheel_img);
        formData.append('back_driver_tyre',back_driver_tyre_img);
        formData.append('back_passenger_wheel',back_passenger_wheel_img);
        formData.append('back_passenger_tyre',back_passenger_tyre_img);

        formData.append('front_driver_wheel',front_driver_wheel_img);
        formData.append('front_driver_tyre',front_driver_tyre_img);
        formData.append('front_passenger_wheel',front_passenger_wheel_img);
        formData.append('front_passenger_tyre',front_passenger_tyre_img);
    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    const token = localStorage.getItem('token');

    try {
        if(!back_driver_wheel_img || !back_driver_tyre_img || !back_passenger_wheel_img || !back_passenger_tyre_img || !front_driver_wheel_img || !front_driver_tyre_img || !front_passenger_wheel_img || !front_passenger_tyre_img){
            alert('Please upload all images before proceding')
            return;
        }

      const response = await axios.post(`${url}/vehicle_wheels_tyres`,  
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.status,response.data);  
      Router.push('./vehicle_photos')
    } catch (error) {
      console.error(error);
    }
  };
  
    // useEffect(()=>{


    //     if(back_driver_wheel_img && back_driver_tyre_img && back_passenger_wheel_img && back_passenger_tyre_img && front_driver_wheel_img && front_driver_tyre_img && front_passenger_wheel_img && front_passenger_tyre_img){
    //         setVehicle_Wheels(true);

    //     }
    //     else{
    //         setVehicle_Wheels(false);
    //     }

    // },[back_driver_wheel_img,back_driver_tyre_img,back_passenger_wheel_img,back_passenger_tyre_img, front_driver_wheel_img,front_driver_tyre_img,front_passenger_wheel_img,front_passenger_tyre_img])

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Your wheels & tyres</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_vehicle_wheels'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
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
                <div onClick={handleSubmit} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>
        

    </div>
  )
}

export default VehicleWheels

