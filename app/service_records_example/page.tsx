"use client"
import React from 'react'
import record from '@/assets/records.png'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link'
import splash from '@/assets/icons/Rays-small.png'

const ServiceExample = () => {
  return (
    <div className='bg-secondary w-full'>
        <div>
            <img src={record.src} className='w-full'/>
        </div>

        <div className='w-full flex justify-center my-12 mt-10'>
            <div className='w-[90vw] bg-white text-[18px] rounded-xl p-5 '>
                <div className='space-y-5'>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Capture all four corners</div>
                                    <div className='font-[300]'>
                                    Good photos are important when selling your vehicle! 
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Ensure good lighting</div>
                                    <div className='font-[300]'>
                                    A photo should be well-lit and sharp.
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Capture all four corners</div>
                                    <div className='font-[300]'>
                                    Good photos are important when selling your vehicle! 
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            </div>
        </div>

        <div className='p-5'>
                <Link href='./Submission2' className=' flex justify-center font-[600] text-lg rounded-[6px] space-x-2 px-5 py-5 text-[24px] bg-tertiary '>
                    <div className='flex space-x-1'>
                        <div>Add Documents</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className='px-5 pb-5'>
                <Link href='./Submission2' className='border border-2 border-[#101044] flex justify-center font-[600] text-lg rounded-[6px] space-x-2 px-5 py-5 text-[24px] text-[#101044] '>
                    <div className='flex space-x-1'>
                        <div>Previous</div>
                    </div>
                </Link>
        </div>
    </div>
  )
}

export default ServiceExample