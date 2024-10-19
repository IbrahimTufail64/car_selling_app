"use client"
import React, { useEffect, useState } from 'react'

import Alert from '@/assets/icons/AlertClear.png'
import Tint from '@/assets/BlueTint.png'
import Link from 'next/link'
import alert from '@/assets/icons/alertWhite.png'
import { db } from '../Local_DB/db'
import { useAppContext } from '../Context'

const WheelFrame = ({Content, setisSelected, photo, link}:{Content:string, setisSelected:React.Dispatch<React.SetStateAction<boolean>>, photo: any, link:string}) => {

    let uploaded_photo = photo;
    const [checked, setChecked] = useState(false);
    const {isVendor} = useAppContext();

    useEffect(()=>{
        setisSelected(checked);
    },[checked])


  return (
    <div className={`${isVendor ? 'bg-primaryDark':'bg-secondary '} flex justify-center  w-full `}> 
        <div className='w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden '>
            <div className='relative'>
                {
                    checked && <img src={Tint.src} className='absolute w-full h-full'/>
                }
                <img src={uploaded_photo} />
            </div>
            <div className={`flex justify-between py-4 px-5   ${isVendor ? 'bg-[#6D6E8F] border-t-2' : 'border border-1 border-[#D1D9FF]'}`}>
                <div className='space-y-1'>
                    <div className='font-[400]'>{Content}</div>
                    <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white': '  text-fourth'}`}>
                        <div><img src={isVendor ? alert.src : Alert.src}/></div>
                        <div>Select this wheel if damaged</div>
                    </div>
                </div>
                <div className='pt-1'>
                <div className={`${isVendor && 'form-group-white'} form-group mt-2`}>
                    <input type="checkbox" id={link} checked= {checked} onClick={()=>{setChecked(!checked)}}/>
                    <label htmlFor={link}></label>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WheelFrame