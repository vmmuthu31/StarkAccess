"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import EventCard from "../Home/components/EventCard";
import ExploreEventsData from "../utils/ExploreEvents.json";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch or directly set data from the imported JSON
    setEvents(ExploreEventsData);
  }, []);
  return (
    <div className="text-black ">
      <div className="bg-[url('/BgImg3.webp')] bg-cover bg-center min-h-screen">
        <div className="py-3 md:py-6">
          <div className="text-customEnd">
            <Header />
          </div>
          <div className="max-w-5xl mx-auto pt-16">
            <p className=" text-4xl pl-4">Events</p>
            <div className="grid grid-cols-3 py-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
