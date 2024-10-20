"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import car from '@/assets/Sub3Car.png'
import PhotoFrame from '../components/PhotoFrame';
import serviceRecords from '@/assets/ServiceRecords.png'
import splash from '@/assets/icons/Rays-small.png'
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';
import alertblue from '@/assets/icons/alertBlue.png'

const ServiceRecordsCapture = () => {
    const [serviceRecords1, setserviceRecords1]  = useState<any>(null);
    const [serviceRecords2, setserviceRecords2]  = useState<any>(null);
    const [serviceRecords3, setserviceRecords3]  = useState<any>(null);
    const [serviceRecords4, setserviceRecords4]  = useState<any>(null);

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
        retrieve('service_records1',setserviceRecords1);
        retrieve('service_records2',setserviceRecords2);
        retrieve('service_records3',setserviceRecords3);
        retrieve('service_records4',setserviceRecords4);

        // window.location.reload();
        
    },[])


    // useEffect(()=>{

    //     const setContext = async(state:boolean)=>{
    //         await db2.context.put({
    //             name: 'vehicle_exterior',
    //             state: state 
    //           });
    //     }
    //     if(serviceRecords1 && serviceRecords2 && serviceRecords3 && serviceRecords4){
    //         setVehicle_Exterior(true);
    //         setContext(true);

    //     }
    //     else{
    //         setVehicle_Exterior(false);
    //         setContext(false);
    //     }

    // },[serviceRecords1,serviceRecords2,serviceRecords3,serviceRecords4])

  return (
    <div className='bg-secondary w-full '>
        <div className='p-5 pt-10 flex space-x-2 text-[26px]'>
            <Link  href='./vehicle_photos'><IoChevronBack size={28} className='mt-[5px]'/></Link>
            <div>Service records</div>
        </div>
        <div className='px-5 py-2 text-[20px]'>
            Add photos of your service history
        </div>
        <div className='w-full flex justify-center'>
            <div className='w-[90vw] bg-[#D1D9FF] overflow-hidden mt-2 pl-3 pt-3 flex justify-between rounded-lg'>
                <div className='space-y-5 text-[16px]'>
                    <div className='font-[300] '>Get your photo right with our expert help.</div>
                    <Link href='./smart_advice/vehicle_exterior' className='font-[400] mt-5'>smart advice &gt;</Link>
                </div>
                <img src={car.src}/>
            </div>
        </div>

        <div className='flex justify-center w-full'>
            <div className='border-[1px] border-[#D3D4FD] mt-7 w-[90%] rounded-lg p-3 font-[300] flex justify-between space-x-10 px-7'>
                <div>
                A detailed service record increases the likelihood of selling your car by 10%
                </div>
                <div>
                    <img src={alertblue.src} className='w-20'/>
                </div>
            </div>
        </div>
        

        <div className='space-y-3 pt-7'>
            <PhotoFrame Content='Title here' isUploaded={serviceRecords1 !== undefined} photo={ serviceRecords1 ? serviceRecords1 : serviceRecords}  link ='service_records1'/>
            <PhotoFrame Content='Title here' isUploaded={serviceRecords2 !== undefined} photo={serviceRecords2 ? serviceRecords2 : serviceRecords} link ='service_records2'/>
            <PhotoFrame Content='Title here' isUploaded={serviceRecords3 !== undefined} photo={serviceRecords3 ? serviceRecords3 :  serviceRecords} link ='service_records3'/>
            <PhotoFrame Content='Title here' isUploaded={serviceRecords4 !== undefined} photo={serviceRecords4 ? serviceRecords4 : serviceRecords} link ='service_records4'/>
        </div>
        

        <div className='p-5'>
                <Link href='./Submission2' className=' flex justify-center font-bold text-lg rounded-[6px] space-x-2 px-5 py-3 bg-tertiary '>
                    <div className='flex space-x-1 text-xl'>
                        <div>Done</div>
                        <img src={splash.src}/>
                    </div>
                </Link>
        </div>
        

    </div>
  )
}

export default ServiceRecordsCapture