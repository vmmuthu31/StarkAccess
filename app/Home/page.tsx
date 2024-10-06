"use client";
import React from "react";
import Header from "../components/Header";
import Assets from "../components/Assets/Assets";
import Image from "next/image";
import { motion } from "framer-motion";
import Explore from "./components/Explore";
import Footer from "../components/Footer";
import TwoCards from "./components/TwoCards";

const Page = () => {
  return (
    <div className="min-h-screen text-white">
      {/* White background extending throughout the page */}
      <div className="bg-[#EDF3FD] min-h-screen w-full">
        {/* Section with the background image limited to screen height */}
        <div className="bg-[url('/BgImg1.webp')] bg-cover bg-center bg-no-repeat ">
          <div className="py-3 md:py-6">
            <Header />
            <div className="flex justify-center pt-10 md:pt-16 px-2 md:px-0">
              <div className="space-y-3">
                <div className="flex justify-center items-center text-xl gap-2">
                  <div className="relative">
                    <Image
                      className="absolute top-[-20px] left-[-15px] h-6 w-auto z-10"
                      src={Assets.Decor1}
                      alt="Decor"
                    />
                    <Image
                      className="h-[25px] md:h-[40px] w-auto z-0"
                      src={Assets.RingImgs}
                      alt="Ring Images"
                    />
                  </div>
                  <h1 className="text-lg">On-chain events made easy</h1>
                </div>
                <div className="text-center text-xl md:text-4xl lg:text-5xl">
                  <p className=" ">Experience Seamless Connections </p>
                  <p className="bg-gradient-to-l from-black/10 border-r-4 p-2 border-r-black w-fit mx-auto">
                    {" "}
                    at Your Events with Starknet
                  </p>
                </div>
                <h1 className="text-center text-sm md:text-lg">
                  Experience seamless event management with secure ticketing and
                  transactions. <br className=" hidden lg:flex" />
                   Explore, create, and connect like never before!
                </h1>

                <div className="flex relative justify-center gap-4 text-xs md:text-base">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="text-[#3581F1] gap-1 bg-white p-2 px-3 flex items-center border-4 border-[#78ABFC] rounded-[10px]"
                  >
                    Create your Event{" "}
                    <Image
                      className="h-4 md:h-6 w-auto"
                      src={Assets.ArrowRightBlue}
                      alt="ArrowRight"
                    ></Image>{" "}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 px-3 gap-1 flex items-center border-2 border-white rounded-[10px]"
                  >
                    Create your Event{" "}
                    <Image
                      className="h-4 md:h-6 w-auto"
                      src={Assets.ArrowRightWhite}
                      alt="ArrowRight"
                    ></Image>{" "}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <Image
                className="w-1/2 md:w-1/3"
                src={Assets.DottedArrowToRight}
                alt="DottedArrowToRight"
              ></Image>
              <Image
                className="w-1/3 absolute right-0 top-[-180px]"
                src={Assets.DottedArrowToLeft}
                alt="DottedArrowToLeft"
              ></Image>
            </div>
          </div>
          <TwoCards />
        </div>

        <div className="pt-10">
          <Explore />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
