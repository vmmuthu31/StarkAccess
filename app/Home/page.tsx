"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Assets from "../components/Assets/Assets";
import Image from "next/image";
import dynamic from "next/dynamic";

const MotionButton = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.button),
  { ssr: false }
);

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-gradient-to-b from-customStart to-customEnd min-h-screen text-white">
      <div className="py-3 md:py-6">
        <Header />
        <div className="flex justify-center pt-16">
          <div className="space-y-3">
            <div className="flex justify-center items-center text-xl gap-2">
              <div className="relative">
                <Image
                  className="absolute top-[-20px] left-[-15px] h-6 w-auto z-10"
                  src={Assets.Decor1}
                  alt="Decor"
                />

                <Image
                  className="h-[40px] w-auto z-0"
                  src={Assets.RingImgs}
                  alt="Ring Images"
                />
              </div>
              <h1 className="text-lg">On-chain events made easy</h1>
            </div>
            <div className="text-center text-5xl">
              <p>Experience Seamless Connections </p>
              <p className="bg-gradient-to-l from-black/10 border-r-4 p-2 border-r-black w-fit mx-auto">
                {" "}
                at Your Events with Starknet
              </p>
            </div>
            <h1 className="text-center text-lg">
              Experience seamless event management with secure ticketing and
              transactions. <br />
              Explore, create, and connect like never before!
            </h1>

            <div className="flex relative justify-center gap-4">
              <MotionButton
                whileTap={{ scale: 0.9 }}
                className="text-[#3581F1] gap-1 bg-white p-2 px-3 flex items-center border-4 border-[#78ABFC] rounded-[10px]"
              >
                Create your Event
                <Image
                  className="h-6 w-auto"
                  src={Assets.ArrowRightBlue}
                  alt="ArrowRight"
                />
              </MotionButton>
              <MotionButton
                whileTap={{ scale: 0.9 }}
                className="p-2 px-3 gap-1 flex items-center border-2 border-white rounded-[10px]"
              >
                Create your Event
                <Image
                  className="h-6 w-auto"
                  src={Assets.ArrowRightWhite}
                  alt="ArrowRight"
                />
              </MotionButton>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            className="w-1/3"
            src={Assets.DottedArrowToRight}
            alt="DottedArrowToRight"
          />
          <Image
            className="w-1/3 absolute right-0 top-[200px]"
            src={Assets.DottedArrowToLeft}
            alt="DottedArrowToLeft"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
