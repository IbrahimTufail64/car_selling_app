"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import ExampleImage from '@/assets/ExampleImage.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';


const DashboardLights = () => {
    const [SampleImage1, setSampleImage1]  = useState<any>(null);
    const [SampleImage2, setSampleImage2]  = useState<any>(null);
    const [SampleImage3, setSampleImage3]  = useState<any>(null);
    const [SampleImage4, setSampleImage4]  = useState<any>(null);

    const {isVendor} = useAppContext()

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
        retrieve('dashboard_lights1',setSampleImage1);
        retrieve('dashboard_lights2',setSampleImage2);
        retrieve('dashboard_lights3',setSampleImage3);
        retrieve('dashboard_lights4',setSampleImage4);

        // window.location.reload();
        
    },[])



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
       <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href='./vehicle_health_selection'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Dashboard and lights</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./smart_advice/IntroSlider'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='flex justify-center pt-10'>
            <div className='w-[90vw] text-[18px]'>
            If your photos look great, click continue to proceed.
            </div>
        
        </div>

        <div className='space-y-3 pt-7'>
            <PhotoFrame Content='Title here' isUploaded={SampleImage1 !== undefined} photo={ SampleImage1 ? SampleImage1 : ExampleImage}  link ='dashboard_lights1'/>
            <PhotoFrame Content='Title here' isUploaded={SampleImage2 !== undefined} photo={SampleImage2 ? SampleImage2 : ExampleImage} link ='dashboard_lights2'/>
            <PhotoFrame Content='Title here' isUploaded={SampleImage3 !== undefined} photo={SampleImage3 ? SampleImage3 :  ExampleImage} link ='dashboard_lights3'/>
            <PhotoFrame Content='Title here' isUploaded={SampleImage4 !== undefined} photo={SampleImage4 ? SampleImage4 : ExampleImage} link ='dashboard_lights4'/>
        </div>
        

        <div className='p-5'>
                <Link href='./Submission2' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default DashboardLights


