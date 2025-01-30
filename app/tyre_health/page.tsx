"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import splash from '@/assets/icons/Rays-small.png'
import { db} from '../Local_DB/db';
import { useAppContext } from '../Context';
import WheelFrame from '../components/WheelFrame';
import { useRouter } from 'next/navigation';
import BackDriverWheel from '@/assets/back_driver_tyre.png'
import BackPassengerWheel from '@/assets/back_passenger_tyre.png'
import FrontDriverWheel from '@/assets/front_driver_tyre.png'
import FrontPassengerWheel from '@/assets/front_passenger_tyre.png'
import TyreFrame from '../components/TyreFrame';
import axios from 'axios';

const TyreHealth = () => {
    const Router = useRouter();

    const [back_driver_tyre_img, setback_driver_tyre_img]  = useState<any>(null);
    const [back_passenger_tyre_img, setback_passenger_tyre_img]  = useState<any>(null);
    const [front_driver_tyre_img, setfront_driver_tyre_img]  = useState<any>(null);
    const [front_passenger_tyre_img, setfront_passenger_tyre_img]  = useState<any>(null);

    const [back_driver_tyre_state, setback_driver_tyre_state]  = useState(false);
    const [back_passenger_tyre_state, setback_passenger_tyre_state]  = useState(false);
    const [front_driver_tyre_state, setfront_driver_tyre_state]  = useState(false);
    const [front_passenger_tyre_state, setfront_passenger_tyre_state]  = useState(false);

    const [back_driver_tyre_specs, setback_driver_tyre_specs]  = useState('');
    const [back_passenger_tyre_specs, setback_passenger_tyre_specs]  = useState('');
    const [front_driver_tyre_specs, setfront_driver_tyre_specs]  = useState('');
    const [front_passenger_tyre_specs, setfront_passenger_tyre_specs]  = useState('');

    const {isVendor} = useAppContext();

    const handleWheelUpload = async(isGood:boolean)=>{
        const car = Number(localStorage.getItem('car_no'));
        try{
            let wheel_state: unknown;
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            const token = localStorage.getItem('token');
            localStorage.setItem(`tyre_health_state_${car}`,'true');
            setTimeout(()=>{
                Router.push('./vehicle_health_selection')
            },300)
            if(!isGood){
                // wheel_state = await db.wheel_condition.put({
                //     id: 1,
                //     front_driver: front_driver_tyre_state,
                //     back_driver: back_driver_tyre_state,
                //     front_passenger: front_passenger_tyre_state,
                //     back_passenger: back_passenger_tyre_state
                // });

                const response = await axios.post(`${url}/pwa/tyre_health`,  
                    {
                     back_driver_tyre_state,
                     back_passenger_tyre_state,
                     front_driver_tyre_state,
                     front_passenger_tyre_state,
                     back_driver_tyre_specs,
                     back_passenger_tyre_specs,
                     front_driver_tyre_specs,
                     front_passenger_tyre_specs,
                     car_no: car 

                    }, {
                         headers: {
                             'Content-Type': 'multipart/form-data',
                             Authorization: `Bearer ${token}`
                           }
                   });
                   console.log(response.status,response.data);  
            }
            else {
                // wheel_state = await db.wheel_condition.put({ 
                //     id: 1,
                //     front_driver: false,
                //     back_driver: false,
                //     front_passenger: false,
                //     back_passenger: false
                // });
                const response = await axios.post(`${url}/pwa/tyre_health`,  
                    {
                     back_driver_tyre_state: false,
                     back_passenger_tyre_state: false,
                     front_driver_tyre_state: false,
                     front_passenger_tyre_state: false,
                     back_driver_tyre_specs : '',
                     back_passenger_tyre_specs : '',
                     front_driver_tyre_specs : '',
                     front_passenger_tyre_specs : '',
                     car_no: car
                    }, {
                         headers: {
                             'Content-Type': 'multipart/form-data',
                             Authorization: `Bearer ${token}`
                           }
                   });
                   console.log(response.status,response.data);  
            }
            // handleSubmit(isGood);
            console.log(wheel_state);
            
          
          
        }
        catch(e){
            
        }
    }

    // Search for images in the db: 
    useEffect(()=>{
        localStorage.setItem('prevRoute','./tyre_health');
        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve('back_driver_tyre',setback_driver_tyre_img);
        retrieve('back_passenger_tyre',setback_passenger_tyre_img);

        retrieve('front_driver_tyre',setfront_driver_tyre_img);
        retrieve('front_passenger_tyre',setfront_passenger_tyre_img);
        // window.location.reload();
        
    },[])



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary' } w-full pb-[200px]`}>
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href='./vehicle_health_selection'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Tyre health</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_tyre_health'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='w-full flex justify-center text-[18px] pt-10'>
        <div className=' w-[90%]'>
        Which of these tyres shows tread wear below 1.6mm, or has visible cuts, bulges, or other damage?
        </div>
        </div>

        <div className='space-y-3 pt-7'>
        <TyreFrame setCondition={setback_driver_tyre_specs} Content='Back driver tyre' setisSelected={setback_driver_tyre_state} photo={ back_driver_tyre_img ? back_driver_tyre_img : BackDriverWheel.src}  link ='back_driver_tyre'/>
            
            <TyreFrame setCondition={setback_passenger_tyre_specs} Content='Back passenger tyre' setisSelected={setback_passenger_tyre_state} photo={back_passenger_tyre_img ? back_passenger_tyre_img :  BackPassengerWheel.src} link ='back_passenger_tyre'/>
           

            <TyreFrame setCondition={setfront_driver_tyre_specs} Content='Front driver tyre' setisSelected={setfront_driver_tyre_state} photo={ front_driver_tyre_img ? front_driver_tyre_img : FrontDriverWheel.src}  link ='front_driver_tyre'/>
          
            <TyreFrame setCondition={setfront_passenger_tyre_specs} Content='Front passenger tyre' setisSelected={setfront_passenger_tyre_state} photo={front_passenger_tyre_img ? front_passenger_tyre_img :  FrontPassengerWheel.src} link ='front_passenger_tyre'/>
           
        </div>


        <div className={`w-full fixed flex justify-center bottom-0 ${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'}`}>
          <div className='w-full'>
          <div className='p-5 w-full'>
                <button onClick={()=>{handleWheelUpload(false)}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </button>
        </div>

        <div className='p-5 pt-0 w-full'>
                <button onClick={()=>{handleWheelUpload(true)}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>All Wheel Good</div>
                    </div>
                </button>
        </div>
          </div>
        </div>
        


        

    </div>
  )
}

export default TyreHealth