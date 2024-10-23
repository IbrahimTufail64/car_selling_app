"use client"
import React, { useState } from 'react'
import progress100 from '@/assets/icons/Progress100.png'
import notCompleteBlue from '@/assets/notComplete.png'
import notCompleteWhite from '@/assets/icons/Progress0.png'
import tick from '@/assets/icons/tickBlue.png'
import NotStarted from '@/assets/icons/NotStarted.png'
import { useAppContext } from '../Context'

const Field = ({isComplete,Content}:{isComplete:Boolean,Content:String}) => {
  const {isVendor} = useAppContext();
  const complete = isComplete;
  const progress0 = isVendor ? notCompleteBlue : notCompleteWhite;
  const index = Content.indexOf('(');
  let secondaryText = ''
  if (index !== -1) {
    secondaryText =  Content.slice(index);
    Content = Content.slice(0, index);
    console.log(secondaryText)
  }

  return (
    <div className={`${isVendor ?  'bg-[#1F204F] border-[#4C4D72]': 'bg-[#FFFFFF] border-[#D3D4FD]'} py-5 rounded-lg border-1 border  px-3 flex justify-between`}>
        <div className='flex space-x-4 text-[20px] max-w-[70%]'>
            <img src={`${complete ? progress100.src : progress0.src}`} className='w-[60px] h-[60px]'/>
            <div className='font-[400] pt-4 '>
              <div>{Content}</div>
              {secondaryText && <div className='text-slate-400 text-sm'>{secondaryText}</div>}
            </div>
        </div>
        <div className='flex space-x-3 py-5  '>
            <img src={`${complete ? tick.src : NotStarted.src}`} className='w-6 h-6'/>
            <div>
              {
                complete ? <div className='text-fourth '>Completed</div> : <div className='text-slate-500'>Not started</div>
              }
            </div>
        </div>
    </div>
  )
}

export default Field