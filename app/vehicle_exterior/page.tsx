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
import alert_retake from '@/assets/alert_retake.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import axios from 'axios';
import PhotoFrameReturn from '../components/PhotoFrameReturn';
// import measureBlur from '../Blur_Detection/measureBlur';


const VehicleExterior = () => { 
    const divRefs:any = [useRef(null), useRef(null), useRef(null), useRef(null)];
    
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);
    const [blur_count, set_blur_count] = useState(0);
    const [counter_state, setCounter_state] = useState(0);
    const [blured_images,set_blured_images] = useState([
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

    const Router = useRouter();
    const {isVendor} = useAppContext()

    const BackDriver = isVendor ? BackDriverV : BackDriverC;
    const FrontDriver = isVendor ? FrontDriverV : FrontDriverC;
    const BackPassen = isVendor ? BackPassenV : BackPassenC;
    const FrontPassen = isVendor ? FrontPassenV : FrontPassenC;
    // Search for images in the db: 
    useEffect(()=>{
      localStorage.setItem('prevRoute','./vehicle_exterior');

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
                
        retrieve('front_driver',setfrontDimg);
        retrieve('front_passenger',setfrontPimg);
        retrieve('back_driver',setbackDimg);
        retrieve('back_passenger',setbackPimg);

        setTimeout(() => {
            console.log(counter,'cc')
            setCounter_state(counter);
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
    formData.append("car_no", localStorage.getItem("car_no") || "");
    console.log(frontDimg)
    // measureBlur(frontDimg)
    // .then(blurScore => console.log("Blur Score:", blurScore))
    // .catch(err => console.error("Error measuring blur:", err));
    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    const token = localStorage.getItem('token');
    try {
        // if(!frontDimg || !backDimg || !frontPimg || !backPimg || blur_count > 0){
        if(!frontDimg || !backDimg || !frontPimg || !backPimg ){
            alert('Please upload all images or reupload blured images before proceding')
            return;
        }
        // if(blur_count > 0){
        //   alert('Please retake blured images before proceeding!')
        //     return;
        // }
        const car = localStorage.getItem('car_no');
        localStorage.setItem(`vehicle_exterior_state_${car}`,'true');

        setTimeout(()=>{
          Router.push('./vehicle_photos')
        },300)

      const response = await axios.post(`${url}/pwa/vehicle_exterior`,  
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
      });
      console.log('response',response.data); 
      // console.log(formData) 


      console.log('uploaded now...')
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[90px]`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle exterior</div>
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
        <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
            <div className='space-y-5'>
                <div className='font-[300] text-sm'>Perfect your car’s exterior photo with our expert guide.</div>
                <Link  href='./advice_exterior'  className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
            </div>
            <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/>
        </div>
        </div>
        }
        

        

        <div className='space-y-3 py-7'>
            <div ref={divRefs[0]}> 
            <PhotoFrameReturn return_link={counter_state >0 ? 'vehicle_exterior':'chain'}  Content='Front driver corner' updateState={updateState} index = {0} isUploaded={frontDimg !== undefined} photo={ frontDimg ? frontDimg : FrontDriver}  link ='front_driver'/>
            </div>
            <div ref={divRefs[1]}> 
            <PhotoFrameReturn return_link='vehicle_exterior' Content='Front passenger corner' updateState={updateState} index = {1} isUploaded={frontPimg !== undefined} photo={frontPimg ? frontPimg : FrontPassen} link ='front_passenger'/>
            </div>
            <div ref={divRefs[2]}>
            <PhotoFrameReturn return_link='vehicle_exterior' Content='Back driver corner' updateState={updateState} index = {2} isUploaded={backDimg !== undefined} photo={backDimg ? backDimg :  BackDriver} link ='back_driver'/>
            </div>
            <div ref={divRefs[3]}>
            <PhotoFrameReturn return_link='vehicle_exterior' Content='Back passenger corner' updateState={updateState} index = {3} isUploaded={backPimg !== undefined} photo={backPimg ? backPimg : BackPassen} link ='back_passenger'/>
            </div>
        </div>
        
        <div className={`p-5 pt-4 fixed bottom-0 w-full ${isVendor ? 'bg-primaryDark' : 'bg-secondary'} `}>
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

export default VehicleExterior



