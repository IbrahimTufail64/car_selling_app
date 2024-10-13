"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import BackDriver from '@/assets/back_driver.png'
import BackPassen  from '@/assets/back_passen.png'
import FrontDriver  from '@/assets/front_driver.png'
import FrontPassen from '@/assets/front_passen.png'
import splash from '@/assets/icons/Rays-small.png'
import { db, db2 } from '../Local_DB/db';


const VehiclePhotos = () => {
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);



    // Search for images in the db: 
    useEffect(()=>{

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                console.log(image?.data);
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve('front_driver',setfrontDimg);
        retrieve('front_passenger',setfrontPimg);
        retrieve('back_driver',setbackDimg);
        retrieve('back_passenger',setbackPimg);

        
    },[])


    useEffect(()=>{

        const setContext = async()=>{
            await db2.context.add({
                name: 'vehicle_exterior',
                state: true
              });
        }
        if(frontDimg && frontPimg && backDimg && backPimg){
            setContext();
            console.log('yay')
        }

    },[frontDimg,frontPimg,backDimg,backPimg])

  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle exterior</div>
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
            <PhotoFrame Content='Front Driver Corner' isUploaded={frontDimg !== undefined} photo={ frontDimg ? frontDimg : FrontDriver}  link ='front_driver'/>
            <PhotoFrame Content='Front Passenger Corner' isUploaded={frontPimg !== undefined} photo={frontPimg ? frontPimg : FrontPassen} link ='front_passenger'/>
            <PhotoFrame Content='Back Driver Corner' isUploaded={backDimg !== undefined} photo={backDimg ? backDimg :  BackDriver} link ='back_driver'/>
            <PhotoFrame Content='Back Passenger Corner' isUploaded={backPimg !== undefined} photo={backPimg ? backPimg : BackPassen} link ='back_passenger'/>
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

export default VehiclePhotos