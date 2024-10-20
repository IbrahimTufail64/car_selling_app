"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import icon from '@/assets/icons/Iconbutton.png'
import serviceRecords from '@/assets/ServiceRecords.png'
import splash from '@/assets/icons/Rays-small.png'
import { db} from '../Local_DB/db';
import { useAppContext } from '../Context';
import alert from '@/assets/icons/alert.png'

const ServiceRecords = () => {
    const [frontDimg, setfrontDimg]  = useState<any>(null);
    const [frontPimg, setfrontPimg]  = useState<any>(null);
    const [backDimg, setbackDimg]  = useState<any>(null);
    const [backPimg, setbackPimg]  = useState<any>(null);

    const {vehicle_exterior, setVehicle_Exterior} = useAppContext();

    // Search for images in the db: 
    useEffect(()=>{

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
    <div className='bg-secondary w-full '>
        <div className='p-5 flex space-x-2 text-[26px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[5px]'/></Link>
            <div>Service records</div>
        </div>
        <div className='w-full flex justify-center'>
            <div className='p-5 px-10 text-[19px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
            </div>
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-[90vw] bg-[#F7F8FF] text-[18px] rounded-xl p-5 border-dashed border-2 border-[#D3D4FD] '>
                <div className='w-full justify-center flex py-4'>
                    <img src={alert.src}/>
                </div>
                <div className='w-full flex justify-center text-center px-5 '>
                A detailed service record increases the likelihood of selling your car by 10%
                </div>
            </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className='w-[90vw] bg-white text-[18px] rounded-xl p-5 '>
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
                                    <div className='font-[600] text-[20px] text-[#101044]'>Service book</div>
                                    <div className='font-[300]'>
                                    Usually kept in the glove compartment, your service booklet holds your service history.

                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Vehicle manufacturer's website</div>
                                    <div className='font-[300]'>
                                    For newer vehicles, you can often access your service records online through your car manufacturer’s website
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Car's computer system</div>
                                    <div className='font-[300]'>
                                    In many modern cars, the service history is stored in the main computer system.
                                    </div>
                                </div>
                            </div>
                            <div className='flex space-x-5 '>
                                <img src={icon.src} className='w-7 h-7 mt-1'/>
                                <div>
                                    <div className='font-[600] text-[20px] text-[#101044]'>Customer support</div>
                                    <div className='font-[300]'>
                                    Contact your local dealership or the manufacturer’s customer service team. They can provide you with a printed or emailed copy of your service history.
                                    </div>
                                </div>
                            </div>
                            
                        </div>
            </div>
        </div>

        <div className='w-full flex justify-center my-5'>
            <div className='w-[90vw] bg-white text-[18px] rounded-xl py-5 px-5 '>
                <div className='w-full text-[26px]'>
                What is a Service History?
                </div>
                <div className='flex justify-center w-full my-3'>
                    <div className='w-full bg-[#D3D4FD] h-[2px]'></div>
                </div>
                <div className='font-[300] text-[16px]'>
                A service history is a comprehensive log of all maintenance performed on your car throughout its life. This complete record helps dealers assess how well your vehicle has been maintained and its current condition. Cars with a full service history typically have a higher resale value compared to those with incomplete or no service history.
                </div>
            </div>
        </div>

        <div className='space-y-3'>
            <div className='text-[22px] w-full pl-5 mt-10'>Examples</div>
            <div className='w-full flex justify-center'>
                <div className='text-[22px] p-3 bg-white w-[90%] rounded-xl'>
                    <img src={serviceRecords.src}/>
                    <div className='px-3'>Above image title</div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className='text-[22px] p-3 bg-white w-[90%] rounded-xl'>
                    <img src={serviceRecords.src}/>
                    <div className='px-3'>Above image title</div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className='text-[22px] p-3 bg-white w-[90%] rounded-xl'>
                    <img src={serviceRecords.src}/>
                    <div className='px-3'>Above image title</div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className='text-[22px] p-3 bg-white w-[90%] rounded-xl'>
                    <img src={serviceRecords.src}/>
                    <div className='px-3'>Above image title</div>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-center'>
            <div className='bg-white w-[90%] p-5 text-[18px] rounded-xl mt-10'>
                Been maintained and its current condition. Cars with a full service history typically have a higher resale value compared to those with incomplete or no service history.
            </div>
        </div>
        

        <div className='p-5'>
                <Link href='./Submission2' className=' flex justify-center font-[600] text-lg rounded-[6px] space-x-2 px-5 py-5 text-[24px] bg-tertiary '>
                    <div className='flex space-x-1'>
                        <div>Continue</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>

        <div className='px-5 pb-5'>
                <Link href='./Submission2' className='border border-2 border-[#101044] flex justify-center font-[600] text-lg rounded-[6px] space-x-2 px-5 py-5 text-[24px] text-[#101044] '>
                    <div className='flex space-x-1'>
                        <div>No service record</div>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default ServiceRecords