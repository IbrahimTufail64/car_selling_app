"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Submission3 from '../Submission3/page'
import Submission4 from '../Submission4/page'
import Submission5 from '../Submission5/page'
import Submission6 from '../Submission6/page'
import splash from '@/assets/icons/Rays-small.png'
import { useRouter } from 'next/navigation';
import { useAppContext } from '../Context'

const Slider = () => {
    const router = useRouter();
    const [emblaRef,emblaApi] = useEmblaCarousel({ watchDrag: false });
    const [count, setCount] = useState(0);

    const {isVendor} = useAppContext();
    
    
    const scrollPrev = useCallback(() => { 
        console.log(count)
        if (emblaApi) emblaApi.scrollPrev()
      }, [emblaApi])

    const SubCount = ()=>{
        console.log(count);
        if(count > 0){
            setCount(count => count-1)
        }
    }

    const AddCount = ()=>{
        console.log(count);
        if(count < 3){
            setCount(count => count+1)
            
        }else{
            router.push('./Submission7');
        }
    }
    
      const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
      }, [emblaApi])
    const array = [0,1,2,3]

    useEffect(( )=>{
        console.log(count)
    },[])

    return (
        <div className={`${isVendor ? 'bg-primaryDark text-white' : 'bg-secondary'} min-h-[100vh] relative flex flex-col justify-between relative`} >
          
            <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide"><Submission3/></div>
            <div className="embla__slide"><Submission4/></div>
            <div className="embla__slide"><Submission5/></div>
            <div className="embla__slide"><Submission6/></div>
          </div>
        </div>
        
      </div>

      {/* <div className='absolute w-full h-[800px] top-0'></div> */}
      <div>
                <div className='flex justify-center w-full bottom-[100px] mt-5'>
                <div className='flex space-x-1'>
                    {array.map( e=> {
                        return (
                            <div className={` h-2 rounded-full ${count === e ? 'bg-[#695DFD] w-7': 'bg-[#C4C5FC] w-2'} `}></div>
                        )
                    })}
                </div>
                </div>
                <div className='flex justify-between p-5 space-x-3  bottom-0 flex-1 w-full font-[26px]'>
                    
                    <div onClick={()=>{SubCount()}}>
                    <button className={`embla__prev flex justify-center border-2 ${isVendor ? 'border-white' : 'border-[#000000]'} font-bold text-lg rounded-[6px] space-x-2 w-[45vw]  px-5 py-3  `} onClick={scrollPrev} >
                    <div>
                        Back 
                    </div>
                    </button>
                    </div>

                    <div onClick={()=>{AddCount()}}>
                    <button className={`embla__next flex justify-center  font-bold ${isVendor && 'text-primaryDark'} text-lg rounded-[6px] space-x-2 w-[45vw] px-5 py-3 bg-tertiary `} onClick={scrollNext}>
                    <div className='flex space-x-2'>
                    Next 
                    <img src={splash.src}/>
                    </div>
                    </button>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default Slider
