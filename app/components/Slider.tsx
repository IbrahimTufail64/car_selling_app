"use client"
import React, { useState } from 'react'
import blurBG from '@/assets/blurBG.png'
import PreviewPhoto from './PreviewPhoto'
import { IoChevronBack } from 'react-icons/io5'
import useEmblaCarousel from 'embla-carousel-react'
import { db } from '../Local_DB/db'
import PreviewCarCompSlider from './PreviewCarCompSlider'

const SliderPreview = ({setpreview_car,preview_car}:{preview_car:undefined,setpreview_car: React.Dispatch<React.SetStateAction<undefined>>}) => {

    // const [current_car, setcurrent_car] = useState();
    const Photos = ['dashboard','boot','front_seat','back_seat',
                    'front_driver','front_passenger','back_driver','back_passenger',
                    'front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel',
                    'front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre']

    const PhotoTitle = ['Interior','Exterior','Surface marks','Panel Damage','Wheel Condition','Tyre Condition','Dashboard Lights',
                        'Exterior wear & tear','Glass Health','Damaged/Absent Fixtures','Service Records'
    ]



    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })
  return (
    <div>
        <div className="embla overflow-hidden mx-2 pb-10">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex space-x-5 min-w-[400vw] ">

{
Photos.map((e, index) => {
    return (
                    
                        <PreviewCarCompSlider toRetrieve={e} setcurrentcar={setpreview_car} current={preview_car}/>
                    
                );
    })
}
          </div>
        </div>
        
      </div>
        
    </div>
  )
}

export default SliderPreview