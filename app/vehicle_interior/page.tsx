"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import DashboardC from '@/assets/Dashboard.png'
import BootC from '@/assets/Boot.png'
import FrontSeatC from '@/assets/Front_Seat.png'
import BackSeatC from '@/assets/Back_Seat.png'
import alert_retake from '@/assets/alert_retake.png'
import DashboardV from '@/assets/DashboardVendor.png'
import BootV from '@/assets/BootVendor.png'
import FrontSeatV from '@/assets/FrontSeatVendor.png'
import BackSeatV from '@/assets/BackSeatVendor.png'
import { useRouter } from 'next/navigation';
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import axios from 'axios';
import PhotoFrameReturn from '../components/PhotoFrameReturn';


const VehicleInterior = () => {
    const divRefs:any = [useRef(null), useRef(null), useRef(null), useRef(null)];
    
    const [dashboardimg, setdashboardimg]  = useState<any>(null);
    const [bootimg, setbootimg]  = useState<any>(null);
    const [frontseatimg, setfrontseatimg]  = useState<any>(null);
    const [backseatimg, setbackseatimg]  = useState<any>(null);
        const [blur_count, set_blur_count] = useState(0);
        const [blured_images,set_blured_images] = useState([
          false,
          false,
          false,
          false
        ])
    const [counter_state, setCounter_state] = useState(0);

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

    const {setVehicle_Interior,isVendor}  = useAppContext();

    const Dashboard = isVendor ? DashboardV : DashboardC;
    const Boot = isVendor ? BootV : BootC;
    const FrontSeat = isVendor ? FrontSeatV : FrontSeatC;
    const BackSeat = isVendor ? BackSeatV : BackSeatC ;   
    

    // Search for images in the db: 
    useEffect(()=>{
      localStorage.setItem('prevRoute','./vehicle_interior');
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
        retrieve('dashboard',setdashboardimg);
        retrieve('boot',setbootimg);
        retrieve('front_seat',setfrontseatimg);
        retrieve('back_seat',setbackseatimg);

        setTimeout(() => {
            console.log(counter,'cc')
            setCounter_state(counter);
            localStorage.setItem(`vehicle_interior_complete`,String(Math.floor((counter/4)*100)));
            const Index = counter - 1; // Adjust for zero-based index
            if (divRefs[Index].current) {
              divRefs[Index].current.scrollIntoView({ behavior: "auto" });
            }
          }, 300);
        // localStorage.setItem('vehicle_interior_state','true');
        // window.location.reload();
        
    },[])
    

    const Router = useRouter();
        // request handler
const handleSubmit = async (event:any) => { 
    event.preventDefault(); 

    const formData = new FormData();
    formData.append('dashboard', dashboardimg);
    formData.append('boot', bootimg);
    formData.append('front_seat', frontseatimg);
    formData.append('back_seat', backseatimg);
    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    const token = localStorage.getItem('token');
    try {
        if(!dashboardimg || !frontseatimg || !bootimg || !backseatimg || blur_count > 0){
            alert('Please upload all images or reupload blured images before proceding')
            return;
        }
        const car = localStorage.getItem('car_no');
      localStorage.setItem(`vehicle_interior_state_${car}`,'true');
        setTimeout(()=>{
          Router.push('./vehicle_photos')
        },300)

      const response = await axios.post(`${url}/pwa/vehicle_interior`,  
        {
            formData,
            car_no: localStorage.getItem('car_no'),
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
      });
      console.log(response.status,response.data);  
      
      
    } catch (error) { 
        // localStorage.setItem('vehicle_interior_state','true');
      console.error(error);
    }
  };



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[100px]`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle interior</div>
        </div>


        {
          (blur_count > 0) ?
          <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#FFD1D1] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-2'>
                    <div className='font-[400] text-sm text-[#F45D5D]'>{blur_count} {blur_count === 1 ? 'photo requires attention' : 'photos require attention'} </div>
                    <div className='font-[300] text-sm'>Retake and reupload</div>
                </div>
                <img src={alert_retake.src} className='object-contain w-[55px] mx-3 mb-2'/>
            </div>
        </div> : 

        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
        <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
            <div className='space-y-5'>
                <div className='font-[300] text-sm'>Perfect your car’s interior photo with our expert guide.</div>
                <Link  href='./advice_interior'  className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
            </div>
            <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/> 
        </div>
        </div>
        }

        <div className='space-y-3 pt-7'>
         <div ref={divRefs[0]}>
            
<PhotoFrameReturn return_link={counter_state >0 ? 'vehicle_interior':'chain'} index = {0} updateState={updateState} Content='Dashboard' isUploaded={dashboardimg !== undefined} photo={ dashboardimg ? dashboardimg : Dashboard}  link ='dashboard'/>
        </div>   
        <div ref={divRefs[1]}>

<PhotoFrameReturn return_link='vehicle_interior' index = {1} updateState={updateState} Content='Boot' isUploaded={bootimg !== undefined} photo={bootimg ? bootimg : Boot} link ='boot'/>
        </div>
        <div ref={divRefs[2]}>

<PhotoFrameReturn return_link='vehicle_interior' index = {2} updateState={updateState} Content='Front seat' isUploaded={frontseatimg !== undefined} photo={frontseatimg ? frontseatimg :  FrontSeat} link ='front_seat'/>
        </div>
        <div ref={divRefs[3]}>

<PhotoFrameReturn return_link='vehicle_interior' index = {3} updateState={updateState} Content='Back seat' isUploaded={backseatimg !== undefined} photo={backseatimg ? backseatimg : BackSeat} link ='back_seat'/>
        </div>
        </div>
        



        <div className={`p-5 pt-4 fixed bottom-0 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
            <Link href='./vehicle_photos' onClick={handleSubmit} className={` w-full flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-5 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default VehicleInterior

