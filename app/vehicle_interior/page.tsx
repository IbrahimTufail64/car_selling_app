"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import Dashboard from '@/assets/Dashboard.png'
import Boot from '@/assets/Boot.png'
import FrontSeat from '@/assets/Front_Seat.png'
import BackSeat from '@/assets/Back_Seat.png'
import splash from '@/assets/icons/Rays-small.png'
import { db, db2 } from '../Local_DB/db';
import { useAppContext } from '../Context';


const VehiclePhotos = () => {
    const [dashboardimg, setdashboardimg]  = useState<any>(null);
    const [bootimg, setbootimg]  = useState<any>(null);
    const [frontseatimg, setfrontseatimg]  = useState<any>(null);
    const [backseatimg, setbackseatimg]  = useState<any>(null);

    const {setVehicle_Interior}  = useAppContext();

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
        retrieve('dashboard',setdashboardimg);
        retrieve('boot',setbootimg);
        retrieve('front_seat',setfrontseatimg);
        retrieve('back_seat',setbackseatimg);

        // window.location.reload();
        
    },[])


    useEffect(()=>{

        const setContext = async(state:boolean)=>{
            await db2.context.add({
                name: 'vehicle_interior',
                state: state
              });
        }
        if(dashboardimg && bootimg && frontseatimg && backseatimg){
            setContext(true);
            setVehicle_Interior(true);
        }
        else{
            setVehicle_Interior(false);
            setContext(false);
            console.log(':(')
        }

    },[dashboardimg,bootimg,frontseatimg,backseatimg])

  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle interior</div>
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
            <PhotoFrame Content='Dashboard' isUploaded={dashboardimg !== undefined} photo={ dashboardimg ? dashboardimg : Dashboard}  link ='dashboard'/>
            <PhotoFrame Content='Boot' isUploaded={bootimg !== undefined} photo={bootimg ? bootimg : Boot} link ='boot'/>
            <PhotoFrame Content='Front seat' isUploaded={frontseatimg !== undefined} photo={frontseatimg ? frontseatimg :  FrontSeat} link ='front_seat'/>
            <PhotoFrame Content='Back seat' isUploaded={backseatimg !== undefined} photo={backseatimg ? backseatimg : BackSeat} link ='back_seat'/>
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