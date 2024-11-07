"use client"
import React from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alert from '@/assets/icons/alertWhite.png';

import upload from '@/assets/icons/uploadBtn.png'

const PhotoFrameService = ({Content, isUploaded, photo, link}:{Content:string, isUploaded:Boolean, photo: any, link:string}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();

    const handleDelete = async()=>{
        try{
            await db.images.where('name').equals(link).delete(); 
            window.location.reload();

        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <div className={`${isVendor ? 'bg-primaryDark' : 'bg-secondary '} flex justify-center  w-full `}>
            

        {isUploaded ?
        <div className='w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden '>
        <div>
            <img src={uploaded_photo}/>
        </div>
        <div className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#6D6E8F] ' : ''}`}>
            <div className='space-y-1'>
                <div className='font-[400]'>{Content}</div>
                <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white' : '  text-fourth'}`}>
                    <div><img src={isVendor ? alert.src : Alert.src} /></div>
                    <div>Make sure to make in frame</div>
                </div>
            </div>
            <div className='pt-1'>
                {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter/${link}`}><img src={Camera.src} /></Link>}
            </div>
        </div>
    </div> : 
        <div className='bg-[#1F204F] rounded-2xl w-[90vw] p-3 flex justify-center'>
        <div className='w-full bg-[#4C4D72] border border-2 border-dashed border-[#70718E] rounded-xl py-3 space-y-3'>
            <div className='flex justify-center'>
                <Link href={`./camera_filter/${link}`}>
                    <img src={upload.src} className='w-12'/>
                </Link>
            </div>
            <div className='w-full flex justify-center font-[500] text-xl'>
                {Content}
            </div>
            <div className='w-full flex justify-center text-center font-[300] px-10'>
            Take a photo or upload from your photo library
            </div>
        </div>
            
    </div>}
    </div>
  )
}

export default PhotoFrameService