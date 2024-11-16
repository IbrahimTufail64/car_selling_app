"use client"
import React, { useContext, useEffect } from 'react'
import frame from '@/assets/WelcomeFrame.png'
import icon from '@/assets/icons/Iconbutton.png'
import PlayStore from '@/assets/icons/PlayStore.png'
import splash from '@/assets/icons/Rays-small.png'
import Link from 'next/link'
import Logo from '@/assets/LogoWhite.png'
import { useAppContext } from '../Context'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

const HomePage = () => {
    const {isVendor} = useAppContext();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    const {setIsVendor} = useAppContext();
    console.log(localStorage.getItem('isVendor'))
    useEffect(()=>{
        
        
        const handleRequest = async () => { 
            
            if(!id){
                // handle authentification
            }
        
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            // const token = localStorage.getItem('token');
            try { 
                const response = await axios.get(`${url}/pwa_auth/?id=${id}`, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                  
                  console.log(response.data)
                  localStorage.setItem('token',response.data.token);
                  localStorage.setItem('isVendor',response.data.isVendor);
                  
                  if(response.data.isVendor){
                    setIsVendor(true);
                    localStorage.setItem('VendorType',response.data.VendorType);
                  }else{
                    setIsVendor(false);
                  }
                  

            
                  

            } catch (error) {
                //handle authentification
                
              console.error(error);
            }
          };

        handleRequest()
    },[])

  return (
    <div className={`relative ${isVendor ? 'bg-primaryDark text-white': 'bg-secondary '} min-h-[100vh] flex flex-col justify-between`}>
        <div>
            <div className='font-[500] bg-primary h-[202px] flex justify-center text-[22px] text-[#FFFFFF] pt-[20px]'>
                <div>
                    <div className='flex w-full justify-center space-x-2 mb-6'>
                    <img src={Logo.src} className='h-14'/>
                    {
                        isVendor && <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
                    }
                    </div>
                    <div>Continues to mobile site</div>
                </div>
            </div>
            <div className='w-full flex justify-center '>

                <img src={frame.src} className='absolute w-[90vw] object-cover h-[250px] rounded-2xl mt-[150px] top-0'/>
            </div>

            <div className='w-full flex justify-center pt-[200px] '>
                <div className={`w-[92vw] ${isVendor ? 'bg-secondaryDark text-white': 'bg-white '} rounded-[14px] flex justify-center py-5 mt-5`}>

                    <div className='w-[90%]'>
                        <div className={`font-[500] text-[26px] ${!isVendor ? 'text-[#101044]' : 'text-white'} pr-[30px] pb-[10px]`}>Time to open SmartSnap</div>
                        <div className='h-[1px] bg-[#D3D4FD] w-full'></div>
                        <div className='space-y-5'>
                            <div className='flex space-x-5 pt-[10px]'>
                                <img src={icon.src} className='w-7 h-7'/>
                                <div>Quick and simple photo taking</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7'/>
                                <div>Attract higher prices</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7'/>
                                <div>No login required</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7'/>
                                <div>Easy mobile access</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7' />
                                <div>Instant uploads directly from phone</div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        

        <div className={`w-full ${isVendor ? 'bg-secondaryDark text-secondaryDark': 'bg-[#101044]'} p-5 mt-10   flex justify-between`}>
            <div className='flex text-[#FFFFFF]'>
                <img src={PlayStore.src} className=' w-10 h-10'/>
                <div className='px-2'>
                    <div className='font-bold'>Carsmart</div>
                    <div className='opacity-60 text-sm'>Coming soon</div>
                </div>
            </div>
            <div>
                <Link href='./Submission2' className='flex text-xl font-[500] rounded-[6px] space-x-2 px-5 py-3 bg-tertiary '>
                    <div>Take photos</div>
                    <img src={splash.src}/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HomePage