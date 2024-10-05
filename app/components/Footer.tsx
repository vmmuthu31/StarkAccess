import React from 'react'
import Assets from './Assets/Assets'
import Image from 'next/image'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className=' max-w-5xl flex justify-center items-center mx-auto'>
        <div className=" border-t-2 border-[#4390F2] w-full">
            <div className=" p-2 flex justify-between items-center">
                <p className=' bricolage-font text-[#4390F2] font-semibold text-xl hover:cursor-pointer'>StarkAccess</p>
                <div className=" text-[#7CB6FF] flex items-center gap-5 text-sm">
                  <p className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Explore} alt="Explore event"/> Explore Events</p>
                  <p className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Create} alt="Create event"/> Create Event</p>
                  <p className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Manage} alt="Manage tickets"/> Manage Tickets</p>
                  <p className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Verify} alt="Verify event"/> Verify Tickets (zkSNARKsProof)</p>
                </div>
                <div className=" flex items-center gap-5">
                  <Image className=' h-10 w-auto hover:cursor-pointer' src={Assets.Twitter} alt='Twitter'></Image>
                  <Image className=' h-10 w-auto hover:cursor-pointer' src={Assets.LinkedIn} alt='LinkedIn'></Image>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer