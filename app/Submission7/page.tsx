"use client"
import React, { useEffect, useState } from 'react'
import demoPic from '@/assets/icons/DemoPic.png'
import underline from '@/assets/underline_green.png'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import chat from '@/assets/icons/char.png'
import Field from '../components/Field';
import Link from 'next/link';
import alert from '@/assets/icons/AlertClear.png'
import { useAppContext } from '../Context';
import { IoChevronBack } from 'react-icons/io5';
import LogoWhite from '@/assets/LogoWhite.png'
import CalculateState from '../Context/State';
import { db } from '../Local_DB/db';
import axios from 'axios';
import logo from '@/assets/Logo.png'

const Submission7 = () => {
    const [value, setValue] = useState(20); 
    const {isVendor} = useAppContext();
    const [carCount, setCarCount] = useState(1);
    const [vehiclePhotosState, setvehiclePhotosState] = useState<any>();
    const [serviceRecordsState, setserviceRecordsState] = useState<any>();
    const [vehicle_video,setvehicle_video] = useState<any>();

    const [estimatedPrice, setEstimatedPrice] = useState([]);
    const [retailPrice, setretailPrice] = useState([]);
        const [manufacturer, setmanufacturer] = useState([]);
        const [carId, setcarId] = useState([]);
    const [saleTag, setsaleTag] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImg,setProfileImg] = useState<any>();
    const [userId,setUserId] = useState('');
    const [progressState,setporgressState] = useState(0)


    function formatNumber(num: Number) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=>{ 
        localStorage.setItem('prevRoute','./Submission7');
        // localStorage.removeItem('car_no');
        const car_no = localStorage.getItem('car_no');
        // car_no === 0 ? localStorage.setItem('car_no','1') : car_no;
        const progresst = Number(localStorage.getItem('vehicle_photos_complete'))
        console.log(progresst);
        setporgressState(progresst);
        // if(Number(localStorage.getItem('car_count_id')) && isVendor){
            setCarCount(Number(localStorage.getItem('car_count_id')));

        // }else {

        //     setCarCount(1);
        // }
        console.log(localStorage.getItem('car_no'))

        // setCarCount(car_no === 0 ? 1 : car_no)
        const handleRequest = async () => { 
            

        
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            // console.log(url);
            const token = localStorage.getItem('token');
            try { 
                const response = await axios.get(`${url}/pwa/real_time_data`, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data =  response.data;
                // console.log(response.data)
                

                    localStorage.setItem('saletag',data.tag);
                    
                    setsaleTag(data.tag)
                    setEstimatedPrice(data.estimatedPrice);
                    setretailPrice(data.retailPrice);
                    setmanufacturer(data.manufacturer);
                    setcarId(data.carId);
                    localStorage.setItem('car_no',String(data.carId[carCount-1]))
                // }
                setUserName(data.userName);
                setProfileImg(data.profileImage);
                setUserId(data.userId);
                                   
                  

            
                  

            } catch (error) {
                //handle authentification
              console.error(error);
            }
          };

        handleRequest()
    },[])
    const handleCarCountMinus =() =>{
        // console.log(vehiclePhotosState)
        if(carCount > 1){
            localStorage.setItem('car_no',String(carId[carCount-1]))
            setCarCount(carCount-1);
            localStorage.setItem('car_count_id',String(carCount-1))
            window.location.reload()
        }
    }

    const handleCarCountAdd =() =>{
        if(carCount < estimatedPrice.length){
            localStorage.setItem('car_no',String(carId[carCount+1]))
            setCarCount(carCount+1);
            localStorage.setItem('car_count_id',String(carCount+1))
            window.location.reload()
        }
    }


    useEffect(()=>{
        const car_no = localStorage.getItem('car_count_id'); 
        console.log(car_no,'car_no')
        console.log(localStorage.getItem(`vehicle_photos_state_${car_no}`));
        setvehiclePhotosState(localStorage.getItem(`vehicle_photos_state_${car_no}`)==='true');
        setserviceRecordsState(localStorage.getItem(`service_records_state_${car_no}`)==='true');

        setvehicle_video(localStorage.getItem(`vehicle_video_state_${car_no}`)==='true')
    },[])

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} w-full min-h-[100vh] overflow-hidden`}>
        { isVendor &&
            (<div className='flex w-full justify-center space-x-2 pt-5'>
                <img src={isVendor && LogoWhite.src} className='h-14'/>
                
                <div className='bg-tertiary w-[46px] text-[14px] mt-4 flex justify-center items-center text-[#000000] h-[22px] rounded-full'>Hub</div>
                
            </div>) 
        }

        <div className='flex justify-center w-full'>
            <div className={`${!isVendor && 'bg-[#FFFFFF]' } w-[93vw] rounded-xl mt-3`}>

            {!isVendor && 
             <>
             <div className='flex w-full justify-center space-x-2 pt-5'>
             <img src={logo.src} className='h-14'/>
             </div>
             </>}

                <div className='w-full flex justify-center'>
                <div className='w-full flex justify-center py-3'>
                    

<div className={`${isVendor ? 'bg-[#242557] border-[#646488]': 'bg-[#ECF1FD] border-[#D3D4FD]' } border-2  border-dashed w-[86vw] rounded-xl my-3 pb-4`}>

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
    <div className='font-[500]'>£ {formatNumber(Number(estimatedPrice[carCount-1]))}</div>
    <div className='w-full flex justify-center -mt-3'>
    <img src={underline.src} className='w-[200px]'/>
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
        <div className='w-[100%]'>
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
<div className='w-full flex justify-center mt-3'><div className='bg-[#064E3B] text-white py-2 w-[110px] flex justify-center text-sm rounded-full'>{saleTag}</div></div>


</div>

<div>

</div>

</div>
                </div>
                {!isVendor &&
                <div className='text-[#675DF4]  w-full flex justify-center'>
                <Link href='#' className='space-x-3 mb-3 flex'>
                <img src={alert.src} className='w-5 h-5'/>
                <div>More info</div>
                </Link>

            </div>}
                {/* here is not flex  */}
            </div>
            
        </div>

        {(isVendor && saleTag=== "WholeSale") && <div className='flex w-full justify-center mb-7 space-x-3'>
                        <div onClick={handleCarCountMinus} className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[28px]'>
                            {carCount < 9 ? `0${carCount}` : carCount}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-3'>
                        {estimatedPrice.length < 9 ? `0${estimatedPrice.length}` : estimatedPrice.length}
                            
                        </div>
                        </div>

                        <div  onClick={handleCarCountAdd}  className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25} className='rotate-180'/>
                        </div>
                    </div>}
                    {isVendor && <div className='text-[#675DF4]  w-full flex justify-center'>
                    <Link href='#' className='space-x-3 mt-2 flex'>
                    <img src={alert.src} className='w-5 h-5'/>
                    <div>More info</div>
                    </Link>

                </div>}
        

        <div className='w-full flex justify-center my-10'>
                        <div className=' w-[90vw] rounded-xl space-y-2'>
                            {
                                isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={true} Content={'Trade declaration'} Progress={0} Next={true}/>
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                !isVendor && (
                                    <div>
                                        <Link href='#'>
                                    <Field isComplete={true} Content={'About you'} Progress={0} Next={true}/>
                                    </Link> 
                                        </div>
                                )
                            }

                            <div>
                            <Link href='#'>
                           <Field isComplete={true} Content={'About your vehicle'} Progress={0} Next={true}/>
                           </Link> 
                            </div>
                            <div>
                            <Link href='./vehicle_photos'>
                           <Field isComplete={vehiclePhotosState} Content={'Vehicle photos'} Progress={progressState} Next={true}/>
                           </Link> 
                            </div>
                            {
                                isVendor && (
                                    <div>
                                        <Link href={`${vehiclePhotosState ? './service_manuals_keys' : '#'}`}>
                                    <Field isComplete={serviceRecordsState} Content={'Service records, manuals & keys'} Progress={0} Next={vehiclePhotosState}/>
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                (isVendor && saleTag === 'WholeSale') &&
                                (
                                    <div>
                                        <Link href={`${serviceRecordsState ? './advice_vehicle_video' : '#'}`}>
                                    <Field isComplete={vehicle_video} Content={'Vehicle video'} Progress={0} Next={serviceRecordsState}/>
                                    </Link> 
                                        </div>
                                )
                            }
                            {
                                !isVendor && (
                                    <div>
                                        <Link href={`${vehiclePhotosState ? './service_manuals_keys' : '#'}`}>
                                    <Field isComplete={serviceRecordsState} Content={'Service records'} Progress={0} Next={vehiclePhotosState}/>
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