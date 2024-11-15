"use client"
import React, { useState } from 'react'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link';
import { useAppContext } from '../Context';
import splash from '@/assets/icons/Rays-small.png'
import LogoWhite from '@/assets/LogoWhite.png'
import confetti from '@/assets/Confetti.png'
import phoneW from '@/assets/icons/phone.png'
import emailW from '@/assets/icons/email.png'
import phoneD from '@/assets/icons/phoneDark.png'
import emailD from '@/assets/icons/emailDark.png'

const Confirmation= () => {
    const {isVendor} = useAppContext();
    const phone = isVendor ? phoneD : phoneW;
    const email = isVendor ? emailD : emailW;

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} w-full min-h-[100vh] overflow-hidden flex flex-col  justify-between relative`}>
        <div className='absolute top-0 scale-x-[-1] w-full'>
            <img src={confetti.src} className='w-full h-[180px] object-cover'/>
        </div>
        <div>
        <div className='flex justify-center w-full'>
        <div className={`w-[93vw] my-[3vw] rounded-2xl ${isVendor ? 'bg-[#1F204F]': ' bg-white'}`}>
        { isVendor ?
            (<>
            <div className='flex w-full justify-center space-x-2 pt-5'>
                <img src={isVendor && LogoWhite.src} className='h-14'/>
                
                <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
                
            </div>
            <div className='flex justify-center w-full text-[#675DF4] text-[26px] font-[450]'>
            Upload Completed!
    
            </div>
            </>) : 
            <>
            <div className='flex justify-center w-full text-[#675DF4] text-[32px] font-[600] mt-10'>
            Excellent 
    
            </div>
            <div className='flex justify-center w-full text-[#675DF4] text-[24px] font-[600]'>
            Your Carsmart Ready!
    
            </div>
            </>
        }
        
        
        <div className='flex justify-center w-full'>
                            <div className='text-sm w-[85vw] mb-5 text-center pt-5 border border-[#a3a3c3] border-0 border-b-[1px] pb-5'>
                            Congratulations on completing your vehicle upload! 
                            </div>
                </div>

                <div className='flex justify-center w-full '>
            <div className={`space-y-5 px-2 pb-4 ${isVendor ? 'bg-secondaryDark' : 'bg-[#FFFFFF]'} w-[90vw] rounded-xl`}>
                <div className='text-xl'>
                See how we do it!
                </div>
                            <div className='flex space-x-5'>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Quick chat to confirm your sale in SmartHub marketplace. </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Uncover your maximum sale price by inviting over 17,000 + verified dealers and traders from our real-time SmartHub!</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Unlock Your Best Deal!</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Arrange vehicle collection at your convenience with swift payment to wrap up your Carsmart Deal!</div>
                            </div>
                            
                        </div>
        </div>

        
       

        

{/* Implement LIve Chat (Optional ??) */}
 
    </div>
        </div>

        <div className='overflow-hidden  w-full flex justify-center text-[18px]'>
          <div className={`w-[90vw] my-5 rounded-2xl  ${isVendor ? 'bg-secondaryDark': 'bg-white'}`} >
            <div className='p-5 py-3  bg-fourth text-white rounded-t-xl'>
            Need help? Contact our team
            </div>

            <div className='space-y-2 py-5  overflow-hidden'>
             <div className='flex space-x-4 px-5'>
                <img src={phone.src} className='w-10 h-10'/>
                <div className='pt-1'>98243 35462</div>
             </div>

             <div className='flex space-x-4 px-5'>
                <img src={email.src} className='w-10 h-10'/>
                <div className='pt-1'>help@carsmart.com</div>
             </div>
            </div>
          </div>
        </div>
    

        </div>
        <div className='p-5 pt-3  flex justify-center w-full bottom-2'>
                <div className='w-[90vw]'>
                <Link href='./Submission2' className={`flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-[13px] bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div className='whitespace-nowrap'>Finish listing</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
                </div>
        </div>
   
    </div>
  )
}

export default Confirmation