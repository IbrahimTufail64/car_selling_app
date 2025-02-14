"use client"
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context'
import splash from '@/assets/icons/Rays-small.png'
import { IoChevronBack } from "react-icons/io5";
import Link from 'next/link';
import car from '@/assets/Sub3Car.png'
import { Checkbox } from '@mui/material';
import { db } from '../Local_DB/db';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FurtherDetails = () => {
    
    
    const {isVendor} = useAppContext() 
    const [checked, setChecked] = useState('no-service-records');
    const [inputText, setInputText] = useState('');

          const [prevRoute,setPrevRoute] = useState('');
                          
                            useEffect(()=>{ 
                              localStorage.setItem('prevRoute','./service_records_option')
                          
                            },[])
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const color = !isVendor ? '#695DFD' :'#FFFFFF'
    const sx = {
        color: color,
    '&.Mui-checked': {
        color: '#695DFD',
    },
    };

    const Router = useRouter();
    
    async function addData(skip: Boolean) {
        // localStorage.setItem(`vehicle_photos_state_${car}`,'true');
        try {
                

              if(checked === 'no-service-records' || checked === 'not-due' || skip){
                localStorage.setItem(`service_records_state_${car}`,'true'); 
                setTimeout(()=>{ 
                if(isVendor && localStorage.getItem('saletag')==='WholeSale'){
                    Router.push('./Submission7')
                  }else{
                    Router.push('./preview_car')
                  }
                },300)
              }
              else{
                    Router.push('./service_records_example')
              }
            
                // setTimeout(()=>{

                //     Router.push('./Submission7')
                // },300)


            
            const token = localStorage.getItem('token'); 
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pwa/service_records_status`,  
                {
                    service_records_status: checked,
                    car_no: Number(localStorage.getItem('car_no'))
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                      }
              });
              console.log(response.status,response.data);  
              
        } catch (error) {
            
            console.log(error);
        }
    }


    
  return (
    <form 
    // onSubmit={()=>{addData(inputText,checked)}} 
    className={`${isVendor ? 'bg-primaryDark text-white pb-[110px]' : 'bg-secondary pb-[150px]'} w-full min-h-[100vh] flex flex-col justify-between  `}>
        <div>
        <div className='p-5 flex space-x-2 text-[22px] pt-10'>
        <Link  href='./service_manuals_keys'><IoChevronBack size={35} className='mt-[1px]'/></Link>
            <div className='space-y-[-3px]'>
                <div className='text-[26px]'>Service records</div>
            </div>
        </div>

        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'}`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 py-2 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div>
                    <div className={`${!isVendor && 'hidden' } font-[300] text-sm`}>Upload all manuals, service records, and keys to maximize your car's trade value.</div>
                    <div className={`${isVendor && 'hidden' } font-[300] text-sm`}>Not sure if your service history is full or partial?  Our guide helps!</div>
                    </div>
                    <Link  href='./service_records_example'  className='font-[400] text-sm mt-5  '>smart advice &gt;</Link>
                </div>
                <img src={car.src} className='object-contain'/>
            </div>
        </div>

        <div className='flex justify-center pt-7'>
            <div className='w-[90vw] text-[20px]'>
                Do you have your vehicle’s service history?
            </div>
        
        </div>


            <div className='flex justify-center w-full mt-6'>
                <div className={`flex justify-between p-3 px-5 w-[90vw] rounded-lg ${isVendor ? 'bg-[#3D3D6A] border-[#646488]' : ' bg-white border-[#D3D4FD]'} border border-2 `}>
                    <div className='flex space-x-2'>
                        <Checkbox
                        {...label}
                        size='large'
                        sx={sx}
                        checked={checked === 'full'}
                        onClick={()=>{setChecked('full')}}
                        />
                        <div className='h-full flex text-[18px] items-center'>Full service history</div>
                    </div>

                </div>
            </div>

            <div className='flex justify-center w-full mt-3'>
                <div className={`flex justify-between p-3 px-5 w-[90vw] rounded-lg ${isVendor ? 'bg-[#3D3D6A] border-[#646488]' : ' bg-white border-[#D3D4FD]'} border border-2 `}>
                    <div className='flex space-x-2'>
                        <Checkbox
                        {...label}
                        size='large'
                        sx={sx}
                        checked={checked === 'incomplete'}
                        onClick={()=>{setChecked('incomplete'); setInputText('')}}
                        />
                        <div className='h-full flex text-[18px] items-center'>Limited or incomplete service history</div>
                    </div>

                </div>
            </div>

            <div className='flex justify-center w-full mt-3'>
                <div className={`flex justify-between p-3 px-5 w-[90vw] rounded-lg ${isVendor ? 'bg-[#3D3D6A] border-[#646488]' : ' bg-white border-[#D3D4FD]'} border border-2 `}>
                    <div className='flex space-x-2'>
                        <Checkbox
                        {...label}
                        size='large'
                        sx={sx}
                        checked={checked === 'not-due'}
                        onClick={()=>{setChecked('not-due'); setInputText('')}}
                        />
                        <div className='h-full flex text-[18px] items-center'>Vehicle service not due yet</div>
                    </div>

                </div>
            </div>

            <div className='flex justify-center w-full mt-3'>
                <div className={`flex justify-between p-3 px-5 w-[90vw] rounded-lg ${isVendor ? 'bg-[#3D3D6A] border-[#646488]' : ' bg-white border-[#D3D4FD]'} border border-2 `}>
                    <div className='flex space-x-2'>
                        <Checkbox
                        {...label}
                        size='large'
                        sx={sx}
                        checked={checked === 'no-service-records'}
                        onClick={()=>{setChecked('no-service-records'); setInputText('')}}
                        />
                        <div className='h-full flex text-[18px] items-center'>No service history</div>
                    </div>

                </div>
            </div>



        </div>
{/* 
            <div className='p-5 bottom-0 w-[100vw]'>
                <button type='submit' 
                // onClick={()=>{addData(inputText,checked)}}
                  className={`w-full flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </button>
        </div> */}

        <div className='p-5 fixed bottom-0 w-full'>
                <div
                onClick={()=>addData(false)} 
                className={`w-full flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </div>

                <div
                onClick={()=>addData(true)} 
                className={`w-full flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 pt-4 ${isVendor && 'hidden'} text-primaryDark`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Upload later</div>
                    </div>
                </div>


        </div>
        

        

    </form>
  )
}

export default FurtherDetails