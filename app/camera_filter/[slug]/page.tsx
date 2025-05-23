"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'
import logo from '@/assets/Logo.png'
import { IoChevronBack } from "react-icons/io5";
import alertNew from '@/assets/alertNEW.png'
// import audio from '../../../assets/audio/camera_audio.wav'

import BackDriver from '@/assets/BackDriverF.png'
import BackPassen from '@/assets/BackPassenF.png'
import FrontDriver from '@/assets/FrontDriverF.png'
import FrontPassen from '@/assets/FrontPassenF.png'

import dashboard from '@/assets/dashboard_filter.png'
import boot from '@/assets/boot_filter.png'
import frontSeat from '@/assets/front_seat_filter.png'
import backSeat from '@/assets/back_seat_filter.png'

import BackDriverWheel from '@/assets/PNG-Back-Driver-Wheel.png'
import BackDriverTyre from '@/assets/PNG-Back-Driver-Tyre-Tread.png'
import BackPassengerWheel from '@/assets/PNG-Back-Passenger-Wheel.png'
import BackPassengerTyre from '@/assets/PNG-Back-Passenger-Tyre-Tread.png'

import FrontDriverWheel from '@/assets/PNG-Front-Driver-WheelPNG-Front-Driver-Wheel.png'
import FrontDriverTyre from '@/assets/PNG-Front-Driver-Tyre-Tread.png'
import FrontPassengerWheel from '@/assets/PNG-Front-Passenger-Wheel.png'
import FrontPassengerTyre from '@/assets/PNG-Front-Passenger-Tyre-Tread.png'

import emptyFilter from '@/assets/emptyFilter.png'

import { useOrientation, useTimeout } from 'react-use';
import { useRouter } from 'next/navigation';
import { db } from "@/app/Local_DB/db";
// import AudioElement from "@/app/components/AudioElement";
import axios from "axios";
import AudioElement from "@/app/components/AudioElement";

const lookup_table_wheels:any = {
  'back_driver_wheel': BackDriverWheel,
  'back_driver_tyre':BackDriverTyre,
  'back_passenger_wheel': BackPassengerWheel,
  'back_passenger_tyre': BackPassengerTyre,
  'front_driver_wheel': FrontDriverWheel,
  'front_driver_tyre':FrontDriverTyre,
  'front_passenger_wheel': FrontPassengerWheel,
  'front_passenger_tyre': FrontPassengerTyre
}
const lookup_wheels_return:any = {
  'back_driver_wheel': 'camera_filter/back_driver_tyre-chain',
  'back_driver_tyre':'camera_filter/back_passenger_wheel-chain',
  'back_passenger_wheel': 'camera_filter/back_passenger_tyre-chain',
  'back_passenger_tyre': 'camera_filter/front_driver_wheel-chain',
  'front_driver_wheel': 'camera_filter/front_driver_tyre-chain',
  'front_driver_tyre':'camera_filter/front_passenger_wheel-chain',
  'front_passenger_wheel': 'camera_filter/front_passenger_tyre-chain',
  'front_passenger_tyre': 'vehicle_wheels'
}

const lookup_table_exterior:any = {
  'back_driver': BackDriver,
  'back_passenger':BackPassen,
  'front_driver': FrontDriver,
  'front_passenger': FrontPassen
}
const lookup_exterior_return:any = {
  'front_driver': 'camera_filter/front_passenger-chain',
  'front_passenger': 'camera_filter/back_driver-chain',
  'back_driver': 'camera_filter/back_passenger-chain',
  'back_passenger':'vehicle_exterior',
}

const lookup_table_interior:any = {
  'dashboard': dashboard,
  'boot':boot,
  'front_seat': frontSeat,
  'back_seat': backSeat
}
const lookup_interior_return:any = {
  'dashboard': 'camera_filter/boot-chain',
  'boot':'camera_filter/front_seat-chain',
  'front_seat': 'camera_filter/back_seat-chain',
  'back_seat': 'vehicle_interior'
}







