"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewCarComp1 = ({title,ToRetrieve}:{title: string, ToRetrieve: string}) => {


    const [back_driver_wheel_img, setback_driver_wheel_img]  = useState<any>(null);


    const {isVendor} = useAppContext();
    const [closeState, setCloseState] = useState(true);
    
    useEffect(()=>{ 

        

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve(ToRetrieve,setback_driver_wheel_img);


        // window.location.reload();
        
    },[])
  return (      
            <div>
                    <div className='flex justify-between w-full mx-2 px-1 pb-2 pt-5'>
                    <div className='pt-[4px] text-lg font-[350]'>{title}</div>
                    <div onClick={()=>setCloseState(!closeState)}>
                        <img src={arrow.src} className={`w-7 ${!closeState && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                <div className={`${!closeState && 'hidden'}`}>

                    <div className=" p-1 pl-3">
                        <div className={`h-20 w-[23%] ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                            <img src={back_driver_wheel_img} className='object-cover h-full w-full rounded-lg'/>
                        </div>
                    </div>
                    <div className='px-3 text-[15px] font-[300] py-2'>
                        stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur 
                    </div>
                    </div>
            </div>
  )
}

export default PreviewCarComp1