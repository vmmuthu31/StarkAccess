"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import Image from "next/image";
import Assets from "@/app/components/Assets/Assets";

// List of timezones for the dropdown
const timezones = moment.tz.names();

type Props = {
  onNext: () => void;
  setEventName: React.Dispatch<React.SetStateAction<string>>;
  setEventDescription: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setTicketPrice: React.Dispatch<React.SetStateAction<number>>;
  eventName: string;
  eventDescription: string;
  startDate: string;
  startTime: string;
  ticketPrice: number;
  location :string;
};

          
  const Page = ({
    onNext,
    setEventName,
    setEventDescription,
    setStartDate,
    setStartTime,
    setTicketPrice,
    setLocation,
    eventName,
    eventDescription,
    startDate,
    startTime,
    ticketPrice,
    location,
  }: Props) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Singapore");
  
  
  
  // Handle location input change and fetch suggestions
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handleEventName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };
  const handleEventDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDescription(e.target.value);
  };
  const handleTicketPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketPrice(Number(e.target.value));
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  
  // Handle location selection
  // const handleLocationSelect = (location: any ,) => {
    //   setLocationQuery(location.display_name);
    //   setLocationSuggestions([]);
    
    
    // };
    // const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const query = e.target.value;
    //   setLocationQuery(query);
  
    //   if (query.length > 2) {
    //     const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setLocationSuggestions(data);
    //   } else {
    //     setLocationSuggestions([]);
    //   }
    // };
    
  // Refs to detect outside clicks
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const endTimeRef = useRef<HTMLDivElement>(null);


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
        <div className="flex space-x-10">
          <div className="w-[430px] h-[278px] space-y-3">
            <div className="space-y-1">
              <p className="text-lg">Event Name</p>
              <input
                type="text"
                 placeholder="Enter the name of the event (max 100 characters)."
                 value={eventName} // Bind the state variable here
                 onChange={handleEventName}
                  className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                 />
            </div>
            <div className="space-y-1">
              <p className="text-lg">Event Description</p>
              <textarea
                placeholder="Describe your event in detail (max 500 characters)."
                value={eventDescription} // Bind the state variable here
                onChange={handleEventDesc}
                className="w-full h-[150px] text-start p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
              />
            </div>
            <div className="space-y-1">
              <p className="text-lg">Ticket Price</p>
              <input
                type="number"
                placeholder="Enter price"
                value={ticketPrice} // Bind the state variable here
                onChange={handleTicketPrice}
                className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
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

                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Add location"
                  className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                />
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
              <p className="text-lg">Event Date & Time</p>
              <div className="flex space-x-4">
                <div className="space-y-1 w-[180px]">
                  <label htmlFor="start-date" className="text-base">Start Date</label>
                  <input
                    type="date"
                    id="start-date"
                    value={startTime}
                    onChange={handleTimeChange}
                    className="w-full h-[40px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                  />
                </div>
                <div className="space-y-1 w-[180px]">
                  <label htmlFor="end-date" className="text-base">End Date</label>
                  <input
                    type="date"
                    id="end-date"
                   
                    className="w-full h-[40px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="space-y-1 w-[180px]">
                  <label htmlFor="start-time" className="text-base">Start Time</label>
                  <input
                    type="time"
                    id="start-time"
                    value={startDate}
                    onChange={handleDate}
                    className="w-full h-[40px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                  />
                </div>
                <div className="space-y-1 w-[180px]">
                  <label htmlFor="end-time" className="text-base">End Time</label>
                  <input
                    type="time"
                    id="end-time"
                   
                    className="w-full h-[40px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="timezone" className="text-base">Timezone</label>
                <select
                  id="timezone"
              
                  className="w-full h-[40px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                >
                  {timezones.map((timezone, index) => (
                    <option key={index} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <div
        
                onClick={onNext}
                className="bg-[#4390F2] text-white p-2 rounded-[10px] cursor-pointer"
              >
                Next
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
