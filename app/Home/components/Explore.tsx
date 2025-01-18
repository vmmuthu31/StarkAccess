"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import ExploreEventsData from "@/app/utils/ExploreEvents.json";

type Props = {};

const Explore = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch or directly set data from the imported JSON
    setEvents(ExploreEventsData);
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-black">
      <div>
        <p className="text-2xl text-center">Explore Events</p>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4 lg:gap-6 space-y-4 md:space-y-0">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
