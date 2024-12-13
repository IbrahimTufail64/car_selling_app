"use client"
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alertWhite from '@/assets/icons/alertWhite.png';

const VideoFrame = ({Content, isUploaded, photo, link}:{Content:string, isUploaded:Boolean, photo: any, link:string}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();
    const [video, setVideo] = useState<any>(null);

    // const getVideo = async()=>{
    //     const existingVideo = await db.images.where('name').equals('video').first(); 
    //     console.log(existingVideo);
    //     alert(existingVideo?.data);
    //     const car_no = Number(localStorage.getItem('car_no'));
    //     if(existingVideo?.data){

    //         setVideo(existingVideo?.data);
    //     }else{
    //         setVideo(localStorage.getItem(`videoData_${car_no}`))
    //     }
    // }

    const getVideo = async () => {
        const existingVideo = await db.images.where('name').equals('video').first(); 
        const car_no = Number(localStorage.getItem('car_no'));
        let videoData = existingVideo?.data || localStorage.getItem(`videoData_${car_no}`);
    
        if (videoData?.startsWith("data:")) {
            const base64String = videoData.split(",")[1]; // Extract base64 data
            const mimeType = videoData.split(",")[0].split(":")[1].split(";")[0]; // Extract MIME type
    
            // Decode base64 string to binary
            const byteString = atob(base64String);
            const byteArray = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                byteArray[i] = byteString.charCodeAt(i);
            }
    
            // Create a Blob and generate a Blob URL
            const blob = new Blob([byteArray], { type: mimeType });
            const blobUrl = URL.createObjectURL(blob);
    
            setVideo(blobUrl);
        }
    };
    
    useEffect(()=>{
        const car_no = Number(localStorage.getItem('car_no'));
        getVideo();
        // setVideo(localStorage.getItem(`videoData_${car_no}`))
    },[])

    const handleDelete = async()=>{
        try{
            const car_no = Number(localStorage.getItem('car_no'));
            await db.images.where('name').equals(link).delete(); 
            localStorage.removeItem(`videoData_${car_no}`)
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
                    <video src={video} controls autoPlay playsInline muted className=' object-cover w-full' />
                }
                
                
            </div>
            <Link href={`${!isUploaded ? `./video_capture_ios` : '#'}`} onClick={()=>{isUploaded && handleDelete()}} className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#6D6E8F] ' : ''}`}>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white' : '  text-fourth'}`}>
                        <div><img src={isVendor ? alertWhite.src : Alert.src} /></div>
                        <div>Make sure to make in frame</div>
                    </div>
                </div>
                <div className='pt-1'>
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./video_capture_ios`}><img src={Camera.src} /></Link>}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default VideoFrame