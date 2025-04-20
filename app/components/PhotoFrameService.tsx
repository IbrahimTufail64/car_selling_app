


"use client"
import React, { useEffect, useState } from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'
import alert from '@/assets/icons/alertWhite.png';

import upload from '@/assets/icons/uploadBtn.png'
import ImageSharpnessChecker from '../Blur_Detection/blur'
import { IoAlertCircleOutline } from 'react-icons/io5'

const PhotoFrameService = ({Content, Car_no, DynamicImageNo, isUploaded, photo, image_name, return_link,updateState}:{Content:string,DynamicImageNo:number, image_name: string,return_link: string,  Car_no: string, isUploaded:Boolean, photo: any,updateState: (index:number, value: boolean) => void})=> {

    const uploaded_photo = isUploaded ? photo : photo.src;
    const {isVendor} = useAppContext();

    const handleDelete = async()=>{
        const car_no = localStorage.getItem('car_no')
        try{
            console.log(image_name,car_no, DynamicImageNo)
        //    const del =  await db.images.where('name').equals(image_name).toArray()
           const del =  await db.images.where('name').equals(image_name).filter(e=> e.dynamic_image_number === DynamicImageNo).delete() 
           console.log('yesdd',del);
           window.location.reload();

        }
        catch(e){
            console.log(e,'fuck');
        }
    }

        const [is_blured,set_is_blured] = useState(false); 
            useEffect(()=>{
                if(isUploaded){
        
                    updateState(DynamicImageNo,is_blured);
                }
            },[is_blured])

  return (
    <div className={`${isVendor ? 'bg-primaryDark' : 'bg-white '} flex justify-center  w-full `}>
            

        {isUploaded ?
        <div className={`w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden `}>
        <div>
            <img src={uploaded_photo} className='w-full object-contain sm:max-h-[400px]'/>
        </div>
        <Link href={`${!isUploaded ? `./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}` : '#'}`} onClick={()=>{isUploaded && handleDelete()}} className={`py-4 px-5 text-[18px] flex justify-between  ${isVendor ? 'bg-[#D1D9FF] text-[#0C0D45] ' : ''}`}>
            <div className='space-y-1'>
                <div className='font-[400]'>{Content}</div>
                {/* <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white' : '  text-fourth'}`}>
                    <div><img src={isVendor ? alert.src : Alert.src} /></div>
                    <div>Make sure to make in frame</div>
                </div> */}
                {!isUploaded && 
                                    <div className={`text-[12px] flex space-x-1  `}>
                                    <div><img src={isVendor ? alert.src : Alert.src} /></div>
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
                {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}`}><img src={Camera.src} /></Link>}
            </div>
        </Link>
    </div> : 
        <div className={`${!isVendor ? 'bg-white' : 'bg-[#1F204F]'} rounded-2xl w-[90vw] p-3 flex justify-center`}>
        <div className={` ${isVendor ? 'bg-[#4C4D72] border-[#70718E]' :'bg-[#EEF1FF] border-[#D1D9FF]'} w-full  border border-2 border-dashed  rounded-xl py-3 space-y-3`}>
            <div className='flex justify-center'>
                <Link href={`./camera_filter_dynamic/${image_name}-${DynamicImageNo}-${return_link}`}>
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
    {/* <Link href={`./camera_filter_dynamic/${'dashboard_lights'}-${images.length+1}-${'dashboard_lights'}`} className='py-2 px-5 text-[18px] my-5'>
             Add another photo
        </Link> */}
    </div>
  )
}

export default PhotoFrameService