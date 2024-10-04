import Assets from "@/app/components/Assets/Assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const Explore = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto text-black">
      <div>
        <p className=" text-2xl text-center">Explore Events</p>
        <div className="grid grid-cols-3 py-6">
          <div className=" bg-[#EDF3FD] rounded-[10px] h-[585px] w-[310px] shadow-2xl mx-auto p-4 space-y-2">
            <div className="h-[280px] w-[280px] relative">
              <Image
                className="h-full w-full"
                src={Assets.Event1}
                alt="Event 1"
              ></Image>
              <Image
                className=" h-14 w-auto absolute bottom-[-20px] right-0"
                src={Assets.StarknetLogo}
                alt="starknet"
              ></Image>
            </div>
            <p className=" text-xl">DAO Governance & Tokenomics Workshop</p>
            <h1 className=" text-sm">
              A two-day summit featuring leaders and pioneers in decentralized
              finance, NFTs, and blockchain technology.
            </h1>
            <div className="text-sm space-y-1">
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Calendar}
                  alt="Calendar"
                />{" "}
                 November 12-13, 2024
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Time}
                  alt="Time"
                />{" "}
                 9:00 AM - 6:00 PM
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Location}
                  alt="Location"
                />{" "}
                 San Francisco, CA
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-white bg-[#4390F2] w-full gap-1 bg- p-2 px-3 flex justify-center items-center border-4 border-[#78ABFC] rounded-[10px]"
            >
              Buy Ticket Now
            </motion.button>
          </div>
          <div className=" bg-[#EDF3FD] rounded-[10px] h-[585px] w-[310px] shadow-2xl mx-auto p-4 space-y-2">
            <div className="h-[280px] w-[280px] relative">
              <Image
                className="h-full w-full"
                src={Assets.Event2}
                alt="Event 1"
              ></Image>
              <Image
                className=" h-14 w-auto absolute bottom-[-20px] right-0"
                src={Assets.PolygonLogo}
                alt="starknet"
              ></Image>
            </div>
            <p className=" text-xl">DAO Governance & Tokenomics Workshop</p>
            <h1 className=" text-sm">
              A two-day summit featuring leaders and pioneers in decentralized
              finance, NFTs, and blockchain technology.
            </h1>
            <div className="text-sm space-y-1">
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Calendar}
                  alt="Calendar"
                />{" "}
                 November 12-13, 2024
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Time}
                  alt="Time"
                />{" "}
                 9:00 AM - 6:00 PM
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Location}
                  alt="Location"
                />{" "}
                 San Francisco, CA
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-white bg-[#4390F2] w-full gap-1 bg- p-2 px-3 flex justify-center items-center border-4 border-[#78ABFC] rounded-[10px]"
            >
              Buy Ticket Now
            </motion.button>
          </div>
          <div className=" bg-[#EDF3FD] rounded-[10px] h-[585px] w-[310px] shadow-2xl mx-auto p-4 space-y-2">
            <div className="h-[280px] w-[280px] relative">
              <Image
                className="h-full w-full"
                src={Assets.Event3}
                alt="Event 1"
              ></Image>
              <Image
                className=" h-14 w-auto absolute bottom-[-20px] right-0"
                src={Assets.TPGLogo}
                alt="starknet"
              ></Image>
            </div>
            <p className=" text-xl">DAO Governance & Tokenomics Workshop</p>
            <h1 className=" text-sm">
              A two-day summit featuring leaders and pioneers in decentralized
              finance, NFTs, and blockchain technology.
            </h1>
            <div className="text-sm space-y-1">
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Calendar}
                  alt="Calendar"
                />{" "}
                 November 12-13, 2024
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Time}
                  alt="Time"
                />{" "}
                 9:00 AM - 6:00 PM
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image
                  className=" h-5 w-auto"
                  src={Assets.Location}
                  alt="Location"
                />{" "}
                 San Francisco, CA
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-white bg-[#4390F2] w-full gap-1 bg- p-2 px-3 flex justify-center items-center border-4 border-[#78ABFC] rounded-[10px]"
            >
              Buy Ticket Now
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
