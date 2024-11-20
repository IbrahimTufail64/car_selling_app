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

const TechnicalHealth = () => {
    

    const {isVendor} = useAppContext() 
    const [checked, setChecked] = useState(false);
    const [inputText, setInputText] = useState('');
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const color = !isVendor ? '#695DFD' :'#FFFFFF'
    const sx = {
        color: color,
    '&.Mui-checked': {
        color: '#695DFD',
    },
    };

    const Router = useRouter();
    async function addData() {
        try {
            if(inputText === '' && checked) {
                alert('Please enter a description before submitting!')
                return;
            }
            const image = await db.images.where('name').equals('technicals').first();
            if (image !== undefined) {
                await db.images.where('name').equals('technicals').modify({
                    condition: checked,
                    data: inputText
                });
            } else {
                const id = await db.images.add({
                    name: 'technicals',
                    condition: checked, 
                    data: inputText
                });
            }
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pwa/technicals`,  
                {
                    condition: checked, 
                    data: inputText,
                    car_no: Number(localStorage.getItem('car_no'))
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                      }
              });
              console.log(response.status,response.data);  
              localStorage.setItem('technical_state','true');
            Router.push('./vehicle_health_selection')
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full h-[100vh] `}>
        <div className='p-5 flex space-x-2 text-[22px] pt-10'>
            <Link  href='./vehicle_health_selection'><IoChevronBack size={35} className='mt-[1px]'/></Link>
            <div className='space-y-[-3px]'>
                <div className='text-[26px]'>Technical health</div>
                <div className='font-[300] text-[18px]'>(electrical and mechanical)</div>
            </div>
        </div>

        <div className='flex justify-center pt-7'>
            <div className='w-[90vw] text-[22px]'>
                Does the vehicle have any mechanical or electronic issue?
            </div>
        
        </div>


            <div className='flex justify-center w-full mt-6'>
                <div className={`flex justify-between p-3 px-5 w-[90vw] rounded-lg ${isVendor ? 'bg-[#3D3D6A] border-[#646488]' : ' bg-white border-[#D3D4FD]'} border border-2 `}>
                    <div className='flex space-x-2'>
                        <Checkbox
                        {...label}
                        size='large'
                        sx={sx}
                        checked={checked}
                        onClick={()=>{setChecked(true)}}
                        />
                        <div className='h-full flex text-[22px] items-center'>Yes</div>
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
                        checked={!checked}
                        onClick={()=>{setChecked(false); setInputText('')}}
                        />
                        <div className='h-full flex text-[22px] items-center'>No</div>
                    </div>

                </div>
            </div>

            <div className={`w-full flex justify-center mt-10 ${!checked && 'hidden'}`}>
                <div className='w-[90vw] space-y-2 text-[20px]'>
                    <div>Describe in detail</div>
                    <textarea
                    value={inputText}
                    onChange={(e)=>setInputText(e.target.value)}
                    className={`${isVendor ? 'bg-[#3D3D6A] border-[#646488] text-white placeholder:text-white' : ' bg-white border-[#D3D4FD]'} w-[90vw] px-4 max-h-[200px] min-h-[200px] border  border-2 text-[20px] rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-[#646488] `}
                    placeholder="Type here"
                    />
                </div>
            </div>

            <div className='p-5 absolute bottom-0 w-full'>
                <div onClick={()=>addData()} className={`flex justify-center font-[600] text-[22px] rounded-[6px] space-x-2 px-5 py-5 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1'>
                        <div>Submit</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>
        

        

    </div>
  )
}

export default TechnicalHealth