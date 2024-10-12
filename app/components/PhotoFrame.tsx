import React from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Camera from '@/assets/icons/Camera.png'
import Delete from '@/assets/icons/Delete.png'
import Link from 'next/link'
import { db } from '../Local_DB/db'

const PhotoFrame = ({Content, isUploaded, photo, link}:{Content:string, isUploaded:Boolean, photo: any, link:string}) => {

    const uploaded_photo = isUploaded ? photo : photo.src;

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
    <div className='bg-secondary flex justify-center  w-full '>
        <div className='w-[90vw] border border-1 border-[#D1D9FF] rounded-lg overflow-hidden '>
            <div>
                <img src={uploaded_photo}/>
            </div>
            <div className='flex justify-between py-2 px-3 border border-1 border-[#D1D9FF]'>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    <div className='text-[12px] flex space-x-1  text-fourth'>
                        <div><img src={Alert.src}/></div>
                        <div>Make sure to make in frame</div>
                    </div>
                </div>
                <div className='pt-1'>
                    {isUploaded ? <img src={Delete.src} onClick={handleDelete}/>: <Link href={`./camera_filter/${link}`}><img src={Camera.src} /></Link>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PhotoFrame