"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'

import BackDriver from '@/assets/BackDriverF.png'
import BackPassen from '@/assets/BackPassenF.png'
import FrontDriver from '@/assets/FrontDriverF.png'
import FrontPassen from '@/assets/FrontPassenF.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { db } from "@/app/Local_DB/db";

const lookup_table:any = {
  'back_driver': BackDriver,
  'back_passenger':BackPassen,
  'front_driver': FrontDriver,
  'front_passenger': FrontPassen
}

const Filter = ({ params }: { params: { slug: string } }) => {
  

    const webcamRef:any = useRef(null);

    let returnLink = '';
    if(params.slug.includes('back') || params.slug.includes('front')){
      returnLink = 'vehicle_exterior';
    }
    const car_filter = lookup_table[params.slug];
    console.log(car_filter);

    const {angle,type} = useOrientation(); 
    const router = useRouter(); 

    useEffect(()=>{
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if(portrait){
            router.push(`../rotate/${params.slug}`);
        }
    },[angle])

    async function addImage(img: any) {
      try {
        // Add the new friend!
        const image = await db.images.where('name').equals(params.slug).first();
        if(image?.data !== undefined ){
          await db.images.where('name').equals(params.slug).delete();
        }
        const id = await db.images.add({
          name: params.slug,
          data: img
        });
      } catch (error) {
        console.log(error)
      }
    }
  
    const capture = useCallback(async() => {
        
      try{
        const imageSrc = webcamRef.current.getScreenshot();

        addImage(imageSrc);

        router.push(`../${returnLink}`);
      }
      catch(e){
        // if(img === null){
        //     alert(params.slug);
        // }
        
      }

    }, [webcamRef]);

  return (
    <div className='bg-[#282828] h-[100vh] flex '>
        
        <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
            <Link href='#' >
                Exit 
            </Link>
            <Link href='#'>
                <img src={Alert.src} className='w-10 '/> 
            </Link>
        </div>
        <div className='flex justify-center items-center h-full relative'>
        <div className='absolute w-full h-full flex justify-center items-center' >
            <img src={car_filter.src} className='w-[70vw]'/>
        </div>
        <WebcamCapture webcamRef={webcamRef}/>
        </div>
        <div className='w-[10vw]'>
            <div className='flex w-[10vw] justify-center  items-center h-full relative'>
                <button className='bg-[#1E201D] rounded-full border border-1 border-secondary w-[60px] h-[60px] cursor-pointer' onClick={()=>{capture()}}></button>
            </div>
        </div>
    </div>
  )
}

export default Filter