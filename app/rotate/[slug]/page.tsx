"use client"
import React, { useEffect } from 'react'
import car from '@/assets/CarRotate.png'
import frame from '@/assets/RotateFrame.png'
import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';

const Rotate = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const {angle,type} = useOrientation(); 

    useEffect(()=>{
        const portrait = window.matchMedia("(orientation: portrait)").matches;
      if(!portrait){
        router.push(`../camera_filter/${params.slug}`);
        }
    },[angle])

    console.log(angle,type);
  return (
    <div className='bg-[#282828] w-full h-[100vh] relative'>
        <div className='absolute w-full h-[100vh] flex justify-center mt-[23vh] '>
            <img src={frame.src} className=' w-[194px] h-[318px] rotating-element' />
        </div>
        <img src={car.src} className='absolute w-[100px] top-[40%] left-[37%]' />
        <div className='absolute  text-[#FFFFFF] absolute w-full top-[65%]'>
            <div className='w-full flex justify-center font-[500] text-[20px]'>Rotate Device</div>
            <div className='w-full text-center p-5 pt-2 font-[300] text-sm'>
                If your screen doesn’t rotate you may need to turn off orientation lock.
            </div>
        </div>
        
    </div>
  )
}

export default Rotate