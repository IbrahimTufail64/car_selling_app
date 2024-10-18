"use client"
import React, { useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/icons/underline.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import logo from '@/assets/icons/logo.png'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link';
import LogoBlue from '@/assets/Logo.png'
import LogoWhite from '@/assets/LogoWhite.png'
import splash from '@/assets/icons/Rays-small.png'
import { useAppContext } from '../Context';
import { IoChevronBack } from "react-icons/io5";

const Submission2 = () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
   

    const OnChangeEventTriggerd = (newValue:any) => {
        console.log("new Value", newValue);
        setValue(newValue);
      };
      const [carCount, setCarCount] = useState(0);
    const handleCarCountMinus =() =>{
        if(carCount > 0){
            setCarCount(carCount-1);
        }
    }

    const handleCarCountAdd =() =>{
        if(carCount < 5){
            setCarCount(carCount+1);
        }
    }

    

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white':'bg-secondary'} h-full w-full overflow-hidden`}>
        <div className='flex justify-center w-full'>
            <div>
            <div className='flex w-full justify-center space-x-2 mb-6'>
                    <img src={isVendor ? LogoWhite.src : LogoBlue.src} className='h-14'/>
                    {
                        isVendor && <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
                    }
                    </div>
                <div className='w-full flex justify-center'>
                    <div className='flex space-x-4 pt-5'> {/*  Dynamic Content  */}
                        <img src={demoPic.src}/>
                        <div className='flex h-full pt-3 text-lg font-[500]'>Joe Doe</div>  
                    </div>
                </div>
                <div className='w-full flex justify-center mt-6'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>Quick Sale</div></div>
                <div className='text-[46px] font-[400] pt-3 flex justify-center w-full'>
                    <div>
                        <div>£ 11,750</div>
                        <img src={underline.src}/>
                    </div>
                </div>
                
                
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
                        <div className={`${isVendor ? 'bg-secondaryDark' : 'bg-[#FFFFFF]'} w-[90vw] rounded-xl`}>
                            <div className={`${isVendor ? 'bg-[#353661]' : 'bg-secondary'} m-4 rounded-xl p-5`}>
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

        {isVendor && <div className='flex w-full justify-center mb-7 space-x-3'>
                        <div onClick={handleCarCountMinus} className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[28px]'>
                            0{carCount}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-3'>
                            05
                        </div>
                        </div>

                        <div  onClick={handleCarCountAdd}  className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25} className='rotate-180'/>
                        </div>
                    </div>}


        <div className='flex justify-center w-full '>
            <div className={`space-y-5 px-5 py-4 ${isVendor ? 'bg-secondaryDark' : 'bg-[#FFFFFF]'} w-[90vw] rounded-xl`}>
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
            <Link href='./IntroSlider' className={`${isVendor && 'text-secondaryDark'} flex justify-center m-5 font-bold text-xl rounded-[6px] space-x-2 px-5 py-4 bg-tertiary `}>
                    <div>Enable Camera</div>
                    <img src={splash.src}/>
            </Link> 
        </div>
    </div>
  )
}

export default Submission2 