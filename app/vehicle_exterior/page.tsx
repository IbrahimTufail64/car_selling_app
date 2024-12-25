"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import BackDriverC from '@/assets/back_driver.png'
import BackPassenC  from '@/assets/back_passen.png'
import FrontDriverC  from '@/assets/front_driver.png'
import FrontPassenC from '@/assets/front_passen.png'
import { useRouter } from 'next/navigation';
import BackDriverV from '@/assets/backDriverVendor.png'
import BackPassenV  from '@/assets/backPassengerVendor.png'
import FrontDriverV  from '@/assets/frontDriverVendor.png'
import FrontPassenV from '@/assets/frontPassengerVendor.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import axios from 'axios';
// import measureBlur from '../Blur_Detection/measureBlur';


const VehicleExterior = () => { 
    const divRefs:any = [useRef(null), useRef(null), useRef(null), useRef(null)];
    
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);
    // const [car_no, setcar_no] = useState(0);

    const Router = useRouter();
    const {isVendor} = useAppContext()

    const BackDriver = isVendor ? BackDriverV : BackDriverC;
    const FrontDriver = isVendor ? FrontDriverV : FrontDriverC;
    const BackPassen = isVendor ? BackPassenV : BackPassenC;
    const FrontPassen = isVendor ? FrontPassenV : FrontPassenC;
    // Search for images in the db: 
    useEffect(()=>{
      localStorage.setItem('prevRoute','./vehicle_exterior')

        let counter = 0;
                const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
                    try{
                      const car_no = Number(localStorage.getItem('car_no'));
                      const image = await db.images.where('name').equals(image_to_retrieve).filter(e => e.car_number === car_no).first();
                        
                        setter_function(image?.data);
                        if(image?.data){
                          
                          counter ++;
                        }
                    }
                    catch(e){
                        
                    }
                };
        retrieve('front_driver',setfrontDimg);
        retrieve('front_passenger',setfrontPimg);
        retrieve('back_driver',setbackDimg);
        retrieve('back_passenger',setbackPimg);

        setTimeout(() => {
            console.log(counter,'cc')
            console.log(car,'asdf')
            localStorage.setItem(`vehicle_exterior_complete`,String(Math.floor((counter/4)*100)));
            console.log(String(Math.floor((counter/4)*100)));
            const Index = counter - 1; // Adjust for zero-based index
            if (divRefs[Index].current) {
              divRefs[Index].current.scrollIntoView({ behavior: "auto" });
            }
          }, 300);
        // alert('You may need to reload if your image does not appear');
        // window.location.reload();
        
    },[])


    // request handler
const handleSubmit = async (event:any) => { 
    event.preventDefault();

    // if(!frontDimg|| ! frontPimg|| !backDimg|| !backPimg){
    //     alert('Some photos not taken!');
    // }
    const formData = new FormData();
    formData.append('front_driver', frontDimg);
    formData.append('front_passenger', frontPimg);
    formData.append('back_driver', backDimg);
    formData.append('back_passenger', backPimg);
    console.log(frontDimg)
    // measureBlur(frontDimg)
    // .then(blurScore => console.log("Blur Score:", blurScore))
    // .catch(err => console.error("Error measuring blur:", err));
    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    const token = localStorage.getItem('token');
    try {
        if(!frontDimg || !backDimg || !frontPimg || !backPimg){
            alert('Please upload all images before proceding')
            return;
        }
        const car = Number(localStorage.getItem('car_no'));
        localStorage.setItem(`vehicle_exterior_state_${car}`,'true');

        setTimeout(()=>{
          Router.push('./vehicle_photos')
        },300)

      const response = await axios.post(`${url}/pwa/vehicle_exterior`,  
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
      
      
    //   localStorage.setItem(`vehicle_interior_state_${car}`,'false');

      console.log('uploaded now...')
    } catch (error) {
        // localStorage.setItem('vehicle_exterior_state','true');
      console.error(error);
    }
  };



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle exterior</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_exterior'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='space-y-3 py-7'>
            <div ref={divRefs[0]}> 
            <PhotoFrame  Content='Front Driver Corner' isUploaded={frontDimg !== undefined} photo={ frontDimg ? frontDimg : FrontDriver}  link ='front_driver'/>
            </div>
            <div ref={divRefs[1]}> 
            <PhotoFrame Content='Front Passenger Corner' isUploaded={frontPimg !== undefined} photo={frontPimg ? frontPimg : FrontPassen} link ='front_passenger'/>
            </div>
            <div ref={divRefs[2]}>
            <PhotoFrame Content='Back Driver Corner' isUploaded={backDimg !== undefined} photo={backDimg ? backDimg :  BackDriver} link ='back_driver'/>
            </div>
            <div ref={divRefs[3]}>
            <PhotoFrame Content='Back Passenger Corner' isUploaded={backPimg !== undefined} photo={backPimg ? backPimg : BackPassen} link ='back_passenger'/>
            </div>
        </div>
        

        <div className='p-5 pt-2 '>
                <Link href='./vehicle_photos' onClick={handleSubmit} className={`flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-5 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Submit</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default VehicleExterior



