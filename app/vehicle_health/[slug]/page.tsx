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
import { useRouter } from 'next/navigation';
import mark from '@/assets/Damage_mark.png'
import { useAppContext } from '../../Context'
import Radio from '@mui/material/Radio';
import axios from 'axios'
import { DamageSelection, db } from '@/app/Local_DB/db'
import { useScreenshot } from 'use-react-screenshot'

const VehicleHealth = ({ params }: { params: { slug: string } }) => {

    const [currentSide, setCurrentSide] = useState('Driver Side');
    const [size, setSize] = useState('Small');
    const {isVendor} = useAppContext();
    const [coordinates_initial, setCoordinates_initial] = useState({ x: -100, y: -100 });
    const [isTablet, setIsTablet] = useState(false);
    //screenshot implementation
    const ScreenshotRef = useRef<any>(null)
    const [image, takeScreenshot] = useScreenshot();
    const getScreenShot = () => takeScreenshot(ScreenshotRef.current);

    useEffect(()=>{
        const width = window.innerWidth;
        // Define tablet width range (e.g., 768px to 1024px)
        console.log(width);
        setIsTablet(width >= 900);
        
    },[])

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
                                      let x = Math.abs(clientX - relativeX);
                                      let y = Math.abs(clientY - relativeY);
                                        
                                      if(isTablet){
                                        
                                      } else{
                                        if(x < 205 || y > 320)return;
                                       }
                                      setCoordinates({ x, y });
                                      let temp_damage:any = damage;
                                      
                                    //   if(isTablet){
                                    //     x = x/1.34;
                                    //     y = y/1.34;
                                       
                                    //   }
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
    const Router = useRouter();

    const handleSubmit = async (event:any) => { 
        // event.preventDefault(); 
        if(!image) {
            alert('Please mark the damage before proceding!');
            return;}
        try{
            console.log(image);
            const link = params.slug.split('-');
            const returnLink  = link[2];
            const imageUrl = link[0];
            const dynamic_image_no =Number(link[1]); 
            console.log('return',returnLink,'imageUrl',imageUrl,'dymaic no:',dynamic_image_no)
          
          console.log(coordinates,'before');
          let x = coordinates.x;
          let y = coordinates.y;
        //   if(x === 0 || y === 0)  alert('Please mark the damage before proceding!');

          if(isTablet){
            x = coordinates.x/1.34;
            y = coordinates.y/1.34;
            console.log(x,y)
          }
          
          let value = {
            name: imageUrl,
            dynamic_image_no,
            car_no: Number(localStorage.getItem('car_no')),
            coordinates: {x,y},
            size,
            side: currentSide,
            url: image
          }
          console.log(value,'after');


          const store = async (value:DamageSelection)=>{
            try{
                const existingEntry = await db.damage_selection
                .where({
                  name: value.name,
                  dynamic_image_no: value.dynamic_image_no,
                  car_no: value.car_no,
                  url: image
                })
                .first();
          
              if (existingEntry) {
                // If entry exists, update it
                await db.damage_selection.update(existingEntry.id, {
                  coordinates: value.coordinates,
                  size: value.size,
                  side: value.side
                });
                console.log("Updated existing entry:", existingEntry.id);
              } else {
                // If entry does not exist, add it
                const id = await db.damage_selection.add(value);
                console.log("Created new entry with id:", id);
              }
                // const imageData = id.map(e => e=e.data);
                // console.log(id);
            }
            catch(e){
                console.log(e);
            }
        };
        await store(value);
        //   localStorage.setItem('dashboard_lights_state',value);
          Router.push(`../${value.name}`);
        } catch (error) {
          console.error(error);
        }
      };

    const color = isVendor ? '#FFFFFF' : '#695DFD';
    const sx = {
        color: color,
        '&.Mui-checked': {
            color:  color,
        },
        }



  return (
    <div className='' >
        {/* <img className='w-full h-full absolute' src={image}/> */}
         <div  className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary '} relative w-[100vw] min-h-[100vh] overflow-hidden flex flex-col justify-between`} >
         <div>

         <canvas ref={canvasRef} className="absolute w-[800px] h-[370px] lg:w-[1200px] lg:h-[555px] "  onClick={()=>{handleClick;getScreenShot();}} />
         
        
         


        <div className='p-5 py-4 flex space-x-2 text-[22px] justify-between'>
            <div className='flex space-x-2 pt-3'>
            <Link  href='./vehicle_photos'><IoChevronBack size={22} className='mt-[5px]'/></Link>
            <div>Back to main</div>
            </div>

            
        </div>

         </div>
        
        <div ref={ScreenshotRef}>
        <div
            className="bg-secondary absolute rounded-full ${mt-[]}" // Style indicator
            style={{ top: coordinates.y-Math.floor(sizes[size]/2), left: coordinates.x-Math.floor(sizes[size]/2) }}
        >
            <img src={mark.src} className={`w-15 h-15 `} style={{width: sizes[size],height: sizes[size]}}/>
        </div>
        <div className='flex justify-between w-full' >
            <div className=' px-3 mt-7 h-[80vh] flex justify-center items-center '> 
                <div className='space-y-2 pb-20'>
                <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-15px] `}>
                {/* <input type="radio" id="Small" name="colors" value="Small" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Small"
                    checked= {size === 'Small'}
                    name="colors"
                    value="Small"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Small" className='space-y-[-3px] pl-5 text-[16px]'>
                    <div >Small</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[12px]`}>0-5cm</div>
                </label>
                </div>

                <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-15px] `}>
                {/* <input type="radio" id="Medium" name="colors" value="Medium" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Medium"
                    checked= {size === 'Medium'}
                    name="colors"
                    value="Medium"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Medium" className='space-y-[-3px] pl-5 text-[16px]'>
                    <div >Medium</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[12px]`}>6-15cm</div>
                </label>
                </div>

                <div className={`${!isVendor ? 'bg-white border border-1 border-[#D3D4FD]': 'bg-[#3D3D6A]'} p-4 px-5 rounded-md text-[18px] flex relative space-x-[-15px] `}>
                {/* <input type="radio" id="Large" name="colors" value="Large" className='absolute left-[-40px] top-[25px]' onChange={(e)=>{handleSize(e)}}/> */}
                <Radio
                    id="Large"
                    checked= {size === 'Large'}
                    name="colors"
                    value="Large"
                    onChange={(e)=>{handleSize(e)}}
                    sx={sx}
                />
                <label htmlFor="Large" className='space-y-[-3px] pl-5 text-[16px]'>
                    <div >Large</div>
                    <div className={` ${isVendor ? 'text-slate-200' : 'text-slate-500'} text-[12px]`}>16cm+</div>
                </label>
                </div>
                </div>
                
                
            </div>
                {/* <img src={sides[currentSide].src} className='w-[606px] h-[437px] lg:w-[909px] lg:h-[655.5px] object-cover' */}
            <div className='mt-[-60px] mb-4 w-[100vw] ml-4 sm:ml-0 overflow-visible '  >
                <img src={sides[currentSide].src} className='w-[575px] h-[415px]  sm:h-[394px] lg:w-[863px] lg:h-[622.5px] object-cover'
                />
            </div>
        </div>

        <div className='relative'>
        <div className='flex justify-center w-full mt-[-75px] absolute'>
            <div className='flex'>
                {
                    sidesArray.map((e,i)=>{
                        return <div className={`border border-1  px-5 text-[16px] p-[13px] ${i === 0 && 'rounded-l-full'} ${i === 4 && 'rounded-r-full'} ${e === currentSide ? 'bg-fourth text-white border-[#8383A0]' : (isVendor ? 'bg-[#3D3D6A] border-[#8383A0]':'bg-white border-[#D3D4FD]')}`}
                                onClick={()=>{handleSideChange(e);}} >{e}</div>
                    })
                }
            </div>

        </div>
        </div>
        </div>

        <div className='absolute right-0 w-[100vw] flex justify-end py-5 pr-5' 
        // onClick={()=>(console.log(image))}
        >
                <div
                    // onClick={()=>{
                    //     setTimeout(handleSubmit,800);
                    // }}
                    className={` flex justify-center  font-[600] text-lg rounded-[6px] space-x-2 w-[20vw] px-5 py-3 bg-tertiary ${isVendor && 'text-primaryDark'}`} 
>
                <button 
                onClick={handleSubmit}
                // onClick={getScreenShot}
                 >
                <div className='flex space-x-2' >
                Confirm 
                <img src={splash.src}/>
                </div>
                </button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default VehicleHealth