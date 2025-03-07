"use client"
import React, { useEffect, useState } from 'react'
import blurBG from '@/assets/blurBG.png'
import PreviewPhoto from './PreviewPhoto'
import { IoChevronBack } from 'react-icons/io5'
import useEmblaCarousel from 'embla-carousel-react'
import { db } from '../Local_DB/db'
import PreviewCarCompSlider from './PreviewCarCompSlider'
import ImageSlider from './TestSlider'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import PreviewCarCompSliderDynamic from './PreviewCarCompSliderDynamic'
const SliderPreview = ({setpreview_car,preview_car}:{preview_car:undefined,setpreview_car: React.Dispatch<React.SetStateAction<undefined>>}) => {
    const[tablet,setIsTablet] = useState(0);
    const [images,setImages] = useState<number[]>([]);
    
    useEffect(()=>{ 
        const width = window.innerWidth;
        // Define tablet width range (e.g., 768px to 1024px)
        console.log(width);
        if(width >= 900){
            setIsTablet(10);
        }
       else if(width >= 700){
            setIsTablet(8);
        }
       else{
            setIsTablet(5);
        }
        
        
    },[])

    useEffect(() => {
        const car_number = localStorage.getItem('car_no');
        const retrieve = async ( setter_function: React.Dispatch<React.SetStateAction<number[]>>) => {
          try {
            const images = await db.images
              .where('car_number')
              .equals(String(car_number))
              .toArray();
              console.log(images);
            setter_function(images.map((image) => image.id)); // Store the array of images
          } catch (e) {
            console.error(e);
          }
        };
        retrieve( setImages);
      }, []);
    // const [current_car, setcurrent_car] = useState();
    // const Photos = ['dashboard','boot','front_seat','back_seat',
    //                 'front_driver','front_passenger','back_driver','back_passenger',
    //                 'front_driver_wheel','front_passenger_wheel','back_driver_wheel','back_passenger_wheel',
    //                 'front_driver_tyre','front_passenger_tyre','back_driver_tyre','back_passenger_tyre']

    // const PhotosDynamic = [
    // 'surface_marks',
    // 'panel_damage',
    // 'dashboard_lights',
    // 'exterior_wear_tear',
    // 'glass_health',
    // 'damaged_absent_fixtures',
    // 'service_records']


    // const slider1Images = [
    //     "https://via.placeholder.com/600x400/FF5733",
    //     "https://via.placeholder.com/600x400/33FF57",
    //     "https://via.placeholder.com/600x400/3357FF",
    //   ];


    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false })
  return (
//     <div>
//         <div className="embla overflow-hidden mx-2 pb-10">
//         <div className="embla__viewport" ref={emblaRef}>
//           <div className="embla__container flex space-x-5  ">

// {
// Photos.map((e, index) => {
//     return (
                    
//                         <PreviewCarCompSlider toRetrieve={e} setcurrentcar={setpreview_car} current={preview_car}/>
                    
//                 );
//     })
// }
//           </div>
//         </div>
        
//       </div>
        
//     </div>
<div className='pb-10'>
        <Swiper
    spaceBetween={5}
    slidesPerView={tablet}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    >
    
    {
images.map((e, index) => {
    return (
        <SwiperSlide>
                        <PreviewCarCompSlider toRetrieve={e} setcurrentcar={setpreview_car} current={preview_car}/>
                        </SwiperSlide>
                    
                );
    })
}

    </Swiper>
    </div>
  )
}

export default SliderPreview