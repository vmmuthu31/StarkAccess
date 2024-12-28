"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import EventCard from "../Home/components/EventCard";
import Footer from "../components/Footer";
import Assets from "@/app/components/Assets/Assets";

type Props = {};

const Page = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/Events/all-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Map backend data to the EventCard props structure
        const mappedEvents = response.data.events.map((event: any) => ({
          ...event,
          // Provide default image and logo if not present
          image: event.image || "default-event-image", // Use default if not available
          logo: event.logo || "default-logo", // Use default if not available
        }));

        setEvents(mappedEvents);
      } catch (err: any) {
        setError("Error fetching events: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-black">
      <div className="bg-[url('/BgImg3.webp')] bg-cover bg-center min-h-screen">
        <div className="py-3 md:py-6">
          <Header />
          <div className="max-w-5xl mx-auto pt-16">
            <p className="text-4xl pl-4">Events</p>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4 lg:gap-6 space-y-4 md:space-y-0">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
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
