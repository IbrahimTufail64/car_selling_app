"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';

import preview_car from '@/assets/preview_car.png'
import logocarbrand from '@/assets/icons/volkswagenLogo.png'
import arrow from '@/assets/icons/expandArrow.png'

import BackDriverC from '@/assets/back_driver.png'
import BackPassenC  from '@/assets/back_passen.png'
import FrontDriverC  from '@/assets/front_driver.png'
import FrontPassenC from '@/assets/front_passen.png'

import BackDriverV from '@/assets/backDriverVendor.png'
import BackPassenV  from '@/assets/backPassengerVendor.png'
import FrontDriverV  from '@/assets/frontDriverVendor.png'
import FrontPassenV from '@/assets/frontPassengerVendor.png'

import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import PreviewCarComp from '../components/PreviewCarComp';
import PreviewCarComp4 from '../components/PreviewCarComp4';
import PreviewCarComp1 from '../components/PreviewCarComp1';


const VehicleExterior = () => {

    const {isVendor} = useAppContext()

    // Search for images in the db: 

    const [aboutyou, setAboutyou] = useState(true);
    const [aboutyourvehicle, setAboutyourvehicle] = useState(true);
    const [vehiclephotos, setvehiclephotos] = useState(true);
    const [vehiclehealth, setvehiclehealth] = useState(true);
    const [technical, settechnical] = useState(true);
    const [furtherdetails, setfurtherdetails] = useState(true);

    const [vehicle_video, setvehicle_video]  = useState<any>(null);


    // for fetching video: 
    useEffect(()=>{

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                if(image?.data == undefined){
                    setter_function(undefined)
                }else{
                    const url = URL.createObjectURL(image?.data);
                setter_function(url);
                console.log(url)
                }
                
            }
            catch(e){
                
            }
        };
        retrieve('video',setvehicle_video);

        // window.location.reload();
        
    },[])




  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full `}>
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
            <img src={preview_car.src} className='w-full object-cover max-h-[300px]'/>
        </div>

        <div className='w-full flex justify-center'>
            <div className={` ${isVendor ? 'bg-[#1F204F] ' : 'bg-white '} rounded-2xl w-[90vw] p-3 flex justify-center`}>
            <div className={`w-full ${isVendor ? 'bg-[#4C4D72] border-[#70718E]' : 'bg-secondary border-[#D3D4FD]'}  border border-2 border-dashed  rounded-xl py-3 space-y-3`}>
                <div className='flex justify-center w-full'>
                    <img src={logocarbrand.src} className='max-w-20'/>
                </div>
                <div className='flex justify-center w-full '>
                    <div className='w-[100px] h-6 bg-white border border-secondary flex relative'>
                        <div className=' bg-[#3748EA] w-[15%] border border-t-2 border-white'>
                        </div>
                        <div className='text-black font-[600] w-[85%] absolute top-0 left-5'>
                            HW23BU
                        </div>
                    </div>
                </div>

                <div className='flex justify-center w-full font-[500] text-[24px]'>
                Volkswagen Golf S
                </div>

                <div className='flex justify-center w-full'>
                                    <div className='flex justify-between w-[80%]'>
                                    <div className=''>2009</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div className=''>Blue</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div className=''>Hatchback</div>
                                    <div className='h-[20px] w-[1px] mt-[1px] bg-secondary'></div>
                                    <div > Petrol</div>
                                    </div>
                </div>
            </div>
            </div>
        </div>

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
                    <div>-</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Address</div>
                    <div>-</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Email</div>
                    <div>No</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Phone Number</div>
                    <div>No</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Collection notes</div>
                    <div>Yes</div>
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
                <div className='px-2 py-3 flex justify-between'>
                    <div>Specifications</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Registration</div>
                    <div>Panoramic roof</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Make</div>
                    <div>Faux lather</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Model</div>
                    <div>No</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Year</div>
                    <div>No</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Mileage</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Color</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Body</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Fuel Status</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Keys on hand</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Tool pack status</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Locking nut status</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Seat type</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Finance status</div>
                    <div>Yes</div>
                </div>
                <div className='px-2 py-3 flex justify-between'>
                    <div>Smoking status</div>
                    <div>Yes</div>
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
                    <PreviewCarComp4 title='Interior' Array={['dashboard','boot','front_seat','back_seat']}/>
                    <PreviewCarComp4 title='Exterior' Array={['front_driver','front_passenger','back_driver','back_passenger']}/>
                    

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
                    

                    <PreviewCarComp4 title='Surface marks'  Array={['surface_marks1','surface_marks2','surface_marks3','surface_marks4']}/>
                    <PreviewCarComp4 title='Panel damage' Array={['panel_damage1','panel_damage2','panel_damage3','panel_damage4']}/>
                    <PreviewCarComp4 title='Wheel condition' Array={['front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel']}/>
                    <PreviewCarComp4 title='Tyre health' Array={['front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre']}/>
                    <PreviewCarComp4 title='Dashboard lights' Array={['dashboard_lights1','dashboard_lights2','dashboard_lights3','dashboard_lights4']}/>
                    <PreviewCarComp4 title='Exterior wear & tear' Array={['exterior_wear_tear1','exterior_wear_tear2','exterior_wear_tear3','exterior_wear_tear4']}/>
                    <PreviewCarComp4 title='Glass health' Array={['glass_health1','glass_health2','glass_health3','glass_health4']}/>
                    <PreviewCarComp4 title='Damaged/Absent fixtures' Array={['damaged_absent_fixtures1','damaged_absent_fixtures2','damaged_absent_fixtures3','damaged_absent_fixtures4']}/>
                    <PreviewCarComp1 title='Warning lights' ToRetrieve=''/>

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
                    
                    <PreviewCarComp4 title='Vehicle service history' Array={['service_records1','service_records2','service_records3','service_records4']}/>
                    

                </div>
                
                </div>
            </div>
            
        </div>

        <div className={`w-full flex justify-center mt-5 pb-5 ${!isVendor && 'hidden'}`}>
            <div className={` border ${isVendor ? 'bg-[#1F204F]  border-[#4C4D72]' : 'bg-white border-[#D3D4FD] '} rounded-2xl w-[90vw] pr-2 py-3 mt-5  flex justify-center`}>
                <div className='w-[90%]'>
                <div className='flex justify-between w-full mx-2 px-1 border border-b border-[#D3D4FD] border-0 pb-2'>
                    <div className='pt-[4px] text-lg font-[500]'>Vehicle video</div>
                    <div onClick={()=>setvehiclephotos(!vehiclephotos)}>
                        <img src={arrow.src} className={`w-7 ${!vehiclephotos && 'rotate-180'}`}/>
                    </div>
                    
                </div>
                
                <div className={`${!vehiclephotos && 'hidden'}`}>
                    
                <video src={vehicle_video} controls className=' object-cover w-full rounded-xl p-1 ml-2 mt-5'/>
                    

                </div>
                
                </div>
            </div>
            
        </div>

        <div className='p-5'>
                <Link href='./service_records' className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Looks good! Submit</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className='p-5 pt-0'>
                <button  className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>Edit</div>
                    </div>
                </button>
        </div>
        

    </div>
  )
}

export default VehicleExterior



