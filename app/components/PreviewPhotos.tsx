"use client"
import React, { useEffect, useState } from 'react'
import blurBG from '@/assets/blurBG.png'
import PreviewPhoto from './PreviewPhoto'
import { IoChevronBack } from 'react-icons/io5'
import { db, Image } from '../Local_DB/db'
import { useRouter } from 'next/navigation';
import { useAppContext } from '../Context'

const PreviewPhotos = ({setisopen}:{setisopen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const Router = useRouter();
    const {isVendor} = useAppContext();
    const [carCount, setCarCount] = useState(0); 
    const [index,setIndex] = useState([0,0]);
    const [currentPhoto, setCurrentPhoto] = useState('dashboard');
    const [images,setImages] = useState<Image[]>([]);

    const Photos = [['dashboard','boot','front_seat','back_seat'],
                    ['front_driver','front_passenger','back_driver','back_passenger'],
                    ['surface_marks'],
                    ['panel_damage'], 
                    ['front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel'],
                    ['front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre'],
                    ['dashboard_lights'],
                    ['exterior_wear_tear'],
                    ['glass_health'],
                    ['damaged_absent_fixtures'],
                    ['service_records']]

    const PhotoTitle = ['Interior','Exterior','Surface marks','Panel Damage','Wheel Condition','Tyre Condition','Dashboard Lights',
                        'Exterior wear & tear','Glass Health','Damaged/Absent Fixtures','Service Records'
    ]
    const handleCarCountMinus =() =>{
        if(carCount > 0){
            setCarCount(carCount-1);
            setIndex(index=>[index[0],index[1]-1])
            setCurrentPhoto(Photos[index[0]][index[1]-1]);
        }else if(Photos[index[0]-1]){
            setIndex(index=>[index[0]-1,Photos[index[0]-1].length-1])
            setCarCount(Photos[index[0]-1].length-1);
            setCurrentPhoto(Photos[index[0]-1][Photos[index[0]-1].length-1]);
        }
    }

    const handleCarCountAdd =() =>{
        if(carCount <  Photos[index[0]].length-1){
            setCarCount(carCount+1);
            setIndex(index=>[index[0],index[1]+1])
            setCurrentPhoto(Photos[index[0]][index[1]+1]);
        }else if(index[0] < PhotoTitle.length-1){
            setIndex(index=>[index[0]+1,0])
            setCarCount(0);
            setCurrentPhoto(Photos[index[0]+1][0]);
        }else{
            // Router.push('./confirmation_submission')
        }
        
    }
    console.log(Photos[index[0]][index[1]])

    useEffect(() => {  
        
        const car_number = localStorage.getItem('car_no');
        const retrieve = async ( setter_function: React.Dispatch<React.SetStateAction<Image[]>>) => {
          try {
            const images = await db.images
              .where('car_number')
              .equals(String(car_number))
              .toArray();
              console.log(images);
            setter_function(images); // Store the array of images
          } catch (e) {
            console.error(e);
          }
        };
        retrieve( setImages);
      }, []);
  return (
    <div className={`${!isVendor && 'text-white'}`} >
        <div className='absolute top-0' onClick={()=>setisopen(false)}>
            <img src={blurBG.src} className='w-[100vw] h-full'/>
        </div>
        <div className='absolute top-5 w-[100vw]'>
            <PreviewPhoto toRetrieve={currentPhoto}/>
            <div className='w-full text-center text-[#D9D9D9] mt-8'>{PhotoTitle[index[0]]}</div>
            <div className='w-full text-center text-xl pt-2'>{Photos[index[0]][index[1]].split('_').join(' ')}</div>
            <div className=' flex w-full justify-center my-6 mb-2 space-x-7'>
                        <div onClick={handleCarCountMinus} className='w-12 h-12 bg-[#737391] flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[23px] font-[350]'>
                            0{carCount+1}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-2'>
                            0{Photos[index[0]].length}
                        </div>
                        </div>

                        <div  onClick={handleCarCountAdd}  className='w-12 h-12 bg-[#737391] flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25} className='rotate-180'/>
                        </div>
                    </div>
        </div>
        
    </div>
  )
}

export default PreviewPhotos