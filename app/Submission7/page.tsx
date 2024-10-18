"use client"
import React, { useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/icons/underline.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import chat from '@/assets/icons/char.png'
import Field from '../components/Field';
import Link from 'next/link';
import alert from '@/assets/icons/AlertClear.png'
import { useAppContext } from '../Context';
import { IoChevronBack } from 'react-icons/io5';
import LogoWhite from '@/assets/LogoWhite.png'

const Submission7 = () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
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

    const OnChangeEventTriggerd = (newValue:any) => {
        console.log("new Value", newValue);
        setValue(newValue);
      };

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} w-full min-h-[100vh] overflow-hidden`}>
        { isVendor &&
            (<div className='flex w-full justify-center space-x-2 pt-5'>
                <img src={isVendor && LogoWhite.src} className='h-14'/>
                
                <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
                
            </div>)
        }
        <div className='flex justify-center w-full'>
            <div className={`${!isVendor && 'bg-[#FFFFFF]' } w-[90vw] flex justify-center rounded-xl mt-3`}>
                <div className='w-full px-5 pb-5'>
                <div className={`${isVendor ? 'bg-[#3D3D6A] border-[#646488]': 'bg-[#ECF1FD] border-[#D3D4FD]' } border-2  border-dashed w-[80vw] rounded-xl my-3 pb-4`}>
                <div className='w-full flex justify-center mt-6'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>Quick Sale</div></div>
                <div className='flex pt-2 w-full justify-center'> 
                    <div className='pt-3 text-lg text-center'>Your estimated sales price</div>  
                </div>
                <div className='text-[46px] font-[400] relative text-center w-full'>
                    <div className='font-[500]'>£ 11,750</div>
                    <div className='w-full flex justify-center'>
                    <img src={underline.src} className=''/>
                    </div>
                </div>
                
                
                
                </div>
                {isVendor && <div className='flex w-full justify-center my-6 mb-2 space-x-3'>
                        <div onClick={handleCarCountMinus} className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[28px]'>
                            0{carCount}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-2'>
                            05
                        </div>
                        </div>

                        <div  onClick={handleCarCountAdd}  className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25} className='rotate-180'/>
                        </div>
                    </div>}
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
        <Link href="#" className='w-full flex justify-center space-x-2 text-primary mt-5'>
            <img src={alert.src} className='w-5 h-5 '/>
            <div>More info</div>
            
        </Link>
                </div>
                </div>
                
            </div>
        </div>

        <div className='w-full flex justify-center my-10'>
                        <div className=' w-[90vw] rounded-xl space-y-2'>
                            {
                                isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={true} Content={'Trade declaration'} />
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                !isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={true} Content={'About you'} />
                                    </Link> 
                                        </div>
                                )
                            }

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
                            {
                                isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={false} Content={'Service records, Manuals & Keys'} />
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                isVendor &&
                                (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={false} Content={'Vehicle video'} />
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                !isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={true} Content={'Service records'} />
                                    </Link> 
                                        </div>
                                )
                            }
                           

                           

                           

                           

                        </div>
        </div>

{/* Implement LIve Chat (Optional ??) */}
        <div className='text-sm space-y-2 font-[500] right-10 flex justify-end pr-7 py-7'>
            <div>
            <Link href='#'  className='flex w-full justify-center h-10'><img src={chat.src}/></Link>   
            <div>Live chat</div>
            </div>
        </div>

    </div>
  )
}

export default Submission7 