const Filter = ({ params }: { params: { slug: string } }) => {
  const [reachedBottom, setReachedBottom] = useState(false);
  const [is_resiable, set_is_resizable] = useState(false);


  const audioRef = useRef<HTMLAudioElement>(null);

    const dataURLToBlob = (dataURL: string) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteCharacters = atob(parts[1]);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteArrays], { type: contentType });
    };

    const playAudio = () => {
        const base64Audio = localStorage.getItem('audio');
        console.log(base64Audio);
        if (base64Audio) {
            const blob = dataURLToBlob(base64Audio);
            const audioURL = URL.createObjectURL(blob);
            if (audioRef.current) {
                audioRef.current.src = audioURL;
                audioRef.current.play();
            }
        } else {
            console.error('Audio is not ready yet.');
        }
    };

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                if (!localStorage.getItem('audio')) {
                    const response = await axios.get('https://media.vocaroo.com/mp3/1jSNptuNuLGn', {
                        responseType: 'blob',
                    });

                    const reader = new FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onloadend = () => {
                        const base64Data = reader.result as string;
                        localStorage.setItem('audio', base64Data);
                        console.log('Audio saved to localStorage');
                        // setPlayAudio(playAudio); // Set playAudio after the audio is fetched and stored
                    };
                } else {
                    // setPlayAudio(playAudio); // If audio is already in localStorage, set playAudio immediately
                }
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        fetchAudio();
    }, []);

    // const requestPermission = async (): Promise<boolean> => {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //     stream.getTracks().forEach(track => track.stop()); // Immediately stop tracks after getting permission
    //     return true;
    //   } catch (error) {
    //     console.error("Permission denied:", error);
    //     return false;
    //   }
    // };


  useEffect(() => {
    // const handlePermission = async () => {
    //   const permissionGranted = await requestPermission();
    // }
    // handlePermission();
    const handleScroll = () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
  
      const hasReachedBottom = 2*offsetHeight - (innerHeight + scrollTop) <= 10;
      if(hasReachedBottom){

        setReachedBottom(hasReachedBottom);
      }
      
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    const webcamRef:any = useRef(null);
    const link = params.slug.split('-');
    const imageUrl = link[0];
    // console.log(imageUrl)
    let adviceLink = '';
    let filterSize = "w-[65vw] mt-10"; 

    let returnLink = link[1];
    let car_filter = lookup_table_exterior[imageUrl];
    if(returnLink === 'chain' && car_filter !== undefined){

      returnLink = lookup_exterior_return[imageUrl];
    }
    adviceLink = 'advice_exterior';

    if(car_filter === undefined){
      car_filter = lookup_table_interior[imageUrl];
      if(returnLink === 'chain' && car_filter !== undefined){
        returnLink = lookup_interior_return[imageUrl];
      }
      adviceLink = 'advice_interior';
      filterSize = "w-[95vw] overflow-hidden"; 
      if(imageUrl.includes('dashboard') || imageUrl.includes('boot')){
        filterSize = "w-[80vw] overflow-hidden"; 
      }
    }

    if(car_filter === undefined){
      car_filter = lookup_table_wheels[imageUrl];
      if(returnLink === 'chain' && car_filter !== undefined){
        returnLink = lookup_wheels_return[imageUrl];
      }
      filterSize = "w-[70vw] mr-10 overflow-hidden"; 
      if(imageUrl.includes('tyre')){
        filterSize = "w-[60vw] mr-10 overflow-hidden"; 
      }
  
      adviceLink = 'advice_vehicle_wheels';
    }


    // useEffect(()=>{
    //   if(imageUrl === 'front_driver'){
    //     alert('Please raise volume for shutter sound');
    //   }
    // },[])


    const {angle,type} = useOrientation(); 
    const router = useRouter(); 

    useEffect(()=>{
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if(portrait){
            router.push(`../rotate/${params.slug}`);
        }
    },[angle])

    async function addImage(img: any) {
      try {
        
        const image = await db.images.where('name').equals(imageUrl).first();
        if(image?.data !== undefined ){
          await db.images.where('name').equals(imageUrl).delete();
        }
        const id = await db.images.add({
          name: imageUrl,
          data: img,
          car_number: String(localStorage.getItem('car_no'))
        });
        console.log('test',id);
      } catch (error) {
        console.log(error)
      }
    }
  
    const capture = useCallback(async() => {
        
      try{
        const imageSrc = webcamRef.current.getScreenshot();
        // const audio = new Audio('https://media.vocaroo.com/mp3/1jSNptuNuLGn'); // Replace with your audio file path or URL
        // console.log(audioBlob);
        // audioBlob.play();
        playAudio();
        addImage(imageSrc);
        setTimeout(() => {
          router.push(`../${returnLink}`);
        }, 800);
      }
      catch(e){
        // if(img === null){
        //     alert(params.slug);
        // }
        
      }

    }, [webcamRef]);

  return (
    <div className='bg-[#282828] w-full   text-white pt-6 text-[20px] relative h-[200vh]' >
        {/* <AudioElement setPlayAudio = {setPlayAudio}/> */}
        <audio ref={audioRef} />
        


    <div className="fixed top-0">
      <div className="relative">
      {/* <img className="h-full w-[14%] absolute z-10" src={blurBG.src}/> */}

                <button className='bg-white absolute rounded-full w-[75px] h-[75px] z-20 top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>{capture(); console.log('yes')}}></button>

                
                <Link href={`../${returnLink}`} className="absolute z-20 left-[4.5vw] text-[22px] font-500 top-[30px] text-white">
                    Exit
                </Link>
                <Link href={`../${adviceLink}`}>
                <img className=" absolute z-20 object-cover w-[40px] left-[4.5vw] bottom-[5vh]" src={alertNew.src}/>
                </Link>
      <div className="h-full w-[14%] bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className="h-full w-[14%] right-0 bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className=" w-[100vw] h-[100vh] overflow-hidden relative">
        

        <div className='absolute z-10 w-[100vw] h-[100vh] flex justify-center items-center ' >
            <img src={car_filter.src} 
            className={`${filterSize}`}
            // className={` ${returnLink === 'vehicle_wheels' ? 
            //   `${imageUrl.includes("wheel") ? 'w-[65vw]' : 'w-[37vw]' } mt-10` :
            //   `${returnLink === 'vehicle_interior' ? 'w-[40vw]' : 'w-[70vw]'}`}`}
              />
        </div>

        <div className="-z-10">
        <WebcamCapture webcamRef={webcamRef}/>
        </div>

        <div className="absolute left-[50%] bottom-[0%] -translate-x-1/2 -translate-y-1/2 z-20 text-[18px] font-normal px-[20px] py-[7px] bg-[#323230] rounded-md">
        {(adviceLink === 'advice_exterior'
          ? imageUrl + ' corner'
          : imageUrl
        ).replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
        </div>
        
    </div>
    </div>
    
    </div>

        <div className={`bg-[#282828] absolute top-0 ${reachedBottom ? 'hidden' : 'flex'} justify-center w-full h-[100vh] `} >
            <div>
            <div className=' '>
            <img src={logo.src} className=''/>
            </div>

            <div className='pt-5 '>
                ... And scroll down
            </div>
            <div className='flex justify-center w-full pt-5 '>
                <div className='space-y-[-20px]'>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            {/* <div ref = {elementRef} className="w-full bg-red h-10">

          </div> */}
            </div>
            
        </div>
        
        
    </div>
  )
}

export default Filter








