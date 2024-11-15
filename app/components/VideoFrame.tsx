"use client"
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alert from '@/assets/icons/alertWhite.png';

const VideoFrame = ({Content, isUploaded, photo, link}:{Content:string, isUploaded:Boolean, photo: any, link:string}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();
    const [video, setVideo] = useState<any>(null);

    useEffect(()=>{
        setVideo(localStorage.getItem("videoData"))
    })

    const handleDelete = async()=>{
        try{
            await db.images.where('name').equals(link).delete(); 
            localStorage.removeItem("videoData")
            window.location.reload();

        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <div className={`${isVendor ? 'bg-primaryDark' : 'bg-secondary '} flex justify-center  w-full `}>
            <div className='w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden '>
            <div>
                {!isUploaded ? 
                
                    <img src={uploaded_photo} className=' object-cover w-full'/> :
                    <video src={video} controls className=' object-cover w-full'/>
                }
                
                
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
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./video_capture`}><img src={Camera.src} /></Link>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoFrame