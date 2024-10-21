"use client"
import React from 'react'
import Assets from './Assets/Assets'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className=' max-w-5xl flex justify-center items-center mx-auto'>
        <div className=" border-t-2 border-[#4390F2] w-full mx-3 md:mx-6 lg:mx-0">
            <div className=" pt-2 pb-6 lg:flex justify-between items-center">
              <div className=" flex justify-between">
                <motion.p whileTap={{ scale : 0.9 }} className=' bricolage-font text-[#4390F2] font-semibold text-xl hover:cursor-pointer'>StarkAccess</motion.p>
                <div className="items-center gap-3 flex lg:hidden">
                  <Image className=' h-7 w-auto hover:cursor-pointer' src={Assets.Twitter} alt='Twitter'></Image>
                  <Image className=' h-7 w-auto hover:cursor-pointer' src={Assets.LinkedIn} alt='LinkedIn'></Image>
                </div>
                </div>
                <div className=" text-[#7CB6FF] md:flex items-center gap-5 text-sm">
                  <motion.p whileTap={{ scale : 0.9 }} className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Explore} alt="Explore event"/> Explore Events</motion.p>
                  <motion.p whileTap={{ scale : 0.9 }} className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Create} alt="Create event"/> Create Event</motion.p>
                  <motion.p whileTap={{ scale : 0.9 }} className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Manage} alt="Manage tickets"/> Manage Tickets</motion.p>
                  <motion.p whileTap={{ scale : 0.9 }} className=' flex items-center gap-1 hover:cursor-pointer'> <Image className=' h-6 w-auto' src={Assets.Verify} alt="Verify event"/> Verify Tickets (zkSNARKsProof)</motion.p>
                </div>
                <div className="items-center gap-5 hidden lg:flex">
                  <Image className=' h-10 w-auto hover:cursor-pointer' src={Assets.Twitter} alt='Twitter'></Image>
                  <Image className=' h-10 w-auto hover:cursor-pointer' src={Assets.LinkedIn} alt='LinkedIn'></Image>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer