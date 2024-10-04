import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import ExploreEventsData from "@/app/utils/ExploreEvents.json"; // Import JSON

type Props = {};

const Explore = (props: Props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch or directly set data from the imported JSON
    setEvents(ExploreEventsData);
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-black">
      <div>
        <p className="text-2xl text-center">Explore Events</p>
        <div className="grid grid-cols-3 py-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
