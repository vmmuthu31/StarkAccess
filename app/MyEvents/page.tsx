"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventCard from "../Home/components/EventCard"; // Import the EventCard component
import { BACKEND_URL } from "@/backend/constants";

type Event = {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string; // Use keyof typeof Assets if Assets is defined globally
  logo: string;
};

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]); // State to store events
  const [error, setError] = useState<string | null>(null); // State to store error messages
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the Bearer token from localStorage

        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BACKEND_URL} /api/Events/my-events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer token for authentication
          },
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Failed to fetch events.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setEvents(data.events); // Store events in the state
      } catch (err: any) {
        setError("An error occurred while fetching events.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="text-black BookHead">
      <div className="bg-[url('/BgImg3.webp')] bg-cover bg-center min-h-screen">
        <div className="py-3 md:py-6">
          <div className="text-customEnd">
            <Header />
          </div>
          <div className="mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">My Events</h1>
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            )}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
