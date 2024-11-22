"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewCarCompSlider = ({toRetrieve, setcurrentcar,current}:{current:undefined, toRetrieve: string,setcurrentcar: React.Dispatch<React.SetStateAction<undefined>>}) => {


    const [_img, set_img]  = useState<any>(null);
    const [tint,settint] = useState(false);
    
    useEffect(()=>{ 
        console.log(_img,'f7ci');
        console.log(current,'f7c');
        

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const car_no = Number(localStorage.getItem('car_no'));
                const image = await db.images.where('name').equals(image_to_retrieve).filter(e => e.car_number === car_no).first();
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
    <div className='relative'>
        <img 
            onClick={()=>{setcurrentcar(_img); settint(true)}}
            src={_img}  
        
            className="w-[80px] h-[80px] object-cover rounded-lg" 
            /> 
        <div className={`bg-[#675DF4] opacity-40 w-full h-full absolute top-0 ${!(_img === current) && 'hidden'}`}>

        </div>
    </div>
  )
}

export default PreviewCarCompSlider