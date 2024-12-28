// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Assets from "@/app/components/Assets/Assets";
// import moment from "moment-timezone";

// const timezones = moment.tz.names();

// type Props = {
//   onDateChange: (
//     startDate: string,
//     startTime: string,
//     endDate: string,
//     endTime: string,
//     timeZone: string
//   ) => void; // Callback for sending data
// };

// const DateTime = ({ onDateChange }: Props) => {
//   const [selectedStartDate, setSelectedStartDate] = useState("");
//   const [selectedEndDate, setSelectedEndDate] = useState("");
//   const [selectedStartTime, setSelectedStartTime] = useState("");
//   const [selectedEndTime, setSelectedEndTime] = useState("");
//   const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Singapore");
//   const [isStartDateVisible, setIsStartDateVisible] = useState(false);
//   const [isEndDateVisible, setIsEndDateVisible] = useState(false);
//   const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
//   const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);

//   const startDateRef = useRef<HTMLDivElement>(null);
//   const endDateRef = useRef<HTMLDivElement>(null);
//   const startTimeRef = useRef<HTMLDivElement>(null);
//   const endTimeRef = useRef<HTMLDivElement>(null);

//   const Handlestartdatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = e.target.value;
//     setSelectedStartDate(newDate);
//     setIsStartDateVisible(false);
//     onDateChange(newDate, selectedStartTime, selectedEndDate, selectedEndTime, selectedTimeZone);
//   };

//   const Handlestarttimechange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = e.target.value;
//     setSelectedStartTime(newTime);
//     setIsStartTimeVisible(false);
//     onDateChange(selectedStartDate, newTime, selectedEndDate, selectedEndTime, selectedTimeZone);
//   };

//   const Handleenddatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = e.target.value;
//     setSelectedEndDate(newDate);
//     setIsEndDateVisible(false);
//     onDateChange(selectedStartDate, selectedStartTime, newDate, selectedEndTime, selectedTimeZone);
//   };

//   const Handleendtimechange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = e.target.value;
//     setSelectedEndTime(newTime);
//     setIsEndTimeVisible(false);
//     onDateChange(selectedStartDate, selectedStartTime, selectedEndDate, newTime, selectedTimeZone);
//   };

//   const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTimeZone(e.target.value);
//     onDateChange(selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime, e.target.value);
//   };

//   const Formatdate = (dateString: string) => {
//     if (!dateString) return "";
//     const date = moment.tz(dateString, selectedTimeZone);
//     return date.format("ddd, MMM D");
//   };

//   const Formattime = (timeString: string) => {
//     if (!timeString) return "";
//     const time = moment.tz(`${selectedStartDate} ${timeString}`, selectedTimeZone);
//     return time.format("h:mm A");
//   };

//   useEffect(() => {
//     const Handleclickoutside = (event: MouseEvent) => {
//       if (startDateRef.current && !startDateRef.current.contains(event.target as Node)) {
//         setIsStartDateVisible(false);
//       }
//       if (endDateRef.current && !endDateRef.current.contains(event.target as Node)) {
//         setIsEndDateVisible(false);
//       }
//       if (startTimeRef.current && !startTimeRef.current.contains(event.target as Node)) {
//         setIsStartTimeVisible(false);
//       }
//       if (endTimeRef.current && !endTimeRef.current.contains(event.target as Node)) {
//         setIsEndTimeVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", Handleclickoutside);

//     return () => {
//       document.removeEventListener("mousedown", Handleclickoutside);
//     };
//   }, []);

//   return (
//     <div>
//       <div className="bg-[#DAE7FC] w-full h-auto p-2 px-4 rounded-[10px] border border-[#4390F2]/40 flex flex-col space-y-4">
//         {/* Start Date and Time */}
//         <div className="flex items-center">
//           <div className="flex items-center gap-2 w-[60px]">
//             <Image src={Assets.DotSolid} alt="Dot Solid" />
//             <h1 className="text-[#4390F2]">Start</h1>
//           </div>
//           <div className="flex items-center space-x-2 rounded-md w-fit relative">
//             <div ref={startDateRef} className="relative flex flex-col">
//               <div
//                 className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-l-[10px] text-center"
//                 onClick={() => {
//                   setIsStartDateVisible(!isStartDateVisible);
//                   setIsEndDateVisible(false);
//                 }}
//               >
//                 {selectedStartDate ? Formatdate(selectedStartDate) : "Fri, Oct 4"}
//               </div>
//               {isStartDateVisible && (
//                 <input
//                   type="date"
//                   value={selectedStartDate}
//                   onChange={Handlestartdatechange}
//                   className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
//                 />
//               )}
//             </div>

//             <div ref={startTimeRef} className="relative flex flex-col">
//               <div
//                 className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-r-[10px] text-center"
//                 onClick={() => setIsStartTimeVisible(!isStartTimeVisible)}
//               >
//                 {selectedStartTime ? Formattime(selectedStartTime) : "5:30 pm"}
//               </div>
//               {isStartTimeVisible && (
//                 <input
//                   type="time"
//                   value={selectedStartTime}
//                   onChange={Handlestarttimechange}
//                   className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* End Date and Time */}
//         <div className="flex items-center">
//           <div className="flex items-center gap-2 w-[60px]">
//             <Image src={Assets.DotOutline} alt="Dot Outline" />
//             <h1 className="text-[#4390F2]">End</h1>
//           </div>
//           <div className="flex items-center space-x-2 rounded-md w-fit relative">
//             <div ref={endDateRef} className="relative flex flex-col">
//               <div
//                 className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-l-[10px] text-center"
//                 onClick={() => {
//                   setIsEndDateVisible(!isEndDateVisible);
//                   setIsStartDateVisible(false);
//                 }}
//               >
//                 {selectedEndDate ? Formatdate(selectedEndDate) : "Sat, Oct 5"}
//               </div>
//               {isEndDateVisible && (
//                 <input
//                   type="date"
//                   value={selectedEndDate}
//                   onChange={Handleenddatechange}
//                   className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
//                 />
//               )}
//             </div>

//             <div ref={endTimeRef} className="relative flex flex-col">
//               <div
//                 className="bg-[#4390F2]/10 h-[35px] w-[114px] flex items-center justify-center rounded-r-[10px] text-center"
//                 onClick={() => setIsEndTimeVisible(!isEndTimeVisible)}
//               >
//                 {selectedEndTime ? Formattime(selectedEndTime) : "7:30 pm"}
//               </div>
//               {isEndTimeVisible && (
//                 <input
//                   type="time"
//                   value={selectedEndTime}
//                   onChange={Handleendtimechange}
//                   className="absolute top-[110%] left-0 bg-[#E3F2FF] p-2 rounded-md shadow-md mt-1 z-10"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Timezone Selector */}
//         <div className="flex items-center mt-4">
//           <h1 className="text-[#4390F2] w-[60px]">Timezone</h1>
//           <select
//             className="bg-[#E3F2FF] p-2 rounded-md shadow-md"
//             value={selectedTimeZone}
//             onChange={handleTimezoneChange}
//           >
//             {timezones.map((tz) => (
//               <option key={tz} value={tz}>
//                 {tz}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateTime;
