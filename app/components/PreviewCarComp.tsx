"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewCarComp = () => {


    const [back_driver_wheel_img, setback_driver_wheel_img]  = useState<any>(null);
    const [back_driver_tyre_img, setback_driver_tyre_img]  = useState<any>(null);

    const [back_passenger_wheel_img, setback_passenger_wheel_img]  = useState<any>(null);
    const [back_passenger_tyre_img, setback_passenger_tyre_img]  = useState<any>(null);

    const [front_driver_wheel_img, setfront_driver_wheel_img]  = useState<any>(null);
    const [front_driver_tyre_img, setfront_driver_tyre_img]  = useState<any>(null);

    const [front_passenger_wheel_img, setfront_passenger_wheel_img]  = useState<any>(null);
    const [front_passenger_tyre_img, setfront_passenger_tyre_img]  = useState<any>(null);

    const {isVendor} = useAppContext();
    const [closeState, setCloseState] = useState(true);
    
    useEffect(()=>{ 

        

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const car_no = Number(localStorage.getItem('car_no'));
                const image = await db.images.where('name').equals(image_to_retrieve).filter(e => e.car_number === car_no).first();
                // console.log(image?.data);
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve('back_driver_wheel',setback_driver_wheel_img);
        retrieve('back_driver_tyre',setback_driver_tyre_img);
        retrieve('back_passenger_wheel',setback_passenger_wheel_img);
        retrieve('back_passenger_tyre',setback_passenger_tyre_img);

        retrieve('front_driver_wheel',setfront_driver_wheel_img);
        retrieve('front_driver_tyre',setfront_driver_tyre_img);
        retrieve('front_passenger_wheel',setfront_passenger_wheel_img);
        retrieve('front_passenger_tyre',setfront_passenger_tyre_img);

        // window.location.reload();
        
    },[])
  return (      
            <div>
                    <div className='flex justify-between w-full mx-2 px-1 pb-2 pt-5'>
                    <div className='pt-[4px] text-lg font-[350]'>Your wheels & your tyres</div>
                    <div onClick={()=>setCloseState(!closeState)}>
                        <img src={arrow.src} className={`w-7 ${!closeState && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                <div className={`${!closeState && 'hidden'}`}>

                    <div className="grid grid-cols-4 gap-3 p-1 pl-3">
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={back_driver_wheel_img} className='object-cover h-full w-full rounded-lg'/>
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={back_driver_tyre_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={back_passenger_wheel_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={back_passenger_tyre_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={front_driver_wheel_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={front_driver_tyre_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={front_passenger_wheel_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                        <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={front_passenger_tyre_img} className='object-cover h-full w-full rounded-lg' />
                        </div>
                    </div>
                    </div>
            </div>
  )
}

export default PreviewCarComp