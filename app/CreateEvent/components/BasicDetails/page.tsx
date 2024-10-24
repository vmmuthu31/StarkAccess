"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DateTime from "./DateTime";

// Define the type for props with the onNext callback function
type Props = {
  onNext: () => void;
};

const Page = ({ onNext }: Props) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);

  // Function to handle location input change and fetch suggestions
  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocationQuery(query);

    if (query.length > 2) {
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      setLocationSuggestions(data);
    } else {
      setLocationSuggestions([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: any) => {
    setLocationQuery(location.display_name);
    setLocationSuggestions([]);
  };

  return (
    <div>
      <div className="flex space-x-10 pt-6">
        <div className="space-y-4 w-[212px]">
          <p className="text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
            Basic Event Details
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Ticketing & Registration
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Customization & Media
          </p>
        </div>
        <div className="">
          <div className="flex space-x-10">
            <div className="w-[430px] h-[278px] space-y-3">
              <div className="space-y-1">
                <p className="text-lg">Event Name</p>
                <input
                  type="text"
                  placeholder="Enter the name of the event (max 100 characters)."
                  className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                />
              </div>
              <div className="space-y-1">
                <p className="text-lg">Event Description</p>
                <textarea
                  placeholder="Describe your event in detail (max 500 characters)."
                  className="w-full h-[150px] text-start p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                />
              </div>
            </div>

            <div className="w-[430px] h-[278px] space-y-6">
              <div className="space-y-1">
                <p className="text-lg">Location/Virtual Platform</p>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="option"
                      value="option1"
                      className="form-radio text-[#4390F2]"
                    />
                    <span className="ml-2">If in-person</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      name="option"
                      value="option2"
                      className="form-radio text-[#4390F2]"
                    />
                    <span className="ml-2">If virtual</span>
                  </label>
                </div>

                {/* Location Input with Autocomplete */}
                <input
                  type="text"
                  value={locationQuery}
                  onChange={handleLocationChange}
                  placeholder="Add location"
                  className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                />

                {/* Location Suggestions */}
                {locationSuggestions.length > 0 && (
                  <ul className="absolute bg-white shadow-md rounded-lg w-full mt-1">
                    {locationSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleLocationSelect(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-lg">Event date & time</p>
                <DateTime />
              </div>
            </div>
          </div>
          <div className="flex relative justify-center gap-4 text-xs md:text-base pt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-[#3581F1] gap-1 bg-white p-2 px-5 flex items-center border-2 border-[#78ABFC] rounded-[10px]"
            >
              Cancel
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
