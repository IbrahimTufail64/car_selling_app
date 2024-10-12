"use client"
import React, { useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/icons/underline.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import chat from '@/assets/icons/char.png'
import Field from '../components/Field';
import Link from 'next/link';

const Submission7 = () => {
    const [value, setValue] = useState(20); 

    const OnChangeEventTriggerd = (newValue:any) => {
        console.log("new Value", newValue);
        setValue(newValue);
      };

  return (
    <div className='bg-secondary h-[100vh] w-full'>
        <div className='flex justify-center w-full'>
            <div className='bg-[#FFFFFF] w-[90vw] flex justify-center rounded-xl mt-5'>
                <div className='w-full px-5 pb-5'>
                <div className='bg-[#ECF1FD] border-dotted border-2 border-[#D3D4FD] w-[80vw] rounded-xl my-3 pb-4'>
                <div className='flex pt-2'> 
                    <div className='flex pt-3 text-lg w-full font-[300] text-center pl-10'>Your estimated sales price</div>  
                </div>
                <div className='text-[44px] font-[400] relative text-center w-full'>
                    <div>£ 11,750</div>
                    <img src={underline.src} className='absolute left-[60px] top-[55px] w-[60%]'/>
                </div>
                
                </div>
                <div>
                <div className='text-sm px-5 text-center pt-5'>
            Based on our live real-time <span className='text-primary'>Smart Data</span> for 'Manufacturer'' vehicles and daily live trade data. 
        </div>
        <div className='w-full flex justify-center pt-3'>
            <div>
                <div className=''>
                        <Slider
                        onChange={OnChangeEventTriggerd}
                        value={value}
                        trackStyle={{ backgroundColor: "#695DFD", height: 6 }}
                        railStyle={{ backgroundColor: "#EEF1FF", height: 6 }}
                        handleStyle={{
                        borderColor: "#99F22B",
                        height: 10,
                        width: 10,
                        marginLeft: -5,
                        marginTop: -2,
                        backgroundColor: "black"
                        }}
                />
                </div>
                <div className='w-[85vw] flex justify-between text-[13px]'>
                    <div>Looked After</div>
                    <div>Pristine</div>
                </div>
            </div>
            
        </div>
                </div>
                </div>
                
            </div>
        </div>

        <div className='w-full flex justify-center my-10'>
                        <div className=' w-[90vw] rounded-xl space-y-2'>
                            <div>
                            <Link href='#'>
                           <Field isComplete={true} Content={'About you'} />
                           </Link> 
                            </div>

                            <div>
                            <Link href='#'>
                           <Field isComplete={true} Content={'About your vehicle'} />
                           </Link> 
                            </div>
                            <div>
                            <Link href='./vehicle_photos'>
                           <Field isComplete={false} Content={'Vehicle photos'} />
                           </Link> 
                            </div>
                            <div>
                            <Link href='#'>
                           <Field isComplete={false} Content={'Service records'} />
                           </Link> 
                            </div>
                           

                           

                           

                           

                        </div>
        </div>

{/* Implement LIve Chat (Optional ??) */}
        <div className='text-sm absolute bottom-3 space-y-2 font-[500] right-10'>
            <Link href='#'  className='flex w-full justify-center w-10 h-10'><img src={chat.src}/></Link>   
            <div>Live chat</div>
        </div>

    </div>
  )
}

export default Submission7 