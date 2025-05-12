"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import { useRouter } from 'next/navigation';
import BackDriverWheelC from '@/assets/back_driver_wheel.png'
import BackDriverTyreC from '@/assets/back_driver_tyre_c_mod.jpg'
import BackPassengerWheelC from '@/assets/back_passenger_wheel.png'
import BackPassengerTyreC from '@/assets/back_passenger_tyre_c_mod.jpg'

import FrontDriverWheelC from '@/assets/front_driver_wheel.png'
import FrontDriverTyreC from '@/assets/front_driver_tyre_c_mod.jpg'
import FrontPassengerWheelC from '@/assets/front_passenger_wheel.png'
import FrontPassengerTyreC from '@/assets/front_passenger_tyre_c_mod.jpg'

import alert_retake from '@/assets/alert_retake.png'
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
import { useTimeout } from 'react-use';
import PhotoFrameReturn from '../components/PhotoFrameReturn';


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
    const [counter_state, setCounter_state] = useState(0);
           const [blur_count, set_blur_count] = useState(0);
            const [blured_images,set_blured_images] = useState([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false
            ])
    
                // for updating blur state of images
        const updateState = (index: number, value: boolean) => {
          let temp = blured_images;
          temp[index] = value
          set_blured_images(temp);
          let count = 0;
          temp.map((e)=>{
            e && count++
          })
          set_blur_count(count);
        };

    const BackDriverWheel = isVendor ? BackDriverWheelV : BackDriverWheelC;
    const BackDriverTyre = isVendor ? BackDriverTyreV : BackDriverTyreC;
    const BackPassengerWheel = isVendor ? BackPassengerWheelV : BackPassengerWheelC;
    const BackPassengerTyre = isVendor ? BackPassengerTyreV : BackPassengerTyreC;

    const FrontDriverWheel = isVendor ? FrontDriverWheelV : FrontDriverWheelC;
    const FrontDriverTyre = isVendor ? FrontDriverTyreV : FrontDriverTyreC;
    const FrontPassengerWheel = isVendor ? FrontPassengerWheelV : FrontPassengerWheelC;
    const FrontPassengerTyre = isVendor ? FrontPassengerTyreV : FrontPassengerTyreC;

    // const divRefs = useRef<any>([]); 
    const divRefs:any = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    
    // Search for images in the db: 
    useEffect(()=>{
      localStorage.setItem('prevRoute','./vehicle_wheels');

      let counter = 0;
        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
              const car_no = localStorage.getItem('car_no');
              const image = await db.images.where('name').equals(image_to_retrieve).filter(e => e.car_number === car_no).first();
                
                setter_function(image?.data);
                if(image?.data){
                  
                  counter ++;
                }
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
        setTimeout(() => {
          console.log(counter,'cc');
          setCounter_state(counter);
          localStorage.setItem(`vehicle_wheels_complete`,String(Math.floor((counter/8)*100)));
          const Index = counter - 1; // Adjust for zero-based index
          if (divRefs[Index].current) {
            divRefs[Index].current.scrollIntoView({ behavior: "auto" });
          }
        }, 300);
        

        // window.location.reload();
        const car = localStorage.getItem('car_no');
      localStorage.setItem(`vehicle_wheels_state_${car}`,'true'); 
        
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
        formData.append("car_no", localStorage.getItem("car_no") || "");
    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    const token = localStorage.getItem('token');

    try {
        // if(!back_driver_wheel_img || !back_driver_tyre_img || !back_passenger_wheel_img || !back_passenger_tyre_img || !front_driver_wheel_img || !front_driver_tyre_img || !front_passenger_wheel_img || !front_passenger_tyre_img || blur_count > 0){
        if(!back_driver_wheel_img || !back_driver_tyre_img || !back_passenger_wheel_img || !back_passenger_tyre_img || !front_driver_wheel_img || !front_driver_tyre_img || !front_passenger_wheel_img || !front_passenger_tyre_img){
            alert('Please upload all images or reupload blured images before proceding')
            return;
        }
              const car = localStorage.getItem('car_no');
      localStorage.setItem(`vehicle_wheels_state_${car}`,'true');
        setTimeout(()=>{

          Router.push('./vehicle_photos')
        },300)

      const response = await axios.post(`${url}/pwa/vehicle_wheels_tyres`,  
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.status,response.data); 
 
      
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
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[100px]`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Your wheels & tyres</div>
        </div>

        {
          (blur_count > 0) ?
          <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#FFD1D1] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-2'>
                    <div className='font-[400] text-sm text-[#F45D5D]'>{blur_count} {blur_count === 1 ? 'photo requires attention' : 'photos require attention'}</div>
                    <div className='font-[300] text-sm'>Retake and reupload</div>
                </div>
                <img src={alert_retake.src} className='object-contain w-[55px] mx-3 mb-2'/>
            </div>
        </div> : 

        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-2 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Perfect your car’s wheel & tyre photos with our expert guide.</div>
                    <Link  href='./advice_vehicle_wheels'  className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/> 
            </div>
        </div>
        }

        

        <div className='space-y-3 pt-7'>

            <div ref={divRefs[0]}>
              
            <PhotoFrameReturn return_link={counter_state >0 ? 'vehicle_wheels':'chain'} updateState = {updateState} index = {0} Content='Back driver wheel' isUploaded={back_driver_wheel_img !== undefined} photo={ back_driver_wheel_img ? back_driver_wheel_img : BackDriverWheel}  link ='back_driver_wheel'/>
            </div>
            <div ref={divRefs[1]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {1} Content='Back driver tyre' isUploaded={back_driver_tyre_img !== undefined} photo={back_driver_tyre_img ? back_driver_tyre_img : BackDriverTyre} link ='back_driver_tyre'/>
            </div>
            <div ref={divRefs[2]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {2} Content='Back passenger wheel' isUploaded={back_passenger_wheel_img !== undefined} photo={back_passenger_wheel_img ? back_passenger_wheel_img :  BackPassengerWheel} link ='back_passenger_wheel'/>
            </div>
            <div ref={divRefs[3]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {3} Content='Back passenger tyre' isUploaded={back_passenger_tyre_img !== undefined} photo={back_passenger_tyre_img ? back_passenger_tyre_img : BackPassengerTyre} link ='back_passenger_tyre'/>
            </div>

            <div ref={divRefs[4]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {4} Content='Front driver wheel' isUploaded={front_driver_wheel_img !== undefined} photo={ front_driver_wheel_img ? front_driver_wheel_img : FrontDriverWheel}  link ='front_driver_wheel'/>
            </div>
            <div ref={divRefs[5]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {5} Content='Front driver tyre' isUploaded={front_driver_tyre_img !== undefined} photo={front_driver_tyre_img ? front_driver_tyre_img : FrontDriverTyre} link ='front_driver_tyre'/>
            </div>
            <div ref={divRefs[6]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {6} Content='Front passenger wheel' isUploaded={front_passenger_wheel_img !== undefined} photo={front_passenger_wheel_img ? front_passenger_wheel_img :  FrontPassengerWheel} link ='front_passenger_wheel'/>
            </div>
            <div ref={divRefs[7]}>
              
            <PhotoFrameReturn return_link='vehicle_wheels' updateState = {updateState} index = {7} Content='Front passenger tyre' isUploaded={front_passenger_tyre_img !== undefined} photo={front_passenger_tyre_img ? front_passenger_tyre_img : FrontPassengerTyre} link ='front_passenger_tyre'/>
            </div>
        </div>
        


        <div className={`p-5 pt-4 fixed bottom-0 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
            <div onClick={handleSubmit} className={` w-full flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-5 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>
        

    </div>
  )
}

export default VehicleWheels

