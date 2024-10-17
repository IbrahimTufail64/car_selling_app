"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import splash from '@/assets/icons/Rays-small.png'
import front from '@/assets/Front_Damage-modified-modified.png'
import back from '@/assets/Back_Damage-modified-modified.png'
import roof from '@/assets/Roof_Damage-modified-modified.png'
import driverSide from '@/assets/Driver_Damage-modified-modified.png'
import PassengerSide from '@/assets/Passenger_Damage-modified-modified.png'
import mark from '@/assets/Damage_mark.png'

const VehicleHealth = () => {

    const [currentSide, setCurrentSide] = useState('Driver Side');
    const [size, setSize] = useState('Small');

    const [damage, setDamage] = useState({
                                    'Driver Side' : {
                                        'size': 'Small',
                                        'coordinates': { x: 0, y: 0 }
                                    },
                                    'Passenger side': {
                                        'size': 'Small',
                                        'coordinates': { x: 0, y: 0 }
                                    },
                                    'Front side': {
                                        'size': 'Small',
                                        'coordinates': { x: 0, y: 0 }
                                    },
                                    'Back side': {
                                        'size': 'Small',
                                        'coordinates': { x: 0, y: 0 }
                                    },
                                    'Roof side':{
                                        'size': 'Small',
                                        'coordinates': { x: 0, y: 0 }
                                    },
                                })

                                  

                                    const canvasRef = useRef(null);
                                    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
                                  
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



  return (
    <div >
         <div className='bg-secondary w-full h-[120vh] overflow-hidden relative' >
         <canvas ref={canvasRef} width="800" height="370" className="absolute"  onClick={handleClick} />
         

         <div
            className="bg-secondary absolute rounded-full ${mt-[]}" // Style indicator
            style={{ top: coordinates.y-Math.floor(sizes[size]/2), left: coordinates.x-Math.floor(sizes[size]/2) }}
        >
            <img src={mark.src} className={`w-15 h-15 `} style={{width: sizes[size],height: sizes[size]}}/>
        </div>

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
                <input type="radio" id="Small" name="colors" value="Small" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/>
                <label htmlFor="Small" className='space-y-[-3px] pl-5'>
                    <div >Small</div>
                    <div className='text-slate-500 text-[13px]'>0-5cm</div>
                </label>
                </div>

                <div className='bg-white p-4 px-5 rounded-md border border-1 text-[18px] flex relative space-x-4 border border-1 border-[#D3D4FD]'>
                <input type="radio" id="Medium" name="colors" value="Medium" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/>
                <label htmlFor="Medium" className='space-y-[-3px] pl-5'>
                    <div >Medium</div>
                    <div className='text-slate-500 text-[13px]'>6-15cm</div>
                </label>
                </div>

                <div className='bg-white p-4 px-5 rounded-md border border-1 text-[18px] flex relative space-x-4 border border-1 border-[#D3D4FD]'>
                <input type="radio" id="Large" name="colors" value="Large" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/>
                <label htmlFor="Large" className='space-y-[-3px] pl-5'>
                    <div >Large</div>
                    <div className='text-slate-500 text-[13px]'>16cm+</div>
                </label>
                </div>
                
                
            </div>
            <div className='mt-[-60px] w-[649px] h-[464px]' >
                <img src={sides[currentSide].src} className='w-[584px] h-[417px] '/>
            </div>
        </div>

        <div className='relative'>
        <div className='flex justify-center w-full mt-[-90px] absolute'>
            <div className='flex'>
                {
                    sidesArray.map((e,i)=>{
                        return <div className={`border border-1 border-[#D3D4FD] px-7 p-4 ${i === 0 && 'rounded-l-full'} ${i === 4 && 'rounded-r-full'} ${e === currentSide ? 'bg-fourth text-white' : 'bg-white'}`}
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