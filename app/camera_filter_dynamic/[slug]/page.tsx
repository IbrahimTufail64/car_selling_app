"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'
import logo from '@/assets/Logo.png'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/CamCarFront.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { db } from "@/app/Local_DB/db";





const Filter = ({ params }: { params: { slug: string } }) => {
    const [car_no,setCar_no] = useState(Number(localStorage.getItem('car_no')));

    const webcamRef:any = useRef(null);

    
    const link = params.slug.split('-');
    const returnLink  = link[2];
    const imageUrl = link[0];
    const dynamic_image_no =Number(link[1]); 
    console.log('return',returnLink,'imageUrl',imageUrl,'dymaic no:',dynamic_image_no)

    const {angle,type} = useOrientation(); 
    const router = useRouter(); 

    useEffect(()=>{
      // const car_number = Number(localStorage.getItem('car_no'));
      // console.log(car_number,'yeet');
      // setCar_no(2);
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if(portrait){
            router.push(`../rotate/${params.slug}-dynamic`);
        }
    },[angle])

    async function addImage(img: any) {
      try {
        console.log(car_no);
        const image = await db.images.where('name').equals(imageUrl).filter(e=>e.car_number === car_no && e.dynamic_image_number === dynamic_image_no).first();
        console.log(image);
        if(image?.data !== undefined ){
          await db.images.where('id').equals(image.id).delete();
        }
        const id = await db.images.add({
          name: imageUrl,
          data: img,
          car_number: car_no,
          dynamic_image_number: dynamic_image_no
        });
        console.log('image',id);
      } catch (error) {
        console.log(error)
      }
    }
  
    const capture = useCallback(async() => {
        
      try{
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc,'added finally');
        await addImage(imageSrc);

        router.push(`../${returnLink}`);
      }
      catch(e){
        // if(img === null){
        //     alert(params.slug);
        // }
        
      }

    }, [webcamRef]);

  return (
    <div className='bg-[#282828] w-full   text-white pt-6 text-[20px]'>
        <div className='flex justify-center w-full h-[100vh]'>
            <div>
            <div className=' '>
            <img src={logo.src} className=''/>
            </div>

            <div className='pt-5 '>
                ... And scroll down
            </div>
            <div className='flex justify-center w-full pt-5 '>
                <div className='space-y-[-20px]'>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            </div>
        </div>
        <div className='bg-[#282828] h-[100vh] overflow-hidden flex '>
        
        <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
            <Link href='#' >
                Exit 
            </Link>
            <Link href='#'>
                <img src={Alert.src} className='w-10 '/> 
            </Link>
        </div>
        <div className='flex justify-center items-center h-full relative'>
        
        <WebcamCapture webcamRef={webcamRef}/>
        </div>
        <div className='w-[10vw]'>
            <div className='flex w-[10vw] justify-center  items-center h-full relative'>
                <button className='bg-[#1E201D] rounded-full border border-1 border-secondary w-[60px] h-[60px] cursor-pointer' onClick={()=>{capture()}}></button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Filter



