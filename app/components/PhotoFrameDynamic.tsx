"use client"
import React from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alert from '@/assets/icons/alertWhite.png';

const PhotoFrameDynamic = ({Content, Car_no, DynamicImageNo, isUploaded, photo, image_name, return_link}:{Content:string,DynamicImageNo:number, image_name: string,return_link: string,  Car_no: number, isUploaded:Boolean, photo: any}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();

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
                <img src={uploaded_photo} className='w-full h-full object-cover'/>
            </div>
            <Link href={`${!isUploaded ? `./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}` : '#'}`} onClick={()=>{isUploaded && handleDelete()}} className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#6D6E8F] ' : ''}`}>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white' : '  text-fourth'}`}>
                        <div><img src={isVendor ? alert.src : Alert.src} /></div>
                        <div>Make sure to make in frame</div>
                    </div>
                </div>
                <div className='pt-1'>
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}`}><img src={Camera.src} /></Link>}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default PhotoFrameDynamic