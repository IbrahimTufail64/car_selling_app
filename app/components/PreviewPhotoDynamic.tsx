"use client"
import React, { useEffect, useState } from 'react'
import { db, Image } from '../Local_DB/db'
import { useAppContext } from '../Context';
import arrow from '@/assets/icons/expandArrow.png'

const PreviewPhotoDynamic = ({toRetrieve}:{ toRetrieve: Image}) => {


    // const [_img, set_img]  = useState<any>(null);

    

    
  return (      
            <div className='w-full flex justify-center'>
                <div className='w-[92vw] h-[400px]'>
                    <img src={toRetrieve.data} className='object-cover h-full w-full rounded-lg'/>
                </div>
            </div>
  )
}

export default PreviewPhotoDynamic