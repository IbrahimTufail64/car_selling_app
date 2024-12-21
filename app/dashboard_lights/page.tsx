"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import useEmblaCarousel from 'embla-carousel-react'
// import ExampleImage from '@/assets/ExampleImage.png'
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import PhotoFrameDynamic from '../components/PhotoFrameDynamic';
import { useRouter } from 'next/navigation';
import ExampleImage from '@/assets/ExamplePlaceHolder.png'
import { Image } from '../Local_DB/db';
import axios from 'axios';

const SurfaceMarks = () => {
    const [images,setImages] = useState<Image[]>([]);
    const [car_no,setCar_no] = useState(0);

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })

    const {isVendor} = useAppContext();
    const Router = useRouter();

    const handleSubmit = async (event:any) => { 
        event.preventDefault();
    
        const formData = new FormData();

        images.forEach(e=>{
            formData.append(`${e.name}-${e.dynamic_image_number}-${e.car_number}`, e.data);
        })
        

        // console.log(formData);

        const url:any = process.env.NEXT_PUBLIC_API_URL ;
        const token = localStorage.getItem('token');
        try {
            if(images.length < 1){
                alert('Please upload atleast one image before proceeding')
                return;
            }

            const car = Number(localStorage.getItem('car_no'));
              localStorage.setItem(`dashboard_lights_state_${car}`,'true');
              setTimeout(()=>{

                Router.push('./vehicle_health_selection')
            },300)
    
          const response = await axios.post(`${url}/pwa/dashboard_lights`,  
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
          console.error(error);
        }
      };
    // Search for images in the db: 
    useEffect(()=>{
        const car_number = Number(localStorage.getItem('car_no'));
        setCar_no(car_number);
        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const images = await db.images
                    .where('name').equals(image_to_retrieve)
                    .filter(image => image.car_number === car_number )
                    .toArray();
                // const imageData = images.map(e => e=e.data);
                console.log(images);
                setter_function(images);
            }
            catch(e){
                console.log(e);
            }
        };
        retrieve('dashboard_lights',setImages);

        // window.location.reload();
        
    },[])



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full min-h-[100vh]`}>
        <div className='flex flex-col justify-between min-h-[100vh]'>
        <div >
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href='./vehicle_health_selection'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Dashboard and lights</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Get your photo right with our expert help.</div>
                    <Link  href='./advice_dashboard_lights'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='flex justify-center pt-10'>
            <div className='w-[90vw] text-[18px]'>
            If your photos look great, click continue to proceed.
            </div>
        
        </div>

        <div className='space-y-3 pt-7'>
            {images.length === 0 && <PhotoFrameDynamic image_name='dashboard_lights' Car_no={car_no} DynamicImageNo={1} Content='Title here' isUploaded={false} photo={ ExampleImage}  return_link ='dashboard_lights'/>}
        <div className="embla overflow-hidden mx-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex space-x-5">
            {images.map((e,i)=>{
                return <div className="embla__slide "><PhotoFrameDynamic image_name='dashboard_lights' Car_no={car_no} DynamicImageNo={Number(e.dynamic_image_number)} Content='Title here' isUploaded={e !== null} photo={ e ? e.data : ExampleImage}  return_link ='dashboard_lights'/></div>;
            })}
            {images.length===1 && 
                <PhotoFrameDynamic image_name='dashboard_lights' Car_no={car_no} DynamicImageNo={2} Content='Title here' isUploaded={false} photo={ ExampleImage}  return_link ='dashboard_lights'/>
            }
          </div>
        </div>
        
      </div>
            
        </div>
        <div className='w-full flex justify-center'>
        <Link href={`./camera_filter_dynamic/${'dashboard_lights'}-${images.length+1}-${'dashboard_lights'}`} className='py-2 px-5 text-[18px] my-5'>
             Add another photo
        </Link>
        </div>
        </div>
        

        <div className='p-5'>
                <div onClick={handleSubmit} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>
        </div>
        

    </div>
  )
}

export default SurfaceMarks



