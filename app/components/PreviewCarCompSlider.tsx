"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewCarCompSlider = ({toRetrieve, setcurrentcar,current}:{current:undefined, toRetrieve: number,setcurrentcar: React.Dispatch<React.SetStateAction<undefined>>}) => {


    const [_img, set_img]  = useState<any>(null);
    const [tint,settint] = useState(false);
    
    useEffect(()=>{ 
        

        const retrieve = async (image_to_retrieve:number,setter_function :React.Dispatch<any>)=>{
            try{
                const car_no = Number(localStorage.getItem('car_no'));
                const image = await db.images.where('id').equals(image_to_retrieve).first();
                if(image?.name === 'dashboard'){
                    setcurrentcar(image?.data)
                }
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve(toRetrieve,set_img);


        // window.location.reload();
        
    },[toRetrieve])

    
  return (      
    <div className='relative embla__slide'>
        <img 
            onClick={()=>{setcurrentcar(_img); settint(true)}}
            src={_img}  
        
            className="w-[80px] h-[80px] object-cover rounded-lg" 
            /> 
        <div className={`bg-[#675DF4] opacity-40 max-w-[80px] max-h-[80px] w-full h-full rounded-lg absolute top-0 ${!(_img === current) && 'hidden'}`}>

        </div>
    </div>
  )
}

export default PreviewCarCompSlider