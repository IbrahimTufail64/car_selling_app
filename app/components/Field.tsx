"use client"
import React, { useState } from 'react'
import progress100 from '@/assets/icons/Progress100.png'
import notCompleteBlue from '@/assets/notComplete.png'
import notCompleteWhite from '@/assets/icons/Progress0.png'
import tick from '@/assets/tickGreen.png'
import NotStarted from '@/assets/icons/NotStarted.png'
import { useAppContext } from '../Context'

const Field = ({isComplete,Content,Progress,Next}:{isComplete:Boolean,Content:String,Progress:Number,Next:Boolean}) => {
  const {isVendor} = useAppContext();
  const complete = isComplete;
  const progress0 = isVendor ? notCompleteBlue : notCompleteWhite;
  const started = Next ? 'Not started' : 'Locked';
  const index = Content.indexOf('(');
  let secondaryText = ''
  if (index !== -1) {
    secondaryText =  Content.slice(index);
    Content = Content.slice(0, index);
    console.log(secondaryText)
  }

  return (
    <div className={`${isVendor ?  'bg-[#1F204F] border-[#4C4D72]': 'bg-[#FFFFFF] border-[#D3D4FD]'} py-5 rounded-lg border-1 border  px-4 flex justify-between`}>
        <div className='flex space-x-3 text-[20px] max-w-[70%] '>
            <div className='h-full flex flex-col justify-center '>
              {complete ? 
              <img src={`${ progress100.src }`} className='min-w-[50px] max-h-[50px]'/>
              :
              <div className={`rounded-full border border-dotted  border-2 ${isVendor ? 'bg-[#4C4D72] font-light' : 'border-[#5E5E5E] text-[#5E5E5E]'} w-12 h-12 text-sm flex justify-center items-center `}>
               {String(Progress)}%
            </div>}
            {/* <img src={`${complete ? progress100.src : progress0.src}`} className='min-w-[50px] max-h-[50px]'/> */}
            
            </div>

            <div className='font-[400] h-full flex flex-col justify-center text-[14px] '>
              <div>
              <div>{Content}</div>
              {secondaryText && <div className='text-slate-400 text-sm'>{secondaryText}</div>}
              </div>
            </div>
        </div>
        <div className='flex space-x-[6px] py-5 text-sm min-w-[35%] justify-end'>
            <img src={`${complete ? tick.src : NotStarted.src}`} className='w-5 h-5'/>
            <div>
              {
                complete ? <div className='text-[#03A703] '>Completed</div> : <div className='text-slate-500  text-nowrap'>{
                  Progress === 0 ?
                   started:
                  'incomplete'
                  }</div>
              }
            </div>
        </div>
    </div>
  )
}

export default Field