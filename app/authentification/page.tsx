"use client"
import React, { useState } from 'react'
import link from '@/assets/LinkExp.png'
import Link from 'next/link'
import splash from '@/assets/icons/Rays-small.png'
import axios from 'axios'

const Auth = () => {
  const [email,setEmail] = useState('');

  const handleSubmit = async (event:any) => { 
    event.preventDefault();
    if(email === '' || !email.includes('@')){
      alert('Check if your email is correct and try again!');
      return;
    }

    const url:any = process.env.NEXT_PUBLIC_API_URL ;
    try {
      

      const response = await axios.post(`${url}/pwa/re_authorization`,  
         {
          email
         },{
            headers: {
                'Content-Type': 'multipart/form-data',
              }
      });
      console.log(response.status,response.data); 
      alert('Open the link sent to your email to login!') 
    } catch (error) {
      alert('Check if your email is correct and try again!');
      console.error(error);
    }
  };

  return (
    <div className='bg-[#282828] h-[100vh] w-[100vw] overflow-hidden flex justify-center items-center'>
        <div className='flex flex-col justify-between h-[100vh]'>
            <div>
            <div className='w-full flex justify-center mb-12 mt-[5vh]'>
            <img src={link.src} className='w-[30vh]'/>
            </div>
            <div className='w-full justify-center flex text-[20px] text-[#695DFD] font-[500]'>Link Expired</div>
            <div className=' justify-center flex text-[16px] text-white font-[300] text-center mt-3'>
              <div className='w-[60vw]'>Enter your email address to get a new sign in link:</div>
            </div>
            <div className='mt-12'>
              <div className='text-white mb-2 ml-1 text-[16px] pl-[2.5vw]'>Email</div>
              <div className='flex justify-center'>
              <input type='text' placeholder='e.g. sample@mail.com' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#535353]  w-[95vw] px-5 py-5 rounded-lg mt-0'/>
              </div>
            </div>
            </div>


            <div className='p-5 w-[100vw]'>
                <div onClick={handleSubmit} className='w-full flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary text-primaryDark'>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Get started</div>
                        <img src={splash.src}/>
                    </div>
                </div> 
        </div>
        </div>
    </div>
  )
}

export default Auth