"use client"
import '@/app/dynamic_image_css/embla_styles.css'
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
import alert_retake from '@/assets/alert_retake.png'

const SurfaceMarks = () => {
    const [images,setImages] = useState<Image[]>([]);
    const [car_no,setCar_no] = useState('');

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })

    const {isVendor} = useAppContext();
    const Router = useRouter();

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

    const handleSubmit = async (event:any) => { 
        event.preventDefault();
        const car = localStorage.getItem('car_no');
        const formData = new FormData();
        let damage = await db.damage_selection.where('name').equals('exterior_wear_tear').toArray();
       
        console.log('dd',damage);
        const indexedDamageData = damage.map(d => ({
            index: `${d.name}-${d.dynamic_image_no}-${d.car_no}`,
            data: d,
          }));

        console.log(indexedDamageData)
        let newArr:any = [];
        images.forEach(e=>{
            const query:any = `${e.name}-${e.dynamic_image_number}-${e.car_number}`;
            console.log(query,'f');
            newArr.push(indexedDamageData.find(item => item.index === query));
            formData.append(query, e.data);
        })
        console.log('aaa',newArr);

        

        // console.log(formData);

        const url:any = process.env.NEXT_PUBLIC_API_URL ;
        const token = localStorage.getItem('token');
        try {
            if(images.length < 1 || blur_count > 0){
                alert('Please upload atleast one image or retake blured images before proceeding')
                return;
            }
            localStorage.setItem(`exterior_wear_tear_state_${car}`,'true');
            setTimeout(()=>{

                Router.push('./vehicle_health_selection')
            },300)
    
          const response = await axios.post(`${url}/pwa/exterior_wear_tear`,  
            {
                formData,
                damage: newArr,
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
        localStorage.setItem('prevRoute','./exterior_wear_tear');
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
        retrieve('exterior_wear_tear',setImages);

        // window.location.reload();
        
    },[])



  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full min-h-[100vh] pb-[90px]`}>
        <div className='flex flex-col justify-between min-h-[100vh]'>
        <div >
        <div className='p-5 flex space-x-2 text-[26px] pt-10'>
        <Link  href='./vehicle_health_selection'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Exterior wear & tear</div>
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
                    <div className='font-[300] text-sm'>Perfect your car’s wear and tear photos with our expert guide.</div>
                    <Link  href='./advice_exterior_wear_tear'  className='font-[400] text-sm mt-5'>Smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] md:w-[20vw]'/>
            </div>
        </div>
}

        <div className='flex justify-center pt-10'>
            <div className='w-[90vw] text-[18px]'>
            If your photos look great, click continue to proceed.
            </div>
        
        </div>

        <div className='space-y-3 pt-7'>
            {images.length === 0 && <PhotoFrameDynamic image_name='exterior_wear_tear' Car_no={car_no} DynamicImageNo={1} Content='Exterior wear & tear' isUploaded={false} photo={ ExampleImage}  return_link ='exterior_wear_tear' updateState={updateState}/>}
        <div className="embla overflow-hidden mx-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex space-x-5">
            {images.map((e,i)=>{
                return <div className="embla__slide "><PhotoFrameDynamic image_name='exterior_wear_tear' Car_no={car_no} DynamicImageNo={Number(e.dynamic_image_number)} Content='Exterior wear & tear' isUploaded={e !== null} photo={ e ? e.data : ExampleImage}  return_link ='exterior_wear_tear' updateState={updateState}/></div>;
            })}
            {images.length>=1 && 
                <PhotoFrameDynamic image_name='exterior_wear_tear' Car_no={car_no} DynamicImageNo={images.length+1} Content='Exterior wear & tear' isUploaded={false} photo={ ExampleImage}  return_link ='exterior_wear_tear' updateState={updateState}/>
            }
          </div>
        </div>
        
      </div>
            
        </div>
        {/* <div className='w-full flex justify-center'>
        <Link href={`./camera_filter_dynamic/${'exterior_wear_tear'}-${images.length+1}-${'exterior_wear_tear'}`} className='py-2 px-5 text-[18px] my-5'>
             Add another photo
        </Link>
        </div> */}
        </div>
        



        <div className={`w-full fixed flex justify-center bottom-0`}>
          <div className='p-5 w-full'>
                <div onClick={handleSubmit} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div className='whitespace-nowrap'>Continue</div>
                    <img src={splash.src}/>
                    </div>
                </div>
          </div>
        </div>
        </div>
        

    </div>
  )
}

export default SurfaceMarks



