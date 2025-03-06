"use client"
import React, { useEffect } from 'react'
import car from '@/assets/CarRotate.png'
import frame from '@/assets/RotateFrame.png'
import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';

const Rotate = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const {angle,type} = useOrientation(); 
    const isSafari = () => {
      const ua = navigator.userAgent;
      return ua.includes('Safari') && !ua.includes('Chrome') && !ua.includes('Chromium');
    };

    useEffect(()=>{
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        console.log(portrait)
        // router.push(`../vehicle_health/${params.slug}`);
      if( angle === 90){
        if(params.slug.includes('video')){
          if(isSafari()){

            router.push(`../video_capture_ios`);
          }else{
            router.push(`../video_capture`);

          }
        }
        else if(params.slug.includes('vehicle_health')){
          const route = params.slug.split("_vehicle_health")[0]
          router.push(`../vehicle_health/${route}`);
        }
        else if(params.slug.includes('dynamic')){
          // console.log(params.slug)
          router.push(`../camera_filter_dynamic/${params.slug}`);
        }
        else{

          router.push(`../camera_filter/${params.slug}`);
        }
        }
    },[angle])

    console.log(angle,type);
  return (
    <div className='bg-[#282828] w-full overflow-hidden h-[100vh] relative'>
        <div className='flex justify-center w-full h-full absolute items-center mt-[-100px]'>
            <img src={frame.src} className=' w-[194px] h-[318px] rotating-element' />
        </div>
        <div className='flex justify-center w-full h-full absolute items-center mt-[-100px]'>
        <img src={car.src} className=' w-[100px] o object-contain mt-10' />
        </div>
        <div className=' text-[#FFFFFF] absolute w-full top-[65%]'>
            <div className='w-full flex justify-center font-[500] text-[20px]'>Rotate Device</div>
            <div className='w-full text-center p-5 pt-2 font-[300] text-sm'>
                If your screen doesn’t rotate you may need to turn off orientation lock.
            </div>
        </div>
        
    </div>
  )
}

export default Rotate