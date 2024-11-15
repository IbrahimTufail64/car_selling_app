"use client"
import React, { useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/icons/underline.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import logo from '@/assets/icons/logo.png'
import icon from '@/assets/icons/Iconbutton.png'
import Link from 'next/link';
import alert from '@/assets/icons/AlertClear.png'
import LogoBlue from '@/assets/Logo.png'
import LogoWhite from '@/assets/LogoWhite.png'
import splash from '@/assets/icons/Rays-small.png'
import { useAppContext } from '../Context';
import { IoChevronBack } from "react-icons/io5";

const Submission2 = () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
    const [permissionStatus, setPermissionStatus] = useState('Not Requested');

    const requestCameraPermission = async () => {
        try {
          // Request only video permissions
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
          // Permission granted, we can immediately stop the stream
          stream.getTracks().forEach(track => track.stop());
    
          setPermissionStatus('Granted');
        } catch (error) {
          // If there was an error, it likely means the user denied permission
          setPermissionStatus('Denied');
          console.error("Camera permission was denied:", error);
        }
      };
   

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
    <div className={`${isVendor ? 'bg-primaryDark text-white':'bg-secondary'} min-h-[100vh] flex flex-col justify-between w-full overflow-hidden`}>
 <div>
 <div className='flex w-full justify-center space-x-2 my-4'>
         <img src={isVendor ? LogoWhite.src : LogoBlue.src} className='h-14'/>
         {
            isVendor && <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
        }
        </div>

    <div className='w-full flex justify-center mb-3'>
        <div className='flex space-x-4 pt-1'> {/*  Dynamic Content  */}
            <img src={demoPic.src} className='w-16'/>
            <div className='flex h-full pt-3 text-2xl font-[500]'>Joe Doe</div>  
        </div>
    </div>      

        <div className='flex justify-center w-full'>
            <div className={`${!isVendor && 'bg-[#FFFFFF]' } w-[90vw] flex justify-center rounded-xl mt-3`}>
                <div className='w-full flex justify-center py-3'>

                <div className={`${isVendor ? 'bg-[#3D3D6A] border-[#646488]': 'bg-[#ECF1FD] border-[#D3D4FD]' } border-2  border-dashed w-[82vw] rounded-xl my-3 pb-4`}>
               
                <div className='flex justify-center w-full mt-5'>
                    <div className={`w-[100px] h-6 bg-white border ${!isVendor ? 'border-black' : 'border-secondary'} flex relative`}>
                        <div className=' bg-[#3748EA] w-[15%] p-t-2'>
                        </div>
                        <div className='text-black font-[600] w-[85%] absolute top-0 left-5'>
                            HW23BU
                        </div>
                    </div>
                </div>
                <div className='text-[46px] font-[400] relative text-center w-full'>
                    <div className='font-[500]'>£ 11,750</div>
                    <div className='w-full flex justify-center'>
                    <img src={underline.src} className=''/>
                    </div>
                </div>
                {isVendor && 
                    <div className='w-full flex justify-center mt-3 text-[12px] text-[#99F22B] underline underline-offset-2'><Link href='#'>I don’t want to proceed with this car</Link></div>}

                <div className='flex justify-center w-full'>
                            <div className='text-sm px-5 text-center pt-5 w-[90%]'>
                        Based on our live real-time <span className='text-primary'>Smart Data</span> for 'Manufacturer'' vehicles and daily live trade data. 
                    </div>
                </div>
        <div className='w-full px-24 flex justify-center pt-3'>
            
            <div className=''>
                <div className='w-full flex justify-center'>
                        <div className='w-[110%]'>
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
                </div>
                <div className='w-[60vw] flex justify-between text-[13px]'>
                    <div>Looked After</div>
                    <div>Pristine</div>
                </div>
            </div>
            
            
        </div>
        <div className='w-full flex justify-center mt-3'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>Quick Sale</div></div>
                
                
                </div>
                
                <div>

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

        


        <div className='flex justify-center w-full mt-5'>
            <div className={`space-y-5 px-5 py-4 ${isVendor ? 'bg-secondaryDark' : 'bg-[#FFFFFF]'} w-[85vw] rounded-xl`}>
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
 </div>

        <div>
            <Link href='./IntroSlider' onClick={requestCameraPermission} className={`${isVendor && 'text-secondaryDark'} flex justify-center m-5 font-bold text-xl rounded-[6px] space-x-2 px-5 py-4 bg-tertiary `}>
                    <div>Enable Camera</div>
                    <img src={splash.src}/>
            </Link> 
        </div>
    </div>
  )
}

export default Submission2 







// <div>
// <div className='flex w-full justify-center space-x-2 mb-6'>
//         <img src={isVendor ? LogoWhite.src : LogoBlue.src} className='h-14'/>
//         {
//             isVendor && <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
//         }
//         </div>

//     <div className='w-full flex justify-center'>
//         <div className='flex space-x-4 pt-5'> {/*  Dynamic Content  */}
//             <img src={demoPic.src}/>
//             <div className='flex h-full pt-3 text-lg font-[500]'>Joe Doe</div>  
//         </div>
//     </div>
    
//     <div className='text-[46px] font-[400] pt-3 flex justify-center w-full'>
//         <div>
//             <div>£ 11,750</div>
//             <img src={underline.src}/>
//         </div>
//     </div>
    
    
// </div>

// </div>
// <div className='text-sm px-5 text-center pt-5'>
// Based on our live real-time <span className='text-primary'>Smart Data</span> for 'Manufacturer'' vehicles and daily live trade data. 
// </div>
// <div className='w-full flex justify-center pt-7'>
// <div>
//     <div className='w-[85vw]'>
//             <Slider
//             onChange={OnChangeEventTriggerd}
//             value={value}
//             trackStyle={{ backgroundColor: "#695DFD", height: 6 }}
//             railStyle={{ backgroundColor: "#FFFFFF", height: 6 }}
//             handleStyle={{
//             borderColor: "#99F22B",
//             height: 10,
//             width: 10,
//             marginLeft: -5,
//             marginTop: -2,
//             backgroundColor: "black"
//             }}
//     />
//     </div>
//     <div className='w-[85vw] flex justify-between text-sm'>
//         <div>Looked After</div>
//         <div>Pristine</div>
//     </div>
// </div>

// </div>
// <div className='w-full flex justify-center mt-2'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>Quick Sale</div>














{/* <div>
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
            </div> */}