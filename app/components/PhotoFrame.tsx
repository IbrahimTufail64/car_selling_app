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
import { IoAlertCircleOutline } from "react-icons/io5";

const PhotoFrame = ({Content, isUploaded, photo, link,updateState,index}:{Content:string, isUploaded:Boolean, photo: any, link:string,index:number, updateState: (index:number, value: boolean) => void}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();
    const [is_blured,set_is_blured] = useState(false);
    useEffect(()=>{
        if(isUploaded){

            updateState(index,is_blured);
        }
    },[is_blured])

    const handleDelete = async()=>{
        try{
            await db.images.where('name').equals(link).delete(); 
            window.location.reload();

        }
        catch(e){
            console.log(e);
        }
    }
 // border border-1 border-[#6D6E8F]
  return (
    <div className={`${isVendor ? 'bg-primaryDark' : 'bg-secondary  '} flex justify-center  w-full text-[#0C0D45]`}>
            <div className={`w-[90vw] md:w-[50vw]  rounded-lg overflow-hidden ${!isVendor && 'border border-2'} `}>
            <div className={`${isUploaded && 'overflow-hidden h-[30vh] md:h-[70vh]  object-center flex items-center justify-center'}`}>
            {/* <div className="w-full h-[300px] overflow-hidden">
                <img 
                    src={uploaded_photo} 
                    className="w-full h-full object-cover"
                />
            </div> */}
                <img src={uploaded_photo} className={`${isUploaded && 'h-[45vh] md:h-[100vh] object-cover '} w-full `}/>
                {/* md:max-h-[80vh]  h-[30vh] object-cover*/}
            </div>
            <Link href={`${!isUploaded ? `./camera_filter/${link}` : '#'}`} onClick={()=>{isUploaded && handleDelete()}} className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#D1D9FF] ' : ''}`}>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    {!isUploaded && 
                    <div className={`text-[12px] flex space-x-1  `}>
                    <IoAlertCircleOutline className={`${isVendor ? 'text-[#0C0D45]' :'text-[#675DF4]'} rotate-180 w-4 h-4 mt-[1px]`}/>
                    <div className={`${!isVendor && 'text-[#675DF4]'}`}>Make sure to make in frame</div>

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
                    <ImageSharpnessChecker imageURL = {uploaded_photo} set_is_blured = {set_is_blured}/>
                </div>
                <div className='pt-1'>
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter/${link}`}><img src={Camera.src} /></Link>}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default PhotoFrame