"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import { useRouter } from 'next/navigation';
import splash from '@/assets/icons/Rays-small.png'
import { db, Image } from '../Local_DB/db';
import { useAppContext } from '../Context';
import alertblue from '@/assets/icons/alertBlue.png'
import alertWhite from '@/assets/icons/disclaimerWhite.png'
import PhotoFrameService from '../components/PhotoFrameService';
import PhotoFrameDynamic from '../components/PhotoFrameDynamic';
import useEmblaCarousel from 'embla-carousel-react';
import ExampleImage from '@/assets/ExamplePlaceHolder.png'
import PhotoFrameServiceAdd from '../components/PhotoFrameServiceAdd';
import axios from 'axios';

const ServiceRecordsCapture = () => {
    const Router = useRouter();
    const [hasRenderedValidElement, setHasRenderedValidElement] = useState(false);
    const [images,setImages] = useState<Image[]>([]);
    const [car_no,setCar_no] = useState(0);

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })

    const {isVendor} = useAppContext();
    const Alert = isVendor ? alertWhite : alertblue;
    // Search for images in the db: 
    useEffect(()=>{
        localStorage.setItem('prevRoute','./service_records');
        const car_number = Number(localStorage.getItem('car_no'));
        setCar_no(car_number);
        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const images = await db.images
                    .where('name').equals(image_to_retrieve)
                    // .filter(image => image.car_number === car_number )
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

    useEffect(() => {
        // Check if at least one element in `images` satisfies the rendering condition
        const hasValidImage = images.some(e => e.dynamic_image_number !== 100 && e.dynamic_image_number !== 101);
        setHasRenderedValidElement(hasValidImage);
    }, [images]);

    const handleSubmit = async (event:any) => { 
        event.preventDefault();
        const car = Number(localStorage.getItem('car_no'));
              localStorage.setItem(`service_records_state_${car}`,'true');      
              setTimeout(()=>{
                if(localStorage.getItem('saletag')==='WholeSale'){
                    Router.push('./Submission7')
                  }else{
                    Router.push('./preview_car')
                  }
              },300)
    
        const formData = new FormData();

        images.forEach(e=>{
            formData.append(`${e.name}-${e.dynamic_image_number}-${e.car_number}`, e.data);
        })
        

        // console.log(formData);

        const url:any = process.env.NEXT_PUBLIC_API_URL ;
        const token = localStorage.getItem('token');
        try {
            if(images.length < 3){ 
                alert('Please upload required images before proceeding')
                return;
            }
            console.log({
                formData,
                car_no
            });
          const response = await axios.post(`${url}/pwa/service_records`,  
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

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[100px]`}>
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='./service_manuals_keys'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Service, Manuals and Keys</div>
        </div>
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg pb-2'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Upload all manuals, service records, and keys to maximize your car's trade value.</div>
                    <Link  href='./service_records_example'  className='font-[400] text-sm mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src} className=' object-contain'/>
            </div>
        </div>

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

        {/* <div className='space-y-3 pt-7'>
        <PhotoFrame Content='Title here' isUploaded={serviceRecords1 !== undefined} photo={ serviceRecords1 ? serviceRecords1 : serviceRecords}  link ='service_records1'/>
        <PhotoFrame Content='Title here' isUploaded={serviceRecords2 !== undefined} photo={serviceRecords2 ? serviceRecords2 : serviceRecords} link ='service_records2'/>
        <PhotoFrame Content='Title here' isUploaded={serviceRecords3 !== undefined} photo={serviceRecords3 ? serviceRecords3 :  serviceRecords} link ='service_records3'/>
        <PhotoFrame Content='Title here' isUploaded={serviceRecords4 !== undefined} photo={serviceRecords4 ? serviceRecords4 : serviceRecords} link ='service_records4'/>
    </div> */}



<div className='space-y-3 pt-7'>
            {!hasRenderedValidElement &&  
                    <PhotoFrameServiceAdd image_name='service_records' Car_no={car_no} DynamicImageNo={1} Content='Service history' isUploaded={false} photo={ ExampleImage}  return_link ='service_records'/>

            }
        <div className="embla overflow-hidden mx-2">
        <div className={`embla__viewport ${hasRenderedValidElement &&'bg-[#1F204F]'} rounded-xl pt-3`} ref={emblaRef}>
          <div className="embla__container flex space-x-5">

          {images.map((e, i) => {
                    return (
                        e.dynamic_image_number !== 101 &&
                        e.dynamic_image_number !== 100 && (
                            <div className="embla__slide" key={i}>
                                <PhotoFrameService
                                    image_name="service_records"
                                    Car_no={car_no}
                                    DynamicImageNo={Number(e.dynamic_image_number)}
                                    Content="Service history"
                                    isUploaded={e !== null}
                                    photo={e ? e.data : ExampleImage}
                                    return_link="service_records"
                                />
                            </div>
                        )
                    );
                })}
                {hasRenderedValidElement && (
                    <PhotoFrameDynamic
                        image_name="service_records"
                        Car_no={car_no}
                        DynamicImageNo={images.length + 1}
                        Content="Title here"
                        isUploaded={false}
                        photo={ExampleImage}
                        return_link="service_records"
                    />
                )}
          </div>
          {/* {hasRenderedValidElement &&
            <div className='w-full flex justify-center'>
            <Link href={`./camera_filter_dynamic/${'service_records'}-${images.length+1}-${'service_records'}`} className='py-2 px-5 text-[18px] my-5'>
                 Add another photo
            </Link>
            </div>
          } */}
        </div>
        
      </div>
            
        </div>
        {/* <div className='w-full flex justify-center'>
        <Link href={`./camera_filter_dynamic/${'service_records'}-${images.length+1}-${'service_records'}`} className='py-2 px-5 text-[18px] my-5'>
             Add another photo
        </Link>
        </div> */}




        
     <div className='space-y-3 pt-7'>
        
         {/* <PhotoFrameService Content='Add service history' isUploaded={serviceRecords1 !== null} photo={ serviceRecords1 ? serviceRecords1 : serviceRecords}  link ='service_records1'/> */}
         {images.some( e => e.dynamic_image_number === 100) ? images.map((e,i)=>{
                return ( e.dynamic_image_number === 100 &&
                    <div className="embla__slide "><PhotoFrameService image_name='service_records' Car_no={car_no} DynamicImageNo={Number(e.dynamic_image_number)} Content='Add manuals' isUploaded={e !== null} photo={ e ? e.data : ExampleImage}  return_link ='service_records'/></div>
                )    
            }):
            <PhotoFrameService Content='Add manuals' image_name='service_records' Car_no={car_no} DynamicImageNo={100} isUploaded={false} photo={  ExampleImage}  return_link ='service_records'/>

            }
         {images.some( e => e.dynamic_image_number === 101) ? images.map((e,i)=>{
                return ( e.dynamic_image_number === 101 &&
                    <div className="embla__slide "><PhotoFrameService image_name='service_records' Car_no={car_no} DynamicImageNo={Number(e.dynamic_image_number)} Content='Add keys' isUploaded={e !== null} photo={ e ? e.data : ExampleImage}  return_link ='service_records'/></div>
                )    
            }):
            <PhotoFrameService Content='Add keys' image_name='service_records' Car_no={car_no} DynamicImageNo={101} isUploaded={false} photo={ExampleImage}  return_link ='service_records'/>

            }

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



       