"use client"
import React, { useEffect, useState } from 'react'
import underline from '@/assets/icons/underline.png'
import "rc-slider/assets/index.css";
import logo from '@/assets/Logo.png'
import Link from 'next/link';
import bullet from '@/assets/icons/confirmationBullet.png'
import { useAppContext } from '../Context';
import splash from '@/assets/icons/Rays-small.png'
import LogoWhite from '@/assets/LogoWhite.png'
import alert from '@/assets/icons/AlertClear.png'
import axios from 'axios';

const Confirmation= () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
    const [carCount, setCarCount] = useState(0);
    const [user_name,setuser_name] = useState('');
    const [price,setprice] = useState(0);

      useEffect(()=>{ 
        
        setCarCount(Number(localStorage.getItem('car_no')))
        const handleRequest = async () => { 
            

        
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            console.log(url);
            const token = localStorage.getItem('token'); 
            try { 
                const response = await axios.get(`${url}/pwa/confirmation_submission`, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data =  response.data;
                console.log(response.data)
                
                // if(data.isWholeSale === "Wholesale"){
                    // setsaleTag(data.tag)
                    setuser_name(data.user_name);
                    setprice(data.estimated_price);
            } catch (error) {
                //handle authentification
              console.error(error);
            }
          };

        handleRequest()
    },[])

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} w-full min-h-[100vh] overflow-hidden `}>
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
            {user_name}
    
            </div>
            </>) :
            <>
            <div className='flex w-full justify-center space-x-2 pt-5'>
            <img src={logo.src} className='h-14'/>
            </div>
            </>
        }
        
        <div className='flex justify-center w-full'>
            <div className={`${!isVendor && 'bg-[#FFFFFF]' } w-[90vw] flex justify-center rounded-xl mt-1`}>
                <div className='w-full px-5 pb-5'>
                <div className={`${isVendor ? 'bg-[#3D3D6A] border-[#646488]': 'bg-[#F5F7FD] border-[#D3D4FD]' } border-[2.5px]  border-dashed w-[80vw] rounded-xl my-3 pb-4`}>
                
                <div className='flex justify-center w-full pt-5'>
                    <div className='w-[100px] h-6 bg-white border border-secondary flex relative'>
                        <div className=' bg-[#3748EA] w-[15%] border border-t-2 border-white'>
                        </div>
                        <div className='text-black font-[600] w-[85%] absolute top-0 left-5 overflow-hidden'>
                            {localStorage.getItem('userId')}
                        </div>
                    </div>
                </div>
                <div className='flex pt-2 w-full justify-center'> 
                    <div className='pt-3 text-lg text-center'>Your estimated sales price</div>  
                </div>
                <div className='text-[46px] font-[400] relative text-center w-full'>
                    <div className='font-[500]'>£ {price}</div>
                    <div className='w-full flex justify-center'>
                    <img src={underline.src} className=''/>
                    </div>
                    {isVendor && 
                    <div className='w-full flex justify-center mt-3 text-[12px] text-[#99F22B] underline'><Link href='#'>I don’t want to proceed with this car</Link></div>}
                    <div className='w-full flex justify-center mt-6'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>{localStorage.getItem('saletag')}</div></div>
                </div>
                
                </div>
                {!isVendor && 
                <Link href="#" className='w-full flex justify-center space-x-2 text-primary mt-5'>
                <img src={alert.src} className='w-5 h-5 '/>
                <div>More info</div>
                
                </Link>}
                <div>
                <div className='flex justify-center w-full'>
                            <div className='text-sm w-[100vw] text-center pt-5 border border-[#a3a3c3] border-0 border-b-[1px] pb-5'>
                            Here’s your estimated trade price. Please review and agree to the following points to complete your listing.
                    </div>
                </div>

                <div className='w-full  text-[18px] pt-5'>
                To continue please verify your sale price: 
                </div>

                <div className='flex justify-center relative'>
                    {/* <div className='absolute top-3 left-0 pt-1'>
                        <img src={bullet.src} className='h-[215px] '/>
                    </div> */}
                    <ul className={`text-[14px] ${!isVendor ? 'text-black' : 'text-[#b4b4d7]'} justify-between pt-3 flex flex-col space-y-3 relative`}>
                        <div className='bg-tertiary w-[1px] h-[67%] top-10 left-2 absolute rounded-full'></div>
                        <li className='relative pl-[30px]'>
                            <img src={bullet.src} className='absolute w-5 left-0'/>
                        Your vehicle's details are accurate and up-to-date.
                        </li>
                        <li className='relative pl-[30px]'>
                            <img src={bullet.src} className='absolute w-5 left-0'/>
                        Here’s your estimated trade price. For better visibility and ratings, ensure honest details so other traders trust doing business with you
                        </li>

                        <li className='relative pl-[30px]'>
                            <img src={bullet.src} className='absolute w-5 left-0'/>
                        Share documents like V5C and bank details when necessary.
                        </li>
                        <li className='relative pl-[30px]'>
                            <img src={bullet.src} className='absolute w-5 left-0'/>
                        Your car can be collected within 5 days of accepting the top offer." (At a date and time that works for you)
                        </li>
                        
                    </ul>
                </div>

               
        
        
                </div>
                </div>
                
            </div>
        </div>

        

{/* Implement LIve Chat (Optional ??) */}
 
    </div>
        </div>
    <div className='p-5 pt-3  flex justify-center w-full bottom-2'>
                <div className='w-[90vw]'>
                <Link href='./confirmation_upload' className={`flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-[13px] bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div className='whitespace-nowrap'>Verify my price</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
                </div>
        </div>

        </div>
   
    </div>
  )
}

export default Confirmation