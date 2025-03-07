"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'
import logo from '@/assets/Logo.png'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/CamCarFront.png'
import blurBG from '@/assets/backBlur2.png'
import alertNew from '@/assets/alertNEW.png'
// import audio from '../../../assets/audio/camera_audio.wav'

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

import emptyFilter from '@/assets/emptyFilter.png'

import { useOrientation, useTimeout } from 'react-use';
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

const lookup_table_empty:any = {
  'service_records1': emptyFilter,
  'service_records2': emptyFilter,
  'service_records3': emptyFilter,
  'service_records4': emptyFilter,
}

const lookup_table_surface_marks:any = {
  'surface_marks1': emptyFilter,
  'surface_marks2': emptyFilter,
  'surface_marks3': emptyFilter,
  'surface_marks4': emptyFilter,
}

const lookup_table_panel_damage:any = {
  'panel_damage1': emptyFilter,
  'panel_damage2': emptyFilter,
  'panel_damage3': emptyFilter,
  'panel_damage4': emptyFilter,
}

const lookup_table_glass_health:any = {
  'glass_health1': emptyFilter,
  'glass_health2': emptyFilter,
  'glass_health3': emptyFilter,
  'glass_health4': emptyFilter,
}

const lookup_table_exterior_wear_tear:any = {
  'exterior_wear_tear1': emptyFilter,
  'exterior_wear_tear2': emptyFilter,
  'exterior_wear_tear3': emptyFilter,
  'exterior_wear_tear4': emptyFilter,
}

const lookup_table_damaged_absent_fixtures:any = {
  'damaged_absent_fixtures1': emptyFilter,
  'damaged_absent_fixtures2': emptyFilter,
  'damaged_absent_fixtures3': emptyFilter,
  'damaged_absent_fixtures4': emptyFilter,
}

const lookup_table_dashboard_lights:any = {
  'dashboard_lights1': emptyFilter,
  'dashboard_lights2': emptyFilter,
  'dashboard_lights3': emptyFilter,
  'dashboard_lights4': emptyFilter,
}

const Filter = ({ params }: { params: { slug: string } }) => {
    

    // const webcamRef:any = useRef(null);
    // const link = params.slug.split('-');
    // const imageUrl = link[0];

    // let returnLink = '';
    // let car_filter = lookup_table_exterior[imageUrl];
    // returnLink = 'vehicle_exterior';

    // if(car_filter === undefined){
    //   car_filter = lookup_table_interior[imageUrl];
    //   returnLink = 'vehicle_interior';
    // }

    // if(car_filter === undefined){
    //   car_filter = lookup_table_wheels[imageUrl];
    //   returnLink = 'vehicle_wheels';
    // }





    // const {angle,type} = useOrientation(); 
    // const router = useRouter(); 

    // useEffect(()=>{
    //   const portrait = window.matchMedia("(orientation: portrait)").matches;
    //   if(portrait){
    //         router.push(`../rotate/${params.slug}`);
    //     }
    // },[angle])

    // async function addImage(img: any) {
    //   try {
        
    //     const image = await db.images.where('name').equals(imageUrl).first();
    //     if(image?.data !== undefined ){
    //       await db.images.where('name').equals(imageUrl).delete();
    //     }
    //     const id = await db.images.add({
    //       name: imageUrl,
    //       data: img,
    //       car_number: localStorage.getItem('car_no')
    //     });
    //     console.log('test',id);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  
    // const capture = useCallback(async() => {
        
    //   try{
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     const audio = new Audio('https://media.vocaroo.com/mp3/1jSNptuNuLGn'); // Replace with your audio file path or URL
    //     audio.play();
    //     addImage(imageSrc);
    //     setTimeout(() => {
    //       router.push(`../${returnLink}`);
    //     }, 300);
    //   }
    //   catch(e){
    //     // if(img === null){
    //     //     alert(params.slug);
    //     // }
        
    //   }

    // }, [webcamRef]);

  return (
    // <div className="fixed">
    //   <div className="relative">
    //   {/* <img className="h-full w-[14%] absolute z-10" src={blurBG.src}/> */}

    //             <button className='bg-white absolute rounded-full w-[75px] h-[75px] z-20 top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>{capture(); console.log('yes')}}></button>

                
    //             <Link href={returnLink} className="absolute z-20 left-[4.5vw] text-[22px] font-500 top-[30px] text-white">
    //                 Exit
    //             </Link>
    //             <Link href="#">
    //             <img className=" absolute z-20 object-cover w-[40px] left-[4.5vw] bottom-[5vh]" src={alertNew.src}/>
    //             </Link>
    //   <div className="h-full w-[14%] bg-[#000000] absolute z-10 opacity-40 backdrop-blur-xl ">
            
    //   </div>
    //   <div className="h-full w-[14%] right-0 bg-[#000000] absolute z-10 opacity-40 backdrop-blur-xl ">
            
    //   </div>
    //   <div className=" w-[100vw] h-[100vh] overflow-hidden relative">
        

    //     <div className='absolute z-10 w-[100vw] h-[100vh] flex justify-center items-center ' >
    //         <img src={car_filter.src} className='w-[70vw]'/>
    //     </div>

    //     <div className="-z-10">
    //     <WebcamCapture webcamRef={webcamRef}/>
    //     </div>
        
    // </div>
    // </div>
    // </div> 
    null
  )
}

export default Filter







