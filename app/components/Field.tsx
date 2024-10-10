"use client"
import React, { useState } from 'react'
import progress100 from '@/assets/icons/Progress100.png'
import progress0 from '@/assets/icons/Progress0.png'
import tick from '@/assets/icons/tickBlue.png'
import NotStarted from '@/assets/icons/NotStarted.png'

const Field = ({isComplete,Content}:{isComplete:Boolean,Content:String}) => {
  const complete = isComplete;

  return (
    <div className='bg-[#FFFFFF] pt-3 rounded-lg border-1 border border-[#D3D4FD] px-3 flex justify-between'>
        <div className='flex space-x-2 text-[200]'>
            <img src={`${complete ? progress100.src : progress0.src}`} className='w--[50px] h-[50px]'/>
            <div className='font-[500] pt-4 text-sm'>{Content}</div>
        </div>
        <div className='flex space-x-3 py-5 text-sm'>
            <img src={`${complete ? tick.src : NotStarted.src}`} className='w-5 h-5'/>
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