"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  onNext: () => void; // Add this prop type
  onBack: () => void; // Add this prop type
};

const Page = ({ onNext, onBack }: Props) => {
  return (
    <div>
      <div className="flex space-x-10 pt-6">
        <div className="space-y-4 w-[212px]">
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Basic Event Details
          </p>
          <p className="text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
            Ticketing & Registration
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Customization & Media
          </p>
        </div>
        <div className="">
          {/* Registration form elements here */}
          <div className="flex relative justify-center gap-4 text-xs md:text-base pt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack} // Call the onBack function here
              className="text-[#3581F1] gap-1 bg-white p-2 px-5 flex items-center border-2 border-[#78ABFC] rounded-[10px]"
            >
              Back
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onNext} // Call the onNext function here
              className="text-white bg-[#4390F2] w-fit p-2 px-5 flex justify-center items-center border-[3px] border-[#78ABFC] rounded-[10px]"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
