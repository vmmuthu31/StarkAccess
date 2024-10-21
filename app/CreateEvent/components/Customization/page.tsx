"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadBanner from "./UploadBanner";
import UploadLogo from "./UploadLogo";
import AddGuest from "./AddGuest";

type Props = {
  onBack: () => void; // Add this prop type
};

const Customization = ({ onBack }: Props) => {

  return (
    <div>
      <div className="flex space-x-10 pt-6">
        <div className="space-y-4 w-[212px]">
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Basic Event Details
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Ticketing & Registration
          </p>
          <p className="text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
            Customization & Media
          </p>
        </div>
        <div className="">
          {/* Registration form elements here */}
          <div className="w-[478px] space-y-3">
            <div className="space-y-1">
              <p>Event Visibility</p>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="option"
                    value="option1"
                    className="form-radio text-[#4390F2]"
                  />
                  <span className="ml-2">Public</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="option"
                    value="option2"
                    className="form-radio text-[#4390F2]"
                  />
                  <span className="ml-2">Private</span>
                </label>
              </div>
            </div>
           <UploadBanner />
           <UploadLogo />
           <AddGuest />
          </div>

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
              className="text-white bg-[#4390F2] w-fit p-2 px-5 flex justify-center items-center border-[3px] border-[#78ABFC] rounded-[10px]"
            >
              Publish Now
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
