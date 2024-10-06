import React from "react";
import Image from "next/image";
import Assets from "@/app/components/Assets/Assets";
import ExploreEventsData from "@/app/utils/ExploreEvents.json";

type Props = {};

const TwoCards = (props: Props) => {
  const [event1, event2] = ExploreEventsData.slice(0, 2);

  return (
    <div>
      <div className="md:flex justify-center text-black mt-10 md:mt-0">
        <div className="relative bg-[#EDF3FD] h-[220px] md:h-[290px] w-[220px] md:w-[290px] rounded-[20px] shadow-xl transform rotate-[-8deg] hover:scale-105 transition-transform duration-500 ml-10 md:ml-0">
          <Image
            className="absolute top-[-20px] md:top-[-40px] left-[-20px] md:left-[-40px] h-7 md:h-14 w-auto z-20"
            src={Assets.Decor1}
            alt="Decor"
          />
          <div className=" h-full w-full rounded-[20px] z-10 p-3 space-y-1 md:space-y-2">
            <Image
              className="h-[32px] md:h-[52px] w-auto"
              src={Assets[event1.logo]}
              alt={event1.title}
            />
            <p className=" text-sm md:text-xl h-10 md:h-14 overflow-hidden text-ellipsis line-clamp-2">{event1.title}</p>
            <h1 className="text-[10px] md:text-sm h-12 md:h-16 overflow-hidden text-ellipsis line-clamp-3">{event1.description}</h1>
            <div className="text-sm space-y-1">
              <h1 className="text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image
                  className="h-3 md:h-5 w-auto"
                  src={Assets.Calendar}
                  alt="Calendar"
                />{" "}
                 {event1.date}
              </h1>
              <h1 className=" text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image className="h-3 md:h-5 w-auto" src={Assets.Time} alt="Time" />  
                {event1.time}
              </h1>
              <h1 className="text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image
                  className="h-3 md:h-5 w-auto"
                  src={Assets.Location}
                  alt="Location"
                />{" "}
                 {event1.location}
              </h1>
            </div>
          </div>
        </div>

        <div className="relative bg-[#EDF3FD] h-[220px] md:h-[290px] w-[220px] md:w-[290px] rounded-[20px] custom-shadow mt-[-10px] md:mt-10 transform rotate-[8deg] hover:scale-105 transition-transform duration-500 ml-auto mr-10 md:mr-0 md:ml-0">
          <Image
            className="absolute top-[-20px] md:top-[-40px] right-[-20px] md:right-[-40px] h-7 md:h-14 w-auto z-20"
            src={Assets.Decor2}
            alt="Decor"
          />
          <div className=" h-full w-full rounded-[20px] z-10 p-3 space-y-1 md:space-y-2">
            <Image
              className="h-[32px] md:h-[52px] w-auto"
              src={Assets[event2.logo]}
              alt={event2.title}
            />
            <p className="text-sm md:text-xl h-10 md:h-14 overflow-hidden text-ellipsis line-clamp-2">{event2.title}</p>
            <h1 className="text-[10px] md:text-sm h-12 md:h-16 overflow-hidden text-ellipsis line-clamp-3">{event2.description}</h1>
            <div className="text-sm space-y-1">
              <h1 className="text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image
                  className="h-3 md:h-5 w-auto"
                  src={Assets.Calendar}
                  alt="Calendar"
                />{" "}
                 {event2.date}
              </h1>
              <h1 className="text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image className="h-3 md:h-5 w-auto" src={Assets.Time} alt="Time" />  
                {event2.time}
              </h1>
              <h1 className="text-xs md:text-base flex items-center gap-1">
                {" "}
                <Image
                  className="h-3 md:h-5 w-auto"
                  src={Assets.Location}
                  alt="Location"
                />{" "}
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
