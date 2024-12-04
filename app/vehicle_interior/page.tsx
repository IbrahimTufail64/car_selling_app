"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import DashboardC from '@/assets/Dashboard.png'
import BootC from '@/assets/Boot.png'
import FrontSeatC from '@/assets/Front_Seat.png'
import BackSeatC from '@/assets/Back_Seat.png'

import DashboardV from '@/assets/DashboardVendor.png'
import BootV from '@/assets/BootVendor.png'
import FrontSeatV from '@/assets/FrontSeatVendor.png'
import BackSeatV from '@/assets/BackSeatVendor.png'
import { useRouter } from 'next/navigation';
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import axios from 'axios';


const VehicleInterior = () => {
    const [dashboardimg, setdashboardimg]  = useState<any>(null);
    const [bootimg, setbootimg]  = useState<any>(null);
    const [frontseatimg, setfrontseatimg]  = useState<any>(null);
    const [backseatimg, setbackseatimg]  = useState<any>(null);

    const {setVehicle_Interior,isVendor}  = useAppContext();

    const Dashboard = isVendor ? DashboardV : DashboardC;
    const Boot = isVendor ? BootV : BootC;
    const FrontSeat = isVendor ? FrontSeatV : FrontSeatC;
    const BackSeat = isVendor ? BackSeatV : BackSeatC ;   
    

    // Search for images in the db: 
    useEffect(()=>{

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const car_no = Number(localStorage.getItem('car_no'));
                const image = await db.images.where('name').equals(image_to_retrieve).filter(e => e.car_number === car_no).first();
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
        if(!dashboardimg || !frontseatimg || !bootimg || !backseatimg){
            alert('Please upload all images before proceding')
            return;
        }
        Router.push('./vehicle_photos')

      const response = await axios.post(`${url}/pwa/vehicle_interior`,  
        {
            formData,
            car_no: Number(localStorage.getItem('car_no')),
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
      });
      console.log(response.status,response.data);  
      const car = Number(localStorage.getItem('car_no'));
      localStorage.setItem(`vehicle_interior_state_${car}`,'true');
      
    } catch (error) {
        // localStorage.setItem('vehicle_interior_state','true');
      console.error(error);
    }
  };



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle interior</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_interior'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
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
                <div onClick={handleSubmit} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>
        

    </div>
  )
}

export default VehicleInterior

