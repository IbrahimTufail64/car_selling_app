"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import splash from '@/assets/icons/Rays-small.png'

import frontC from '@/assets/Front_Damage-modified-modified.png'
import backC from '@/assets/Back_Damage-modified-modified.png'
import roofC from '@/assets/Roof_Damage-modified-modified.png'
import driverSideC from '@/assets/Driver_Damage-modified-modified.png'
import PassengerSideC from '@/assets/Passenger_Damage-modified-modified.png'

import frontV from '@/assets/Front_Damage-modified-modified-modified.png'
import backV from '@/assets/Back_Damage-modified-modified-modified.png'
import roofV from '@/assets/Roof_Damage-modified-modified-modified.png'
import driverSideV from '@/assets/Driver_Damage-modified-modified-modified.png'
import PassengerSideV from '@/assets/Passenger_Damage-modified-modified-modified.png'

import mark from '@/assets/Damage_mark.png'
import { useAppContext } from '../Context'
import Radio from '@mui/material/Radio';

const VehicleHealth = () => {

    const [currentSide, setCurrentSide] = useState('Driver Side');
    const [size, setSize] = useState('Small');
    const {isVendor} = useAppContext();
    const [coordinates_initial, setCoordinates_initial] = useState({ x: -100, y: -100 });

    const front = isVendor ? frontV : frontC;
    const back = isVendor ? backV : backC;
    const roof = isVendor ? roofV : roofC;
    const driverSide = isVendor ? driverSideV : driverSideC;
    const PassengerSide = isVendor ? PassengerSideV : PassengerSideC;

    const [damage, setDamage] = useState({
                                    'Driver Side' : {
                                        'size': 'Small',
                                        'coordinates': { x: -100, y: -100 }
                                    },
                                    'Passenger side': {
                                        'size': 'Small',
                                        'coordinates': { x: -100, y: -100 }
                                    },
                                    'Front side': {
                                        'size': 'Small',
                                        'coordinates': { x: -100, y: -100 }
                                    },
                                    'Back side': {
                                        'size': 'Small',
                                        'coordinates': { x: -100, y: -100 }
                                    },
                                    'Roof side':{
                                        'size': 'Small',
                                        'coordinates': { x: -100, y: -100 }
                                    },
                                })

                                  

                                    const canvasRef = useRef(null);
                                    const [coordinates, setCoordinates] = useState({ x: -100, y: -100 });
                                  
                                    const handleClick = (event:any) => {
                                      const canvas: any = canvasRef.current;
                                      if (!canvas) return;
                                  
                                      // Get canvas position relative to the viewport
                                      const canvasRect = canvas.getBoundingClientRect();
                                      const relativeX = canvasRect.left;
                                      const relativeY = canvasRect.top;
                                  
                                      // Calculate mouse position relative to canvas
                                      const clientX = event.clientX;
                                      const clientY = event.clientY;
                                      const x = Math.abs(clientX - relativeX);
                                      const y = Math.abs(clientY - relativeY);
                                  
                                      setCoordinates({ x, y });
                                      let temp_damage:any = damage;
                                    temp_damage[currentSide].coordinates = {x,y};
                                    setDamage(temp_damage);
                                        
                                  
                                      console.log(`Clicked at: X - ${x}, Y - ${y}`);
                                    };
                                  
                                    useEffect(() => {
                                      const canvas: any = canvasRef.current;
                                      if (canvas) {
                                        canvas.addEventListener('click', handleClick); // Use 'click' event
                                  
                                        return () => canvas.removeEventListener('click', handleClick);
                                      }
                                    }, [canvasRef]); // Dependency on canvasRef


    const sides:any = {
                        'Driver Side' : driverSide,
                        'Passenger side': PassengerSide,
                        'Front side': front,
                        'Back side': back,
                        'Roof side':roof,
    }

    const sizes:any ={
        'Small' : 40,
        'Medium' : 50,
        'Large': 70
    }

    const sidesArray = [
        'Driver Side',
        'Passenger side',
        'Front side',
        'Back side',
        'Roof side'
    ]

    useEffect(()=>{
        if(currentSide === 'Driver Side'){
            const {x,y} = coordinates;
            setCoordinates_initial({x,y});
        }else{
            let temp_damage:any = damage;
            temp_damage['Driver Side'].coordinates = coordinates_initial;
            setDamage(temp_damage);
        }
    },[coordinates])

    const handleSize = (e:any) =>{
        setSize(e.target.value);
        let temp_damage:any = damage;
        temp_damage[currentSide].size = e.target.value;
        temp_damage[currentSide].coordinates = coordinates;
        setDamage(temp_damage);
        console.log(temp_damage)
    }

    const handleSideChange = (e:any)=>{

        let temp_damage:any = damage;
        const x = temp_damage[e].coordinates.x;
        const y = temp_damage[e].coordinates.y;
        console.log(e,x,y,temp_damage[e].size);
        setCoordinates({x,y});
        
        setSize(temp_damage[e].size);
        setCurrentSide(e);
    }

    const color = isVendor ? '#FFFFFF' : '#695DFD';
    const sx = {
        color: color,
        '&.Mui-checked': {
            color:  color,
        },
        }



  return (
    <div >
         <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} w-full h-[120vh] overflow-hidden relative`} >
         <canvas ref={canvasRef} width="800" height="370" className="absolute"  onClick={handleClick} />
         

         <div
            className="bg-secondary absolute rounded-full ${mt-[]}" // Style indicator
            style={{ top: coordinates.y-Math.floor(sizes[size]/2), left: coordinates.x-Math.floor(sizes[size]/2) }}
        >
            <img src={mark.src} className={`w-15 h-15 `} style={{width: sizes[size],height: sizes[size]}}/>
        </div>

        <div className='p-5 py-4 flex space-x-2 text-[18px] justify-between'>
            <div className='flex space-x-2 pt-3'>
            <Link  href='./vehicle_photos'><IoChevronBack size={22} className='mt-[1px]'/></Link>
            <div>Back to main</div>
            </div>

            <div>
                <button className={` flex justify-center  font-[600] text-lg rounded-[6px] space-x-2 w-[20vw] px-5 py-3 bg-tertiary ${isVendor && 'text-primaryDark'}`} >
                <div className='flex space-x-2'>
                Confirm 
                <img src={splash.src}/>
                </div>
                </button>
            </div>
        </div>

        <div className='flex'>
            <div className='space-y-2 px-3 mt-3'> 
            <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-10px] `}>
                {/* <input type="radio" id="Small" name="colors" value="Small" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Small"
                    checked= {size === 'Small'}
                    name="colors"
                    value="Small"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Small" className='space-y-[-3px] pl-5'>
                    <div >Small</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[13px]`}>0-5cm</div>
                </label>
                </div>

                <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-10px] `}>
                {/* <input type="radio" id="Medium" name="colors" value="Medium" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Medium"
                    checked= {size === 'Medium'}
                    name="colors"
                    value="Medium"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Medium" className='space-y-[-3px] pl-5'>
                    <div >Medium</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[13px]`}>6-15cm</div>
                </label>
                </div>

                <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-10px] `}>
                {/* <input type="radio" id="Large" name="colors" value="Large" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Large"
                    checked= {size === 'Large'}
                    name="colors"
                    value="Large"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Large" className='space-y-[-3px] pl-5'>
                    <div >Large</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[13px]`}>16cm+</div>
                </label>
                </div>
                
                
            </div>
            <div className='mt-[-60px] w-[649px] h-[464px]' >
                <img src={sides[currentSide].src} className='w-[606px] h-[437px] '/>
            </div>
        </div>

        <div className='relative'>
        <div className='flex justify-center w-full mt-[-90px] absolute'>
            <div className='flex'>
                {
                    sidesArray.map((e,i)=>{
                        return <div className={`border border-1  px-7 p-4 ${i === 0 && 'rounded-l-full'} ${i === 4 && 'rounded-r-full'} ${e === currentSide ? 'bg-fourth text-white border-[#8383A0]' : (isVendor ? 'bg-[#3D3D6A] border-[#8383A0]':'bg-white border-[#D3D4FD]')}`}
                                onClick={()=>{handleSideChange(e)}} >{e}</div>
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