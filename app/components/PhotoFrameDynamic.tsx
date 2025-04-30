"use client"
import React, { useEffect, useState } from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alert from '@/assets/icons/alertWhite.png';
import ImageSharpnessChecker from '../Blur_Detection/blur'
import { IoAlertCircleOutline } from 'react-icons/io5'

const PhotoFrameDynamic = ({Content, Car_no, DynamicImageNo, isUploaded, photo, image_name, return_link ,updateState}:{Content:string,DynamicImageNo:number, image_name: string,return_link: string,  Car_no: string, isUploaded:Boolean, photo: any,updateState: (index:number, value: boolean) => void}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext()
    const [is_blured,set_is_blured] = useState(false); 
        useEffect(()=>{
            if(isUploaded){
    
                updateState(DynamicImageNo,is_blured);
            }
        },[is_blured])
    const FullScreen = ()=>{
        var elem:any = document.getElementById("main");

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
    }

    const handleDelete = async()=>{
        try{
            await db.images.where('name').equals(image_name).filter(e => e.car_number === Car_no && e.dynamic_image_number === DynamicImageNo).delete() 
            window.location.reload();

        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <div className={`${isVendor ? 'bg-primaryDark' : 'bg-secondary '} flex justify-center  w-full  `}>
            <div className='w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden flex flex-col justify-between'>
            <div>
                <img src={uploaded_photo} className='w-full object-cover md:h-[300px] max-h-[300px]'/>
            </div>
            <Link href={`${!isUploaded ? `./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}` : '#'}`} onClick={()=>{isUploaded && handleDelete() }} className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#6D6E8F] ' : ''}`}>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    {!isUploaded && 
                                    <div className={`text-[12px] flex space-x-1  `}>
                                    <div><img src={isVendor ? alert.src : Alert.src} /></div>
                                    <div className={`${!isVendor && 'text-[#675DF4]'}`}>Make sure photos are well-lit</div>
                
                                    </div>}
                                    {isUploaded && !is_blured && 
                                    <div className={`text-[12px] flex space-x-1  `}>
                                    {/* <div><img src={ Alert.src} /></div> */}
                                    <IoAlertCircleOutline className='text-[#03A703] rotate-180 w-4 h-4 mt-[1px]'/>
                                    <div className='text-[#03A703]'>Photo is perfectly done</div>
                
                                    </div>}
                                    {isUploaded && is_blured && 
                                    <div className={`text-[12px] flex space-x-1  `}>
                                        <IoAlertCircleOutline className='text-[#F45D5D] rotate-180 w-4 h-4 mt-[1px]'/>
                                        <div className='text-[#F45D5D]'>Photo is blurry</div>
                
                                    </div>
                                    }
                </div>
                


                <ImageSharpnessChecker imageURL = {uploaded_photo} set_is_blured = {set_is_blured}/>
                <div className='pt-1'>
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}`}><img src={Camera.src} /></Link>}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default PhotoFrameDynamic