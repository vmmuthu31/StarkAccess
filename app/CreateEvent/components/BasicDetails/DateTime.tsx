import Image from "next/image";
import Assets from "@/app/components/Assets/Assets";
import React, { useState, useEffect, useRef } from "react";


type Props = {}


const DateTime = (props: Props) => {
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [selectedTimeZone, setSelectedTimeZone] = useState("GMT+8:00");
    const [isStartDateVisible, setIsStartDateVisible] = useState(false);
    const [isEndDateVisible, setIsEndDateVisible] = useState(false);
    const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
    const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);
  
    // Refs to detect outside clicks
    const startDateRef = useRef<HTMLDivElement>(null);
    const endDateRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<HTMLDivElement>(null);
    const endTimeRef = useRef<HTMLDivElement>(null);
  
    const Handlestartdatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedStartDate(e.target.value);
      setIsStartDateVisible(false);
    };
  
    const Handleenddatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedEndDate(e.target.value);
      setIsEndDateVisible(false);
    };
  
    const Handlestarttimechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedStartTime(e.target.value);
      setIsStartTimeVisible(false);
    };
  
    const Handleendtimechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedEndTime(e.target.value);
      setIsEndTimeVisible(false);
    };
  
    const Formatdate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };
  
    const Formattime = (timeString: string) => {
      if (!timeString) return "";
      const [hour, minute] = timeString.split(":");
      const isPM = Number(hour) >= 12;
      const formattedHour = Number(hour) % 12 || 12;
      const formattedMinute = minute.padStart(2, "0");
      return `${formattedHour}:${formattedMinute} ${isPM ? "PM" : "AM"}`;
    };
  
    // Detect outside clicks to close dropdowns
    useEffect(() => {
      const Handleclickoutside = (event: MouseEvent) => {
        if (
          startDateRef.current &&
          !startDateRef.current.contains(event.target as Node)
        ) {
          setIsStartDateVisible(false);
        }
  
        if (
          endDateRef.current &&
          !endDateRef.current.contains(event.target as Node)
        ) {
          setIsEndDateVisible(false);
        }
  
        if (
          startTimeRef.current &&
          !startTimeRef.current.contains(event.target as Node)
        ) {
          setIsStartTimeVisible(false);
        }
  
        if (
          endTimeRef.current &&
          !endTimeRef.current.contains(event.target as Node)
        ) {
          setIsEndTimeVisible(false);
        }
      };
  
      document.addEventListener("mousedown", Handleclickoutside);
  
      return () => {
        document.removeEventListener("mousedown", Handleclickoutside);
      };
    }, []);
  
  return (
    <div>
          <div className="bg-[#DAE7FC] w-full h-[109px] p-2 px-4 rounded-[10px] border border-[#4390F2]/40 flex items-center">
                  <div className="">
                    {/* Start Date and Time */}
                    
                    <div className=" flex items-center">
                      <div className=" flex items-center gap-2 w-[60px]">
                        <Image src={Assets.DotSolid} alt="Dot Solid"></Image>
                        <h1 className=" text-[#4390F2]">Start</h1>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md w-fit relative">
                        <div
                          ref={startDateRef}
                          className="relative flex flex-col"
                        >
                          <div
                            className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-l-[10px] text-center "
                            onClick={() => {
                              setIsStartDateVisible(!isStartDateVisible);
                              setIsEndDateVisible(false);
                            }}
                          >
                            {selectedStartDate
                              ? Formatdate(selectedStartDate)
                              : "Fri, Oct 4"}
                          </div>
                          {isStartDateVisible && (
                            <input
                              type="date"
                              value={selectedStartDate}
                              onChange={Handlestartdatechange}
                              className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
                            />
                          )}
                        </div>

                        <div
                          ref={startTimeRef}
                          className="relative flex flex-col"
                        >
                          <div
                            className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-r-[10px] text-center "
                            onClick={() =>
                              setIsStartTimeVisible(!isStartTimeVisible)
                            }
                          >
                            {selectedStartTime
                              ? Formattime(selectedStartTime)
                              : "5:30 pm"}
                          </div>
                          {isStartTimeVisible && (
                            <input
                              type="time"
                              value={selectedStartTime}
                              onChange={Handlestarttimechange}
                              className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* End Date and Time */}
                    <div className=" flex items-center">
                      <div className=" flex items-center gap-2 w-[60px]">
                        <Image
                          src={Assets.DotOutline}
                          alt="Dot Outline"
                        ></Image>
                        <h1 className=" text-[#4390F2]">End</h1>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md w-fit relative mt-2">
                        <div
                          ref={endDateRef}
                          className="relative flex flex-col"
                        >
                          <div
                            className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-l-[10px] text-center "
                            onClick={() => {
                              setIsEndDateVisible(!isEndDateVisible);
                              setIsStartDateVisible(false);
                            }}
                          >
                            {selectedEndDate
                              ? formatDate(selectedEndDate)
                              : "Sat, Oct 5"}
                          </div>
                          {isEndDateVisible && (
                            <input
                              type="date"
                              value={selectedEndDate}
                              onChange={Handleenddatechange}
                              className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
                            />
                          )}
                        </div>

                        <div
                          ref={endTimeRef}
                          className="relative flex flex-col"
                        >
                          <div
                            className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-r-[10px] text-center "
                            onClick={() =>
                              setIsEndTimeVisible(!isEndTimeVisible)
                            }
                          >
                            {selectedEndTime
                              ? formatTime(selectedEndTime)
                              : "7:30 pm"}
                          </div>
                          {isEndTimeVisible && (
                            <input
                              type="time"
                              value={selectedEndTime}
                              onChange={Handleendtimechange}
                              className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex items-center w-fit text-xs justify-center gap-2 ml-2 p-2 px-4 rounded-[10px] text-center  text-[#98A0A8] bg-[#FFFFFF]/60 border border-[#DAE7FC]">
                  <div>Time zone:</div>
                  <div className="font-bold">GMT+8:00</div>
                </div> */}
                </div>
    </div>
  )
}

export default DateTime