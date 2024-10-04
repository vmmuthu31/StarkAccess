import Assets from '@/app/components/Assets/Assets'
import Image from 'next/image'
import React from 'react'

type Props = {}

const TwoCards = (props: Props) => {
  return (
    <div>
         <div className="flex justify-center text-black">
            <div className="relative bg-[#EDF3FD] h-[300px] w-[300px] rounded-[20px] shadow-xl transform rotate-[-8deg] hover:scale-105 transition-transform duration-500">
              <Image
                className="absolute top-[-40px] left-[-40px] h-14 w-auto z-20" // Ensure higher z-index and adjust positioning
                src={Assets.Decor1}
                alt="Decor"
              />
              <div className=" h-full w-full rounded-[20px] z-10 p-3">
                
              </div>
            </div>

            <div className="relative bg-[#EDF3FD] h-[300px] w-[300px] rounded-[20px] shadow-xl mt-10 transform rotate-[8deg] hover:scale-105 transition-transform duration-500">
              <Image
                className="absolute top-[-40px] right-[-40px] h-14 w-auto z-20" // Ensure higher z-index and adjust positioning
                src={Assets.Decor2}
                alt="Decor"
              />
              <div className=" h-full w-full rounded-[20px] z-10"></div>
            </div>
          </div>
    </div>
  )
}

export default TwoCards