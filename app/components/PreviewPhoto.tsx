"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewPhoto = ({toRetrieve}:{ toRetrieve: string}) => {


    const [_img, set_img]  = useState<any>(null);

    
    useEffect(()=>{ 

        

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve(toRetrieve,set_img);


        // window.location.reload();
        
    },[toRetrieve])

    
  return (      
            <div className='w-full flex justify-center'>
                <div className='w-[92vw] h-[400px]'>
                    <img src={_img} className='object-cover h-full w-full rounded-lg'/>
                </div>
            </div>
  )
}

export default PreviewPhoto