"use client"
import React, { useEffect, useState } from 'react'
import { db, Image } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewCarCompDynamic = ({title,query}:{title: string,query: string}) => {

    const [images,setImages] = useState<Image[]>([]);



    const {isVendor} = useAppContext();
    const [closeState, setCloseState] = useState(true);
    
    useEffect(()=>{
        // console.log('what the fuck dude');
        const car_number = Number(localStorage.getItem('car_no'));
        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const images = await db.images
                    .where('name').equals(image_to_retrieve)
                    .filter(image => image.car_number === car_number )
                    .toArray();
                // const imageData = images.map(e => e=e.data);
                console.log('test',images);
                setter_function(images);
            }
            catch(e){
                console.log(e);
            }
        };
        retrieve(query,setImages);

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

                    <div className="grid grid-cols-4 gap-3 p-1 pl-3">
                        {
                            images.map(e=>{
                                return (
                                    <div className={`h-20 ${isVendor ? 'bg-white' : 'bg-primaryDark'} rounded-lg`}>
                                        <img src={e.data} className='object-cover h-full w-full rounded-lg'/>
                                    </div>
                                )
                            })
                        }
                        
                        
                    </div>
                    </div>
            </div>
  )
}

export default PreviewCarCompDynamic