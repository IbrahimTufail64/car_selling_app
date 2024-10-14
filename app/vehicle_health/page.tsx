"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import splash from '@/assets/icons/Rays-small.png'
import front from '@/assets/Front_Damage-modified-modified.png'
import back from '@/assets/Back_Damage-modified-modified.png'
import roof from '@/assets/Roof_Damage-modified-modified.png'
import driverSide from '@/assets/Driver_Damage-modified-modified.png'
import PassengerSide from '@/assets/Passenger_Damage-modified-modified.png'

const VehicleHealth = () => {

    const [currentSide, setCurrentSide] = useState('Driver Side');
    const [damage, setDamage] = useState([
                                    [0,0],[0,0],[0,0],[0,0],[0,0] ])

                                  

    const [coordinates, setCoordinates] = useState([0,0]);


    const sides:any = {
                        'Driver Side' : driverSide,
                        'Passenger side': PassengerSide,
                        'Front side': front,
                        'Back side': back,
                        'Roof side':roof,
    }

    const sidesArray = [
        'Driver Side',
        'Passenger side',
        'Front side',
        'Back side',
        'Roof side'
    ]

    // useEffect(()=>{
    //     console.log(damage);
    // },[...damage])

    const handle_damage_marks = (e: any)=>{
        let coordinates =  [e.screenX,e.screenY];
        setCoordinates(coordinates);
        sidesArray.map((e,i)=>{
            if(e === currentSide){
                let temp_damage = damage;
                temp_damage[i] = coordinates;
                setDamage(temp_damage); 
                console.log(temp_damage)
            }
        })
    }

    const top = `${Math.abs(coordinates[1]-236)}px`
    const left = `${Math.abs(coordinates[0]-288)}px`

  return (
    <div onClick={e => {handle_damage_marks(e)}}>
         <div className='bg-secondary w-full h-[120vh] overflow-hidden relative' >
         
         <img src={sides[currentSide].src} className='w-[649px] h-[464px] absolute top-0 left-[200px]' />

         <div className={`w-5 h-5 bg-fourth absolute `}
         style={{top: top, left: left}}></div>

        <div className='p-5 py-3 flex space-x-2 text-[18px] justify-between'>
            <div className='flex space-x-2 pt-2'>
            <Link  href='./vehicle_photos'><IoChevronBack size={22} className='mt-[1px]'/></Link>
            <div>Back to main</div>
            </div>

            <div>
                <button className="w-[170px] flex justify-center  font-[600] text-lg rounded-[6px] space-x-2 w-[20vw] px-5 py-3 bg-tertiary " >
                <div className='flex space-x-2'>
                Confirm 
                <img src={splash.src}/>
                </div>
                </button>
            </div>
        </div>

        <div className='flex'>
            <div className='space-y-2 px-3 mt-3'> 
            <div className='bg-white p-4 px-5 rounded-md border border-1 text-[18px] flex relative space-x-4 border border-1 border-[#D3D4FD]'>
                <input type="radio" id="Small" name="colors" value="Small" className='absolute left-[-40px] top-[25px]' />
                <label htmlFor="Small" className='space-y-[-3px] pl-5'>
                    <div >Small</div>
                    <div className='text-slate-500 text-[13px]'>6-15cm</div>
                </label>
                </div>

                <div className='bg-white p-4 px-5 rounded-md border border-1 text-[18px] flex relative space-x-4 border border-1 border-[#D3D4FD]'>
                <input type="radio" id="Medium" name="colors" value="Medium" className='absolute left-[-40px] top-[25px]' />
                <label htmlFor="Medium" className='space-y-[-3px] pl-5'>
                    <div >Medium</div>
                    <div className='text-slate-500 text-[13px]'>6-15cm</div>
                </label>
                </div>

                <div className='bg-white p-4 px-5 rounded-md border border-1 text-[18px] flex relative space-x-4 border border-1 border-[#D3D4FD]'>
                <input type="radio" id="Large" name="colors" value="Large" className='absolute left-[-40px] top-[25px]' />
                <label htmlFor="Large" className='space-y-[-3px] pl-5'>
                    <div >Large</div>
                    <div className='text-slate-500 text-[13px]'>6-15cm</div>
                </label>
                </div>
                
                
            </div>
            <div className='mt-[-80px] w-[649px] h-[464px]' >
                {/* <img src={sides[currentSide].src} className='w-[649px] h-[464px] '/> */}
            </div>
        </div>

        <div className='relative'>
        <div className='flex justify-center w-full mt-[-70px] absolute'>
            <div className='flex'>
                {
                    sidesArray.map((e,i)=>{
                        return <div className={`border border-1 border-[#D3D4FD] px-7 p-4 ${i === 0 && 'rounded-l-full'} ${i === 4 && 'rounded-r-full'} ${e === currentSide ? 'bg-fourth text-white' : 'bg-white'}`}
                                onClick={()=>{setCurrentSide(e)}} >{e}</div>
                    })
                }
            </div>

        </div>
        </div>

        </div>
    </div>
  )
}

export default VehicleHealth