"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import WebcamCapture from '../../components/Camera_Stream'
import Link from 'next/link'
import Alert from '@/assets/icons/Alert_white.png'
import logo from '@/assets/Logo.png'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/CamCarFront.png'
import alertNew from '@/assets/alertNEW.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { db } from "@/app/Local_DB/db";
import axios from "axios";





const Filter = ({ params }: { params: { slug: string } }) => {
    const [reachedBottom, setReachedBottom] = useState(false);

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
        // console.log(base64Audio);
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
                        // console.log('Audio saved to localStorage');
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
  
  
    useEffect(() => {
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

    const [car_no,setCar_no] = useState('');

    const webcamRef:any = useRef(null);
    

    
    const link = params.slug.split('-');
    const returnLink  = link[2];
    const imageUrl = link[0];
    const dynamic_image_no =Number(link[1]); 

    console.log('return',returnLink,'imageUrl',imageUrl,'dymaic no:',dynamic_image_no)

    const {angle,type} = useOrientation(); 
    const router = useRouter(); 

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

    useEffect(()=>{
      // const handlePermission = async () => {
      //   const permissionGranted = await requestPermission();
      // }
      // handlePermission();
      setCar_no(String(localStorage.getItem('car_no')));
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if(portrait){
            router.push(`../rotate/${params.slug}-dynamic`);
        }
    },[angle])

    async function addImage(img: any) {
      try {
        console.log(car_no);
        const carNo = localStorage.getItem('car_no');
        const image = await db.images.where('name').equals(imageUrl)
        .filter(e=>e.car_number === carNo && e.dynamic_image_number === dynamic_image_no).first();
        console.log(image);
        if(image?.data !== undefined ){
          await db.images.where('id').equals(image.id).delete();
        }
        console.log(imageUrl,carNo,dynamic_image_no);
        const id = await db.images.add({
          name: imageUrl,
          data: img,
          car_number: String(carNo),
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

        const damage_slides = ['surface_marks','panel_damage','exterior_wear_tear'];
        console.log('bro',damage_slides.includes(returnLink));
        playAudio();
        setTimeout(()=>{
          if(damage_slides.includes(returnLink)){
            router.push(`../vehicle_health/${params.slug}`);
          }
          else{
            router.push(`../${returnLink}`);
          }
        },800)
      }
      catch(e){
        // if(img === null){
        //     alert(params.slug);
        // }
        
      }

    }, [webcamRef]);

  return (
    <div className='bg-[#282828] w-full   text-white pt-6 text-[20px] relative h-[200vh]'>
              <audio ref={audioRef} />
        


    <div className="fixed top-0">
      <div className="relative">
      {/* <img className="h-full w-[14%] absolute z-10" src={blurBG.src}/> */}

                <button className='bg-white absolute rounded-full w-[75px] h-[75px] z-20 top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>{capture(); console.log('yes')}}></button>

                
                <Link href={`../${returnLink}`} className="absolute z-20 left-[4.5vw] text-[22px] font-500 top-[30px] text-white">
                    Exit
                </Link>
                <Link href={`../advice_${returnLink}`}>
                <img className=" absolute z-20 object-cover w-[40px] left-[4.5vw] bottom-[5vh]" src={alertNew.src}/>
                </Link>
      <div className="h-full w-[14%] bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className="h-full w-[14%] right-0 bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className=" w-[100vw] h-[100vh] overflow-hidden relative">
        

        <div className="-z-10">
        <WebcamCapture webcamRef={webcamRef}/>
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
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            </div>
        </div>
        
    </div>
  )
}

export default Filter




