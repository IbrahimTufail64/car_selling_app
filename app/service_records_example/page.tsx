"use client"
import React from 'react'
import record from '@/assets/records.png'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link'
import splash from '@/assets/icons/Rays-small.png'
import { useAppContext } from '../Context'

const ServiceExample = () => {

    const {isVendor} = useAppContext();

  return (
    <div className={`w-full ${isVendor ? 'bg-primaryDark text-white': 'bg-secondary'}`}>
        <div>
            <img src={record.src} className='w-full'/>
        </div>

        <div className='w-full flex justify-center my-12 mt-10'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5 mt-5`}>
                <div className='space-y-5'>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className={`font-[600] text-[20px]  ${isVendor ? 'text-white' : 'text-[#101044]'}`}>Capture all four corners</div>
                                    <div className='font-[300]'>
                                    Good photos are important when selling your vehicle! 
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className={`font-[600] text-[20px]  ${isVendor ? 'text-white' : 'text-[#101044]'}`}>Ensure good lighting</div>
                                    <div className='font-[300]'>
                                    A photo should be well-lit and sharp.
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className={`font-[600] text-[20px]  ${isVendor ? 'text-white' : 'text-[#101044]'}`}>Capture all four corners</div>
                                    <div className='font-[300]'>
                                    Good photos are important when selling your vehicle! 
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            </div>
        </div>

        <div className='p-5'>
                <Link href={`${isVendor ? './service_records' : './service_records_customer'}`} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Add Documents</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className='p-5 pt-0'>
                <Link href='./service_manuals_keys' className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Previous</div>
                    </div>
                </Link>
        </div>
    </div>
  )
}

export default ServiceExample