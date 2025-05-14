"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import serviceRecords from '@/assets/ExampleImage.png' 
import splash from '@/assets/icons/Rays-small.png'
import { db, Image } from '../Local_DB/db';
import { useAppContext } from '../Context';
import alertblue from '@/assets/icons/alertBlue.png'
import alertWhite from '@/assets/icons/disclaimerWhite.png'
import PhotoFrameService from '../components/PhotoFrameService';
import PhotoFrameDynamic from '../components/PhotoFrameDynamic';
import useEmblaCarousel from 'embla-carousel-react';
import ExampleImage from '@/assets/ExamplePlaceHolder.png'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import alert_retake from '@/assets/alert_retake.png'

const ServiceRecordsCapture = () => {
    const Router = useRouter();
    const [images,setImages] = useState<Image[]>([]);
    const [car_no,setCar_no] = useState('');

            const [blur_count, set_blur_count] = useState(0);
            const [blured_images,set_blured_images] = useState<Boolean[]>([])
    
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

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })

    const {isVendor} = useAppContext();
    const Alert = isVendor ? alertWhite : alertblue;
    // Search for images in the db: 
    useEffect(()=>{
        localStorage.setItem('prevRoute','./service_records_customer');
        const car_number = localStorage.getItem('car_no');
        setCar_no(String(car_number));
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
        retrieve('service_records',setImages);

        // window.location.reload();
        
    },[])


    const handleSubmit = async (event:any) => { 
        event.preventDefault();
        Router.push('./preview_car');
    
        const formData = new FormData();

        images.forEach(e=>{
            formData.append(`${e.name}-${e.dynamic_image_number}-${e.car_number}`, e.data);
        })
        formData.append("car_no", localStorage.getItem("car_no") || "");

        // console.log(formData);

        const url:any = process.env.NEXT_PUBLIC_API_URL ;
        const token = localStorage.getItem('token');
        try {
            if(images.length < 1 ){ 
                alert('Please upload required images before proceeding')
                return; 
            }
            console.log({
                formData,
                car_no
            });
    
          const response = await axios.post(`${url}/pwa/service_records`,  
            formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
          });
          console.log(response.status,response.data);  
          const car = localStorage.getItem('car_no');
              localStorage.setItem(`service_records_state_${car}`,'true');
          
        // if(!isVendor){
        //         Router.push('./preview_car')
        // }
        // else if(localStorage.getItem('saletag')==='WholeSale'){
        //     Router.push('./Submission7')
        //   }else{
        //     Router.push('./preview_car')
        //   }
        } catch (error) {
          console.error(error);
        }
      };



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full flex flex-col min-h-[100vh] justify-between pb-[100px]`}>
        <div>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./service_manuals_keys'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Service, manuals and keys</div>
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
                    <div className='font-[300] text-sm'>Where can I find my service history?</div>
                    <Link  href='./service_records_example'  className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] landscape:w-[20vw]'/>
            </div>
        </div>
}

         <div className='flex justify-center w-full'>
            <div className={`border-[1px] ${isVendor ? 'border-[#3D3D6A]': 'border-[#D3D4FD]'} mt-7 w-[90%] rounded-lg p-3 font-[300] flex justify-between space-x-10 px-7`}>
                <div>
                A detailed service record increases the likelihood of selling your car by 10%
                </div>
                <div className='h-full flex justify-center items-center'>
                    <img src={Alert.src} className='max-w-24'/>
                </div>
            </div>
        </div> 






        <div className='space-y-3 pt-7'>
            {images.length === 0 && <PhotoFrameDynamic image_name='service_records' Car_no={car_no} DynamicImageNo={1} Content='Service records' isUploaded={false} photo={ ExampleImage}  return_link ='service_records_customer' updateState={updateState}/>}
        <div className="embla overflow-hidden mx-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex space-x-3">
            {images.map((e,i)=>{
                return <div className="embla__slide "><PhotoFrameDynamic image_name='service_records' Car_no={car_no} DynamicImageNo={Number(e.dynamic_image_number)} Content='Service records' isUploaded={e !== null} photo={ e ? e.data : ExampleImage}  return_link ='service_records_customer' updateState={updateState}/></div>;
            })}
            {images.length>=1 && 
                <PhotoFrameDynamic image_name='service_records' Car_no={car_no} DynamicImageNo={images.length+1} Content='Service history' isUploaded={false} photo={ ExampleImage}  return_link ='service_records_customer' updateState={updateState}/>
            }
          </div>
        </div>
        
      </div>
            
        </div>
        </div>





    
        

        <div className='p-5 fixed bottom-0 w-full'>
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

export default ServiceRecordsCapture 