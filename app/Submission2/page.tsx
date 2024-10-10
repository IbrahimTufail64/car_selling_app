"use client"
import React, { useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/icons/underline.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import logo from '@/assets/icons/logo.png'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link';
import splash from '@/assets/icons/Rays-small.png'

const Submission2 = () => {
    const [value, setValue] = useState(20); 

    const OnChangeEventTriggerd = (newValue:any) => {
        console.log("new Value", newValue);
        setValue(newValue);
      };

  return (
    <div className='bg-secondary h-full w-full'>
        <div className='flex justify-center w-full'>
            <div>
                <div className='flex space-x-4 pt-5'> {/*  Dynamic Content  */}
                    <img src={demoPic.src}/>
                    <div className='flex h-full pt-3 text-lg font-[500]'>Joe Doe</div>  
                </div>
                <div className='text-[44px] font-[400] pt-5'>
                    <div>£ 11,750</div>
                </div>
                <img src={underline.src}/>
                
            </div>
        </div>
        <div className='text-sm px-5 text-center pt-5'>
            Based on our live real-time <span className='text-primary'>Smart Data</span> for 'Manufacturer'' vehicles and daily live trade data. 
        </div>
        <div className='w-full flex justify-center pt-7'>
            <div>
                <div className='w-[85vw]'>
                        <Slider
                        onChange={OnChangeEventTriggerd}
                        value={value}
                        trackStyle={{ backgroundColor: "#695DFD", height: 6 }}
                        railStyle={{ backgroundColor: "#FFFFFF", height: 6 }}
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
                <div className='w-[85vw] flex justify-between text-sm'>
                    <div>Looked After</div>
                    <div>Pristine</div>
                </div>
            </div>
            
        </div>
        <div className='w-full flex justify-center my-10'>
                        <div className='bg-[#FFFFFF] w-[90vw] rounded-xl'>
                            <div className='bg-secondary m-4 rounded-xl p-5'>
                                <div className='flex justify-center'>

                                    <img src={logo.src}/>
                                </div>
                                <div className=' w-full flex justify-center font-[400] text-2xl pt-3'>
                                    Volkswagen Golf S
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div className='border-0 border-r-[1px] pr-4 border-primary'>2009</div>
                                    <div className='border-0 border-r-[1px] pr-4 border-primary'>Blue</div>
                                    <div className='border-0 border-r-[1px] pr-4 border-primary'>Hatchback</div>
                                    <div > Petrol</div>
                                </div>
                            </div>

                        </div>
        </div>


        <div className='flex justify-center w-full '>
            <div className='space-y-5 px-5 py-4 bg-white w-[90vw] rounded-xl'>
                            <div className='flex space-x-5 pt-[10px]'>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Good photos are important when selling your vehicle! </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Use our easy to use photo upload process for best results! </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Only a couple of minutes away from your CARSMART sale</div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-6 h-6'/>
                                <div>Ready to begin? Let's get started! </div>
                            </div>
                            
                        </div>
        </div>

        <div>
            <Link href='./IntroSlider' className='flex justify-center m-5 font-bold text-lg rounded-[6px] space-x-2 px-5 py-3 bg-tertiary '>
                    <div>Enable Camera</div>
                    <img src={splash.src}/>
            </Link> 
        </div>
    </div>
  )
}

export default Submission2 