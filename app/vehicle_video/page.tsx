"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import { useRouter } from 'next/navigation';

import ExampleImage from '@/assets/ExampleImage.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import VideoFrame from '../components/VideoFrame';
import axios from 'axios';


const VehicleVideo = () => {
    const [vehicle_video, setvehicle_video]  = useState<any>(null);
    const Router = useRouter(); 
    const {isVendor} = useAppContext();
    const [is_safari, setis_safari] = useState(false);

    const isSafari = () => {
        const ua = navigator.userAgent;
        return ua.includes('Safari') && !ua.includes('Chrome') && !ua.includes('Chromium');
      };

    // Search for images in the db: 
    useEffect(()=>{
        setis_safari(isSafari());
        console.log(isSafari());

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first(); 
                if(image?.data == undefined){
                    setter_function(undefined)
                    console.log(image?.data)
                }else{
                    const url = URL.createObjectURL(image?.data);
                setter_function(image?.data);
                console.log(image?.data)
                }
                
            }
            catch(e){
                
            }
        };
        retrieve('video',setvehicle_video);

        // window.location.reload();
        
    },[])


    async function Submit() {
        try {
            const car_no = Number(localStorage.getItem('car_no'));
            const formData = new FormData();
            const video = String(localStorage.getItem(`videoData_${car_no}`)); 
            console.log(video);
            if(!vehicle_video){
                alert('please upload a video to proceed!');
                return;
            }
            const car = Number(localStorage.getItem('car_no'));
                  
                localStorage.setItem(`vehicle_video_state_${car}`,'true');
                // localStorage.setItem(`vehicle_photos_state_${car}`,'true');
            Router.push('./preview_car');
            formData.append('front_driver', vehicle_video);
            const token = localStorage.getItem('token'); 
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pwa/vehicle_video`,  
                {
                    formData,
                    car_no
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                      }
              });
              console.log(response.status,response.data);  
              
        } catch (error) {
            
            console.log(error);
        }
    }

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full min-h-[100vh] relative`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./Submission7'><IoChevronBack size={28} className='mt-[1px]'/></Link>
            <div>Vehicle video</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_vehicle_video'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='space-y-3 pt-7 pb-[120px]'>
            
            <VideoFrame Content='Vehicle video' isUploaded={vehicle_video !== undefined} photo={vehicle_video ? vehicle_video :  ExampleImage} link ='video'/>
            
        </div>
        

        <div className='p-5 absolute flex justify-center w-full bottom-2'>
                <div className='w-[90vw]'>
                <div onClick={Submit} className={`flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-5 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Submit</div>
                        <img src={splash.src}/>
                    </div>
                </div>
                </div>
        </div>
        

    </div>
  )
}

export default VehicleVideo



