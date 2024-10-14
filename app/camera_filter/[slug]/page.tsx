"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'

import BackDriver from '@/assets/BackDriverF.png'
import BackPassen from '@/assets/BackPassenF.png'
import FrontDriver from '@/assets/FrontDriverF.png'
import FrontPassen from '@/assets/FrontPassenF.png'

import dashboard from '@/assets/dashboard_filter.png'
import boot from '@/assets/boot_filter.png'
import frontSeat from '@/assets/front_seat_filter.png'
import backSeat from '@/assets/back_seat_filter.png'

import BackDriverWheel from '@/assets/PNG-Back-Driver-Wheel.png'
import BackDriverTyre from '@/assets/PNG-Back-Driver-Tyre-Tread.png'
import BackPassengerWheel from '@/assets/PNG-Back-Passenger-Wheel.png'
import BackPassengerTyre from '@/assets/PNG-Back-Passenger-Tyre-Tread.png'

import FrontDriverWheel from '@/assets/PNG-Front-Driver-WheelPNG-Front-Driver-Wheel.png'
import FrontDriverTyre from '@/assets/PNG-Front-Driver-Tyre-Tread.png'
import FrontPassengerWheel from '@/assets/PNG-Front-Passenger-Wheel.png'
import FrontPassengerTyre from '@/assets/PNG-Back-Passenger-Tyre-Tread.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { db } from "@/app/Local_DB/db";

const lookup_table_wheels:any = {
  'back_driver_wheel': BackDriverWheel,
  'back_driver_tyre':BackDriverTyre,
  'back_passenger_wheel': BackPassengerWheel,
  'back_passenger_tyre': BackPassengerTyre,
  'front_driver_wheel': FrontDriverWheel,
  'front_driver_tyre':FrontDriverTyre,
  'front_passenger_wheel': FrontPassengerWheel,
  'front_passenger_tyre': FrontPassengerTyre
}

const lookup_table_exterior:any = {
  'back_driver': BackDriver,
  'back_passenger':BackPassen,
  'front_driver': FrontDriver,
  'front_passenger': FrontPassen
}

const lookup_table_interior:any = {
  'dashboard': dashboard,
  'boot':boot,
  'front_seat': frontSeat,
  'back_seat': backSeat
}



const Filter = ({ params }: { params: { slug: string } }) => {
  

    const webcamRef:any = useRef(null);

    let returnLink = '';

    let car_filter = lookup_table_exterior[params.slug];
    returnLink = 'vehicle_exterior';

    if(car_filter === undefined){
      car_filter = lookup_table_interior[params.slug];
      returnLink = 'vehicle_interior';
    }

    if(car_filter === undefined){
      car_filter = lookup_table_wheels[params.slug];
      returnLink = 'vehicle_wheels';
    }

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
    <div className='bg-[#282828] h-[100vh] overflow-hidden flex '>
        
        <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
            <Link href='#' >
                Exit 
            </Link>
            <Link href='#'>
                <img src={Alert.src} className='w-10 '/> 
            </Link>
        </div>
        <div className='flex justify-center items-center h-full relative'>
        
        <WebcamCapture webcamRef={webcamRef}/>
        <div className='absolute w-full h-full flex justify-center items-center' >
            <img src={car_filter.src} className='w-[70vw]'/>
        </div>
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