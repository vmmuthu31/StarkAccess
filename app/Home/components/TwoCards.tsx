import React from "react";
import Image from "next/image";
import Assets from "@/app/components/Assets/Assets"; // Import Assets
import ExploreEventsData from "@/app/utils/ExploreEvents.json"; // Import JSON data

type Props = {};

const TwoCards = (props: Props) => {
  // Extract the first two events from the JSON data
  const [event1, event2] = ExploreEventsData.slice(0, 2);

  return (
    <div>
      <div className="flex justify-center text-black">
        <div className="relative bg-[#EDF3FD] h-[290px] w-[290px] rounded-[20px] shadow-xl transform rotate-[-8deg] hover:scale-105 transition-transform duration-500">
          <Image
            className="absolute top-[-40px] left-[-40px] h-14 w-auto z-20"
            src={Assets.Decor1}
            alt="Decor"
          />
          <div className=" h-full w-full rounded-[20px] z-10 p-3 space-y-2">
            <Image
              className=" h-[52px] w-auto"
              src={Assets[event1.logo]} // Map the logo dynamically
              alt={event1.title}
            />
            <p className=" text-xl ">{event1.title}</p>
            <h1 className=" text-sm">{event1.description}</h1>
            <div className="text-sm space-y-1">
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Calendar} alt="Calendar" />{" "}
                 {event1.date}
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Time} alt="Time" />{" "}
                 {event1.time}
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Location} alt="Location" />{" "}
                 {event1.location}
              </h1>
            </div>
          </div>
        </div>

        <div className="relative bg-[#EDF3FD] h-[290px] w-[290px] rounded-[20px] custom-shadow mt-10 transform rotate-[8deg] hover:scale-105 transition-transform duration-500">
          <Image
            className="absolute top-[-40px] right-[-40px] h-14 w-auto z-20"
            src={Assets.Decor2}
            alt="Decor"
          />
          <div className=" h-full w-full rounded-[20px] z-10 p-3 space-y-2">
            <Image
              className=" h-[52px] w-auto"
              src={Assets[event2.logo]} // Map the logo dynamically
              alt={event2.title}
            />
            <p className=" text-xl ">{event2.title}</p>
            <h1 className=" text-sm">{event2.description}</h1>
            <div className="text-sm space-y-1">
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Calendar} alt="Calendar" />{" "}
                 {event2.date}
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Time} alt="Time" />{" "}
                 {event2.time}
              </h1>
              <h1 className=" flex items-center gap-1">
                {" "}
                <Image className=" h-5 w-auto" src={Assets.Location} alt="Location" />{" "}
                 {event2.location}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoCards;
