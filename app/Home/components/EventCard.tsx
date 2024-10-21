"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Assets from "@/app/components/Assets/Assets";

type EventCardProps = {
  event: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: keyof typeof Assets; // Ensure the image key is valid
    logo: keyof typeof Assets; // Ensure the logo key is valid
  };
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-[#EDF3FD] rounded-[10px] h-[585px] w-[310px] custom-shadow mx-auto p-4 space-y-2">
      <div className="h-[280px] w-[280px] relative ">
        {/* Check if Assets for the given key exists before rendering */}
        <div className="overflow-hidden">
          {Assets[event.image] && (
            <Image
              className="h-full w-full transition-transform duration-500 hover:scale-110"
              src={Assets[event.image]}
              alt={event.title}
              width={280}
              height={280} // Explicitly define width/height for Next.js Image
            />
          )}
        </div>
        {Assets[event.logo] && (
          <Image
            className="h-14 w-auto absolute bottom-[-20px] right-0 transition-transform duration-500 hover:scale-110 rounded-full"
            src={Assets[event.logo]}
            alt="Event Logo"
            width={56}
            height={56} // Explicitly define width/height for Next.js Image
          />
        )}
      </div>
      <p className="text-xl h-14 overflow-hidden text-ellipsis line-clamp-2">
        {event.title}
      </p>
      <h1 className="text-sm h-16 overflow-hidden text-ellipsis line-clamp-3">
        {event.description}
      </h1>
      <div className="text-sm space-y-1 h-[74px]">
        <h1 className="flex items-center gap-1">
          {Assets.Calendar && (
            <Image
              className="h-5 w-auto"
              src={Assets.Calendar}
              alt="Calendar"
              width={20}
              height={20}
            />
          )}
           {event.date}
        </h1>
        <h1 className="flex items-center gap-1">
          {Assets.Time && (
            <Image
              className="h-5 w-auto"
              src={Assets.Time}
              alt="Time"
              width={20}
              height={20}
            />
          )}
           {event.time}
        </h1>
        <h1 className="flex items-center gap-1">
          {Assets.Location && (
            <Image
              className="h-5 w-auto"
              src={Assets.Location}
              alt="Location"
              width={20}
              height={20}
            />
          )}
           {event.location}
        </h1>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="text-white bg-[#4390F2] w-full p-2 px-3 flex justify-center items-center border-4 border-[#78ABFC] rounded-[10px]"
      >
        Buy Ticket Now
      </motion.button>
    </div>
  );
};

export default EventCard;
