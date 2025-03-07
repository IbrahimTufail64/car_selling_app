"use client"
import React, { useEffect, useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/underline_mark.png'
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
import axios from 'axios';
import PreviewPhotos from '../components/PreviewPhotos';

const Submission2 = () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
    const [permissionStatus, setPermissionStatus] = useState('Not Requested');
    const [estimatedPrice, setEstimatedPrice] = useState([]);
    const [retailPrice, setretailPrice] = useState([]);
    const [manufacturer, setmanufacturer] = useState([]);
    const [carId, setcarId] = useState([]);
    const [saleTag, setsaleTag] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImg,setProfileImg] = useState<any>();
    const [userId,setUserId] = useState('');
    const [popup,setpopup] = useState(false);

    useEffect(()=>{ 
        
        
        const handleRequest = async () => { 
            

        
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            const token = localStorage.getItem('token');
            try { 
                const response = await axios.get(`${url}/pwa/real_time_data`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data =  response.data;
                console.log(response.data)
                
                // if(data.isWholeSale === "Wholesale"){
                    setsaleTag(data.tag)
                    setEstimatedPrice(data.estimatedPrice);
                    setretailPrice(data.retailPrice);
                    setmanufacturer(data.manufacturer);
                    setcarId(data.carId);
                    
                // }
                setUserName(data.userName);
                setProfileImg(data.profileImage);

                localStorage.setItem('userName',userName);
                localStorage.setItem('profileImg',profileImg);
                localStorage.setItem('userId',userId);
                                   
                  

            
                  

            } catch (error) {
                //handle authentification
              console.error(error);
            }
          };

        handleRequest();
        setTimeout(()=>{
            setpopup(true);
        },500)
        setTimeout(()=>{
            setpopup(false);
        },3000)
    },[])

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
      const [carCount, setCarCount] = useState(1);
    const handleCarCountMinus =() =>{
        if(carCount > 1){
            localStorage.setItem('car_no',carId[carCount-1]);
            setCarCount(carCount-1);
        }
    }

    const handleCarCountAdd =() =>{
        if(carCount < estimatedPrice.length){
            localStorage.setItem('car_no',carId[carCount+1]);
            setCarCount(carCount+1);
        }
    }

    

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white':'bg-secondary'} min-h-[100vh] flex flex-col justify-between w-full overflow-hidden pb-[100px]`}>
 <div>
 <div className='flex w-full justify-center space-x-2 my-4'>
         <img src={isVendor ? LogoWhite.src : LogoBlue.src} className='h-14'/>
         {
            isVendor && <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
        }
        </div>

    <div className='w-full flex justify-center mb-3'>
        <div className='flex space-x-4 pt-1'> {/*  Dynamic Content  */}
            <img src={profileImg ? profileImg : demoPic.src} className='w-16 h-16 rounded-full object-cover'/>
            <div className='flex h-full pt-3 text-2xl font-[500]'>{userName}</div>  
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
                            {carId[carCount-1]}
                        </div>
                    </div>
                </div>
                <div className='text-[46px] font-[400] relative text-center w-full'>
                    <div className='font-[500]'>£ {estimatedPrice[carCount-1]}</div>
                    <div className='w-full flex justify-center -mt-3'>
                    <img src={underline.src} className='w-[180px]'/>
                    </div>
                </div>
                {isVendor && 
                    <div className='w-full flex justify-center mt-3 text-[12px] text-[#99F22B] underline underline-offset-2'><Link href='#'>I don’t want to proceed with this car</Link></div>}

                <div className='flex justify-center w-full'>
                            <div className='text-sm px-5 text-center pt-5 w-[90%]'>
                        Based on our live real-time <span className='text-primary'>Smart Data</span> for '{manufacturer[carCount-1]}' vehicles and daily live trade data. 
                    </div>
                </div>
        <div className='w-full px-24 flex justify-center pt-3'>
            
            <div className=''>
                <div className='w-full flex justify-center'>
                        <div className='w-[110%] -mt-1'>
                        <Slider
                        value={(estimatedPrice[carCount-1]/retailPrice[carCount-1])*100}
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
        <div className='w-full flex justify-center mt-2'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>{saleTag}</div></div>
                
                
                </div>
                
                <div>

                </div>
                </div>
                
            </div>
        </div>

        

        {(isVendor && saleTag=== "WholeSale") && <div className='flex w-full justify-center mb-7 space-x-3'>
                        <div onClick={handleCarCountMinus} className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[28px]'>
                            0{carCount}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-3'>
                            0{estimatedPrice.length}
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


        <div className={`w-full fixed flex justify-center bottom-0`}>
          <div className=' w-full'>
            <Link href='./IntroSlider/1' onClick={requestCameraPermission} className={`${isVendor && 'text-secondaryDark'} flex justify-center m-5 font-bold text-xl rounded-[6px] space-x-2 px-5 py-4 bg-tertiary `}>
                    <div>Enable camera</div>
                    <img src={splash.src}/>
            </Link> 
          </div>
        </div>


        {popup && 
        <div className={`flex justify-center items-center w-full h-full`}>

        <div className={`fixed top-5 w-[80vw] px-2 text-center ${isVendor ? 'bg-secondaryDark' : ' bg-white'} rounded-2xl text-lg border border-2 border-white`}>
        <div className='py-5'>
        Smart advice: Turn on sound for a smoother photo experience 📷
        </div>
        </div>
        
    </div>
        }
    </div>
  )
}

export default Submission2 



