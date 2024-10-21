"use client"
import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";


type Props = {}

const QuesReview = (props: Props) => {
  return (
    <div className='bg-[#DAE7FC] p-2 px-4 h-auto w-full rounded-[10px] space-y-2'>
        <h1 className=''>What is your name?</h1>
        <div className=" flex justify-between items-center">
        <div className="flex text-[#4390F2] text-[14px] gap-2">
          <h1>checkbox</h1>
          <h1>Required</h1>
        </div>
        <RiDeleteBin6Line className=' size-5'/>
        </div>
    </div>
  )
}

export default QuesReview