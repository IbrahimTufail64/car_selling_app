"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";

import preview_car from '@/assets/preview_car.png'
import logocarbrand from '@/assets/icons/volkswagenLogo.png'
import arrow from '@/assets/icons/expandArrow.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import PreviewCarComp from '../components/PreviewCarComp';
import PreviewCarComp4 from '../components/PreviewCarComp4';
import useEmblaCarousel from 'embla-carousel-react'
import PreviewPhotos from '../components/PreviewPhotos';
import PreviewCarCompDynamic from '../components/PreviewCarCompDynamic';
import SliderPreview from '../components/Slider';
import axios from 'axios';


const VehicleExterior = () => {

    const {isVendor} = useAppContext()

    // Search for images in the db: 

    const [aboutyou, setAboutyou] = useState(true);
    const [aboutyourvehicle, setAboutyourvehicle] = useState(true);
    const [vehiclephotos, setvehiclephotos] = useState(true);
    const [vehiclehealth, setvehiclehealth] = useState(true);
    const [technical, settechnical] = useState(true);
    const [furtherdetails, setfurtherdetails] = useState(true);
    const [car_no, setcar_no] = useState(0);
    const [preview_car,setpreview_car] = useState();
    const [previewPhotos,setPreviewPhotos] = useState(false);
    const [video_state,setvideo_state] = useState(true);

    const [about_info,setabout_info] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const [key,setKey] = useState('');
    const [elements,setElements] = useState<any[]>([])

    const [vehicle_video, setvehicle_video]  = useState<any>(null);

    const handleAdd = ()=>{
        if(index < about_info[21].length){
            const key = Object.keys(about_info[21][index+1])[0];
            const elements = about_info[21][index+1][key] ;
            setElements(elements);
            setKey(key);
            
            setIndex(index+1);

        }
    }
    const handleMinus = ()=>{
        if(index > 0){
            const key = Object.keys(about_info[21][index-1])[0];
            const elements = about_info[21][index-1][key] ;
            setElements(elements);
            setKey(key);
            
            setIndex(index-1);
        }
    }

    useEffect(()=>{
        setcar_no(Number(localStorage.getItem("car_no")))
        setvehicle_video(localStorage.getItem(`videoData_${Number(localStorage.getItem("car_no"))}`));
        
    },[])

    useEffect(()=>{ 
        
        setCarCount(Number(localStorage.getItem('car_no')))
        const handleRequest = async () => { 
            

        
            const url:any = process.env.NEXT_PUBLIC_API_URL ;
            console.log(url);
            const token = localStorage.getItem('token');
            try { 
                const response = await axios.get(`${url}/pwa/preview_car`, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data =  response.data;
                console.log(response.data);
                const paramsArray = Object.keys(data).map(key => data[key]);
                console.log('yay',paramsArray);
                setabout_info(paramsArray);
                localStorage.setItem('userId',paramsArray[20]);
                const key = Object.keys(paramsArray[21][index])[0];
                const elements = paramsArray[21][index][key] ;
                console.log(elements)
                setElements(elements);
                setKey(key);
                
                // if(data.isWholeSale === "Wholesale"){
                    // setsaleTag(data.tag)
                    // localStorage.setItem('saletag',data.tag);

            } catch (error) {
                //handle authentification
              console.error(error);
            }
          };

        handleRequest()
    },[])

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


    // for fetching video: 
    // useEffect(()=>{

    //     const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
    //         try{
    //             const image = await db.images.where('name').equals(image_to_retrieve).first();
    //             if(image?.data == undefined){
    //                 setter_function(undefined)
    //             }else{
    //                 const url = URL.createObjectURL(image?.data);
    //             setter_function(url);
    //             console.log(url)
    //             }
                
    //         }
    //         catch(e){
                
    //         }
    //     };
    //     retrieve('video',setvehicle_video);

    //     // window.location.reload();
        
    // },[])




  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full ${previewPhotos && 'h-[100vh] overflow-hidden'} relative`}>
        
        <div className='p-5 flex space-x-2 text-[22px]'>
            <Link  href='#'><IoChevronBack size={28} className='mt-[3px]'/></Link>
            <div>Be Carsmart ready!</div>
        </div>
        
        <div className='w-full flex justify-center'>
            <div className='w-[90vw]'>
                Please check and verify your profile to ensure a smooth sale!
            </div>
        
        </div>

        <div className='py-5'>
            <img src={preview_car} className='w-full object-cover max-h-[300px]'/>
        </div>

        {/* <div className="embla overflow-hidden mx-2 pb-10">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex space-x-5">
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          <img src={preview_car.src} className='w-[80px] h-[80px] object-cover rounded-lg'/>
          </div>
        </div>
        
      </div> */}
      {!previewPhotos && <SliderPreview setpreview_car = {setpreview_car} preview_car={preview_car}/>}
      

        <div className='w-full flex justify-center'>
            <div className={` ${isVendor ? 'bg-[#1F204F] ' : 'bg-white '} rounded-2xl w-[90vw] p-3 flex justify-center`}>
            <div className={`w-full ${isVendor ? 'bg-[#4C4D72] border-[#70718E]' : 'bg-secondary border-[#D3D4FD]'}  border border-2 border-dashed  rounded-xl py-3 space-y-3`}>
                <div className='flex justify-center w-full'>
                    <img src={elements[4]} className='w-20 h-20 object-cover rounded-full'/>
                </div>
                <div className='flex justify-center w-full mt-5'>
                    <div className={`w-[100px] h-6 bg-white border ${!isVendor ? 'border-black' : 'border-secondary'} flex relative`}>
                        <div className=' bg-[#3748EA] w-[15%] p-t-2'>
                        </div>
                        <div className='text-black font-[600] w-[85%] overflow-hidden absolute top-0 left-5'>
                            {about_info[20]}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center w-full font-[500] text-[24px]'>
                    {/* { about_info.length > 1 && Object.keys(about_info[21][index])[0]} */ key}
                </div>

                <div className='flex justify-center w-full'>
                                    <div className='flex justify-between w-[80%]'>
                                    <div className=''>{elements[0]}</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div className=''>{elements[1]}</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div className=''>{elements[2]}</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div > {elements[3]}</div>
                                    </div>
                </div>
            </div>
            </div>
        </div>

        {isVendor && <div className='flex w-full justify-center my-6 mb-2 space-x-3'>
                        <div onClick={handleMinus} className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25}/>
                        </div>

                        <div className='flex'>
                        <div className='text-[28px]'>
                            0{index+1}/
                        </div>
                        <div className='opacity-40 text-[20px] pl-2 pt-2'>
                            0{about_info[21]?.length}
                        </div>
                        </div>

                        <div  onClick={handleAdd}  className='w-12 h-12 bg-secondaryDark flex justify-center items-center rounded-full border border-[1px] border-[#424375]'>
                            <IoChevronBack size={25} className='rotate-180'/>
                        </div>
                    </div>}

        <div className='w-full flex justify-center mt-5'>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>About you</div>
                    <div onClick={()=>setAboutyou(!aboutyou)}>
                        <img src={arrow.src} className={`w-7 ${!aboutyou && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!aboutyou && 'hidden'}`}>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Owner</div>
                    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[0]}</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Address</div>
                    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[1]}</div>
                </div>
                <div className='px-2 py-3 flex justify-between  space-x-3'>
                    <div>Email</div>
                    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[2]}</div>
                </div>
                <div className='px-2 py-3 flex justify-between  space-x-3'>
                    <div>Phone Number</div>
                    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[3]}</div>
                </div>
                <div className='px-2 py-3 flex justify-between  space-x-3'>
                    <div>Collection notes</div>
                    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[4]}</div>
                </div>
                </div>
                
                </div>
            </div>
            
        </div>

        <div className='w-full flex justify-center mt-5'>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>About your vehicle</div>
                    <div onClick={()=>setAboutyourvehicle(!aboutyourvehicle)}>
                        <img src={arrow.src} className={`w-7 ${!aboutyourvehicle && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!aboutyourvehicle && 'hidden'}`}>
                <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Specifications</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[5]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Registration</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[6]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Make</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[7]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Model</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[8]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Year</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[9]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Mileage</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[10]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Color</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[11]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Body</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[12]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Fuel Status</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[13]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Keys on hand</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[14]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Tool pack status</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[15]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Locking nut status</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[16]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Seat type</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[17]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Finance status</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[18]}</div>
  </div>
  <div className='px-2 py-3 flex justify-between  space-x-3'>
    <div>Smoking status</div>
    <div className="truncate overflow-hidden whitespace-nowrap ">{about_info[19]}</div>
  </div>

                
                </div>
                
                </div>
            </div>
            
        </div>

        <div className='w-full flex justify-center mt-5'>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>Vehicle photos</div>
                    <div onClick={()=>setvehiclephotos(!vehiclephotos)}>
                        <img src={arrow.src} className={`w-7 ${!vehiclephotos && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!vehiclephotos && 'hidden'}`}>
                    

                    <PreviewCarComp/>
                    <PreviewCarComp4 title='Interior' Array={[`dashboard`,`boot`,`front_seat`,`back_seat`]}  car_no={car_no}/>
                    <PreviewCarComp4 title='Exterior' Array={['front_driver','front_passenger','back_driver','back_passenger']} car_no={car_no}/>
                    

                </div>
                
                </div>
            </div>
            
        </div>

        <div className='w-full flex justify-center mt-5'>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>Vehicle health</div>
                    <div onClick={()=>setvehiclehealth(!vehiclehealth)}>
                        <img src={arrow.src} className={`w-7 ${!vehiclehealth && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!vehiclehealth && 'hidden'}`}>
                    

                    <PreviewCarCompDynamic query='surface_marks' title='Surface marks'  />
                    <PreviewCarCompDynamic query='panel_damage' title='Panel damage' />
                    <PreviewCarComp4 title='Wheel condition' Array={['front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel']} car_no={car_no}/>
                    <PreviewCarComp4 title='Tyre health' Array={['front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre']} car_no={car_no}/>
                    {/* <PreviewCarCompDynamic query='wheel_condition' title='Wheel condition' /> */}
                    {/* <PreviewCarCompDynamic query='' title='Tyre health'/> */}
                    
                    <PreviewCarCompDynamic query='exterior_wear_tear' title='Exterior wear & tear'/>
                    <PreviewCarCompDynamic query='glass_health' title='Glass health' />
                    <PreviewCarCompDynamic query='damaged_absent_fixtures' title='Damaged/Absent fixtures' />
                    <PreviewCarCompDynamic query='dashboard_lights' title='Dashboard lights'/>
                    {/* <PreviewCarComp1 title='Warning lights' ToRetrieve=''/> */}

                    <div className='flex justify-between w-full mx-2 px-1 pt-3 pb-2'>
                    <div className=' font-[350] max-w-[80%]'>Technical health (electrical and mechanical)</div>
                    <div onClick={()=>settechnical(!technical)}>
                        <img src={arrow.src} className={`w-7 ${!technical && 'rotate-180'}`}/>
                    </div>
                    
                    </div>
                    <div className={`${!technical && 'hidden'} px-3 text-[15px] font-[300] py-2`}>
                        stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur 
                    </div>



                    <div className='flex justify-between w-full mx-2 px-1 pt-3 pb-2'>
                    <div className=' font-[350] max-w-[80%]'>Further details</div>
                    <div onClick={()=>setfurtherdetails(!furtherdetails)}>
                        <img src={arrow.src} className={`w-7 ${!furtherdetails && 'rotate-180'}`}/>
                    </div>
                    
                    </div>
                    <div className={`${!furtherdetails && 'hidden'} px-3 text-[15px] font-[300] py-2`}>
                        stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.stibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur 
                    </div>
                    
                </div>
                
                </div>
            </div>
            
        </div>

        <div className='w-full flex justify-center mt-5'>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>Service, Manuals and Keys</div>
                    <div onClick={()=>setvehiclephotos(!vehiclephotos)}>
                        <img src={arrow.src} className={`w-7 ${!vehiclephotos && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!vehiclephotos && 'hidden'}`}>
                    
                    {/* <PreviewCarComp4 title='Vehicle service history' Array={['service_records1','service_records2','service_records3','service_records4']}/> */}
                    <PreviewCarCompDynamic query='service_records' title='Vehicle service history'  />

                </div>
                
                </div>
            </div>
            
        </div>

        <div className={`w-full flex justify-center mt-5 pb-5 ${!isVendor && 'hidden'}`}>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>Vehicle video</div>
                    <div onClick={()=>setvideo_state(!video_state)}>
                        <img src={arrow.src} className={`w-7 ${!video_state && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!video_state && 'hidden'}`}>
                    
                <video src={vehicle_video} controls className=' object-cover w-full rounded-xl p-1 ml-2 mt-5'/>
                    

                </div>
                
                </div>
            </div>
            
        </div>

        <div className='p-5'>
                <div  onClick={()=>setPreviewPhotos(true)} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Looks good! Submit</div>
                        <img src={splash.src}/>
                    </div>
                </div>
        </div>

        <div className='p-5 pt-0'>
                <Link href='Submission7' className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Back</div>
                    </div>
                </Link>
        </div>
        
        {previewPhotos && <PreviewPhotos/>}
    </div>
  )
}

export default VehicleExterior



