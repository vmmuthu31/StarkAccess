"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Assets from "@/app/components/Assets/Assets";
import axios from "axios"; // Ensure axios is imported

type EventCardProps = {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: keyof typeof Assets;
    logo: keyof typeof Assets;
  };
  userRole: string; // Role of logged-in user
  onDelete: (id: string) => void; // Function to handle delete
};

const EventCard = ({ event, userRole, onDelete }: EventCardProps) => {
  const handleDelete = async () => {
    try {
      // Send DELETE request to the backend API
      const response = await axios.delete(`http://localhost:8080/api/Events/event/${event._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        alert("Event deleted successfully");
        onDelete(event._id); // Call onDelete to update state
      }
    } catch (err: any) {
      console.error('Error during delete:', err); // Log error for debugging
      alert("Error deleting event: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-[#EDF3FD] rounded-[10px] h-[585px] w-[310px] custom-shadow mx-auto p-4 space-y-2">
      <div className="h-[280px] w-[280px] relative">
        <div className="overflow-hidden">
          {Assets[event.image] && (
            <Image
              className="h-full w-full transition-transform duration-500 hover:scale-110"
              src={Assets[event.image]}
              alt={event.title}
              width={280}
              height={280}
            />
          )}
        </div>
        {Assets[event.logo] && (
          <Image
            className="h-14 w-auto absolute bottom-[-20px] right-0 transition-transform duration-500 hover:scale-110 rounded-full"
            src={Assets[event.logo]}
            alt="Event Logo"
            width={56}
            height={56}
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
      {userRole === "admin" || userRole === "superadmin" ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="text-white bg-red-500 w-full p-2 px-3 flex justify-center items-center border-4 border-red-600 rounded-[10px]"
        >
          Delete Event
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-white bg-[#4390F2] w-full p-2 px-3 flex justify-center items-center border-4 border-[#78ABFC] rounded-[10px]"
        >
          Buy Ticket Now
        </motion.button>
      )}
    </div>
  );
};

export default EventCard;
