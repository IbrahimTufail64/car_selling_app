
import React from 'react'
import frame from '@/assets/WelcomeFrame.png'
import icon from '@/assets/icons/Iconbutton.png'
import PlayStore from '@/assets/icons/PlayStore.png'
import splash from '@/assets/icons/Rays-small.png'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='relative bg-secondary h-[100vh] flex flex-col justify-between'>
        <div>
            <div className='font-bold bg-primary h-[202px] flex justify-center text-lg text-[#FFFFFF] pt-[43px]'>
                Continues to mobile site
            </div>
            <div className='w-full flex justify-center '>

                <img src={frame.src} className='absolute w-[90vw] mt-[80px] top-0'/>
            </div>

            <div className='w-full flex justify-center pt-[145px] '>
                <div className='w-[92vw] bg-[#FFFFFF] rounded-[14px] flex justify-center py-[5px]'>

                    <div className='w-[90%]'>
                        <div className='font-bold text-[20px] text-[#101044] pr-[30px] pb-[10px]'>Time to open SmartSnap</div>
                        <div className='h-[1px] bg-[#D3D4FD] w-full'></div>
                        <div className='space-y-5'>
                            <div className='flex space-x-5 pt-[10px]'>
                                <img src={icon.src}/>
                                <div>Quick and simple photo taking</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src}/>
                                <div>Attract higher prices</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src}/>
                                <div>No login required</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src}/>
                                <div>Easy mobile access</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Instant uploads directly from phone</div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        

        <div className='w-full bg-[#101044] p-5   flex justify-between'>
            <div className='flex text-[#FFFFFF]'>
                <img src={PlayStore.src} className=' w-10 h-10'/>
                <div className='px-2'>
                    <div className='font-bold'>Carsmart</div>
                    <div className='opacity-60 text-sm'>Coming soon</div>
                </div>
            </div>
            <div>
                <Link href='./Submission2' className='flex font-bold text-lg rounded-[6px] space-x-2 px-5 py-3 bg-tertiary '>
                    <div>Take photos</div>
                    <img src={splash.src}/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HomePage