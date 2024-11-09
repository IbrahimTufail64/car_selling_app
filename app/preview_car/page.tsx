"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import preview_car from '@/assets/preview_car.png'

import BackDriverC from '@/assets/back_driver.png'
import BackPassenC  from '@/assets/back_passen.png'
import FrontDriverC  from '@/assets/front_driver.png'
import FrontPassenC from '@/assets/front_passen.png'

import BackDriverV from '@/assets/backDriverVendor.png'
import BackPassenV  from '@/assets/backPassengerVendor.png'
import FrontDriverV  from '@/assets/frontDriverVendor.png'
import FrontPassenV from '@/assets/frontPassengerVendor.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';


const VehicleExterior = () => {
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);

    const {vehicle_exterior, setVehicle_Exterior} = useAppContext();
    const {isVendor} = useAppContext()

    const BackDriver = isVendor ? BackDriverV : BackDriverC;
    const FrontDriver = isVendor ? FrontDriverV : FrontDriverC;
    const BackPassen = isVendor ? BackPassenV : BackPassenC;
    const FrontPassen = isVendor ? FrontPassenV : FrontPassenC;
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
        retrieve('front_driver',setfrontDimg);
        retrieve('front_passenger',setfrontPimg);
        retrieve('back_driver',setbackDimg);
        retrieve('back_passenger',setbackPimg);

        // window.location.reload();
        
    },[])


    // useEffect(()=>{

    //     const setContext = async(state:boolean)=>{
    //         await db2.context.put({
    //             name: 'vehicle_exterior',
    //             state: state 
    //           });
    //     }
    //     if(frontDimg && frontPimg && backDimg && backPimg){
    //         setVehicle_Exterior(true);
    //         setContext(true);

    //     }
    //     else{
    //         setVehicle_Exterior(false);
    //         setContext(false);
    //     }

    // },[frontDimg,frontPimg,backDimg,backPimg])

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='#'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Be Carsmart ready!</div>
        </div>
        
        <div className='w-full flex justify-center'>
            <div className='w-[90vw]'>
                Please check and verify your profile to ensure a smooth sale!
            </div>
        
        </div>

        <div className='py-5'>
            <img src={preview_car.src} className='w-full object-cover max-h-[300px]'/>
        </div>

        <div className='w-full flex justify-center'>
            <div className='bg-[#1F204F] rounded-2xl w-[90vw] p-3 flex justify-center'>
            <div className='w-full bg-[#4C4D72] border border-2 border-dashed border-[#70718E] rounded-xl py-3 space-y-3 flex justify-center'>
                hello
            </div>
            </div>
        </div>
        

    </div>
  )
}

export default VehicleExterior



