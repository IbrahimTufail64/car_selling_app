"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import icon from '@/assets/icons/Iconbutton.png'
import serviceRecords from '@/assets/ExamplePlaceHolder.png' 
import splash from '@/assets/icons/Rays-small.png'
import { db} from '../Local_DB/db';
import { useAppContext } from '../Context';
import alert from '@/assets/icons/alert.png'
import car from '@/assets/Sub3Car.png'
import car1 from '@/assets/service_records_1.png'
import car2 from '@/assets/service_records_2.png'
import car3 from '@/assets/service_records_3.png'
import car4 from '@/assets/service_records_4.jpg'

const ServiceRecords = () => {
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);
    const [isWholeSale, setIsWholeSale] = useState(false);



    const {vehicle_exterior, setVehicle_Exterior,isVendor} = useAppContext();

    // Search for images in the db: 
    useEffect(()=>{
        localStorage.setItem('prevRoute','./service_manuals_keys');
        setIsWholeSale(localStorage.getItem('saletag')==='WholeSale');

        const retrieve = async (image_to_retrieve:string,setter_function :React.Dispatch<any>)=>{
            try{
                const image = await db.images.where('name').equals(image_to_retrieve).first();
                
                setter_function(image?.data);
            }
            catch(e){
                
            }
        };
        retrieve('front_driver',setfrontDimg);
        retrieve('front_passenger',setfrontPimg);
        retrieve('back_driver',setbackDimg);
        retrieve('back_passenger',setbackPimg);

        // window.location.reload();
        
    },[])


    // useEffect(()=>{

    //     const setContext = async(state:boolean)=>{
    //         await db2.context.put({
    //             name: 'vehicle_exterior',
    //             state: state 
    //           });
    //     }
    //     if(frontDimg && frontPimg && backDimg && backPimg){
    //         setVehicle_Exterior(true);
    //         setContext(true);

    //     }
    //     else{
    //         setVehicle_Exterior(false);
    //         setContext(false);
    //     }

    // },[frontDimg,frontPimg,backDimg,backPimg])

  return (
    <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} w-full pb-[170px] `}>
        <div className='p-5 flex space-x-2 text-[26px]'>
            <Link  href='./Submission7'><IoChevronBack size={28} className='mt-[5px]'/></Link>
            <div>Service records</div>
        </div>
        
        <div className={`w-full flex justify-center ${isVendor && 'text-primaryDark'} mb-5`}>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-7 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5'>
                    <div className='font-[300] text-sm'>Where can I find my service history?</div>
                    <Link  href='#'  className='font-[400] text-sm mt-5'>Stay informed!</Link>
                </div>
                <img src={car.src} className='object-contain w-[35vw] landscape:w-[20vw]'/>
            </div>
        </div>

        <div className={`flex justify-center ${!isVendor && 'hidden'}`}>
        <div className={`w-[90vw] ${!isVendor ? 'bg-[#FBFBFF] border-[#D3D4FD]' :'bg-[#3D3D6A] border-[#646488]'} border-2 border  border-dashed rounded-lg p-5 mt-7 m-5 space-y-4`}>
            <div className='w-full flex justify-center'>
              <img src={alert.src}/>
            </div>
            <div className='w-full flex justify-center text-center font-[400] text-[12px]'>
                A detailed service record increases the likelihood of selling your car by 10%
            </div>
        </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5`}>
                <div className='w-full text-[26px]'>
                Wondering if your first service is due?
                </div>
                <div className='flex justify-center w-full my-3'>
                    <div className='w-full bg-[#D3D4FD] h-[2px]'></div>
                </div>
                <div className='font-[300] text-[16px]'>
                For a new car, the initial service typically occurs after 12 months or at a set mileage (often 5,000-20,000 miles), whichever comes first. Check your vehicle handbook for exact timings to stay on top of maintenance.                           </div>
            </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5`}>
                <div className='w-full text-[26px]'>
                How can I access my service history? 
                </div>
                <div className='flex justify-center w-full my-3'>
                    <div className='w-full bg-[#D3D4FD] h-[2px]'></div>
                </div>
                <div className='space-y-5'>
                            <div className='flex space-x-5 pt-[10px]'>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Service book</div>
                                    <div className='font-[300]'>
                                    Usually kept in the glove compartment, your service booklet holds your service history.

                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Vehicle manufacturer's website</div>
                                    <div className='font-[300]'>
                                    For newer vehicles, you can often access your service records online through your car manufacturer’s website
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Car's computer system</div>
                                    <div className='font-[300]'>
                                    In many modern cars, the service history is stored in the main computer system.
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Customer support</div>
                                    <div className='font-[300]'>
                                    Contact your local dealership or the manufacturer’s customer service team. They can provide you with a printed or emailed copy of your service history.
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5`}>
                <div className='w-full text-[26px]'>
                What is a Service History?
                </div>
                <div className='flex justify-center w-full my-3'>
                    <div className='w-full bg-[#D3D4FD] h-[2px]'></div>
                </div>
                <div className='font-[300] text-[16px]'>
                A service history is a detailed log of all work done on your car. It shows how well your vehicle has been cared for, giving dealers a clear picture of its condition. A full history can mean more money for you when selling with us.                </div>
            </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5`}>
                <div className='w-full text-[26px]'>
                How complete is your car’s service history? Full service records can boost your sale price! 
                </div>
                <div className='flex justify-center w-full my-3'>
                    <div className='w-full bg-[#D3D4FD] h-[2px]'></div>
                </div>
                <div className='space-y-5'>
                            <div className='flex space-x-5 pt-[10px]'>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Full service history:</div>
                                    <div className='font-[300]'>
                                    Every required service completed. You can provide photos of full records.

                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>Limited or incomplete service history:</div>
                                    <div className='font-[300]'>
                                    Some services done and records available, but not all required ones. Upload what you have to maximise value!
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>First service not due:</div>
                                    <div className='font-[300]'>
                                    Your car hasn't reached its first scheduled service yet.
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div  className={`font-[600] text-[20px] ${isVendor ? ' text-white' : 'text-[#101044]'} `}>No service history:</div>
                                    <div className='font-[300]'>
                                    No service records available.
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            </div>
        </div>

        <div className='space-y-3'>
            <div className='text-[22px] w-full pl-5 mt-10'>Examples</div>
            <div className='w-full flex justify-center'>
                <div className={`text-[22px] p-3 w-[90%] rounded-xl ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} space-y-3`}>
                    <img src={car1.src} className='rounded-lg w-full object-cover'/>
                    <div className='px-3'>Digital service history</div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
            <div className={`text-[22px] p-3 w-[90%] rounded-xl ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} space-y-3`}>
            <img src={car2.src} className='rounded-lg w-full object-cover'/>
                    <div className='px-3'>V5 vehicle registration</div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
            <div className={`text-[22px] p-3 w-[90%] rounded-xl ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} space-y-3`}>
            <img src={car3.src} className='rounded-lg w-full object-cover'/>
                    <div className='px-3'>Service books & documents</div>
                </div>
            </div>

            <div className={`w-full flex justify-center ${!isVendor && 'hidden'}`}>
            <div className={`text-[22px] p-3 w-[90%] rounded-xl ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} space-y-3`}>
            <img src={car4.src} className='rounded-lg w-full object-cover'/>
                    <div className='px-3'>Keys</div>
                </div>
            </div>
        </div>

        <div className={`flex justify-center ${isVendor && 'hidden'}`}>
        <div className={`w-[90vw] ${!isVendor ? 'bg-[#FBFBFF] border-[#D3D4FD]' :'bg-[#3D3D6A] border-[#646488]'} border-2 border  border-dashed rounded-lg p-5 mt-7 m-5 space-y-4`}>
            <div className='w-full flex justify-center'>
              <img src={alert.src}/>
            </div>
            <div className='w-full flex justify-center text-center font-[400] text-[12px]'>
                A detailed service record increases the likelihood of selling your car by 10%
            </div>
        </div>
        </div>

        <div className='w-full flex justify-center'>
            <div className={`w-[90vw]  ${isVendor ? ' bg-[#1F204F]' : 'bg-white'} text-[18px] rounded-xl p-5 mt-5`}>
            Cars with a full service history typically have a higher resale value compared to those with incomplete or no service history.            </div>
        </div>
        

        {/* <div className='p-5'>
                <Link href={'./service_records_option'} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Continue</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className='p-5 pt-0'>
                <Link href={isVendor && isWholeSale ? './Submission7':'./preview_car'} onClick={()=>{localStorage.setItem(`service_records_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>No service record</div>
                    </div>
                </Link>
        </div> */}


            <div className={`w-full fixed flex justify-center bottom-0 ${isVendor ? 'bg-primaryDark' : 'bg-secondary'}`}>
        <div className='p-5 pt-0 w-full'>
        <div className='pt-3'>
                <Link href={'./service_records_option'} className={`flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 bg-tertiary ${isVendor && 'text-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div  className="whitespace-nowrap  text-ellipsis">Continue</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className=' pt-3'>
                <Link href={isVendor && isWholeSale ? './Submission7':'./preview_car'} onClick={()=>{localStorage.setItem(`service_records_state_${car}`,'true');}} className={`flex w-full justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-4 text-[22px] border border-2 ${isVendor ? ' text-white  border-white' : 'text-primaryDark border-primaryDark'}`}>
                    <div className='flex space-x-1 text-xl'>
                        <div>No service record</div>
                    </div>
                </Link>
        </div>
        
        </div>
    </div>
        

    </div>
  )
}

export default ServiceRecords